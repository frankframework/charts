#!/usr/bin/env node

const {execSync} = require("child_process");
const fs = require("fs");
const path = require("path");

const CHART_FILENAME = "Chart.yaml";
const LOCAL_REPO_PREFIX = "file://";
const CHART_VALUES_FILENAME = "values.yaml";
const CHART_README_FILENAME = "README.md";
const CHART_VALUES_SCHEMA_FILENAME = "values.schema.json";
const README_GENERATOR_CMD = "pnpm exec readme-generator";

function getChangedFiles() {
    return execSync("git diff --cached --name-only --diff-filter=ACMR", {encoding: "utf-8"})
        .trim()
        .split("\n");
}

function getChangedFolders(changedFiles) {
    return [
        ...new Set(
            changedFiles
                .map((file) => file.split("/").slice(0, -1).join("/"))
                .filter((folder) => folder.length > 0)
        ),
    ];
}

function isChartFolder(folder) {
    return (
        fs.existsSync(`${folder}/${CHART_VALUES_FILENAME}`) &&
        fs.existsSync(`${folder}/${CHART_README_FILENAME}`)
    );
}

function runCommand(cmd, args, errorMessage) {
    try {
        execSync(`${cmd} ${args}`, {encoding: "utf-8", stdio: "pipe"});
    } catch (error) {
        console.error(`❌ ${errorMessage}`);
        console.error(error.stderr);
        console.error(error.stdout);
        process.exit(1);
    }
}

function updateChartDependencies(folder) {
    console.log(`🔄 Chart ${folder}: Updating dependencies`);
    const cmd = "helm";
    const args = `dependency update ${folder}`;
    const errorMessage = `Error running Helm Dependency Update for chart folder ${folder}`;
    runCommand(cmd, args, errorMessage);
}

function readChartField(chartDir, field) {
    const chartYamlPath = `${chartDir}/${CHART_FILENAME}`;
    if (!fs.existsSync(chartYamlPath)) {
        return null;
    }
    const content = fs.readFileSync(chartYamlPath, "utf-8");
    const match = content.match(new RegExp(`^${field}:\\s*["']?([^"'\\s]+)["']?\\s*$`, "m"));
    return match ? match[1] : null;
}

function parseChartDependencies(chartDir) {
    const chartYamlPath = `${chartDir}/${CHART_FILENAME}`;
    if (!fs.existsSync(chartYamlPath)) {
        return [];
    }
    const lines = fs.readFileSync(chartYamlPath, "utf-8").split("\n");
    const deps = [];
    let inDeps = false;
    let current = null;
    for (const raw of lines) {
        const line = raw.replace(/\s+$/, "");
        if (/^dependencies:\s*$/.test(line)) {
            inDeps = true;
            continue;
        }
        if (!inDeps) {
            continue;
        }
        // A non-indented, non-empty line ends the dependencies block
        if (line !== "" && /^\S/.test(line)) {
            break;
        }
        const nameMatch = line.match(/^\s*-\s*name:\s*(\S+)/);
        if (nameMatch) {
            if (current) deps.push(current);
            current = {name: nameMatch[1]};
            continue;
        }
        if (!current) {
            continue;
        }
        const versionMatch = line.match(/^\s*version:\s*["']?([^"'\s]+)["']?/);
        if (versionMatch) {
            current.version = versionMatch[1];
            continue;
        }
        const repositoryMatch = line.match(/^\s*repository:\s*(\S+)/);
        if (repositoryMatch) {
            current.repository = repositoryMatch[1];
        }
    }
    if (current) deps.push(current);
    return deps;
}

function localDependencies(chartDir) {
    return parseChartDependencies(chartDir).filter(
        (dep) => dep.repository && dep.repository.startsWith(LOCAL_REPO_PREFIX)
    );
}

function resolveLocalDependencyDir(parentFolder, dependency) {
    const relativePath = dependency.repository.slice(LOCAL_REPO_PREFIX.length);
    return path.resolve(parentFolder, relativePath);
}

function syncLocalDependencyVersion(parentFolder, dependency, dependencyDir) {
    const actualVersion = readChartField(dependencyDir, "version");
    if (!actualVersion || actualVersion === dependency.version) {
        return;
    }
    const chartYamlPath = `${parentFolder}/${CHART_FILENAME}`;
    const lines = fs.readFileSync(chartYamlPath, "utf-8").split("\n");
    let inTarget = false;
    let changed = false;
    for (let i = 0; i < lines.length; i++) {
        const nameMatch = lines[i].match(/^(\s*-\s*name:\s*)(\S+)/);
        if (nameMatch) {
            inTarget = nameMatch[2] === dependency.name;
            continue;
        }
        if (inTarget) {
            const versionMatch = lines[i].match(/^(\s*version:\s*)["']?[^"'\s]+["']?\s*$/);
            if (versionMatch) {
                lines[i] = `${versionMatch[1]}${actualVersion}`;
                inTarget = false;
                changed = true;
            }
        }
    }
    if (changed) {
        fs.writeFileSync(chartYamlPath, lines.join("\n"));
        console.log(
            `   ↳ Synced ${dependency.name} version ${dependency.version} → ${actualVersion} in ${chartYamlPath}`
        );
        // Chart files live under a broadly-ignored path (**/charts/*), so force-add
        runCommand("git", `add -f ${chartYamlPath}`, `Error staging ${chartYamlPath}`);
    }
}

function buildLocalDependencies(folder) {
    for (const dependency of localDependencies(folder)) {
        const dependencyDir = resolveLocalDependencyDir(folder, dependency);
        // Build nested local dependencies bottom-up first
        buildLocalDependencies(dependencyDir);
        // Keep the version constraint in sync with the local chart's actual version
        syncLocalDependencyVersion(folder, dependency, dependencyDir);
        // Package the dependency's own local sub-charts so it is complete for this parent
        if (localDependencies(dependencyDir).length > 0) {
            console.log(`🏗️  Chart ${dependencyDir}: Building local dependency`);
            updateChartDependencies(dependencyDir);
        }
    }
}

function generateChartReadmeAndSchema(folder) {
    console.log(`📝 Chart ${folder}: Generating readme and schema`);
    const cmd = README_GENERATOR_CMD;
    const args = `-v "${folder}/${CHART_VALUES_FILENAME}" -r "${folder}/${CHART_README_FILENAME}" -s "${folder}/${CHART_VALUES_SCHEMA_FILENAME}"`;
    const errorMessage = `Error running Readme Generator for chart folder ${folder}`;
    runCommand(cmd, args, errorMessage);
}

function lintChartFolder(folder) {
    console.log(`🧐 Chart ${folder}: Running Helm Lint`);
    const cmd = "helm";
    const args = `lint ${folder}`;
    const errorMessage = `Error running Helm Lint for chart folder ${folder}`;
    runCommand(cmd, args, errorMessage);
}

function main() {
    console.log(`🔍 Check if changed folders are charts\n`);
    const changedFiles = getChangedFiles();
    const changedFolders = getChangedFolders(changedFiles);
    for (const folder of changedFolders) {
        if (isChartFolder(folder)) {
            buildLocalDependencies(folder);
            updateChartDependencies(folder);
            generateChartReadmeAndSchema(folder);
            lintChartFolder(folder);
        } else {
            console.log(`🤷 Not a chart: ${folder}`);
        }
    }
    console.log(`\n⏱️ Script duration: ${process.uptime()} seconds`);
    console.log("\x1b[33m%s\x1b[0m", `\n💛 Stay Frank!`);
}

main();

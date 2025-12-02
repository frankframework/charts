# Frank!Framework Chart

Running the Frank!Framework in Kubernetes is made easy with this Helm chart. 
Multiple instances of the Frank!Framework can be deployed in the same Kubernetes cluster and managed from a single console (if enabled).

Configurations can be copied over into a Container Image, or be mounted as a ConfigMap or Secret.
Just replace the image with the `image.repository` and `image.tag` parameters or mount the configurations with the `extraVolumes` and `extraVolumeMounts` parameters.

This chart can also be used as sub-chart for other charts, so other defaults can be provided and extra files can be added.
Take a look at the Frank2Example chart for a simple example.

## Table of Contents
<!-- TOC -->
* [Frank!Framework Chart](#frankframework-chart)
  * [Usage](#usage)
  * [Configuration and installation details](#configuration-and-installation-details)
  * [Parameters](#parameters)
  * [Notable changes](#notable-changes)
<!-- TOC -->

## Usage

[Helm](https://helm.sh) must be installed to use the charts. Please refer to Helm's [documentation](https://helm.sh/docs) to get started.

Once Helm has been set up correctly, add the repo as follows:

```shell
helm repo add frankframework https://frankframework.github.io/charts
```

If you had already added this repo earlier, run `helm repo update` to retrieve the latest versions of the packages. 
You can then run `helm search repofrankframework` to see the charts.

Configure the Frank!Framework by creating a `values.yaml` file. 
Parameters can be found below, or in the `values.yaml` file, where additional documentation and examples are provided.

To install the frankframework chart:

```shell
helm install my-frankframework frankframework/frankframework -f values.yaml
```

To uninstall the chart:

```shell
helm delete my-frankframework
```

## Configuration and installation details

### DTAP Stage

The Frank!Framework will start with different settings enabled, depending on what DTAP stage is configured. Like if the Ladybug should be disabled, or if authentication should be enabled.

For more information about DTAP stages read: https://frank-manual.readthedocs.io/en/latest/deploying/dtapAndProperties.html

### Version tag

This chart defines the minimum required version of the Frank!Framework image.
To update to a newer version, you can set the `image.tag` parameter to the desired version. Immutable tags are recommended.

See available versions here: https://hub.docker.com/r/frankframework/frankframework/tags

This is also applicable for the Frank!Framework console, if enabled. The same tag can be used.

### Authentication

The usage of an authenticator is based on the `dtap.stage`.
But it can be overridden with the `application.security.console.authentication.type` and `application.security.testtool.authentication.type` environment variables, if needed.

If the separate console is enabled, the console will **not** use the same authentication as the Frank!Framework. 
And always needs to be configured.

Read more about configuring the authentication in the [Frank!Framework Manual](https://frank-manual.readthedocs.io/en/latest/deploying/security.html).

### Ladybug Database

A database is added for the Ladybug to make it somewhat persistent and to make the data accessible for all replicas.

The database is used for Ladybug reports and is not needed when Ladybug is disabled.
This is enabled by default, but can be disabled if you want to use an external database for Ladybug.

The database is not intended to be used with the Frank!Framework itself, that datasource should be configured with the `resources.yaml` file.

You can read more about it in the parameters section.

## Parameters

### Common parameters

Common parameters for the Frank!Framework chart.

Can be used to override the default name for the chart.


| Name               | Description                                                                     | Value |
| ------------------ | ------------------------------------------------------------------------------- | ----- |
| `nameOverride`     | String to partially override fullname template (will maintain the release name) | `""`  |
| `fullnameOverride` | String to fully override fullname template                                      | `""`  |

### Frank!Framework image parameters

Information about how to use and configure the image can be found in the documentation:
https://github.com/frankframework/frankframework/blob/master/Docker.md

The image is pulled from nexus.frankframework.org by default. The images located there will be kept for as long as possible.

Here are the images available:
https://nexus.frankframework.org/#browse/browse:frankframework-docker:v2%2Ffrankframework%2Ftags/

If you want to use a specific nightly, you can use the images on docker.io:
https://hub.docker.com/r/frankframework/frankframework/tags

| Name                | Description                                                                                                                | Value                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `image.registry`    | Frank!Framework image registry                                                                                             | `nexus.frankframework.org` |
| `image.repository`  | Frank!Framework image repository                                                                                           | `frankframework`           |
| `image.tag`         | Frank!Framework image tag (immutable tags are recommended) update this tag manually to upgrade the Frank!Framework version | `""`                       |
| `image.pullPolicy`  | Frank!Framework image pull policy                                                                                          | `IfNotPresent`             |
| `image.pullPolicy`  | Specify a imagePullPolicy                                                                                                  |                            |
| `image.pullPolicy`  | Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'                                                  |                            |
| `image.pullPolicy`  | ref: https://kubernetes.io/docs/user-guide/images/#pre-pulling-images                                                      |                            |
| `image.pullSecrets` | Frank!Framework image pull secrets                                                                                         | `[]`                       |
| `image.pullSecrets` | Optionally specify an array of imagePullSecrets.                                                                           |                            |
| `image.pullSecrets` | Secrets must be manually created in the namespace.                                                                         |                            |
| `image.pullSecrets` | ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/                                 |                            |
| `image.pullSecrets` | Example is shown in the `values.yaml` file                                                                                 |                            |

### Frank!Framework application parameters

The application parameters are used to configure the Frank!Framework and how it will run.
For example, you can configure the DTAP stage and side of where the instance is running.
You can also configure the name of the instance. And what configurations to load.

| Name                               | Description                                                                                                                                                           | Value |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `application.dtap.stage`           | (Required) Set the `DTAP` stage. Options: `LOC`, `DEV`, `TST`, `ACC`, `PRD`                                                                                           | `""`  |
| `application.dtap.stage`           | The DTAP stage is used to enable and disable features in the Frank!Framework.                                                                                         |       |
| `application.dtap.stage`           | ref: https://frank-manual.readthedocs.io/en/latest/deploying/dtapAndProperties.html                                                                                   |       |
| `application.dtap.side`            | Set the `DTAP` side of where the instance is running, and for sideSpecific properties                                                                                 | `""`  |
| `application.instance.name`        | Set the name of the Frank! instance (default is the `fullname`)                                                                                                       | `""`  |
| `application.instance.name`        | Keep in mind that the name is used for the default datasource.                                                                                                        |       |
| `application.configurations.names` | Set the configurations to load. Leave empty to use the default                                                                                                        | `[]`  |
| `application.configurations.names` | Example is shown in the `values.yaml` file                                                                                                                            |       |
| `application.properties`           | Set Yaml properties for configuring the Frank!Framework or configurations                                                                                             | `{}`  |
| `application.properties`           | Please read the section "Environment variables" for more information about the differance between `.Values.application.properties` and `.Values.environmentVariables` |       |
| `application.properties`           | ref: https://github.com/frankframework/frankframework/blob/master/core/src/main/resources/AppConstants.properties                                                     |       |
| `application.properties`           | implementation ref: https://github.com/frankframework/frankframework/blob/master/commons/src/main/java/org/frankframework/util/YamlParser.java                        |       |

### Container

This section contains some parameters that are used to configure the deployment container of the Frank!Framework.

| Name      | Description                          | Value |
| --------- | ------------------------------------ | ----- |
| `command` | The command to run in the container  | `[]`  |
| `args`    | The arguments to pass to the command | `[]`  |
| `ports`   | The ports to expose in the container | `[]`  |

### Environment variables

The environment variables are used to configure the Frank!Framework.

The differance between `.Values.application.properties` and `.Values.environmentVariables` is that the environment variables are set in the container and not in the yaml file.
Environment variables are immediately available in the container and can be used to configure the Frank!Framework, even before the yaml file has been loaded.
The yaml file will is loaded by the Frank!Framework after it has been started.
This is an important differance because it means that some variables to configure the Frank!Framework can not be set in the yaml file.

It is possible to add environment variables with the `.Values.environmentVariables` parameter and to add environment variables from a configmap or secret with the `.Values.envFrom` parameter.

To configure credentials you need to add a volume (see section Volumes) and set these environment variables.

```yaml
credentialFactory.class: "nl.nn.credentialprovider.PropertyFileCredentialFactory"
credentialFactory.map.properties: "path to credentials.properties"
```

For more information about credentials, see the [documentation](https://frank-manual.readthedocs.io/en/latest/deploying/credentials.html).

To disable or configure authentication for the console, please read the [Frank!Framework Manual](https://frank-manual.readthedocs.io/en/latest/advancedDevelopment/authorization/consoleAndLadybug.html).

To fine tune memory refer to the [Oracle documentation](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html#BABDJJFI).

Refer to the [Frank!Framework Manual](https://frank-manual.readthedocs.io/) for more information.

| Name                                                  | Description                                                              | Value                       |
| ----------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------- |
| `environmentVariables`                                | Set environment variables for the Frank!Framework                        | `{}`                        |
| `environmentVariables.application.server.type.custom` | Set the transaction manager, this is needed for transactionality support | `NARAYANA`                  |
| `environmentVariables.JAVA_OPTS`                      | Set the JAVA_OPTS for the Frank!Framework                                | `-XX:MaxRAMPercentage=80.0` |
| `envFrom`                                             | Set environment variables from configmaps or secrets                     | `[]`                        |
| `envFrom`                                             | Example is shown in the `values.yaml` file                               |                             |

### Generate ConfigMaps and Secrets

To deploy the Frank!Framework, it can be needed to add some files to the container.

The Frank!Framework chart allows you to generate configmaps and secrets from values.
This is useful if you want to add local users or resources to the Frank!Framework.

Be sure to set a subPath and a mountPath if you want to avoid conflicts and use multiple secrets.
With one secret, the subPath and mountPath are not needed. And it would be possible to implement items, like this:
```yaml
generateSecret:
- name: frankframework-resources
mountPath: "/opt/frank/resources/"
items:
- key: resources.yml
path: resources.yml
stringData:
resources.yml: |-
jdbc:
- name: frank2example
type: org.h2.jdbcx.JdbcDataSource
url: jdbc:h2:mem:frank2example;NON_KEYWORDS=VALUE;DB_CLOSE_ON_EXIT=FALSE;DB_CLOSE_DELAY=-1;TRACE_LEVEL_FILE=0;
```

The following example will generate a credentials.properties file in the /opt/frank/secrets/ folder.

```yaml
generateSecret:
- name: frankframework-credentials
mountPath: /opt/frank/secrets/
stringData:
credentials.properties: |-
alias/uasername=C3PO
alias/password=R2D2
```

| Name                            | Description                                                             | Value       |
| ------------------------------- | ----------------------------------------------------------------------- | ----------- |
| `generateConfigMap`             | Generate configmaps from values                                         | `{}`        |
| `generateConfigMap`             | Example is shown in the `values.yaml` file                              |             |
| `generateConfigMap.name`        | Name of the configmap                                                   | `undefined` |
| `generateConfigMap.optional`    | Mark the configmap as optional (default false)                          | `undefined` |
| `generateConfigMap.defaultMode` | Default mode of the configmap (default 0644)                            | `undefined` |
| `generateConfigMap.items`       | Items of the configmap                                                  | `undefined` |
| `generateConfigMap.items.key`   | Key of the item                                                         | `undefined` |
| `generateConfigMap.items.path`  | Path of the item to mount (appends mountPath)                           | `undefined` |
| `generateConfigMap.items.mode`  | Mode of the item                                                        | `undefined` |
| `generateConfigMap.mountPath`   | Path where the configmap will be mounted (default /opt/frank/resources) | `undefined` |
| `generateConfigMap.subPath`     | Item in data to mount                                                   | `undefined` |
| `generateConfigMap.readOnly`    | ReadOnly of the configmap (default true)                                | `undefined` |
| `generateConfigMap.data`        | Data of the configmap                                                   | `undefined` |
| `generateSecret`                | Generate secrets from values                                            | `{}`        |
| `generateSecret`                | Example is shown in the `values.yaml` file                              |             |
| `generateSecret.name`           | Name of the secret                                                      | `undefined` |
| `generateSecret.type`           | Type of the secret (default Opaque)                                     | `undefined` |
| `generateSecret.optional`       | Mark the secret as optional (default false)                             | `undefined` |
| `generateSecret.items`          | Items of the secret                                                     | `undefined` |
| `generateSecret.items.key`      | Key of the item                                                         | `undefined` |
| `generateSecret.items.path`     | Path of the item to mount (appends mountPath)                           | `undefined` |
| `generateSecret.items.mode`     | Mode of the item                                                        | `undefined` |
| `generateSecret.mountPath`      | Path where the secret will be mounted (default /opt/frank/secrets)      | `undefined` |
| `generateSecret.subPath`        | Key of the item to mount                                                | `undefined` |
| `generateSecret.readOnly`       | ReadOnly of the secret (default true)                                   | `undefined` |
| `generateSecret.data`           | Data of the secret                                                      | `undefined` |
| `generateSecret.stringData`     | StringData of the secret                                                | `undefined` |

### Volumes

The Frank!Framework chart allows you to create and mount volumes to the Frank!Framework.
This is useful if you want to add existing local users or resources to the Frank!Framework.
You might also use it to mount a volume containing the Configurations for the Frank!Framework.
Or to add a mount as part of the integration.

| Name                | Description                                                                         | Value |
| ------------------- | ----------------------------------------------------------------------------------- | ----- |
| `extraVolumes`      | Optionally specify extra list of additional volumes for WordPress pods              | `[]`  |
| `extraVolumeMounts` | Optionally specify extra list of additional volumeMounts for WordPress container(s) | `[]`  |

### Sidecars

The Frank!Framework chart allows you to add additional sidecar containers to the Frank!Framework pod.
This is useful if you want to add additional tools to the Frank!Framework. Like for logging.

| Name             | Description                                                              | Value |
| ---------------- | ------------------------------------------------------------------------ | ----- |
| `sidecars`       | Add additional sidecar containers to the Frank!Framework pod             | `[]`  |
| `sidecars`       | Example is shown in the `values.yaml` file                               |       |
| `initContainers` | Add additional init containers to the Frank!Framework pod                | `[]`  |
| `initContainers` | ref: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/ |       |
| `initContainers` | Example is shown in the `values.yaml` file                               |       |

### Frank!Framework console parameters

The console is a web application that allows you to manage the Frank!Framework.
Each Frank!Framework instance contains a build-in console, which can be accessed by going to the instance's URL and appending `/iaf/gui`.
Enabling this additional console (apart from the build-in one) will allow you to manage multiple instances of Frank!Framework from a single console.
The additional console is disabled by default, but can be enabled by setting `console.enabled` to `true`.
Configuring the console is done by setting the `console` parameters. Which can be found in the frank-console chart.
ref: https://frankframework.github.io/charts/frank-console

| Name                                          | Description                        | Value                                  |
| --------------------------------------------- | ---------------------------------- | -------------------------------------- |
| `console.enabled`                             | Enable the Frank!Framework console | `false`                                |
| `console.ladybugDatabase.auth.existingSecret` | Name of the secret                 | `frankframework-ladybug-database-auth` |

### Ladybug Database

The Ladybug Database is a PostgreSQL dependency that is used to store Ladybug reports and is not needed when the Ladybug is disabled.

Note that this dependency is not used for the Frank!Framework itself, that datasource should be configured with the `resources.yaml` file.

The dependency is enabled by default, but can be disabled if you want to use an external database for Ladybug.

To configure the PostgreSQL Helm chart, please refer to the documentation and append to the Ladybug Database parameters:
https://github.com/bitnami/charts/tree/main/bitnami/postgresql

Some of the parameters are pre-configured for an easy installation, but can be changed if needed.

| Name                                            | Description                                                                                     | Value                                  |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------- |
| `ladybugDatabase.enabled`                       | Enable the Ladybug Database (PostgreSQL dependency)                                             | `true`                                 |
| `ladybugDatabase.image.repository`              | Override the image repository of the Ladybug Database dependency                                | `bitnamilegacy/postgresql`             |
| `ladybugDatabase.nameOverride`                  | Override the name of the Ladybug Database dependency                                            | `ladybug-database`                     |
| `ladybugDatabase.primary.persistence.enabled`   | Enable persistence for the Ladybug Database dependency (default is false for easy installation) | `false`                                |
| `ladybugDatabase.auth.generatePostgresqlSecret` | Enable the generation of secrets for the PostgreSQL dependency                                  | `true`                                 |
| `ladybugDatabase.auth.existingSecret`           | Name of the secret (also the name of the generated secret)                                      | `frankframework-ladybug-database-auth` |
| `ladybugDatabase.auth.postgresPassword`         | Password for the PostgreSQL dependency                                                          | `postgres`                             |

### Frank!Framework deployment parameters

The startup probe will enable blue-green deployment, which are great for uptime during upgrades and such.
It (and the liveness probe) will check if the console is accessible, until a better health endpoint is available.
The readiness probe will check if all adapters are running using the server health endpoint

| Name                                 | Description                                                                                                                 | Value                                                         |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `replicaCount`                       | Number of Frank!Framework replicas to deploy                                                                                | `1`                                                           |
| `replicaCount`                       | NOTE: ReadWriteMany PVC(s) are required if replicaCount > 1                                                                 |                                                               |
| `startupProbe`                       | Configure the startup probe                                                                                                 |                                                               |
| `startupProbe`                       | ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes |                                                               |
| `startupProbe.initialDelaySeconds`   | Initial delay seconds for startupProbe                                                                                      | `40`                                                          |
| `startupProbe.periodSeconds`         | Period seconds for startupProbe                                                                                             | `10`                                                          |
| `startupProbe.timeoutSeconds`        | Timeout seconds for startupProbe                                                                                            | `1`                                                           |
| `startupProbe.failureThreshold`      | Failure threshold for startupProbe                                                                                          | `12`                                                          |
| `startupProbe.successThreshold`      | Success threshold for startupProbe                                                                                          | `1`                                                           |
| `startupProbe.exec.command`          | Command for startupProbe                                                                                                    | `["curl","-f","http://127.0.0.1:8080/iaf/api/server/health"]` |
| `livenessProbe`                      | Configure the liveness probe                                                                                                |                                                               |
| `livenessProbe`                      | ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes |                                                               |
| `livenessProbe.initialDelaySeconds`  | Initial delay seconds for livenessProbe                                                                                     | `0`                                                           |
| `livenessProbe.periodSeconds`        | Period seconds for livenessProbe                                                                                            | `10`                                                          |
| `livenessProbe.timeoutSeconds`       | Timeout seconds for livenessProbe                                                                                           | `1`                                                           |
| `livenessProbe.failureThreshold`     | Failure threshold for livenessProbe                                                                                         | `12`                                                          |
| `livenessProbe.successThreshold`     | Success threshold for livenessProbe                                                                                         | `1`                                                           |
| `livenessProbe.exec.command`         | Command for livenessProbe                                                                                                   | `["curl","-f","http://127.0.0.1:8080/iaf/api/server/health"]` |
| `readinessProbe`                     | Configure the readiness probe                                                                                               |                                                               |
| `readinessProbe`                     | ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes |                                                               |
| `readinessProbe.initialDelaySeconds` | Initial delay seconds for readinessProbe                                                                                    | `0`                                                           |
| `readinessProbe.periodSeconds`       | Period seconds for readinessProbe                                                                                           | `5`                                                           |
| `readinessProbe.timeoutSeconds`      | Timeout seconds for readinessProbe                                                                                          | `1`                                                           |
| `readinessProbe.failureThreshold`    | Failure threshold for readinessProbe                                                                                        | `3`                                                           |
| `readinessProbe.successThreshold`    | Success threshold for readinessProbe                                                                                        | `1`                                                           |
| `readinessProbe.exec.command`        | Command for readinessProbe                                                                                                  | `["curl","-f","http://127.0.0.1:8080/iaf/api/server/health"]` |
| `resources`                          | Set the resources for the Frank!Framework containers                                                                        | `{}`                                                          |
| `resources`                          | ref: https://kubernetes.io/docs/user-guide/compute-resources/                                                               |                                                               |
| `resources`                          | Example is shown in the `values.yaml` file                                                                                  |                                                               |
| `resources.limits`                   | The resources limits for the Frank!Framework containers                                                                     | `undefined`                                                   |
| `resources.requests.memory`          | The requested memory for the Frank!Framework containers                                                                     | `undefined`                                                   |
| `resources.requests.cpu`             | The requested cpu for the Frank!Framework containers                                                                        | `undefined`                                                   |
| `terminationGracePeriodSeconds`      | Number of seconds after which pods are forcefully killed                                                                    | `60`                                                          |
| `terminationGracePeriodSeconds`      | Note: Lower values may cause running adapters to fail                                                                       |                                                               |
| `nodeSelector`                       | Node labels for pod assignment                                                                                              | `{}`                                                          |
| `nodeSelector`                       | ref: https://kubernetes.io/docs/user-guide/node-selection/                                                                  |                                                               |
| `tolerations`                        | Set tolerations for pod assignment                                                                                          | `[]`                                                          |
| `tolerations`                        | ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/                                                |                                                               |
| `affinity`                           | Set affinity for pod assignment                                                                                             | `{}`                                                          |
| `affinity`                           | Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity                          |                                                               |
| `affinity`                           | NOTE: podAffinityPreset, podAntiAffinityPreset, and nodeAffinityPreset will be ignored when it's set                        |                                                               |
| `timeZone`                           | used for database connection and log timestamps                                                                             | `Etc/UTC`                                                     |

### Traffic Exposure Parameters

| Name                           | Description                                                                                                                        | Value       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `service.type`                 | Frank!Framework service type                                                                                                       | `ClusterIP` |
| `service.port`                 | Frank!Framework service port                                                                                                       | `80`        |
| `service.annotations`          | Additional annotations for the Frank!Framework service                                                                             | `{}`        |
| `ingress`                      | ref: https://kubernetes.io/docs/concepts/services-networking/ingress/                                                              |             |
| `ingress.enabled`              | Enable ingress record generation for Frank!                                                                                        | `false`     |
| `ingress.className`            | IngressClass that will be used to implement the Ingress (Kubernetes 1.18+)                                                         | `""`        |
| `ingress.className`            | This is supported in Kubernetes 1.18+ and required if you have more than one IngressClass marked as the default for your cluster . |             |
| `ingress.className`            | ref: https://kubernetes.io/blog/2020/04/02/improvements-to-the-ingress-api-in-kubernetes-1.18/                                     |             |
| `ingress.annotations`          | Additional annotations for the Ingress resource. To enable certificate autogeneration, place here your cert-manager annotations.   | `{}`        |
| `ingress.annotations`          | For a full list of possible ingress annotations, please see                                                                        |             |
| `ingress.annotations`          | ref: https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/nginx-configuration/annotations.md                    |             |
| `ingress.annotations`          | Use this parameter to set the required annotations for cert-manager, see                                                           |             |
| `ingress.annotations`          | ref: https://cert-manager.io/docs/usage/ingress/#supported-annotations                                                             |             |
| `ingress.annotations`          | Example is shown in the `values.yaml` file                                                                                         |             |
| `ingress.hosts`                | Set hosts for ingress                                                                                                              | `{}`        |
| `ingress.hosts.host`           | Set hostname                                                                                                                       | `undefined` |
| `ingress.hosts.paths`          | Set multiple paths                                                                                                                 | `undefined` |
| `ingress.hosts.paths.path`     | Set path (context url)                                                                                                             | `undefined` |
| `ingress.hosts.paths.pathType` | Set type of path                                                                                                                   | `undefined` |
| `ingress.tls`                  | Define tls secrets for hosts                                                                                                       | `{}`        |
| `ingress.tls`                  | Example is shown in the `values.yaml` file                                                                                         |             |

### Other Parameters

| Name                         | Description                                                                                                              | Value  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------ |
| `serviceAccount`             | ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/                                 |        |
| `serviceAccount.create`      | Enable creation of ServiceAccount for Frank!Framework pod                                                                | `true` |
| `serviceAccount.annotations` | Additional custom annotations for the ServiceAccount                                                                     | `{}`   |
| `serviceAccount.name`        | The name of the ServiceAccount to use.                                                                                   | `""`   |
| `podAnnotations`             | Annotations for Frank!Framework pods                                                                                     | `{}`   |
| `podAnnotations`             | ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/                                      |        |
| `podLabels`                  | Extra labels for Frank!Framework pods                                                                                    | `{}`   |
| `podLabels`                  | ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/                                           |        |
| `podSecurityContext`         | Set Frank!Framework pod's Security Context                                                                               | `{}`   |
| `podSecurityContext`         | ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod       |        |
| `securityContext`            | Set Frank!Framework container's Security Context                                                                         | `{}`   |
| `securityContext`            | ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-container |        |
| `securityContext`            | Example is shown in the `values.yaml` file                                                                               |        |

## Notable changes

### 0.6.0

Updated the Frank!Framework version to `9.4.0-SNAPSHOT`.

### 0.5.0

Added a Ladybug Database (PostgreSQL variant) to the Chart. 

Also added `.Values.envFrom` to allow for the mounting of environment variables from configmaps or secrets.

Removed `.Values.application.security.http.authentication: "false"`. This is a more secure default. 
The `dtap.stage` will determine if authentication is enabled or not. It is possible to override this with environment variables.
Read mote in the [Frank!Framework Manual](https://frank-manual.readthedocs.io/en/latest/deploying/security.html).

### 0.4.0

The Frank!Framework is an ever evolving project, and as such, the chart has been updated to reflect the latest changes.

To make the chart easier to maintain, the following features have been removed:
* `.Values.application.memory` has been removed. Configure the memory with environment variables.
* `.Values.application.security.http` has been removed. Configure the authentication with additional files and environment variables.
* `.Values.application.credentials` has been removed. Configure the credentials with volumes and environment variables.
* `.Values.application.certificates` has been removed. Configure the certificates with volumes and environment variables.

To accommodate for the removal of the above features, the following changes have been made:
* `.Values.application.environmentVariables` has been changed to `.Values.environmentVariables`. And has some pre-defined values.
* `.Values.generateConfigMap` has been added to allow for the generation of configmaps.
* `.Values.generateSecret` has been added to allow for the generation of secrets.
* `.Values.extraVolumes` has been added to allow for the mounting of additional volumes.
* `.Values.extraVolumeMounts` has been added to allow for the mounting of additional volumes.

Also `.Values.sidecars` and `.Values.initContainers` have been added to allow for the mounting of additional sidecars and init containers.

All these changes make the deployment much more flexible and easier to maintain.
It also doesn't require extra documentation or knowledge to use, because the deployment is the same as traditional deployments.

### 0.3.0

The common chart and its templates have been removed. Making this the main chart for other Frank!Framework-based charts.

`.Values.frank` has been changed to `.Values.application`.

The `.Values.connections.jdbc` and `.Values.connections.jms` have been changed to `.Values.application.resources` and have a different structure. 
It generates a `resources.yml` for the Frank!Framework. This is to allow for more flexibility.

A new chart has been added, called `frank-console`. This is a web application that allows you to manage multiple instances of Frank!Framework from a single console. 
It is disabled by default, but can be enabled by setting `.Values.console.enabled` to `true`.

All probes have been added to the values, making it possible to configure then separately. This could be useful if you want to make use of the new health endpoints.

### 0.2.10

The name of the chart has been renamed (frankframework) to match the project, organisation and Docker image. 

### 0.2.8

The `.Values.frank.memory` notation has been changed. It is now possible to define a minimum and a maximum, and to set percentages.

### 0.2.7

The `.Values.frank.dtap.stage` and `.Values.frank.dtap.side` are now empty by default.

* `.Values.frank.dtap.stage` is now required and should be set to the right stage. Read more in the [Installation details](#dtap-stage)
* `.Values.frank.dtap.side` will default to the release namespace deployed in.

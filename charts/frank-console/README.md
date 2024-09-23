# 🔌Frank!Framework Console Chart

The Frank!Framework console is a web application that allows you to manage multiple instances of Frank!Framework from a single console.

## Usage

[Helm](https://helm.sh) must be installed to use the charts.  Please refer to
Helm's [documentation](https://helm.sh/docs) to get started.

Once Helm has been set up correctly, add the repo as follows:

```shell
helm repo add frankframework https://frankframework.github.io/charts
```

If you had already added this repo earlier, run `helm repo update` to retrieve
the latest versions of the packages.  You can then run `helm search repo
frankframework` to see the charts.

To install the frankframework chart:

```shell
helm install my-frank-console frankframework/frank-console
```

To uninstall the chart:

```shell
helm delete my-frank-console
```

## Parameters

### Common parameters

| Name               | Description                                                                     | Value |
| ------------------ | ------------------------------------------------------------------------------- | ----- |
| `nameOverride`     | String to partially override fullname template (will maintain the release name) | `""`  |
| `fullnameOverride` | String to fully override fullname template                                      | `""`  |

### frank-console image parameters

The image is pulled from nexus.frankframework.org by default. The images located there will be kept for as long as possible.
Here are the images available:
https://nexus.frankframework.org/#browse/browse:frankframework-docker:v2%2Ffrankframework%2Ftags/
If you want to use a specific nightly, you can use the images on docker.io:
https://hub.docker.com/r/frankframework/frankframework/tags

| Name                | Description                                              | Value                      |
| ------------------- | -------------------------------------------------------- | -------------------------- |
| `image.registry`    | frank-console image registry                             | `nexus.frankframework.org` |
| `image.repository`  | frank-console image repository                           | `frank-console`            |
| `image.tag`         | frank-console image tag (immutable tags are recommended) | `""`                       |
| `image.pullPolicy`  | frank-console image pull policy                          | `IfNotPresent`             |
| `image.pullSecrets` | frank-console image pull secrets                         | `[]`                       |

### Environment variables

The environment variables are used to configure the Frank!Framework.

Refer to the [Frank!Framework Manual](https://frank-manual.readthedocs.io/) for more information.

To fine tune memory refer to the [Oracle documentation](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html#BABDJJFI).

| Name                                                            | Description                                       | Value                       |
| --------------------------------------------------------------- | ------------------------------------------------- | --------------------------- |
| `environmentVariables`                                          | Set environment variables for the Frank!Framework | `undefined`                 |
| `environmentVariables.JAVA_OPTS`                                | Set the JAVA_OPTS for the Frank!Framework         | `-XX:MaxRAMPercentage=80.0` |
| `environmentVariables.application.security.http.authentication` | Set the authentication for the Frank!Framework    | `false`                     |

### Generate ConfigMaps and Secrets

To deploy the Frank!Framework Console, it can be needed to add some files to the container.

The Frank!Framework Console chart allows you to generate configmaps and secrets from values.

This is useful if you want to add local users to the Frank!Framework Console.

The following example will generate a resources.yaml file in the /opt/frank/secrets folder.

```yaml
generateSecret:
- name: frankframework-resources
mountPath: /opt/frank/resources/resources.yml
subPath: resources.yml
stringData:
resources.yml: |-
jdbc:
- name: frank2example
type: org.h2.jdbcx.JdbcDataSource
url: jdbc:h2:mem:frank2example;NON_KEYWORDS=VALUE;DB_CLOSE_ON_EXIT=FALSE;DB_CLOSE_DELAY=-1;TRACE_LEVEL_FILE=0;

| Name                            | Description                                                           | Value       |
| ------------------------------- | --------------------------------------------------------------------- | ----------- |
| `generateConfigMap`             | Generate configmaps from values                                       | `[]`        |
| `generateConfigMap.name`        | Name of the configmap                                                 | `undefined` |
| `generateConfigMap.optional`    | Mark the configmap as optional (default false)                        | `undefined` |
| `generateConfigMap.defaultMode` | Default mode of the configmap (default 0644)                          | `undefined` |
| `generateConfigMap.items`       | Items of the configmap                                                | `undefined` |
| `generateConfigMap.mountPath`   | Path where the configmap will be mounted (default /opt/frank/secrets) | `undefined` |
| `generateConfigMap.readOnly`    | ReadOnly of the configmap (default true)                              | `undefined` |
| `generateConfigMap.data`        | Data of the configmap                                                 | `undefined` |
| `generateSecret`                | Generate secrets from values                                          | `[]`        |
| `generateSecret.name`           | Name of the secret                                                    | `undefined` |
| `generateSecret.type`           | Type of the secret (default Opaque)                                   | `undefined` |
| `generateSecret.optional`       | Mark the secret as optional (default false)                           | `undefined` |
| `generateSecret.items`          | Items of the secret                                                   | `undefined` |
| `generateSecret.mountPath`      | Path where the secret will be mounted (default /opt/frank/secrets)    | `undefined` |
| `generateSecret.readOnly`       | ReadOnly of the secret (default true)                                 | `undefined` |
| `generateSecret.data`           | Data of the secret                                                    | `undefined` |
| `generateSecret.stringData`     | StringData of the secret                                              | `undefined` |

### Volumes

The Frank!Framework chart allows you to create and mount volumes to the Frank!Framework.
This is useful if you want to add local users or resources to the Frank!Framework.

| Name                | Description                                                                         | Value |
| ------------------- | ----------------------------------------------------------------------------------- | ----- |
| `extraVolumes`      | Optionally specify extra list of additional volumes for WordPress pods              | `[]`  |
| `extraVolumeMounts` | Optionally specify extra list of additional volumeMounts for WordPress container(s) | `[]`  |

### Sidecars

The Frank!Framework chart allows you to add additional sidecar containers to the Frank!Framework pod.
This is useful if you want to add additional tools to the Frank!Framework.

| Name             | Description                                                  | Value |
| ---------------- | ------------------------------------------------------------ | ----- |
| `sidecars`       | Add additional sidecar containers to the Frank!Framework pod | `[]`  |
| `initContainers` | Add additional init containers to the Frank!Framework pod    | `[]`  |

### frank-console deployment parameters

The startup probe will enable blue-green deployment, which are great for uptime during upgrades and such.
It (and the liveness probe) will check if the console is accessible, until a better health endpoint is available.
The readiness probe will check if all adapters are running using the server health endpoint

| Name                            | Description                                              | Value       |
| ------------------------------- | -------------------------------------------------------- | ----------- |
| `replicaCount`                  | Number of frank-console replicas to deploy               | `1`         |
| `startupProbe`                  | Configure the startup probe                              | `{}`        |
| `livenessProbe`                 | Configure the liveness probe                             | `{}`        |
| `readinessProbe`                | Configure the readiness probe                            | `{}`        |
| `resources`                     | Set the resources for the frank-console containers       | `{}`        |
| `resources.limits`              | The resources limits for the frank-console containers    | `undefined` |
| `resources.requests.memory`     | The requested memory for the frank-console containers    | `undefined` |
| `resources.requests.cpu`        | The requested cpu for the frank-console containers       | `undefined` |
| `terminationGracePeriodSeconds` | Number of seconds after which pods are forcefully killed | `60`        |
| `terminationGracePeriodSeconds` | Note: Lower values may cause running adapters to fail    |             |
| `nodeSelector`                  | Node labels for pod assignment                           | `{}`        |
| `tolerations`                   | Set tolerations for pod assignment                       | `[]`        |
| `affinity`                      | Set affinity for pod assignment                          | `{}`        |
| `timeZone`                      | used for database connection and log timestamps          | `Etc/UTC`   |

### Traffic Exposure Parameters

| Name                           | Description                                                                                                                      | Value       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `service.type`                 | frank-console service type                                                                                                       | `ClusterIP` |
| `service.port`                 | frank-console service port                                                                                                       | `80`        |
| `service.annotations`          | Additional annotations for the frank-console service                                                                             | `{}`        |
| `ingress.enabled`              | Enable ingress record generation for Frank!                                                                                      | `false`     |
| `ingress.className`            | IngressClass that will be used to implement the Ingress (Kubernetes 1.18+)                                                       | `""`        |
| `ingress.annotations`          | Additional annotations for the Ingress resource. To enable certificate autogeneration, place here your cert-manager annotations. | `{}`        |
| `ingress.hosts`                | Set hosts for ingress                                                                                                            | `{}`        |
| `ingress.hosts.host`           | Set hostname                                                                                                                     | `undefined` |
| `ingress.hosts.paths`          | Set multiple paths                                                                                                               | `undefined` |
| `ingress.hosts.paths.path`     | Set path (context url)                                                                                                           | `undefined` |
| `ingress.hosts.paths.pathType` | Set type of path                                                                                                                 | `undefined` |
| `ingress.tls`                  | Define tls secrets for hosts                                                                                                     | `{}`        |

### Other Parameters

| Name                         | Description                                             | Value  |
| ---------------------------- | ------------------------------------------------------- | ------ |
| `serviceAccount.create`      | Enable creation of ServiceAccount for frank-console pod | `true` |
| `serviceAccount.annotations` | Additional custom annotations for the ServiceAccount    | `{}`   |
| `serviceAccount.name`        | The name of the ServiceAccount to use.                  | `""`   |
| `podAnnotations`             | Annotations for frank-console pods                      | `{}`   |
| `podLabels`                  | Extra labels for frank-console pods                     | `{}`   |
| `podSecurityContext`         | Set frank-console pod's Security Context                | `{}`   |
| `securityContext`            | Set frank-console container's Security Context          | `{}`   |

## Configuration and installation details

### DTAP Stage

The Frank!Framework will start with different settings enabled, depending on what DTAP stage is configured. 

For more information about DTAP stages read: https://frank-manual.readthedocs.io/en/latest/deploying/dtapAndProperties.html

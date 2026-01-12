# 🔌Frank!Framework Console Chart

The Frank!Framework Console is a web application that allows you to manage multiple instances of Frank!Framework from a single console.

## Usage

[Helm](https://helm.sh) must be installed to use the charts. Please refer toHelm's [documentation](https://helm.sh/docs) to get started.

Once Helm has been set up correctly, add the repo as follows:

```shell
helm repo add frankframework https://frankframework.github.io/charts
```

If you had already added this repo earlier, run `helm repo update` to retrieve the latest versions of the packages. 
You can then run `helm search repo frankframework` to see the charts.

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

Common parameters for the Frank!Framework Console chart.

Can be used to override the default name for the chart.


| Name               | Description                                                                     | Value |
| ------------------ | ------------------------------------------------------------------------------- | ----- |
| `nameOverride`     | String to partially override fullname template (will maintain the release name) | `""`  |
| `fullnameOverride` | String to fully override fullname template                                      | `""`  |

### Frank!Framework Console image parameters

The image is pulled from nexus.frankframework.org by default. The images located there will be kept for as long as possible.

Here are the images available:
https://nexus.frankframework.org/#browse/browse:frankframework-docker:v2%2Ffrankframework%2Ftags/

If you want to use a specific nightly, you can use the images on docker.io:
https://hub.docker.com/r/frankframework/frankframework/tags

| Name                | Description                                                                                                                        | Value                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `image.registry`    | Frank!Framework Console image registry                                                                                             | `nexus.frankframework.org` |
| `image.repository`  | Frank!Framework Console image repository                                                                                           | `frank-console`            |
| `image.tag`         | Frank!Framework Console image tag (immutable tags are recommended) update this tag manually to upgrade the Frank!Framework version | `""`                       |
| `image.pullPolicy`  | Frank!Framework Console image pull policy                                                                                          | `IfNotPresent`             |
| `image.pullPolicy`  | Specify a imagePullPolicy                                                                                                          |                            |
| `image.pullPolicy`  | Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'                                                          |                            |
| `image.pullPolicy`  | ref: https://kubernetes.io/docs/user-guide/images/#pre-pulling-images                                                              |                            |
| `image.pullSecrets` | Frank!Framework Console image pull secrets                                                                                         | `[]`                       |
| `image.pullSecrets` | Optionally specify an array of imagePullSecrets.                                                                                   |                            |
| `image.pullSecrets` | Secrets must be manually created in the namespace.                                                                                 |                            |
| `image.pullSecrets` | ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/                                         |                            |
| `image.pullSecrets` | Example is shown in the `values.yaml` file                                                                                         |                            |

### Environment variables

The environment variables are used to configure the Frank!Framework.

It is possible to add environment variables with the `.Values.environmentVariables` parameter and to add environment variables from a configmap or secret with the `.Values.envFrom` parameter.

In the case you are testing this Chart, you'd probably want to disable the authentication for the console and the testtool (Ladybug).
To do so, you can set the following environment variables:
```yaml
environmentVariables:
  application.security.console.authentication.type: NONE
  application.security.testtool.authentication.type: NONE
```

To fine tune memory refer to the [Oracle documentation](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html#BABDJJFI).

Refer to the [Frank!Framework Manual](https://frank-manual.readthedocs.io/) for more information.

| Name                                          | Description                                                                                           | Value                       |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------- |
| `environmentVariables`                        | Set environment variables for the Frank!Framework                                                     | `{}`                        |
| `environmentVariables.JAVA_OPTS`              | Set the JAVA_OPTS for the Frank!Framework                                                             | `-XX:MaxRAMPercentage=80.0` |
| `environmentVariables.spring_profiles_active` | Set the active Spring profiles for the Frank!Framework (default enables the ladybug-database profile) | `ladybug-database`          |
| `envFrom`                                     | Set environment variables from configmaps or secrets                                                  | `[]`                        |
| `envFrom`                                     | Example is shown in the `values.yaml` file                                                            |                             |

### Generate ConfigMaps and Secrets

To deploy the Frank!Framework Console, it can be needed to add some files to the container.

The Frank!Framework Console chart allows you to generate configmaps and secrets from values.
This is useful if you want to add local users or other authentication to the Frank!Framework Console.

Be sure to set a subPath and a mountPath if you want to avoid conflicts and use multiple secrets.
With one secret, the subPath and mountPath are not needed. And it would be possible to implement items

| Name                           | Description                                                           | Value |
| ------------------------------ | --------------------------------------------------------------------- | ----- |
| `generateConfigMap`            | Generate configmaps from values                                       | `{}`  |
| `generateConfigMap`            | Example is shown in the `values.yaml` file                            |       |
| `generateConfigMap/name`       | Name of the configmap                                                 | `nil` |
| `generateConfigMap/items`      | Items of the configmap                                                | `nil` |
| `generateConfigMap/items/key`  | Key of the configmap                                                  | `nil` |
| `generateConfigMap/items/path` | Path of the configmap                                                 | `nil` |
| `generateConfigMap/mountPath`  | Path where the configmap will be mounted (default /opt/frank/secrets) | `nil` |
| `generateConfigMap/data`       | Data of the configmap                                                 | `nil` |
| `generateSecret`               | Generate secrets from values                                          | `{}`  |
| `generateSecret`               | Example is shown in the `values.yaml` file                            |       |
| `generateSecret/name`          | Name of the secret                                                    | `nil` |
| `generateSecret/type`          | Type of the secret (default Opaque)                                   | `nil` |
| `generateSecret/items`         | Items of the secret                                                   | `nil` |
| `generateSecret/items/key`     | Key of the secret                                                     | `nil` |
| `generateSecret/items/path`    | Path of the secret                                                    | `nil` |
| `generateSecret/mountPath`     | Path where the secret will be mounted (default /opt/frank/secrets)    | `nil` |
| `generateSecret/data`          | Data of the secret                                                    | `nil` |
| `generateSecret/stringData`    | StringData of the secret                                              | `nil` |

### Volumes

The Frank!Framework chart allows you to create and mount volumes to the Frank!Framework.
This is useful if you want to add existing local users or authentication to the Frank!Framework.

| Name                | Description                                                                         | Value |
| ------------------- | ----------------------------------------------------------------------------------- | ----- |
| `extraVolumes`      | Optionally specify extra list of additional volumes for WordPress pods              | `[]`  |
| `extraVolumeMounts` | Optionally specify extra list of additional volumeMounts for WordPress container(s) | `[]`  |

### Sidecars

The Frank!Framework chart allows you to add additional sidecar containers to the Frank!Framework pod.
This is useful if you want to add additional tools to the Frank!Framework.

| Name             | Description                                                              | Value |
| ---------------- | ------------------------------------------------------------------------ | ----- |
| `sidecars`       | Add additional sidecar containers to the Frank!Framework pod             | `[]`  |
| `sidecars`       | Example is shown in the `values.yaml` file                               |       |
| `initContainers` | Add additional init containers to the Frank!Framework pod                | `[]`  |
| `initContainers` | ref: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/ |       |
| `initContainers` | Example is shown in the `values.yaml` file                               |       |

### Ladybug Database

The Ladybug Database is a PostgreSQL dependency that is used to store Ladybug reports and is not needed when the Ladybug is disabled.

Note that this dependency is not used for the Frank!Framework itself, that datasource should be configured with the `resources.yaml` file.

The dependency is enabled by default, but can be disabled if you want to use an external database for Ladybug.

To configure the PostgreSQL Helm chart, please refer to the documentation:
https://github.com/bitnami/charts/tree/main/bitnami/postgresql

Some of the parameters are pre-configured for an easy installation, but can be changed if needed.

| Name                                  | Description        | Value |
| ------------------------------------- | ------------------ | ----- |
| `ladybugDatabase.auth.existingSecret` | Name of the secret | `""`  |

### Frank!Framework Console deployment parameters

The startup probe will enable blue-green deployment, which are great for uptime during upgrades and such.
It (and the liveness probe) will check if the console is accessible, until a better health endpoint is available.
The readiness probe will check if all adapters are running using the server health endpoint

| Name                                | Description                                                                                                                 | Value     |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------- |
| `replicaCount`                      | Number of Frank!Framework Console replicas to deploy                                                                        | `1`       |
| `replicaCount`                      | NOTE: ReadWriteMany PVC(s) are required if replicaCount > 1                                                                 |           |
| `startupProbe`                      | Configure the startup probe                                                                                                 |           |
| `startupProbe`                      | ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes |           |
| `startupProbe.initialDelaySeconds`  | Initial delay seconds for startupProbe                                                                                      | `10`      |
| `startupProbe.periodSeconds`        | Period seconds for startupProbe                                                                                             | `10`      |
| `startupProbe.timeoutSeconds`       | Timeout seconds for startupProbe                                                                                            | `1`       |
| `startupProbe.failureThreshold`     | Failure threshold for startupProbe                                                                                          | `42`      |
| `startupProbe.successThreshold`     | Success threshold for startupProbe                                                                                          | `1`       |
| `startupProbe.httpGet.path`         | Path for startupProbe                                                                                                       | `/`       |
| `startupProbe.httpGet.port`         | Port for startupProbe                                                                                                       | `8080`    |
| `livenessProbe`                     | Configure the liveness probe                                                                                                |           |
| `livenessProbe`                     | ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes |           |
| `livenessProbe.initialDelaySeconds` | Initial delay seconds for livenessProbe                                                                                     | `0`       |
| `livenessProbe.periodSeconds`       | Period seconds for livenessProbe                                                                                            | `10`      |
| `livenessProbe.timeoutSeconds`      | Timeout seconds for livenessProbe                                                                                           | `1`       |
| `livenessProbe.failureThreshold`    | Failure threshold for livenessProbe                                                                                         | `12`      |
| `livenessProbe.successThreshold`    | Success threshold for livenessProbe                                                                                         | `1`       |
| `livenessProbe.httpGet.path`        | Path for livenessProbe                                                                                                      | `/`       |
| `livenessProbe.httpGet.port`        | Port for livenessProbe                                                                                                      | `8080`    |
| `readinessProbe`                    | Configure the readiness probe                                                                                               | `{}`      |
| `readinessProbe`                    | ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes |           |
| `resources`                         | Set the resources for the Frank!Framework Console containers                                                                | `{}`      |
| `resources`                         | ref: https://kubernetes.io/docs/user-guide/compute-resources/                                                               |           |
| `resources`                         | Example is shown in the `values.yaml` file                                                                                  |           |
| `terminationGracePeriodSeconds`     | Number of seconds after which pods are forcefully killed                                                                    | `60`      |
| `terminationGracePeriodSeconds`     | Note: Lower values may cause running adapters to fail                                                                       |           |
| `nodeSelector`                      | Node labels for pod assignment                                                                                              | `{}`      |
| `nodeSelector`                      | ref: https://kubernetes.io/docs/user-guide/node-selection/                                                                  |           |
| `tolerations`                       | Set tolerations for pod assignment                                                                                          | `[]`      |
| `tolerations`                       | ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/                                                |           |
| `affinity`                          | Set affinity for pod assignment                                                                                             | `{}`      |
| `affinity`                          | Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity                          |           |
| `affinity`                          | NOTE: podAffinityPreset, podAntiAffinityPreset, and nodeAffinityPreset will be ignored when it's set                        |           |
| `timeZone`                          | used for database connection and log timestamps                                                                             | `Etc/UTC` |

### Traffic Exposure Parameters

| Name                           | Description                                                                                                                        | Value       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `service.type`                 | Frank!Framework Console service type                                                                                               | `ClusterIP` |
| `service.port`                 | Frank!Framework Console service port                                                                                               | `80`        |
| `service.annotations`          | Additional annotations for the Frank!Framework Console service                                                                     | `{}`        |
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
| `ingress.hosts/host`           | Set hostname                                                                                                                       | `nil`       |
| `ingress.hosts/paths`          | Set multiple paths                                                                                                                 | `nil`       |
| `ingress.hosts/paths/path`     | Set path (context url)                                                                                                             | `nil`       |
| `ingress.hosts/paths/pathType` | Set type of path                                                                                                                   | `nil`       |
| `ingress.tls`                  | Define tls secrets for hosts                                                                                                       | `{}`        |
| `ingress.tls`                  | Example is shown in the `values.yaml` file                                                                                         |             |

### Other Parameters

| Name                         | Description                                                                                                              | Value  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------ |
| `serviceAccount`             | ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/                                 |        |
| `serviceAccount.create`      | Enable creation of ServiceAccount for Frank!Framework Console pod                                                        | `true` |
| `serviceAccount.annotations` | Additional custom annotations for the ServiceAccount                                                                     | `{}`   |
| `serviceAccount.name`        | The name of the ServiceAccount to use.                                                                                   | `""`   |
| `podAnnotations`             | Annotations for Frank!Framework Console pods.                                                                            | `{}`   |
| `podAnnotations`             | ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/                                      |        |
| `podLabels`                  | Extra labels for Frank!Framework Console pods.                                                                           | `{}`   |
| `podLabels`                  | ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/                                           |        |
| `podSecurityContext`         | Set Frank!Framework Console pod's Security Context.                                                                      | `{}`   |
| `podSecurityContext`         | ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod       |        |
| `securityContext`            | Set Frank!Framework Console container's Security Context.                                                                | `{}`   |
| `securityContext`            | ref: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-container |        |
| `securityContext`            | Example is shown in the `values.yaml` file                                                                               |        |

## Configuration and installation details

For now, the Frank!Framework Console is not configurable. It only works if used as a sub-chart in the Frank!Framework chart.
It is planned to make it configurable in the future. And you could create and mount your worn hazelcast-network-config.xml file.

## Notable changes

### 0.7.0

Changed the default database for Ladybug to PostgreSQL. This changes the auth a bit. Make sure it is configured correctly.

Updated the Frank!Framework version to `10.0.0-SNAPSHOT`.
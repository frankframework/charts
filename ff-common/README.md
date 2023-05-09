# 🔌Frank!Framework Common Library Chart

This [Helm Library Chart](https://helm.sh/docs/topics/library_charts/) is designed to make it easy create your own [Frank!Framework](https://frankframework.org) Chart.
A lot of the common configuration work has been done already, making it quicker to develop. 
It also has the added benefit that additions can easily be distributed across all FF! Charts. 

## Usage

### Getting Started

The best way to start is to copy the template chart. This contains a copy of the values.yaml and implements all needed manifests.
It is recommended to implement as much manifests as possible, some can be disabled and enabled in the values.yaml instead. 
This opens up the possibility for the user to use the manifest if they desire to.

### Extending the Chart

One of the main reasons this is a library and not a sub-chart is because it enables extendability. 
Whereas the sub-chart can only be used "as is", the library can be modified in your own chart.

## Parameters

### Common


### Common parameters

| Name               | Description                                                                                  | Value |
| ------------------ | -------------------------------------------------------------------------------------------- | ----- |
| `nameOverride`     | String to partially override common.names.fullname template (will maintain the release name) | `""`  |
| `fullnameOverride` | String to fully override common.names.fullname template                                      | `""`  |

### Frank!Framework image parameters

| Name                | Description                                                | Value                      |
| ------------------- | ---------------------------------------------------------- | -------------------------- |
| `image.registry`    | Frank!Framework image registry                             | `nexus.frankframework.org` |
| `image.repository`  | Frank!Framework image repository                           | `frank-framework`          |
| `image.tag`         | Frank!Framework image tag (immutable tags are recommended) | `7.8`                      |
| `image.pullPolicy`  | Frank!Framework image pull policy                          | `IfNotPresent`             |
| `image.pullSecrets` | Frank!Framework image pull secrets                         | `[]`                       |

### Frank! Configuration parameters


### Frank!Framework Connection parameters


### Frank!Framework deployment parameters

| Name                                | Description                                             | Value     |
| ----------------------------------- | ------------------------------------------------------- | --------- |
| `replicaCount`                      | Number of Frank!Framework replicas to deploy            | `1`       |
| `livenessProbe.enabled`             | Enable livenessProbe on Frank!Framework containers      | `true`    |
| `livenessProbe.initialDelaySeconds` | Initial delay seconds for livenessProbe                 | `40`      |
| `livenessProbe.periodSeconds`       | Period seconds for livenessProbe                        | `10`      |
| `livenessProbe.timeoutSeconds`      | Timeout seconds for livenessProbe                       | `1`       |
| `livenessProbe.failureThreshold`    | Failure threshold for livenessProbe                     | `6`       |
| `livenessProbe.successThreshold`    | Success threshold for livenessProbe                     | `1`       |
| `resources`                         | Set the resources for the Frank!Framework containers    | `{}`      |
| `resources.limits`                  | The resources limits for the Frank!Framework containers | `""`      |
| `resources.requests.memory`         | The requested memory for the Frank!Framework containers | `""`      |
| `resources.requests.cpu`            | The requested cpu for the Frank!Framework containers    | `""`      |
| `nodeSelector`                      | Node labels for pod assignment                          | `{}`      |
| `tolerations`                       | Tolerations for pod assignment                          | `[]`      |
| `affinity`                          | Affinity for pod assignment                             | `{}`      |
| `timeZone`                          | used for database connection and log timestamps         | `Etc/UTC` |

### Traffic Exposure Parameters

| Name                           | Description                                                                                                                      | Value       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `service.type`                 | Frank!Framework service type                                                                                                     | `ClusterIP` |
| `service.port`                 | Frank!Framework service port                                                                                                     | `80`        |
| `ingress.enabled`              | Enable ingress record generation for Frank!                                                                                      | `false`     |
| `ingress.className`            | IngressClass that will be used to implement the Ingress (Kubernetes 1.18+)                                                       | `""`        |
| `ingress.annotations`          | Additional annotations for the Ingress resource. To enable certificate autogeneration, place here your cert-manager annotations. | `{}`        |
| `ingress.hosts`                | Set hosts for ingress                                                                                                            | `[]`        |
| `ingress.hosts.host`           | Set hostname                                                                                                                     | `""`        |
| `ingress.hosts.paths`          | Set multiple paths                                                                                                               | `[]`        |
| `ingress.hosts.paths.path`     | Set path (context url)                                                                                                           | `""`        |
| `ingress.hosts.paths.pathType` | Set type of path                                                                                                                 | `""`        |
| `ingress.tls`                  | Define tls secrets for hosts (implementation not done yet)                                                                       | `[]`        |

### Other Parameters

| Name                                       | Description                                                      | Value  |
| ------------------------------------------ | ---------------------------------------------------------------- | ------ |
| `serviceAccount.create`                    | Enable creation of ServiceAccount for Frank!Framework pod        | `true` |
| `serviceAccount.annotations`               | Additional custom annotations for the ServiceAccount             | `{}`   |
| `serviceAccount.name`                      | The name of the ServiceAccount to use.                           | `""`   |
| `podAnnotations`                           | Annotations for Frank!Framework pods                             | `{}`   |
| `podLabels`                                | Extra labels for Frank!Framework pods                            | `{}`   |
| `podSecurityContext`                       |                                                                  | `{}`   |
| `podSecurityContext.fsGroup`               | Set Frank!Framework pod's Security Context fsGroup               | `""`   |
| `podSecurityContext.seccompProfile.type`   | Set Frank!Framework container's Security Context seccomp profile | `""`   |
| `securityContext`                          | Set Frank!Framework container's Security Context                 | `{}`   |
| `securityContext.runAsUser`                | Set Frank!Framework container's Security Context runAsUser       | `""`   |
| `securityContext.runAsNonRoot`             | Set Frank!Framework container's Security Context runAsNonRoot    | `""`   |
| `securityContext.allowPrivilegeEscalation` | Set Frank!Framework container's privilege escalation             | `""`   |
| `securityContext.capabilities.drop`        | Set Frank!Framework container's Security Context runAsNonRoot    | `""`   |





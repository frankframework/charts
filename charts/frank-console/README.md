# 🔌Frank!Framework Chart

This Helm Chart can be used for running the Frank!Framework on Kubernetes.

The image should be replaced to include a configuration.

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
helm install my-frankframework frankframework/frankframework
```

To uninstall the chart:

```shell
helm delete my-frankframework
```

## Parameters

### Common parameters

| Name               | Description                                                                     | Value |
| ------------------ | ------------------------------------------------------------------------------- | ----- |
| `nameOverride`     | String to partially override fullname template (will maintain the release name) | `""`  |
| `fullnameOverride` | String to fully override fullname template                                      | `""`  |

### Frank!Framework image parameters

The image is pulled from nexus.frankframework.org by default. The images located there will be kept for as long as possible.
Here are the images available:
https://nexus.frankframework.org/#browse/browse:frankframework-docker:v2%2Ffrankframework%2Ftags/
If you want to use a specific nightly, you can use the images on docker.io:
https://hub.docker.com/r/frankframework/frankframework/tags

| Name                | Description                                                | Value                      |
| ------------------- | ---------------------------------------------------------- | -------------------------- |
| `image.registry`    | Frank!Framework image registry                             | `nexus.frankframework.org` |
| `image.repository`  | Frank!Framework image repository                           | `frank-console`            |
| `image.tag`         | Frank!Framework image tag (immutable tags are recommended) | `""`                       |
| `image.pullPolicy`  | Frank!Framework image pull policy                          | `IfNotPresent`             |
| `image.pullSecrets` | Frank!Framework image pull secrets                         | `[]`                       |

### Frank!Framework application parameters

| Name                                                               | Description                                                                                                               | Value       |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `application.memory.percentage`                                    | Set if the values for the memory are in percentages                                                                       | `false`     |
| `application.memory.minimum`                                       | Sets the initial size of the heap that will be used by the Frank!Framework                                                | `1G`        |
| `application.memory.maximum`                                       | Sets the maximum size of the heap that will be used by the Frank!Framework                                                | `1G`        |
| `application.security.http.authentication`                         | Set http authentication for the Frank!                                                                                    | `false`     |
| `application.security.http.localUsers`                             | Set localUsers who can log in on the Frank!                                                                               | `[]`        |
| `application.security.http.localUsers`                             | Note: If kept empty no localUsers.yml will be generated, this can be used if the application already has a localUsers.yml |             |
| `application.security.http.localUsers.username`                    | Set the username of the user                                                                                              | `undefined` |
| `application.security.http.localUsers.password`                    | Set the password of the user                                                                                              | `undefined` |
| `application.security.http.localUsers.roles`                       | Set the roles of the user. Options: `IbisTester`, `IbisDataAdmin`, `IbisAdmin`, `IbisWebService`, `IbisObserver`          | `undefined` |
| `application.security.http.activeDirectory.enabled`                | Enable Active Directory for authentication                                                                                | `false`     |
| `application.security.http.activeDirectory.url`                    | Set url for Active Directory                                                                                              | `""`        |
| `application.security.http.activeDirectory.baseDn`                 | Set baseDn for Active Directory users                                                                                     | `""`        |
| `application.security.http.activeDirectory.roleMapping.tester`     | Map the role for Tester                                                                                                   | `""`        |
| `application.security.http.activeDirectory.roleMapping.dataAdmin`  | Map the role for DataAdmin                                                                                                | `""`        |
| `application.security.http.activeDirectory.roleMapping.admin`      | Map the role for Admin                                                                                                    | `""`        |
| `application.security.http.activeDirectory.roleMapping.webService` | Map the role for WebService                                                                                               | `""`        |
| `application.security.http.activeDirectory.roleMapping.observer`   | Map the role for Observer                                                                                                 | `""`        |
| `application.javaOpts`                                             | Append custom options to the `JAVA_OPTS` environment variable for the Frank!                                              | `""`        |

### Frank!Framework deployment parameters

The startup probe will enable blue-green deployment, which are great for uptime during upgrades and such.
It (and the liveness probe) will check if the console is accessible, until a better health endpoint is available.
The readiness probe will check if all adapters are running using the server health endpoint

| Name                            | Description                                              | Value       |
| ------------------------------- | -------------------------------------------------------- | ----------- |
| `replicaCount`                  | Number of Frank!Framework replicas to deploy             | `1`         |
| `startupProbe`                  | Configure the startup probe                              | `{}`        |
| `livenessProbe`                 | Configure the liveness probe                             | `{}`        |
| `readinessProbe`                | Configure the readiness probe                            | `{}`        |
| `resources`                     | Set the resources for the Frank!Framework containers     | `{}`        |
| `resources.limits`              | The resources limits for the Frank!Framework containers  | `undefined` |
| `resources.requests.memory`     | The requested memory for the Frank!Framework containers  | `undefined` |
| `resources.requests.cpu`        | The requested cpu for the Frank!Framework containers     | `undefined` |
| `terminationGracePeriodSeconds` | Number of seconds after which pods are forcefully killed | `60`        |
| `terminationGracePeriodSeconds` | Note: Lower values may cause running adapters to fail    |             |
| `nodeSelector`                  | Node labels for pod assignment                           | `{}`        |
| `tolerations`                   | Set tolerations for pod assignment                       | `[]`        |
| `affinity`                      | Set affinity for pod assignment                          | `{}`        |
| `timeZone`                      | used for database connection and log timestamps          | `Etc/UTC`   |

### Traffic Exposure Parameters

| Name                           | Description                                                                                                                      | Value       |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `service.type`                 | Frank!Framework service type                                                                                                     | `ClusterIP` |
| `service.port`                 | Frank!Framework service port                                                                                                     | `80`        |
| `ingress.enabled`              | Enable ingress record generation for Frank!                                                                                      | `false`     |
| `ingress.className`            | IngressClass that will be used to implement the Ingress (Kubernetes 1.18+)                                                       | `""`        |
| `ingress.annotations`          | Additional annotations for the Ingress resource. To enable certificate autogeneration, place here your cert-manager annotations. | `{}`        |
| `ingress.hosts`                | Set hosts for ingress                                                                                                            | `{}`        |
| `ingress.hosts.host`           | Set hostname                                                                                                                     | `undefined` |
| `ingress.hosts.paths`          | Set multiple paths                                                                                                               | `undefined` |
| `ingress.hosts.paths.path`     | Set path (context url)                                                                                                           | `undefined` |
| `ingress.hosts.paths.pathType` | Set type of path                                                                                                                 | `undefined` |
| `ingress.tls`                  | Define tls secrets for hosts (implementation not done yet)                                                                       | `[]`        |

### Other Parameters

| Name                         | Description                                               | Value  |
| ---------------------------- | --------------------------------------------------------- | ------ |
| `serviceAccount.create`      | Enable creation of ServiceAccount for Frank!Framework pod | `true` |
| `serviceAccount.annotations` | Additional custom annotations for the ServiceAccount      | `{}`   |
| `serviceAccount.name`        | The name of the ServiceAccount to use.                    | `""`   |
| `podAnnotations`             | Annotations for Frank!Framework pods                      | `{}`   |
| `podLabels`                  | Extra labels for Frank!Framework pods                     | `{}`   |
| `podSecurityContext`         | Set Frank!Framework pod's Security Context                | `{}`   |
| `securityContext`            | Set Frank!Framework container's Security Context          | `{}`   |

## Configuration and installation details

### DTAP Stage

The Frank!Framework will start with different settings enabled, depending on what DTAP stage is configured. 

For more information about DTAP stages read: https://frank-manual.readthedocs.io/en/latest/deploying/dtapAndProperties.html

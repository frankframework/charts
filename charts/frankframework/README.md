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
| `image.repository`  | Frank!Framework image repository                           | `frankframework`           |
| `image.tag`         | Frank!Framework image tag (immutable tags are recommended) | `""`                       |
| `image.pullPolicy`  | Frank!Framework image pull policy                          | `IfNotPresent`             |
| `image.pullSecrets` | Frank!Framework image pull secrets                         | `[]`                       |

### Frank!Framework application parameters

| Name                                                               | Description                                                                                                               | Value       |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `application.memory.percentage`                                    | Set if the values for the memory are in percentages                                                                       | `false`     |
| `application.memory.minimum`                                       | Sets the initial size of the heap that will be used by the Frank!Framework                                                | `4G`        |
| `application.memory.maximum`                                       | Sets the maximum size of the heap that will be used by the Frank!Framework                                                | `4G`        |
| `application.dtap.stage`                                           | (Required) Set the `DTAP` stage. Options: `LOC`, `DEV`, `TST`, `ACC`, `PRD`                                               | `""`        |
| `application.dtap.side`                                            | Set the `DTAP` side of where the instance is running                                                                      | `""`        |
| `application.credentials.secret`                                   | Set the secret name of the existing secret                                                                                | `""`        |
| `application.credentials.key`                                      | Set the key inside the secret that contains the data (e.g. `credentials.properties`)                                      | `""`        |
| `application.instance.name`                                        | Set the name of the Frank! instance (default is the `fullname`)                                                           | `""`        |
| `application.configurations.names`                                 | Set the configurations to load. Leave empty to use the default                                                            | `[]`        |
| `application.resources`                                            | Set Yaml properties for configuring the connections for theFrank!Framework                                                | `{}`        |
| `application.resources`                                            | Note: If kept empty no resources.yml will be generated, this can be used if the application already has a resources.yml   |             |
| `application.resources`                                            | Note: Not all options will be documented here, please refer to the Frank!Framework documentation for more information.    |             |
| `application.security.certificateStores`                           | Define certificate (key/trust) stores to mount in the resources folder of the Frank!                                      | `[]`        |
| `application.security.certificateStores.secretName`                | Name of the secret where the certificate store is located in                                                              | `""`        |
| `application.security.certificateStores.key`                       | The key in the secret where the certificate store is located in                                                           | `""`        |
| `application.security.certificateStores.resourceUrl`               | The path to the certificate store in the Resource folder, the key will be used as default value                           | `undefined` |
| `application.security.http.authentication`                         | Set http authentication for the Frank!                                                                                    | `false`     |
| `application.security.http.localUsers`                             | Set localUsers who can log in on the Frank!                                                                               | `[]`        |
| `application.security.http.localUsers`                             | Note: If kept empty no localUsers.yml will be generated, this can be used if the application already has a localUsers.yml |             |
| `application.security.http.localUsers.username`                    | Set the username of the user                                                                                              | `""`        |
| `application.security.http.localUsers.password`                    | Set the password of the user                                                                                              | `""`        |
| `application.security.http.localUsers.roles`                       | Set the roles of the user. Options: `IbisTester`, `IbisDataAdmin`, `IbisAdmin`, `IbisWebService`, `IbisObserver`          | `[]`        |
| `application.security.http.activeDirectory.enabled`                | Enable Active Directory for authentication                                                                                | `false`     |
| `application.security.http.activeDirectory.url`                    | Set url for Active Directory                                                                                              | `""`        |
| `application.security.http.activeDirectory.baseDn`                 | Set baseDn for Active Directory users                                                                                     | `""`        |
| `application.security.http.activeDirectory.roleMapping.tester`     | Map the role for Tester                                                                                                   | `""`        |
| `application.security.http.activeDirectory.roleMapping.dataAdmin`  | Map the role for DataAdmin                                                                                                | `""`        |
| `application.security.http.activeDirectory.roleMapping.admin`      | Map the role for Admin                                                                                                    | `""`        |
| `application.security.http.activeDirectory.roleMapping.webService` | Map the role for WebService                                                                                               | `""`        |
| `application.security.http.activeDirectory.roleMapping.observer`   | Map the role for Observer                                                                                                 | `""`        |
| `application.server.transactionManager`                            | Set the transaction manager for Tomcat. Options: `NARAYANA`, `BTM`, ``                                                    | `""`        |
| `application.properties`                                           | Set Yaml properties for configuring the Frank!Framework or configurations                                                 | `{}`        |
| `application.environmentVariables`                                 | Set extra environment variables for the Frank!                                                                            | `{}`        |
| `application.javaOpts`                                             | Append custom options to the `JAVA_OPTS` environment variable for the Frank!                                              | `""`        |

### Frank!Framework console parameters

The console is a web application that allows you to manage the Frank!Framework.
Each Frank!Framework instance contains a console, which can be accessed by going to the instance's URL and appending `/iaf/gui`.
Enabling this additional console will allow you to manage multiple instances of Frank!Framework from a single console.
It is disabled by default, but can be enabled by setting `console.enabled` to `true`.
Configuring the console is done by setting the `console.application` parameters. Which can be found in the frank-console chart.
ref: https://frankframework.github.io/charts/frank-console

| Name              | Description                        | Value   |
| ----------------- | ---------------------------------- | ------- |
| `console.enabled` | Enable the Frank!Framework console | `false` |

### Frank!Framework deployment parameters

The startup probe will enable blue-green deployment, which are great for uptime during upgrades and such.
It (and the liveness probe) will check if the console is accessible, until a better health endpoint is available.
The readiness probe will check if all adapters are running using the server health endpoint

| Name                                 | Description                                              | Value                    |
| ------------------------------------ | -------------------------------------------------------- | ------------------------ |
| `replicaCount`                       | Number of Frank!Framework replicas to deploy             | `1`                      |
| `startupProbe.initialDelaySeconds`   | Initial delay seconds for startupProbe                   | `40`                     |
| `startupProbe.periodSeconds`         | Period seconds for startupProbe                          | `10`                     |
| `startupProbe.timeoutSeconds`        | Timeout seconds for startupProbe                         | `1`                      |
| `startupProbe.failureThreshold`      | Failure threshold for startupProbe                       | `12`                     |
| `startupProbe.successThreshold`      | Success threshold for startupProbe                       | `1`                      |
| `startupProbe.httpGet.path`          | Path for startupProbe                                    | `/iaf/api/server/health` |
| `startupProbe.httpGet.port`          | Port for startupProbe                                    | `8080`                   |
| `livenessProbe.initialDelaySeconds`  | Initial delay seconds for livenessProbe                  | `0`                      |
| `livenessProbe.periodSeconds`        | Period seconds for livenessProbe                         | `10`                     |
| `livenessProbe.timeoutSeconds`       | Timeout seconds for livenessProbe                        | `1`                      |
| `livenessProbe.failureThreshold`     | Failure threshold for livenessProbe                      | `12`                     |
| `livenessProbe.successThreshold`     | Success threshold for livenessProbe                      | `1`                      |
| `livenessProbe.httpGet.path`         | Path for livenessProbe                                   | `/iaf/api/server/health` |
| `livenessProbe.httpGet.port`         | Port for livenessProbe                                   | `8080`                   |
| `readinessProbe.initialDelaySeconds` | Initial delay seconds for readinessProbe                 | `0`                      |
| `readinessProbe.periodSeconds`       | Period seconds for readinessProbe                        | `5`                      |
| `readinessProbe.timeoutSeconds`      | Timeout seconds for readinessProbe                       | `1`                      |
| `readinessProbe.failureThreshold`    | Failure threshold for readinessProbe                     | `3`                      |
| `readinessProbe.successThreshold`    | Success threshold for readinessProbe                     | `1`                      |
| `readinessProbe.httpGet.path`        | Path for readinessProbe                                  | `/iaf/api/server/health` |
| `readinessProbe.httpGet.port`        | Port for readinessProbe                                  | `8080`                   |
| `resources`                          | Set the resources for the Frank!Framework containers     | `{}`                     |
| `resources.limits`                   | The resources limits for the Frank!Framework containers  | `""`                     |
| `resources.requests.memory`          | The requested memory for the Frank!Framework containers  | `""`                     |
| `resources.requests.cpu`             | The requested cpu for the Frank!Framework containers     | `""`                     |
| `terminationGracePeriodSeconds`      | Number of seconds after which pods are forcefully killed | `60`                     |
| `terminationGracePeriodSeconds`      | Note: Lower values may cause running adapters to fail    |                          |
| `nodeSelector`                       | Node labels for pod assignment                           | `{}`                     |
| `tolerations`                        | Set tolerations for pod assignment                       | `[]`                     |
| `affinity`                           | Set affinity for pod assignment                          | `{}`                     |
| `timeZone`                           | used for database connection and log timestamps          | `Etc/UTC`                |

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

| Name                         | Description                                               | Value  |
| ---------------------------- | --------------------------------------------------------- | ------ |
| `serviceAccount.create`      | Enable creation of ServiceAccount for Frank!Framework pod | `true` |
| `serviceAccount.annotations` | Additional custom annotations for the ServiceAccount      | `{}`   |
| `serviceAccount.name`        | The name of the ServiceAccount to use.                    | `""`   |
| `podAnnotations`             | Annotations for Frank!Framework pods                      | `{}`   |
| `podLabels`                  | Extra labels for Frank!Framework pods                     | `{}`   |
| `podSecurityContext`         | Set Frank!Framework pod's Security Context                | `{}`   |
| `securityContext`            | Set Frank!Framework container's Security Context          | `{}`   |

### Persistence

Persistence is used for keeping heap dumps. They can be found at `/heap-dumps` with persistence enabled.
Otherwise, they can be found at `/usr/local/tomcat/logs`

| Name                        | Description                                                                        | Value   |
| --------------------------- | ---------------------------------------------------------------------------------- | ------- |
| `persistence.enabled`       | Enable persistence using Persistent Volume Claims                                  | `false` |
| `persistence.storageClass`  | Persistent Volume storage class                                                    | `""`    |
| `persistence.accessModes`   | Persistent Volume access modes                                                     | `[]`    |
| `persistence.size`          | Persistent Volume size                                                             | `5Gi`   |
| `persistence.dataSource`    | Custom PVC data source                                                             | `{}`    |
| `persistence.existingClaim` | The name of an existing PVC to use for persistence                                 | `""`    |
| `persistence.selector`      | Selector to match an existing Persistent Volume for the Frank!Framework's data PVC | `{}`    |
| `persistence.annotations`   | Persistent Volume Claim annotations                                                | `{}`    |

## Configuration and installation details

### DTAP Stage

The Frank!Framework will start with different settings enabled, depending on what DTAP stage is configured. 

For more information about DTAP stages read: https://frank-manual.readthedocs.io/en/latest/deploying/dtapAndProperties.html

## Notable changes

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

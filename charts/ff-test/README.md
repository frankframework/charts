# 🔌Frank2Example Chart

This Helm Chart contains the Frank!Framework with some example configurations.

The Frank! is preconfigured with H2, but can be used with any other supported database.

## Usage

[Helm](https://helm.sh) must be installed to use the charts.  Please refer to
Helm's [documentation](https://helm.sh/docs) to get started.

Once Helm has been set up correctly, add the repo as follows:

helm repo add ibissource https://ibissource.github.io/helm-charts

If you had already added this repo earlier, run `helm repo update` to retrieve
the latest versions of the packages.  You can then run `helm search repo
ibissource` to see the charts.

To install the ff-test chart:

    helm install my-ff-test ibissource/ff-test

To uninstall the chart:

    helm delete my-ff-test

## Parameters

### Common parameters

| Name               | Description                                                                                  | Value |
| ------------------ | -------------------------------------------------------------------------------------------- | ----- |
| `nameOverride`     | String to partially override common.names.fullname template (will maintain the release name) | `""`  |
| `fullnameOverride` | String to fully override common.names.fullname template                                      | `""`  |

### Frank!Framework image parameters

| Name                | Description                                                | Value                      |
| ------------------- | ---------------------------------------------------------- | -------------------------- |
| `image.registry`    | Frank!Framework image registry                             | `nexus.frankframework.org` |
| `image.repository`  | Frank!Framework image repository                           | `ff-test`                  |
| `image.tag`         | Frank!Framework image tag (immutable tags are recommended) | `""`                       |
| `image.pullPolicy`  | Frank!Framework image pull policy                          | `IfNotPresent`             |
| `image.pullSecrets` | Frank!Framework image pull secrets                         | `[]`                       |

### Frank! Configuration parameters

| Name                                                         | Description                                                                                                                                                      | Value     |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `frank.memory`                                               | Sets the initial and maximum size of the heap that will be used by the Frank!Framework                                                                           | `4G`      |
| `frank.dtap.stage`                                           | Set the `DTAP` stage. Options: `LOC`, `DEV`, `TST`, `ACC`, `PRD`                                                                                                 | `LOC`     |
| `frank.dtap.side`                                            | Set the `DTAP` side of where the instance is running                                                                                                             | `cluster` |
| `frank.credentials.secret`                                   | Set the secret name of the existing secret                                                                                                                       | `""`      |
| `frank.credentials.key`                                      | Set the key inside the secret that contains the data (e.g. `credentials.properties`)                                                                             | `""`      |
| `frank.instance.name`                                        | Set the name of the Frank! instance (default is the `fullname`)                                                                                                  | `""`      |
| `frank.configurations.names`                                 | Set the configurations to load. Leave empty to use the default                                                                                                   | `[]`      |
| `frank.security.http.authentication`                         | Set http authentication for the Frank!                                                                                                                           | `false`   |
| `frank.security.http.localUsers`                             | Set localUsers who can log in on the Frank!                                                                                                                      | `[]`      |
| `frank.security.http.localUsers.username`                    | Set the username of the user                                                                                                                                     | `""`      |
| `frank.security.http.localUsers.password`                    | Set the password of the user                                                                                                                                     | `""`      |
| `frank.security.http.localUsers.roles`                       | Set the roles of the user. Options: `IbisTester`, `IbisDataAdmin`, `IbisAdmin`, `IbisWebService`, `IbisObserver`                                                 | `[]`      |
| `frank.security.http.activeDirectory.enabled`                | Enable Active Directory for authentication                                                                                                                       | `false`   |
| `frank.security.http.activeDirectory.url`                    | Set url for Active Directory                                                                                                                                     | `""`      |
| `frank.security.http.activeDirectory.baseDn`                 | Set baseDn for Active Directory users                                                                                                                            | `""`      |
| `frank.security.http.activeDirectory.roleMapping.tester`     | Map the rol for Tester                                                                                                                                           | `""`      |
| `frank.security.http.activeDirectory.roleMapping.dataAdmin`  | Map the rol for DataAdmin                                                                                                                                        | `""`      |
| `frank.security.http.activeDirectory.roleMapping.admin`      | Map the rol for Admin                                                                                                                                            | `""`      |
| `frank.security.http.activeDirectory.roleMapping.webService` | Map the rol for WebService                                                                                                                                       | `""`      |
| `frank.security.http.activeDirectory.roleMapping.observer`   | Map the rol for Observer                                                                                                                                         | `""`      |
| `frank.server.transactionManager`                            | Set the transaction manager for Tomcat. Options: `NARAYANA`, `BTM`, ``                                                                                           | `""`      |
| `frank.environmentVariables`                                 | Set extra environment variables for the Frank!                                                                                                                   | `{}`      |
| `frank.environmentVariables.jdbc.dbms.default`               | The default jdbc that will be used. This should match with one of the jdbc's in the context.xml e.g. `postgres-xe`                                               | `""`      |
| `frank.environmentVariables.jms.provider.default`            | The default jms that will be used. This should match with one of the jms's in the context.xml e.g. `artemis`. `frank.server.transactionManager` needs to be set. | `""`      |

### Frank!Framework Connection parameters

| Name                        | Description                                                                                                                                                    | Value |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `connections.jdbc`          | Set one database connections. The connection should match one in the context.xml                                                                               | `{}`  |
| `connections.jdbc.host`     | Host of where the database can be reached (like in the same cluster e.g. `<service>.<namespace>.svc.cluster.local`). For H2 it can be `mem` or a file location | `""`  |
| `connections.jdbc.port`     | Port for the database (leave empty for default)                                                                                                                | `""`  |
| `connections.jdbc.database` | Name of the database to use (default is `.Values.instance.name`)                                                                                               | `""`  |
| `connections.jdbc.username` | Username to connect to the database (or use string template for use with credentials e.g. `${database/username}`)                                              | `""`  |
| `connections.jdbc.password` | Password to connect to the database (or use string template for use with credentials e.g. `${database/password}`)                                              | `""`  |
| `connections.jdbc.ssl`      | Set to `true` is the connection uses SSL, default is `false`                                                                                                   | `""`  |
| `connections.jms`           | Set one massage services. The connection should match one in the context.xml                                                                                   | `[]`  |
| `connections.jms.host`      | Host of where the MQ can be reached (like in the same cluster e.g. `<service>.<namespace>.svc.cluster.local`)                                                  | `""`  |
| `connections.jms.port`      | Port for the MQ (leave empty for default)                                                                                                                      | `""`  |
| `connections.jms.url`       | URL for Tibco                                                                                                                                                  | `""`  |

### Frank!Framework deployment parameters

| Name                                | Description                                             | Value     |
| ----------------------------------- | ------------------------------------------------------- | --------- |
| `replicaCount`                      | Number of Frank!Framework replicas to deploy            | `1`       |
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
| `tolerations`                       | Set tolerations for pod assignment                      | `[]`      |
| `affinity`                          | Set affinity for pod assignment                         | `{}`      |
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

| Name                         | Description                                               | Value  |
| ---------------------------- | --------------------------------------------------------- | ------ |
| `serviceAccount.create`      | Enable creation of ServiceAccount for Frank!Framework pod | `true` |
| `serviceAccount.annotations` | Additional custom annotations for the ServiceAccount      | `{}`   |
| `serviceAccount.name`        | The name of the ServiceAccount to use.                    | `""`   |
| `podAnnotations`             | Annotations for Frank!Framework pods                      | `{}`   |
| `podLabels`                  | Extra labels for Frank!Framework pods                     | `{}`   |
| `podSecurityContext`         | Set Frank!Framework pod's Security Context                | `{}`   |
| `securityContext`            | Set Frank!Framework container's Security Context          | `{}`   |

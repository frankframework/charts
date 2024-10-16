# 🔌Frank2Example Chart

This Helm Chart contains the Frank!Framework with some example configurations.

The Frank! is preconfigured with H2, but can be used with any other supported database.

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

To install the ff-test chart:

```shell
helm install my-ff-test frankframework/ff-test
```

To uninstall the chart:

```shell
helm delete my-ff-test
```

## Parameters

### Frank!Framework parameters

This chart is a wrapper for the Frank!Framework chart.
See the documentation for the Frank!Framework chart for more information.

| Name                                                | Description                                                                                                                 | Value                             |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `frankframework.image.registry`                     | frank2example image registry                                                                                                | `nexus.frankframework.org`        |
| `frankframework.image.repository`                   | frank2example image repository                                                                                              | `ff-test`                         |
| `frankframework.image.tag`                          | frank2example image tag (immutable tags are recommended)                                                                    | `9.0.0-SNAPSHOT-tomcat`           |
| `frankframework.image.pullPolicy`                   | frank2example image pull policy                                                                                             | `Always`                          |
| `frankframework.image.pullSecrets`                  | frank2example image pull secrets                                                                                            | `[]`                              |
| `frankframework.application.dtap.stage`             | DTAP stage can't be changed for this application.                                                                           | `LOC`                             |
| `frankframework.application.instance.name`          | Instance name can't be changed for this application.                                                                        | `Ibis4Test`                       |
| `frankframework.startupProbe`                       | Configure the startup probe                                                                                                 |                                   |
| `frankframework.startupProbe`                       | ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes |                                   |
| `frankframework.startupProbe.initialDelaySeconds`   | Initial delay seconds for startupProbe                                                                                      | `40`                              |
| `frankframework.startupProbe.periodSeconds`         | Period seconds for startupProbe                                                                                             | `10`                              |
| `frankframework.startupProbe.timeoutSeconds`        | Timeout seconds for startupProbe                                                                                            | `1`                               |
| `frankframework.startupProbe.failureThreshold`      | Failure threshold for startupProbe                                                                                          | `12`                              |
| `frankframework.startupProbe.successThreshold`      | Success threshold for startupProbe                                                                                          | `1`                               |
| `frankframework.startupProbe.httpGet.path`          | Path for startupProbe                                                                                                       | `/iaf-test/iaf/api/server/health` |
| `frankframework.startupProbe.httpGet.port`          | Port for startupProbe                                                                                                       | `8080`                            |
| `frankframework.livenessProbe`                      | Configure the liveness probe                                                                                                |                                   |
| `frankframework.livenessProbe`                      | ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes |                                   |
| `frankframework.livenessProbe.initialDelaySeconds`  | Initial delay seconds for livenessProbe                                                                                     | `0`                               |
| `frankframework.livenessProbe.periodSeconds`        | Period seconds for livenessProbe                                                                                            | `10`                              |
| `frankframework.livenessProbe.timeoutSeconds`       | Timeout seconds for livenessProbe                                                                                           | `1`                               |
| `frankframework.livenessProbe.failureThreshold`     | Failure threshold for livenessProbe                                                                                         | `12`                              |
| `frankframework.livenessProbe.successThreshold`     | Success threshold for livenessProbe                                                                                         | `1`                               |
| `frankframework.livenessProbe.httpGet.path`         | Path for livenessProbe                                                                                                      | `/iaf-test/iaf/api/server/health` |
| `frankframework.livenessProbe.httpGet.port`         | Port for livenessProbe                                                                                                      | `8080`                            |
| `frankframework.readinessProbe`                     | Configure the readiness probe                                                                                               |                                   |
| `frankframework.readinessProbe`                     | ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes |                                   |
| `frankframework.readinessProbe.initialDelaySeconds` | Initial delay seconds for readinessProbe                                                                                    | `0`                               |
| `frankframework.readinessProbe.periodSeconds`       | Period seconds for readinessProbe                                                                                           | `5`                               |
| `frankframework.readinessProbe.timeoutSeconds`      | Timeout seconds for readinessProbe                                                                                          | `1`                               |
| `frankframework.readinessProbe.failureThreshold`    | Failure threshold for readinessProbe                                                                                        | `3`                               |
| `frankframework.readinessProbe.successThreshold`    | Success threshold for readinessProbe                                                                                        | `1`                               |
| `frankframework.readinessProbe.httpGet.path`        | Path for readinessProbe                                                                                                     | `/iaf-test/iaf/api/server/health` |
| `frankframework.readinessProbe.httpGet.port`        | Port for readinessProbe                                                                                                     | `8080`                            |

## Configuration and installation details

### DTAP Stage

The Frank!Framework will start with different settings enabled, depending on what DTAP stage is configured. 

For more information about DTAP stages read: https://frank-manual.readthedocs.io/en/latest/deploying/dtapAndProperties.html

## Notable changes

### 0.2.26

The `.Values.frank.memory` notation has been changed. It is now possible to define a minimum and a maximum, and to set percentages.

### 0.2.25

The `.Values.frank.dtap.side` is now empty by default.

* `.Values.frank.dtap.stage` is now required and should be set to the right stage. Read more in the [Installation details](#dtap-stage)
* `.Values.frank.dtap.side` will default to the release namespace deployed in.

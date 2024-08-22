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

To install the frank2example chart:

```shell
helm install my-frank2example frankframework/frank2example
```

To uninstall the chart:

```shell
helm delete my-frank2example
```

## Parameters

### Frank!Framework parameters

This chart is a wrapper for the Frank!Framework chart.
See the documentation for the Frank!Framework chart for more information.

| Name                                                    | Description                                                                                                             | Value                      |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `frankframework.image.registry`                         | frank2example image registry                                                                                            | `nexus.frankframework.org` |
| `frankframework.image.repository`                       | frank2example image repository                                                                                          | `frank2example`            |
| `frankframework.image.tag`                              | frank2example image tag (immutable tags are recommended)                                                                | `latest`                   |
| `frankframework.image.pullPolicy`                       | frank2example image pull policy                                                                                         | `IfNotPresent`             |
| `frankframework.image.pullSecrets`                      | frank2example image pull secrets                                                                                        | `[]`                       |
| `frankframework.application.dtap.stage`                 | Set the `DTAP` stage. Options: `LOC`, `DEV`, `TST`, `ACC`, `PRD`                                                        | `LOC`                      |
| `frankframework.application.resources`                  | Set Yaml properties for configuring the connections for theFrank!Framework                                              | `{}`                       |
| `frankframework.application.resources`                  | Note: If kept empty no resources.yml will be generated, this can be used if the application already has a resources.yml |                            |
| `frankframework.application.resources`                  | Note: Not all options will be documented here, please refer to the Frank!Framework documentation for more information.  |                            |
| `frankframework.replicaCount`                           | Number of Frank!Framework replicas to deploy                                                                            | `1`                        |
| `frankframework.securityContext.readOnlyRootFilesystem` | Set the security context for the Frank!Framework containers                                                             | `true`                     |

## Configuration and installation details

### DTAP Stage

The Frank!Framework will start with different settings enabled, depending on what DTAP stage is configured. 

For more information about DTAP stages read: https://frank-manual.readthedocs.io/en/latest/deploying/dtapAndProperties.html

## Notable changes

### 0.3.0

See the notable changes in the Frank!Framework chart.

### 0.2.8

The `.Values.frank.memory` notation has been changed. It is now possible to define a minimum and a maximum, and to set percentages.

### 0.2.7

The `.Values.frank.dtap.side` is now empty by default.

* `.Values.frank.dtap.stage` is now required and should be set to the right stage. Read more in the [Installation details](#dtap-stage)
* `.Values.frank.dtap.side` will default to the release namespace deployed in.

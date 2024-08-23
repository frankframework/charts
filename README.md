# The Frank!Framework Helm Charts

Popular applications, build on top of the [Frank!Framework](https://frankframework.org), ready to launch on Kubernetes using Helm.

## Available charts:

* [frankframework](/charts/2_frankframework/README.md)
* [frank2example](/charts/3_frank2example/README.md)
* [ff-test](/charts/ff-test/README.md)

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

To install a chart:

```shell
helm install <unique-name> frankframework/<chart>
```

To uninstall the chart:

```shell
helm delete <unique-name>
```

## Common library

The Franks! are based on the "ff-common" library chart. This is done to ensure each chart can be kept up to date easily. 

If you want to create a Frank! chart yourself, please refer to the [ff-common documentation](/charts/2_frankframework/README.md). There is also a [Frank! template](/ff-template/README.md) that can be copied as a starting point.
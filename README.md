# The Frank!Framework Helm Charts

The [Frank!Framework](https://frankframework.org) can be used to create standardized and scalable integrations.

![frank-framework-github-banner](banner.png)

## Available charts:

* [frankframework](/charts/frankframework/README.md)
* [frank-console](/charts/frank-console/README.md)
* [frank2example](/charts/frank2example/README.md)
* [ff-test](/charts/ff-test/README.md)

## Usage

[Helm](https://helm.sh) must be installed to use the charts. Please refer to Helm's [documentation](https://helm.sh/docs) to get started.

Once Helm has been set up correctly, add the repo as follows:

```shell
helm repo add frankframework https://frankframework.github.io/charts
```

## Common sub-charts

* [frankframework](/charts/frankframework/README.md)
* [frank-console](/charts/frank-console/README.md)

The charts above can be used as sub-charts for other charts, so other defaults can be provided and extra files can be added.
Take a look at the [Frank2Example chart](/charts/frank2example/README.md) for a simple example.
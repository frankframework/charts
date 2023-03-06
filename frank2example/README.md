# Frank2Example Chart


This is a demonstration Chart to show how easy it can be to install the Frank!Framework on Kubernetes. 

The `values.yaml` is prefilled with defaults for ease of use. 

An H2 database is included in the image (what we normally don't recommend), so no extra database configuration is needed. It's still possible to use any other supported database.

## Instructions

### Helm

Clone this repo and use the Helm CLI. 

#### Steps

1. Clone this repo

	`git clone https://github.com/ibissource/charts.git`

2. Navigate to the folder 

	`cd charts`

3. Create a namespace

	`kubectl create namespace frank2example`

4. Use the Helm CLI to install the Helm Chart

	`helm install frank2example frank2example -n frank2example`

5. Follow the instruction in the console to forward and visit the newly deployed Frank!

### CI/CD

Alternatively, a CI/CD tool like Argo CD or Flux can be used.

## Links and helpful resources

These links can teach you more about the Frank!Framework and how to use it on Kubernetes.

### Frank!Framework Chart

For the complete installation instructions and `values.yml`, visit the original [Frank!Framework Chart](https://github.com/ibissource/charts/tree/master/frank-framework)

### ZaakBrug Chart

The ZaakBrug is an app for Dutch municipalities that translates from zds to zgw. This project has its own Chart which is a great example of an Frank! wrapped in a Chart.

The Chart is visible at the [ZaakBrug GitHub](https://github.com/ibissource/zaakbrug)

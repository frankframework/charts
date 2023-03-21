# FF!Test (ibis4test) Chart


This is a test Chart to test the Frank!Framework on Kubernetes. 

## Instructions

### Values.yaml

The `values.yaml` needs to be changed to fit your needs. 

Some settings that can be changed are: 

	- `frank.properties.application.server.type.custom`: Do you want to use a transaction manager (and test jms)
	- `frank.configurations.names`: Which configurations do you want to use
	- `frank.properties.jdbc.dbms.default`: Type of database used
	- `frank.properties.jdbc.hostname`: Hostname of database
	- `frank.properties.jms.default.provider`: Type of MQ
	- `frank.properties.jms.destination.suffix`
	- `frank.properties.jms.hostname`: Hostname 

Becouse the ff-test image is specialized to run on the WeAreFrank! CI some values are preset. These values include the ports for the databases (we will eventually change this back), the name of the database and the database credentials. Also the context path to reach the Frank! is "iaf-test".

The default credentails are: 

```
username: testiaf_user
password: testiaf_user00
```

The name of the database is `testiaf`.

To make it possible to run all databases ans MQ's at the same time, some ports have changed. Make sure your service is running on the same port, or use another one.

These port are different from default:

	- MySql: 3307
	- Artemis: 61615

More information about the connections can be found in the [context.xml](https://github.com/ibissource/iaf/blob/master/test/src/main/webapp/META-INF/context.xml)

### Helm

Clone this repo and use the Helm CLI. 

#### Steps

1. Clone this repo

	`git clone https://github.com/ibissource/charts.git`

2. Navigate to the folder 

	`cd charts`

3. Configure the `values.yaml` 

4. Create a namespace

	`kubectl create namespace ff-test`

5. Use the Helm CLI to install the Helm Chart

	`helm install ff-test ff-test -n ff-test`

6. Follow the instruction in the console to forward and visit the newly deployed Frank!. The context path of the frank is "iaf-test".

### CI/CD

Alternatively, a CI/CD tool like Argo CD or Flux can be used.

## Troubleshooting

### Larva tests won't start

For some reason using a proxy, the larva tests won't start. If this is the case, use an ingress instead.

## Links and helpful resources

These links can teach you more about the Frank!Framework and how to use it on Kubernetes.

### Frank!Framework Chart

For the complete installation instructions and `values.yml`, visit the original [Frank!Framework Chart](https://github.com/ibissource/charts/tree/master/frank-framework)

### Frank2Example Chart

There is also an easy-to-install demo chart wich can be found here: [Frank2Example](https://github.com/ibissource/charts/tree/master/frank-framework)

### ZaakBrug Chart

The ZaakBrug is an app for Dutch municipalities that translates from zds to zgw. This project has its own Chart which is a great example of an Frank! wrapped in a Chart.

The Chart is visible at the [ZaakBrug GitHub](https://github.com/ibissource/zaakbrug)
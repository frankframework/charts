# Frank!Framework Chart

## Instructions

### Set required values

- frank
	- instance.name
	- dtap.stage

### Set database connection

- database
	- type
	- host
	- user
	- password

User and password can be set with parameters like so: 

```yaml
user: ${database/username}
password: ${database/password}
```

This will be interpolated at _startup_. 

A nice way to set the variables is with a credentials.properties. 

Create a secret with the properties you want to set, for example:

```properties
database/username=test
database/password=test
```

Now set the values: frank.credentials.secret (secret name) and frank.credentials.key (key inside secret)

## ToDo's

- [ ] Write instructions
	- [*] Required parameters
	- [*] Database
	- [ ] Configurations
- [ ] Implement login capabilities
	- [ ] ldap;
	- [ ] tomcat-users.
- [ ] Make it possible to use secrets (use credentials.properties as secret for now) for:
	- [*] databases;
	- [ ] ldap;
	- [ ] tomcat-users.
- [ ] Implement postgresql subchart
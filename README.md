# people-explorer-api

This api find people in text and return a people list with basic information and the list of similarities between this people.


## Architecture

**People extractor service**
This service consume textrazor API with a unofficial package https://github.com/wzbg/textrazor

**People data acces service**
This service call wikidata SPARQL Endpoint with axios

**Cache service**
This service use a Redis database to improve api cost and speed


## Local environement

**Requirement :** Docker

**Containers :** 
* people-explorer-api: the api with adonisJS on NodeJs
* redis: the redis server
* swagger-ui: the api user interface


Start by adding your textrazor API key in the ```.env.docker``` file :
```
TEXTRAZOR_API_KEY=YOUR_KEY_HERE
```

Start the local environement

```
docker-compose up
```

### Now you can :

* Open the api user interface: http://localhost/

* Open the people-explorer-api: http://localhost:3333/

* Health checks People-explorer-api: http://localhost:3333/healthz

* Enter in the people-explorer-api container and run test: 
```bash
# Open a new command line and run :
docker exec -it people-explorer-api bash

# And Run the people-explorer-api test
yarn test
```
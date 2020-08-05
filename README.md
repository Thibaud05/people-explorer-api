# people-explorer-api

This api find people in text and return a people list with basic information and the list of similarities between this people.


## Architecture

**People extractor service**
This service consume [textrazor](https://www.textrazor.com/) API with a unofficial package https://github.com/wzbg/textrazor

**People data access service**
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

* Test the people-explorer-api with a 404: [GO GO GO !](http://localhost:3333/test-not-found)

* Test the people-explorer-api with a 200: http://localhost:3333/
Si%20apr%C3%A8s%20leurs%20%C3%A9lections%20%20%20%20%20%20on%20a%20longtemps%20parl%C3%A9%20de%20%22bromance%22%20pour%20d%C3%A9finir%20leur%20relation%20%20%20%20%20%20elle%20s%27est%20rapidement%20ternie.%20A%20tel%20point%20qu%27aujourd%27hui%20%20%20%20%20%20Emmanuel%20Macron%20et%20Donald%20Trump%20sont%20devenus%20adversaires.

* Health checks People-explorer-api: [GO GO GO  !](http://localhost:3333/healthz)

* Enter in the people-explorer-api container and run test: 
```bash
# Open a new command line and run :
docker exec -it people-explorer-api bash

# And Run the people-explorer-api test
yarn test
```

## Production environement
I choose to use a docker PaaS in production.
AWS elastic beanstalk is used for manage the app in production.

**Requirement:**
* AWS account
* AWS ElastiCache Redis cluster
* Gitlab Account for CI

1. Update the .env.production file
2. Create an AWS elastic beanstalk docker app ```people-explorer-api``` with a ```people-explorer-api-production``` environement
3. Create as S3 ```config-registry.json``` in a ```people-explorer-api-docker-config``` bucket for use gitlab registry in AWS
4. Create a ```people-explorer-api``` gitlab repository
5. Update ```Dockerrun.aws.json``` with your gitlab repository path
6. Set your ```$AWS_ACCESS_KEY_ID``` ```$AWS_SECRET_ACCESS_KEY``` in your gitlab environent variable
7. Push on your gitlab repository
8. Go to the elasticbeanstalk environement url

## Improvement
* Language detection
* Use cache for on 404 result
* Do it in ruby
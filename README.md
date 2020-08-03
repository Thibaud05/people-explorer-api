# people-explorer-api

This api find people in text and return a people list with basic information and the list of similarities between this people.

## Architecture

**People extractor service**
This service consume textrazor API with a unofficial package https://github.com/wzbg/textrazor

**People data acces service**
This service call wikidata SPARQL Endpoint with axios

**Cache service**
This service use a Redis database to improve api cost and speed

**Cache service**
This service use a Redis database to improve api cost and speed
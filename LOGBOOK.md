#LOGBOOK
* **2020-08-03 05:50 :** Let's go, create the logbook and add my shh key for github
* **2020-08-03 06:00 :** Create the people-explorer-api repository
* **2020-08-03 06:05 :** First commit : add logbook
* **2020-08-03 06:06 :** Go to the textrazor documentation
* **2020-08-03 06:26 :** Go to the wikidata documentation
* **2020-08-03 06:36 :** Define the architecture
* **2020-08-03 07:23 :** Define the local devloppement infrastrucure
* **2020-08-03 08:14 :** Create the adonisJS api
* **2020-08-03 08:57 :** Add the redis container
* **2020-08-03 09:30 :** Add the swagger ui container and do people-explorer-api specification (swagger.yml)
* **2020-08-03 12:13 :** It's lunch time !
* **2020-08-03 13:57 :** Class structure and interface
* **2020-08-03 14:45 :** Writing tests
* **2020-08-03 15:33 :** It is very hard to generate test data for sparql queries (wikidata) 
* **2020-08-03 17:36 :** The explore path correctly calls the cache and the services, nice day !
* **2020-08-04 06:30 :** Starting the people extractor service and refactor the router later
* **2020-08-04 07:10 :** The unoffical package dosen't work (not a surprise), instead i use the rest endpoint
* **2020-08-04 08:12 :** BIG FAIL with stub cleanning XD - The unoffical package work 
* **2020-08-04 08:56 :** I need to mockup the api razortext because free plan includes only 500 requests per day (15/500)
* **2020-08-04 10:52 :** I want to add the razortext apikey to the env file but I made a big mistake in using the adonisJS 5 preview, the documentation is not complete! 
I think I took too much risk for this exercise just for using typescript !
* **2020-08-04 13:40 :** Lost in wikidata list of properties, I try to make the sparql request to retrieve additional informations.
* **2020-08-04 16:07 :** I have finished my first sparql query with unit testing WTF, I love it.
* **2020-08-04 17:00 :** Next step find similaries with sparql, I will work on that tomorrow.
* **2020-08-05 06:27 :** Day 3 : ready for find similaries with sparql
* **2020-08-05 07:19 :** Yes, I finished my request to find all the similarities
* **2020-08-05 09:03 :** Minimal unit test completed, start end to end test ...
* **2020-08-05 09:33 :** Fix completed, prepare for stagging
* **2020-08-05 11:52 :** The api is in production ! Next step : work on refactoring
* **2020-08-05 14:12 :** I want move the main route code in a controller and rename the root in / instead /explore and add code response to the api
* **2020-08-05 17:45 :** Day 3, I think I finished the first version of the API even if there is still a lot of refactoring to do, I loved playing with sparql and discovering textrazor
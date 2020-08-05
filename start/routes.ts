/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

import Redis from '@ioc:Adonis/Addons/Redis'
import PeopleDataAccess from '@ioc:App/Services/PeopleDataAccess'
import PeopleExtractor from '@ioc:App/Services/PeopleExtractor'

Route.get('/explore/:text', async ({ params }) => {
  var crypto = require('crypto');
  let hash = crypto.createHash('md5').update(params.text).digest('hex')
  const cacheResponse = await Redis.get(hash)
  if(cacheResponse){
    return JSON.parse(cacheResponse)
  }
  let text = decodeURIComponent(params.text)
  const personIds = await PeopleExtractor.textRazor(text)
  const people = await PeopleDataAccess.getWikiDataPeople(personIds)
  const similarities = await PeopleDataAccess.getWikiDataSimilarities(personIds)
  const response = {people:people,similarities:similarities}
  await Redis.set(hash, JSON.stringify(response))
  return response
})

Route.get('/healthz', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})
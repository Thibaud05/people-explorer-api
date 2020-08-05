// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Redis from '@ioc:Adonis/Addons/Redis'
import PeopleDataAccess from '@ioc:App/Services/PeopleDataAccess'
import PeopleExtractor from '@ioc:App/Services/PeopleExtractor'

export default class PeopleExplorersController {
    public async index({ params, response }){

        if(!decodeURIComponent(params.text).trim()) return response.badRequest({code:400,error:'Bad Request'}) 

        let crypto = require('crypto');
        let hash = crypto.createHash('md5').update(params.text).digest('hex')
        const cacheResponse = await Redis.get(hash)

        if(cacheResponse){
          return JSON.parse(cacheResponse)
        }

        let text = decodeURIComponent(params.text)
        let personIds: string[] = []
        try{
            personIds = await PeopleExtractor.textRazor(text)
        }catch(jsonError){
            return response.status(jsonError.code).send({code:jsonError.code,error:jsonError.error})
        }
        if(personIds.length == 0)  {
            response.notFound({code:404,error:'no person found'})
        }

        const people = await PeopleDataAccess.getWikiDataPeople(personIds)
        const similarities = await PeopleDataAccess.getWikiDataSimilarities(personIds)
        const json = {people:people,similarities:similarities}

        await Redis.set(hash, JSON.stringify(json))

        return json
    }
}

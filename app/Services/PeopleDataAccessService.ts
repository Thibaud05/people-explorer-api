import PeopleDataAccessInterface from 'Contracts/interfaces/PeopleDataAccess.interface'
import axios from 'axios'

export default class PeopleDataAccessService implements PeopleDataAccessInterface {

  constructor() {
    this.endpointUrl = 'https://query.wikidata.org:/sparql'
  }

  public async getWikiDataPeople(personWikidataIds: string[]): Promise<object> {
    if (personWikidataIds.length == 0) return []

    const sparqlQuery = `
    SELECT ?people ?peopleLabel ?typeLabel ?imageLabel ?birthdateLabel  
    WHERE 
    {
      VALUES ?people { 
        ${this.getPeopleQuery(personWikidataIds)}
       }
      ?people wdt:P31 ?type.
      OPTIONAL{
        ?people wdt:P569  ?birthdate;
                wdt:P18   ?image.
      }
      
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }`
    let response = await this.queryWikiData(sparqlQuery)
    return response.data.results.bindings
  }

  public getPeopleQuery(personWikidataIds: string[]): string {
    return personWikidataIds.map(personWikidataId => 'wd:' + personWikidataId).join(' ')
  }

  public getWikiDataSimilarities(personWikidataId: string[]): object {
    return personWikidataId
  }

  public async queryWikiData(sparqlQuery: string): Promise<object> {

    const fullUrl = 'https://query.wikidata.org/sparql' + '?query=' + encodeURIComponent(sparqlQuery)
    const headers = { 'Accept': 'application/sparql-results+json' }

    return await axios.get(fullUrl, { headers })
  }
}
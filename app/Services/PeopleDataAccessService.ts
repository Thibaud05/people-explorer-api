import PeopleDataAccessInterface from 'Contracts/interfaces/PeopleDataAccess.interface'
import axios from 'axios'

export default class PeopleDataAccessService implements PeopleDataAccessInterface {

  endpointUrl : string

  constructor() {
    this.endpointUrl = 'https://query.wikidata.org:/sparql'
  }

  async getWikiDataPeople(personWikidataIds: string[]): Promise<object> {
    if (personWikidataIds.length == 0) return []
    let wikiDataPeople = await this.fetchWikiDataPeople(personWikidataIds)
    let formatedWikiDataPeople = this.formatWikiDataPeople(wikiDataPeople)
    return formatedWikiDataPeople
  }

  async fetchWikiDataPeople(personWikidataIds: string[]): Promise<object>{
    
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
      
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }`
    let response = await this.queryWikiData(sparqlQuery)
    return response
  }

  formatWikiDataPeople(wikiDataPeople): object{

    return wikiDataPeople.map(wikiDataPerson => {
        return {
          wikidataId:wikiDataPerson?.people?.value,
          label:wikiDataPerson?.peopleLabel?.value,
          type:wikiDataPerson?.typeLabel?.value,
          image:wikiDataPerson?.imageLabel?.value,
          birthdate:wikiDataPerson?.birthdateLabel?.value
        }
      }
    )
  }

  async getWikiDataSimilarities(personWikidataIds: string[]): Promise<object> {
    if (personWikidataIds.length == 0) return []
    let wikiDataPeople = await this.fetchWikiDataSimilarities(personWikidataIds)
    let formatedWikiDataPeople = this.formatWikiDataSimilarities(wikiDataPeople)
    return formatedWikiDataPeople
  }
  
  async fetchWikiDataSimilarities (personWikidataIds: string[]): Promise<object> {
    const sparqlQuery = `
    SELECT ?person ?similarPerson ?propLabel ?valueLabel
    WHERE 
    {
      VALUES ?person {
          ${this.getPeopleQuery(personWikidataIds)}
       }
        VALUES ?similarPerson {
          ${this.getPeopleQuery(personWikidataIds)}
       }
      ?person ?property ?value.
      ?similarPerson ?property ?value.
    
      FILTER(?person!=?similarPerson)
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      ?prop wikibase:directClaim ?property 
    }`
      let response = await this.queryWikiData(sparqlQuery)
      return response
  }

  formatWikiDataSimilarities(wikiDataSimilarities): object{
      return wikiDataSimilarities.map(wikiDataSimilarity => {
        return {
          personWikidataId:wikiDataSimilarity?.person?.value,
          similarPersonWikidataId:wikiDataSimilarity?.similarPerson?.value,
          similarity:wikiDataSimilarity?.propLabel?.value,
          similarityValue:wikiDataSimilarity?.valueLabel?.value,
        }
      }
    )
  }

  getPeopleQuery(personWikidataIds: string[]): string {
    return personWikidataIds.map(personWikidataId => 'wd:' + personWikidataId).join(' ')
  }

  async queryWikiData(sparqlQuery: string): Promise<object> {

    const fullUrl =  this.endpointUrl  + '?query=' + encodeURIComponent(sparqlQuery)
    const headers = { 'Accept': 'application/sparql-results+json' }
    const response = await axios.get(fullUrl, { headers })
    return response.data.results.bindings
  }
}
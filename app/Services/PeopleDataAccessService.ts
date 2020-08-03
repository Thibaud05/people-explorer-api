import PeopleDataAccessInterface from 'Contracts/interfaces/PeopleDataAccess.interface'

export default class PeopleDataAccessService implements PeopleDataAccessInterface {

  public getWikiDataPeople(personWikidataId: string[]): object{
    return personWikidataId
  }
  public getWikiDataSimilarities(personWikidataId: string[]): object{
    return personWikidataId
  }
}

export default interface PeopleDataAccessInterface {
    getWikiDataPeople(personWikidataId: string[]): object
    getWikiDataSimilarities(personWikidataId: string[]): object
    getPeopleQuery(personWikidataIds: string[]): string
    queryWikiData(sparqlQuery: string): Promise<object>
}
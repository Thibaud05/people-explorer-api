export default interface PeopleDataAccessInterface {
    endpointUrl: string
    getWikiDataPeople(personWikidataId: string[]): Promise<object>
    fetchWikiDataPeople(personWikidataId: string[]): Promise<object>
    formatWikiDataPeople(object): object
    getWikiDataSimilarities(personWikidataId: string[]): Promise<object>
    fetchWikiDataSimilarities(personWikidataId: string[]): Promise<object>
    formatWikiDataSimilarities(object): object
    getPeopleQuery(personWikidataIds: string[]): string
    queryWikiData(sparqlQuery: string): Promise<object>
}
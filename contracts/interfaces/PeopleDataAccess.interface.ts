export default interface PeopleDataAccessInterface {
    getWikiDataPeople(personWikidataId: string[]): object
    getWikiDataSimilarities(personWikidataId: string[]): object
}
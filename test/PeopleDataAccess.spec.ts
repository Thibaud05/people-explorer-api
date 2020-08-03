import test from 'japa'

import PeopleDataAccess from '@ioc:App/Services/PeopleDataAccess'

test.group('PeopleDataAccess', () => {
  test('getWikiDataPeople should return expected people for id Q3 and Q33', (assert) => {
    let expectedPeople = [

    ]
    let people = PeopleDataAccess.getWikiDataPeople(['Q3','Q33'])
    assert.deepEqual(people, expectedPeople)
  })
  test('getWikiDataSimilarities should return expected expected similarities for id Q3 and Q33', (assert) => {
    let expectedSimilarities = [
      {
        personWikidataId: "Q3052772",
        similarPersonWikidataId: "Q33",
        similarity: "age",
      },
      {
        personWikidataId: "Q3",
        similarPersonWikidataId: "Q33",
        similarity: "job",
      },
      {
        personWikidataId: "Q3",
        similarPersonWikidataId: "Q33",
        similarity: "nationality",
      }
    ]
    let similarities = PeopleDataAccess.getWikiDataSimilarities(['Q3','Q33'])
    assert.deepEqual(similarities, expectedSimilarities)
  })
})
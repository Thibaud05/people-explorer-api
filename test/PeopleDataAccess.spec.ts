import test from 'japa'

import PeopleDataAccess from '@ioc:App/Services/PeopleDataAccess'

const wikiDataPeople = [
  {
      "people": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "peopleLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "Emmanuel Macron"
      },
      "typeLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "human",
      },
      "imageLabel": {
          "type": "literal",
          "value": "http://commons.wikimedia.org/wiki/Special:FilePath/Emmanuel%20Macron%20%28cropped%29.jpg"
      },
      "birthdateLabel": {
          "type": "literal",
          "value": "1977-12-21T00:00:00Z"
      }
  },
  {
      "people": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "peopleLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "Donald Trump"
      },
      "typeLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "human",
      },
      "imageLabel": {
          "type": "literal",
          "value": "http://commons.wikimedia.org/wiki/Special:FilePath/Donald%20Trump%20official%20portrait.jpg"
      },
      "birthdateLabel": {
          "type": "literal",
          "value": "1946-06-14T00:00:00Z"
      }
  }
]


test.group('PeopleDataAccess fetchWikiDataPeople', () => {
  test('should return expected people for id Q3052772 and Q22686', async(assert) => {
    let expectedPeople = wikiDataPeople
    let people = await PeopleDataAccess.fetchWikiDataPeople(['Q3052772','Q22686'])
    assert.deepEqual(people, expectedPeople)
  })
  test('should return empty array for empty array', async(assert) => {
    let expectedPeople = []
    let people = await PeopleDataAccess.fetchWikiDataPeople([])
    assert.deepEqual(people, expectedPeople)
  })
})

test.group('PeopleDataAccess formatWikiDataPeople', () => {
  test('should format expected people for id Q3052772 and Q22686', async(assert) => {
    let expectedPeople = [
      {
        "wikidataId":"http://www.wikidata.org/entity/Q3052772",
        "label":"Emmanuel Macron",
        "type":"human",
        "image":"http://commons.wikimedia.org/wiki/Special:FilePath/Emmanuel%20Macron%20%28cropped%29.jpg",
        "birthdate":"1977-12-21T00:00:00Z"
      },
      {
        "wikidataId":"http://www.wikidata.org/entity/Q22686",
        "label":"Donald Trump",
        "type":"human",
        "image":"http://commons.wikimedia.org/wiki/Special:FilePath/Donald%20Trump%20official%20portrait.jpg",
        "birthdate":"1946-06-14T00:00:00Z"
      }
    ]
    let people = await PeopleDataAccess.formatWikiDataPeople(wikiDataPeople)
    assert.deepEqual(people, expectedPeople)
  })
})

test.group('PeopleDataAccess getWikiDataSimilarities', () => {
  test('should return expected expected similarities for id Q3 and Q33', (assert) => {
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
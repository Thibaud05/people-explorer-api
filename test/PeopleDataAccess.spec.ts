import test from 'japa'
import PeopleDataAccess from '@ioc:App/Services/PeopleDataAccess'
import deepEqualInAnyOrder from 'deep-equal-in-any-order'
import chai from 'chai'

// Add deepEqualInAnyOrder plugin
chai.use(deepEqualInAnyOrder);
const { expect } = chai;

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

const wikiDataSimilarities = [
  {
      "person": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "similarPerson": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "propLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "sex or gender"
      },
      "valueLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "male"
      }
  },
  {
      "person": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "similarPerson": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "propLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "instance of"
      },
      "valueLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "human"
      }
  },
  {
      "person": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "similarPerson": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "propLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "eye color"
      },
      "valueLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "blue"
      }
  },
  {
      "person": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "similarPerson": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "propLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "sex or gender"
      },
      "valueLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "male"
      }
  },
  {
      "person": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "similarPerson": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "propLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "instance of"
      },
      "valueLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "human"
      }
  },
  {
      "person": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "similarPerson": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "propLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "languages spoken, written or signed"
      },
      "valueLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "English"
      }
  },
  {
      "person": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "similarPerson": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "propLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "preferred pronoun"
      },
      "valueLabel": {
          "type": "literal",
          "value": "L485"
      }
  },
  {
      "person": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "similarPerson": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "propLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "writing languages"
      },
      "valueLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "English"
      }
  },
  {
      "person": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "similarPerson": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "propLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "eye color"
      },
      "valueLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "blue"
      }
  },
  {
      "person": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "similarPerson": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "propLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "languages spoken, written or signed"
      },
      "valueLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "English"
      }
  },
  {
      "person": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "similarPerson": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "propLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "preferred pronoun"
      },
      "valueLabel": {
          "type": "literal",
          "value": "L485"
      }
  },
  {
      "person": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q3052772"
      },
      "similarPerson": {
          "type": "uri",
          "value": "http://www.wikidata.org/entity/Q22686"
      },
      "propLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "writing languages"
      },
      "valueLabel": {
          "xml:lang": "en",
          "type": "literal",
          "value": "English"
      }
  }
]

test.group('PeopleDataAccess WikiDataPeople', () => {
  test('get should return empty array for empty array', async (assert) => {
    let expectedPeople = []
    let people = await PeopleDataAccess.getWikiDataPeople([])
    assert.deepEqual(people, expectedPeople)
  })

  test('fetch should return expected people for id Q3052772 and Q22686', async (assert) => {
    let expectedPeople = wikiDataPeople
    let people = await PeopleDataAccess.fetchWikiDataPeople(['Q3052772', 'Q22686'])
    assert.deepEqual(people, expectedPeople)
  })

  test('format should format expected people for id Q3052772 and Q22686', async (assert) => {
    let expectedPeople = [
      {
        "wikidataId": "http://www.wikidata.org/entity/Q3052772",
        "label": "Emmanuel Macron",
        "type": "human",
        "image": "http://commons.wikimedia.org/wiki/Special:FilePath/Emmanuel%20Macron%20%28cropped%29.jpg",
        "birthdate": "1977-12-21T00:00:00Z"
      },
      {
        "wikidataId": "http://www.wikidata.org/entity/Q22686",
        "label": "Donald Trump",
        "type": "human",
        "image": "http://commons.wikimedia.org/wiki/Special:FilePath/Donald%20Trump%20official%20portrait.jpg",
        "birthdate": "1946-06-14T00:00:00Z"
      }
    ]
    let people = await PeopleDataAccess.formatWikiDataPeople(wikiDataPeople)
    assert.deepEqual(people, expectedPeople)
  })
})

test.group('PeopleDataAccess WikiDataSimilarities', () => {
  test('fetch should return expected similarities between Q3052772 and Q22686', async() => {
    let expectedSimilarities = wikiDataSimilarities
    let similarities = await PeopleDataAccess.fetchWikiDataSimilarities(['Q3052772', 'Q22686'])
    expect(similarities).to.deep.equalInAnyOrder(expectedSimilarities)
  })
  test('format should return expected similarities between Q3052772 and Q22686', (assert) => {
    let expectedSimilarities = [
      {
          personWikidataId: "http://www.wikidata.org/entity/Q22686",
          similarPersonWikidataId: "http://www.wikidata.org/entity/Q3052772",
          similarity: "sex or gender",
          similarityValue: "male"
      },
      {
          personWikidataId: "http://www.wikidata.org/entity/Q22686",
          similarPersonWikidataId: "http://www.wikidata.org/entity/Q3052772",
          similarity: "instance of",
          similarityValue: "human"
      },
      {
          personWikidataId: "http://www.wikidata.org/entity/Q22686",
          similarPersonWikidataId: "http://www.wikidata.org/entity/Q3052772",
          similarity: "eye color",
          similarityValue: "blue"
      },
      {
          personWikidataId: "http://www.wikidata.org/entity/Q3052772",
          similarPersonWikidataId: "http://www.wikidata.org/entity/Q22686",
          similarity: "sex or gender",
          similarityValue: "male"
      },
      {
          personWikidataId: "http://www.wikidata.org/entity/Q3052772",
          similarPersonWikidataId: "http://www.wikidata.org/entity/Q22686",
          similarity: "instance of",
          similarityValue: "human"
      },
      {
          personWikidataId: "http://www.wikidata.org/entity/Q22686",
          similarPersonWikidataId: "http://www.wikidata.org/entity/Q3052772",
          similarity: "languages spoken, written or signed",
          similarityValue: "English"
      },
      {
          personWikidataId: "http://www.wikidata.org/entity/Q22686",
          similarPersonWikidataId: "http://www.wikidata.org/entity/Q3052772",
          similarity: "preferred pronoun",
          similarityValue: "L485"
      },
      {
          personWikidataId: "http://www.wikidata.org/entity/Q22686",
          similarPersonWikidataId: "http://www.wikidata.org/entity/Q3052772",
          similarity: "writing languages",
          similarityValue: "English"
      },
      {
          personWikidataId: "http://www.wikidata.org/entity/Q3052772",
          similarPersonWikidataId: "http://www.wikidata.org/entity/Q22686",
          similarity: "eye color",
          similarityValue: "blue"
      },
      {
          personWikidataId: "http://www.wikidata.org/entity/Q3052772",
          similarPersonWikidataId: "http://www.wikidata.org/entity/Q22686",
          similarity: "languages spoken, written or signed",
          similarityValue: "English"
      },
      {
          personWikidataId: "http://www.wikidata.org/entity/Q3052772",
          similarPersonWikidataId: "http://www.wikidata.org/entity/Q22686",
          similarity: "preferred pronoun",
          similarityValue: "L485"
      },
      {
          personWikidataId: "http://www.wikidata.org/entity/Q3052772",
          similarPersonWikidataId: "http://www.wikidata.org/entity/Q22686",
          similarity: "writing languages",
          similarityValue: "English"
      }
  ]
    let similarities = PeopleDataAccess.formatWikiDataSimilarities(wikiDataSimilarities)
    assert.deepEqual(similarities, expectedSimilarities)
  })
})
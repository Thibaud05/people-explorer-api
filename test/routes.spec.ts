import test from 'japa'
import supertest from 'supertest'
var sinon = require('sinon')
import PeopleDataAccess from '@ioc:App/Services/PeopleDataAccess'
import PeopleExtractor from '@ioc:App/Services/PeopleExtractor'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const expectedResponse = {
  people: [
    {
      wikidataId: "string",
      type: "string",
      label: "string",
      description: "string",
      image: "string"
    }
  ],
  similarities: [
    {
      personWikidataId: "string",
      similarPersonWikidataId: "string",
      similarity: "string"
    }
  ]
}

let stubTextRazor = sinon.stub(PeopleExtractor, "textRazor").withArgs('test').returns(['Q1']);
let stubGetWikiDataPeople = sinon.stub(PeopleDataAccess, "getWikiDataPeople").withArgs('Q1').returns(expectedResponse.people);
let stubGetWikiDataSimilarities = sinon.stub(PeopleDataAccess, "getWikiDataSimilarities").withArgs('Q1').returns(expectedResponse.similarities);

test.group('explore route should', () => {
  test('call PeopleDataAccess razor text with test param and return expectedResponse', async () => {

    await supertest(BASE_URL)
      .get('/explore/test')
      .expect(200,expectedResponse)
  })
  test('use the cache for the second call with test param', async() => {
    stubTextRazor.withArgs('test').returns([]);
    stubGetWikiDataPeople.withArgs('Q1').returns([]);
    stubGetWikiDataSimilarities.withArgs('Q1').returns([]);

    await supertest(BASE_URL)
      .get('/explore/test')
      .expect(200,expectedResponse)
  })
})


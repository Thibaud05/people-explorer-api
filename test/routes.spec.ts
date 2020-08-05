import test from 'japa'
import supertest from 'supertest'
import sinon from 'sinon'
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



test.group('explore route should', (group) => {

  group.afterEach(async () => {
    sinon.restore()
  }) 

  test('call PeopleDataAccess razor text with test param and return expectedResponse', async () => {
    sinon.stub(PeopleExtractor, "textRazor").withArgs('test').returns(Promise.resolve(['Q1']));
    sinon.stub(PeopleDataAccess, "getWikiDataPeople").withArgs(['Q1']).returns(Promise.resolve(expectedResponse.people))
    sinon.stub(PeopleDataAccess, "getWikiDataSimilarities").withArgs(['Q1']).returns(Promise.resolve(expectedResponse.similarities))
    await supertest(BASE_URL)
      .get('/explore/test')
      .expect(200,expectedResponse)
  })
  test('use the cache for the second call with test param', async() => {
    sinon.stub(PeopleExtractor, "textRazor").withArgs('test').returns(Promise.resolve([]));
    sinon.stub(PeopleDataAccess, "getWikiDataPeople").withArgs(['Q1']).returns(Promise.resolve([]))
    sinon.stub(PeopleDataAccess, "getWikiDataSimilarities").withArgs(['Q1']).returns(Promise.resolve([]))

    await supertest(BASE_URL)
      .get('/explore/test')
      .expect(200,expectedResponse)
  })


})


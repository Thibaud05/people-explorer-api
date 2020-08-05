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

test.group('/ route should', (group) => {

  group.afterEach(async () => {
    sinon.restore()
  }) 

  test('call PeopleDataAccess razor text with test param and return expectedResponse', async () => {
    sinon.stub(PeopleExtractor, "textRazor").withArgs('test').returns(Promise.resolve(['Q1']));
    sinon.stub(PeopleDataAccess, "getWikiDataPeople").withArgs(['Q1']).returns(Promise.resolve(expectedResponse.people))
    sinon.stub(PeopleDataAccess, "getWikiDataSimilarities").withArgs(['Q1']).returns(Promise.resolve(expectedResponse.similarities))

    await supertest(BASE_URL)
      .get('/test')
      .expect(200,expectedResponse)
  })

  test('return 404 if no person found', async() => {
    sinon.stub(PeopleExtractor, "textRazor").withArgs('test404').returns(Promise.resolve([]));

    await supertest(BASE_URL)
      .get('/test404')
      .expect(404,{code:404,error:'no person found'})
  })

  test('use the cache for the second call with test param', async() => {
    sinon.stub(PeopleExtractor, "textRazor").withArgs('test').returns(Promise.resolve([]));
    sinon.stub(PeopleDataAccess, "getWikiDataPeople").withArgs(['Q1']).returns(Promise.resolve([]))
    sinon.stub(PeopleDataAccess, "getWikiDataSimilarities").withArgs(['Q1']).returns(Promise.resolve([]))

    await supertest(BASE_URL)
      .get('/test')
      .expect(200,expectedResponse)
  })

  test('return 400 : Bad Request for an emtpy text ', async() => {

    await supertest(BASE_URL)
      .get('/%20')
      .expect(400,{code:400,error:'Bad Request'})
  })

  test('return 401: Unauthorized for a bad textrazor key ', async() => {
    sinon.stub(process.env, 'TEXTRAZOR_API_KEY').value('badKey')
    
    await supertest(BASE_URL)
      .get('/badApiKey')
      .expect(401,{code:401,error:'Your TextRazor API Key was invalid.'})
  }).timeout(6000)

})

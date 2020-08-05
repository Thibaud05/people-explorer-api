import test from 'japa'
import sinon from 'sinon'

import PeopleExtractor from '@ioc:App/Services/PeopleExtractor'
const TextRazor = require('textrazor')

test.group('PeopleExtractor textRazor', (group) => {

  group.afterEach(async () => {
    sinon.restore()
  }) 

  test('should return the wikidataId of reponse entities', async(assert) => {
    const text = `Si, après leurs élections
    , on a longtemps parlé de "bromance" pour définir leur relation
    , elle s'est rapidement ternie. A tel point qu'aujourd'hui
    , Emmanuel Macron et Donald Trump sont devenus adversaires.`
    const mocukpTextRazorApiResponse = {
      "response": {
          "language": "fre",
          "languageIsReliable": true,
          "entities": [
              {
                  "wikidataId": "Q3052772"
              },
              {
                  "wikidataId": "Q22686"
              }
          ]
      },
      "time": 0.01568,
      "ok": true
  }
    sinon.stub(TextRazor.prototype, "exec").withArgs(text).returns(mocukpTextRazorApiResponse);

    let expectedPersonIds = ['Q3052772','Q22686']
    let personIds = await PeopleExtractor.textRazor(text)
    assert.deepEqual(personIds, expectedPersonIds)
  })

  test('should throw exception if invlalid TextRazor API Key', async(assert) => {
    sinon.stub(process.env, 'TEXTRAZOR_API_KEY').value('badKey')
    assert.plan(1)

    try {
      await PeopleExtractor.textRazor('')
    } catch (error) {
      assert.equal(error.error, 'Your TextRazor API Key was invalid.')
    }
  }).timeout(6000)
})

import test from 'japa'


import PeopleExtractor from '@ioc:App/Services/PeopleExtractor'

test.group('PeopleExtractor', () => {
  test('getWikiDataPeople should return Q3052772 and Q22686', (assert) => {
    let expectedPersonIds = ['Q3052772','Q22686']
    let personIds = PeopleExtractor.textRazor(`Si, après leurs élections
    , on a longtemps parlé de "bromance" pour définir leur relation
    , elle s'est rapidement ternie. A tel point qu'aujourd'hui
    , Emmanuel Macron et Donald Trump sont devenus adversaires. Et d'ailleurs
    , il y a quelque chose que Potus ne supporte pas chez le président de la République.`)
    assert.deepEqual(personIds, expectedPersonIds)
  })
})
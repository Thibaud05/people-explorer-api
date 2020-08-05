import PeopleExtractorInterface from 'Contracts/interfaces/PeopleExtractor.interface'

export default class PeopleExtractorService implements PeopleExtractorInterface {

  constructor(){
    require('dotenv').config()
  }

  public async textRazor (text: string): Promise<string[]> {
    
    const TextRazor = require('textrazor')
    let textRazorInstance = new TextRazor(process.env.TEXTRAZOR_API_KEY)

    const options = { extractors: 'entities', 'entities.filterDbpediaTypes':'Person' }
    
    let result = await textRazorInstance.exec(text, options)
    if(! result.response.entities) return []
    let personWikidataIds = result.response.entities.map(entity => entity.wikidataId )
    return personWikidataIds
  }
}

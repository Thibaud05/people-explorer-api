import PeopleExtractorInterface from 'Contracts/interfaces/PeopleExtractor.interface'



export default class PeopleExtractorService implements PeopleExtractorInterface {

  textRazorInstance : object
  
  constructor(){
    require('dotenv').config()
    const TextRazor = require('textrazor')
    this.textRazorInstance = new TextRazor(process.env.TEXTRAZOR_API_KEY)  
  }

  public async textRazor (text: string): Promise<string[]> {
    const options = { extractors: 'entities', 'entities.filterDbpediaTypes':'Person' }
    try {
        let result = await this.textRazorInstance.exec(text, options)
        let personWikidataIds = result.response.entities.map(entity => entity.wikidataId )
        return personWikidataIds
    } catch (error) {
        throw(error)
    }
  }
}

import PeopleExtractorInterface from 'Contracts/interfaces/PeopleExtractor.interface'

export default class PeopleExtractorService implements PeopleExtractorInterface {
  public textRazor (text: string): string[] {
    return [text]
  }
}
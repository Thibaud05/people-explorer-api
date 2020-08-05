export default interface PeopleExtractorInterface {
    textRazor(text: string): Promise<string[]>
}
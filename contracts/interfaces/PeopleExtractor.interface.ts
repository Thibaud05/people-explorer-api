export default interface PeopleExtractorInterface {
    textRazorInstance: object
    textRazor(text: string): Promise<string[]>
}
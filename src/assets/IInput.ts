export interface IInput {
    /**
     * Function that performs the transformation required for your translation.
     * @param message user input
     * @returns transformed input
     */
    processMessage(message: string): string;
    /**
     * Functions that returns a string description of your translation, to be included in the list of languages
     */
    getDescription(): string;
    /**
     * Optional: if you have a thumbnail to supply, return a link to it here. It will appear next to the translation.
     */
    getThumbnailUrl?(): string;
}
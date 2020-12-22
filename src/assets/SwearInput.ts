import { IInput } from "./IInput";

const ENDING_MAP = ["...", "."];
const STRESSED_ENDING_MAP = ["?", "!"];
const MID_MAP = [",", "-"];

/**
 * Speak like a true gentleman
 */
export default class SwearInput implements IInput {
    processMessage(message: string): string {
        let processedMessage = message;
        ENDING_MAP.forEach(ending => {
            processedMessage = processedMessage.replace(new RegExp(`\\${ending}`, "g"), " епты");
        });

        STRESSED_ENDING_MAP.forEach(ending => {
            processedMessage = processedMessage.replace(new RegExp(`\\${ending}`, "g"), " епты нахуй");
        });

        MID_MAP.forEach(mid => {
            processedMessage = processedMessage.replace(new RegExp(`\\${mid}`, "g"), " бля");
        });

        return processedMessage;
    }

    getThumbnailUrl(): string {
        return "https://altruism.ru/img/gopnik.jpg";
    }

    getDescription(): string {
        return "Вот такая бля тема епты";
    }

}
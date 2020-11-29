import { IInput } from "./IInput";

/**
 * This is an example class
 */
export default class EmoInput implements IInput {
    processMessage(message: string): string {
        let emoMessage = "";
        let flag = false;
        for (const letter of message) {
            if (flag) {
                emoMessage += letter.toUpperCase();
            } else {
                emoMessage += letter;
            }
            flag = !flag;
        }
        return emoMessage;
    }

    getThumbnailUrl(): string {
        return "https://en.meming.world/images/en/thumb/e/e0/Mocking_SpongeBob.jpg/300px-Mocking_SpongeBob.jpg";
    }

    getDescription(): string {
        return "MaKeS yOuR tExT lOoK lIkE tHiS";
    }

}
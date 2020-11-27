import { IInput } from "./IInput";

export default class EmoInput implements IInput {
    processMessage(message: string): string {
        let emoMessage = "";
        let flag = false;
        for (const letter of message) {
            if (flag) {
                emoMessage += letter.toUpperCase();
            } else {
                emoMessage += letter
            }
            flag = !flag;
        }
        return emoMessage;
    }
    getDescription(): string {
        return "MaKeS yOuR tExT lOoK lIkE tHiS";
    }

}
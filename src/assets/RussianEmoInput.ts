import { IInput } from "./IInput";

/**
 * This is an example class
 */
export default class RussianEmoInput implements IInput {

    private weirdnessMap = {
        "в": "фф",
        "е": "и",
        "ш": "фф",
    }

    weirdTransformation(message: string): string {
        return [...message].map(letter => this.weirdnessMap[letter] ?? letter).join("");
    }

    flipMessage(message: string): string {
        let flag = true;
        return [...message].map(letter => {
            if (letter.trim().length > 0)
                flag = !flag;
            return flag ? letter.toUpperCase() : letter;
        }).join("");
    }

    processMessage(message: string): string {
        return this.flipMessage(this.weirdTransformation(message));
    }

    getThumbnailUrl(): string {
        return "https://gifanutye.name/wp-content/uploads/2019/07/funny-emo-kids-3.jpg";
    }

    getDescription(): string {
        return "ВсЕм ПрИфФкИ в ЭтОм ЧаТе!11!";
    }

}
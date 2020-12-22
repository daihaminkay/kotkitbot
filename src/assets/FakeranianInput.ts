/**
 * Inspired by: https://a2ch.ru/2014/02/25/aniny-skiro-na-ukrin-bidit-ubivit-ili-sizhit-v-tirmu-za-63194316.html
 */

import { IInput } from "./IInput";

export const BASIC_RUSSIAN_VOWELS = ["а", "ю", "я", "ё", "о", "у"];
export const RUSSIAN_VOWELS = ["а", "э", "ю", "я", "ы", "ё", "о", "у", "е", "и"];
export default class FakeranianInput implements IInput {
    private matchCase(text: string, pattern: string): string {
        let result = "";
        let isLastKnownCaseUpper = false;

        for (let i = 0; i < text.length; i++) {
            const c = text.charAt(i);
            const p = pattern.charCodeAt(i);

            if (p >= 1040 && p < 1040 + 32) {
                result += c.toUpperCase();
                isLastKnownCaseUpper = true;
            } else if (isNaN(p)) {
                // heuristic in case replacement is longer than original
                result += isLastKnownCaseUpper ? c.toUpperCase() : c.toLowerCase();
            } else {
                result += c.toLowerCase();
                isLastKnownCaseUpper = false;
            }
        }

        return result;
    }

    /**
     * Переводит все гласные (для которых нет других правил) кроме последней в i
     */
    applyVowelsTransformation(input: string[]): string[] {
        return input.map(word => {
            const r = new RegExp("([" + BASIC_RUSSIAN_VOWELS.join("") + "])(?=.*[" + RUSSIAN_VOWELS.join("") + "])", "gi");
            return word.replace(r, (match) => {
                return this.matchCase("i", match);
            });
        });
    }

    /**
     * Заменяет все "е" на украинскую версию
     */
    applyETransformation(input: string[]): string[] {
        return input.map(word => {
            return word.replace(/е/g, "є").replace(/Е/g, "Є").replace(/э/gi, (match) => {
                return this.matchCase("е", match);
            });
        });
    }

    /**
     * Заменяет все "и" на "i"
     */
    applyITransformation(input: string[]): string[] {
        return input.map(word => {
            return word.replace(/и/gi, (match) => {
                return this.matchCase("i", match);
            });
        });
    }

    /**
     * Если слово начинается на "с"+согласная, заменяет "с" на "з"
     */
    applyZTransformation(input: string[]): string[] {
        return input.map(word => {
            const r = new RegExp("^с([^" + RUSSIAN_VOWELS.join("") + "])", "i");
            return word.replace(r, (match, m1) => {
                return (this.matchCase("з", match) + m1);
            });
        });
    }

    /**
     * Если в преобразовании появилось "ii", делаем вторую особой
     */
    applyDoubleITransformation(input: string[]): string[] {
        return input.map(word => {
            return word
                .replace(/ii/g, "iї")
                .replace(/iI/g, "iЇ")
                .replace(/Ii/g, "Iї")
                .replace(/II/g, "IЇ");
        });
    }

    /**
     * Любые две одинаковые буквы подряд заменяются на одну
     */
    applyDoubleLetterTransformation(input: string[]): string[] {
        return input.map(word => {
            return word.replace(/(.)\1/gi, "$1");
        });
    }

    /**
     * Предлог "на" под запретом - автозамена на "в"
     */
    applyVNaTransformation(input: string[]): string[] {
        return input.map(word => {
            if (word === "на") {
                return "в";
            } else if (word === "НА") {
                return "В";
            } else {
                return word;
            }
        });
    }

    /**
     * Если слово заканчивается на "ь"+гласная, заменить на двойную согласную перед "ь"
     * (житья => життя)
     */
    applyDoubleConsonantTransformation(input: string[]): string[] {
        return input.map(word => {
            return word.replace(new RegExp("(.)(ь)([" + RUSSIAN_VOWELS.join("") + "])", "gi"), "$1$1$3");
        });
    }

    /**
     * -тся, -ться заменяем на "тися"
     */
    applyTisyaTransformation(input: string[]): string[] {
        return input.map(word => {
            return word.replace(/(ться|тся)/i, (match) => {
                return this.matchCase("тися", match);
            });
        });
    }

    /**
     * -ть заменяем на "ти"
     */
    applyInfinitiveTransformation(input: string[]): string[] {
        return input.map(word => {
            return word.replace(/(ть$)/i, (match) => {
                return this.matchCase("ти", match);
            });
        });
    }

    /**
     * Все "ы" заменяем на "и"
     */
    applyAbsentLetterTransformation(input: string[]): string[] {
        return input.map(word => {
            return word.replace(/ы/gi, (match) => {
                return this.matchCase("и", match);
            });
        });
    }

    /**
     * Все "знаки" заменяем на апостроф
     */
    applyApostropheTransformation(input: string[]): string[] {
        return input.map(word => {
            return word.replace(/(ь|ъ)/gi, "'");
        });
    }

    /**
     * Если в слове одна гласная, заменяем ее на "i"
     */
    applySingleVowelWordTransformation(input: string[]): string[] {
        return input.map(word => {
            const r = new RegExp("([" + BASIC_RUSSIAN_VOWELS.join("") + "]{1})(?!.*[" + RUSSIAN_VOWELS.join("") + "])(?=.)", "gi");
            return word.replace(r, (match) => {
                return this.matchCase("i", match);
            });
        });
    }

    toString(input: string[]): string {
        return input.join(" ");
    }

    getDescription(): string {
        return "This is a sample language pack, transforms Russian language to somewhat Ukrainian as a general joke.";
    }

    processMessage(message: string): string {
        let input = message.split(/\s/);
        input = this.applyZTransformation(input);
        input = this.applyVowelsTransformation(input);
        input = this.applyETransformation(input);
        input = this.applyITransformation(input);
        input = this.applyDoubleITransformation(input);
        input = this.applyDoubleLetterTransformation(input);
        input = this.applyVNaTransformation(input);
        input = this.applyDoubleConsonantTransformation(input);
        input = this.applyAbsentLetterTransformation(input);
        input = this.applyTisyaTransformation(input);
        input = this.applyInfinitiveTransformation(input);
        input = this.applyApostropheTransformation(input);
        input = this.applySingleVowelWordTransformation(input);
        return this.toString(input);
    }
}
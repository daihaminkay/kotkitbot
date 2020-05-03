/**
 * Inspired by: https://a2ch.ru/2014/02/25/aniny-skiro-na-ukrin-bidit-ubivit-ili-sizhit-v-tirmu-za-63194316.html
 */

const BASIC_RUSSIAN_VOWELS = ["а", "э", "ю", "я", "ё", "о", "у"];
const RUSSIAN_VOWELS = ["а", "э", "ю", "я", "ы", "ё", "о", "у", "е", "и"];
export default class CommunityContainedInput {
    private _input: string[];

    constructor(input: string) {
        this._input = input.split(/\s/);
    }

    /**
     * Переводит все гласные (для которых нет других правил) кроме последней в i
     */
    applyVowelsTransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            let r = new RegExp("([" + BASIC_RUSSIAN_VOWELS.join("") + "])(?=.*[" + RUSSIAN_VOWELS.join('') + "])", "gi")
            return word.replace(r, "i")
        })

        return this;
    }

    /**
     * Заменяет все "е" на украинскую версию
     */
    applyETransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(/е/gi, "є").replace(/э/gi, "е")
        });

        return this;
    }

    /**
     * Заменяет все "и" на "i"
     */
    applyITransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(/и/gi, "i")
        });

        return this;
    }

    /**
     * Если слово начинается на "с"+согласная, заменяет "с" на "з"
     */
    applyZTransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            let r = new RegExp("^с([^" + RUSSIAN_VOWELS.join("") + "])", "i");
            return word.replace(r, "з$1")
        });

        return this;
    }

    /**
     * Если в преобразовании появилось "ii", делаем вторую особой
     */
    applyDoubleITransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(/ii/gi, "iї")
        });

        return this;
    }

    /**
     * Любые две одинаковые буквы подряд заменяются на одну
     */
    applyDoubleLetterTransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(/(.)\1/gi, "$1")
        });

        return this;
    }

    /**
     * Предлог "на" под запретом - автозамена на "в"
     */
    applyVNaTransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            if (word === "на") {
                return "в"
            } else {
                return word;
            }
        });

        return this;
    }

    /**
     * Если слово заканчивается на "ь"+гласная, заменить на двойную согласную перед "ь"
     * (житья => життя)
     */
    applyDoubleConsonantTransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(new RegExp("(.)(ь)([" + BASIC_RUSSIAN_VOWELS.join("") + "])", "gi"), "$1$1$3")
        });

        return this;
    }

    /**
     * -тся, -ться заменяем на "тися"
     */
    applyTisyaRule(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(/(ться|тся)/i, "тися");
        })

        return this;
    }

    /**
     * -ть заменяем на "ти"
     */
    applyInfinitiveRule(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(/(ть$)/i, "ти")
        });

        return this;
    }

    /**
     * Все "ы" заменяем на "и"
     */
    applyAbsentLetterRule(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(/ы/gi, "и");
        })
        return this;
    }

    /**
     * Все "знаки" заменяем на апостроф
     */
    applyApostropheRule(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(/(ь|ъ)/gi, "'");
        })
        return this;
    }

    toString(): string {
        return this._input.join(" ");
    }
}
/**
 * Inspired by: https://a2ch.ru/2014/02/25/aniny-skiro-na-ukrin-bidit-ubivit-ili-sizhit-v-tirmu-za-63194316.html
 */

const BASIC_RUSSIAN_VOWELS = ["а", "ю", "я", "ё", "о", "у"];
const RUSSIAN_VOWELS = ["а", "э", "ю", "я", "ы", "ё", "о", "у", "е", "и"];
export default class CommunityContainedInput {
    private _input: string[];

    constructor(input: string) {
        this._input = input.split(/\s/);
    }

    private matchCase(text: string, pattern: string): string {
        var result = '';

        for (var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            var p = pattern.charCodeAt(i);

            if (p >= 1040 && p < 1040 + 32) {
                result += c.toUpperCase();
            } else {
                result += c.toLowerCase();
            }
        }

        return result;
    }

    /**
     * Переводит все гласные (для которых нет других правил) кроме последней в i
     */
    applyVowelsTransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            let r = new RegExp("([" + BASIC_RUSSIAN_VOWELS.join("") + "])(?=.*[" + RUSSIAN_VOWELS.join('') + "])", "gi")
            return word.replace(r, (match) => {
                return this.matchCase("i", match)
            })
        })

        return this;
    }

    /**
     * Заменяет все "е" на украинскую версию
     */
    applyETransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(/е/g, "є").replace(/E/g, "Є").replace(/э/gi, (match) => {
                return this.matchCase("е", match)
            })
        });

        return this;
    }

    /**
     * Заменяет все "и" на "i"
     */
    applyITransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(/и/gi, (match) => {
                return this.matchCase("i", match)
            })
        });

        return this;
    }

    /**
     * Если слово начинается на "с"+согласная, заменяет "с" на "з"
     */
    applyZTransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            let r = new RegExp("^с([^" + RUSSIAN_VOWELS.join("") + "])", "i");
            return word.replace(r, (match, m1) => {
                return (this.matchCase("з", match) + m1)
            })
        });

        return this;
    }

    /**
     * Если в преобразовании появилось "ii", делаем вторую особой
     */
    applyDoubleITransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word
                .replace(/ii/g, "iї")
                .replace(/iI/g, "iЇ")
                .replace(/Ii/g, "Iї")
                .replace(/II/g, "IЇ")
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
            } else if (word === "НА") {
                return "В"
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
            return word.replace(/(ться|тся)/i, (match) => {
                return this.matchCase("тися", match)
            });
        })

        return this;
    }

    /**
     * -ть заменяем на "ти"
     */
    applyInfinitiveRule(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(/(ть$)/i, (match) => {
                return this.matchCase("ти", match)
            });
        });

        return this;
    }

    /**
     * Все "ы" заменяем на "и"
     */
    applyAbsentLetterRule(): CommunityContainedInput {
        this._input = this._input.map(word => {
            return word.replace(/ы/gi, (match) => {
                return this.matchCase("и", match)
            });
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

    /**
     * Предлог "на" под запретом - автозамена на "в"
     */
    applySingleVowelWordTransformation(): CommunityContainedInput {
        this._input = this._input.map(word => {
            let r = new RegExp("([" + BASIC_RUSSIAN_VOWELS.join("") + "]{1})(?!.*[" + RUSSIAN_VOWELS.join('') + "])(?=.)", "gi")
            return word.replace(r, (match) => {
                return this.matchCase("i", match)
            });
        })

        return this;
    }

    toString(): string {
        return this._input.join(" ");
    }
}
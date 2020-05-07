import CommunityContainedInput from "./CommunityContainedInput";
import { BASIC_RUSSIAN_VOWELS, RUSSIAN_VOWELS } from "./CommunityContainedInput"
import { assert } from "chai";

describe('CommunityContainedInput', () => {
    describe('applyZTransformation', () => {
        it("should transform 'с' to 'з'", () => {
            let output = new CommunityContainedInput("сходи");
            output.applyZTransformation();
            assert.strictEqual(output.toString(), "зходи");
        })

        it("should transform 'с' to 'з' and keep the case", () => {
            let output = new CommunityContainedInput("Сходи");
            output.applyZTransformation();
            assert.strictEqual(output.toString(), "Зходи");
        })

        it("should NOT transform 'с' to 'з' if it's followed by a vowel", () => {
            let output = new CommunityContainedInput("собака");
            output.applyZTransformation();
            assert.strictEqual(output.toString(), "собака");
        })

        it("should NOT transform 'с' to 'з' if it's in the middle of the word", () => {
            let output = new CommunityContainedInput("обсос");
            output.applyZTransformation();
            assert.strictEqual(output.toString(), "обсос");
        })
    })

    describe('applyETransformation', () => {
        it("should transform 'e' to 'є'", () => {
            let output = new CommunityContainedInput("перевод");
            output.applyETransformation();
            assert.strictEqual(output.toString(), "пєрєвод");
        })

        it("should transform 'e' to 'є' and keep the case", () => {
            let output = new CommunityContainedInput("ПЕРЕВОД");
            output.applyETransformation();
            assert.strictEqual(output.toString(), "ПЄРЄВОД");
        })

        it("should transform 'e' to 'є' in the beginning of the word", () => {
            let output = new CommunityContainedInput("еретик");
            output.applyETransformation();
            assert.strictEqual(output.toString(), "єрєтик");
        })

        it("should transform 'e' to 'є' in the end of the word", () => {
            let output = new CommunityContainedInput("стране");
            output.applyETransformation();
            assert.strictEqual(output.toString(), "странє");
        })
    })

    describe('applyITransformation', () => {
        it("should transform 'и' to 'i'", () => {
            let output = new CommunityContainedInput("вино");
            output.applyITransformation();
            assert.strictEqual(output.toString(), "вiно");
        })

        it("should transform 'и' to 'i' and keep the case", () => {
            let output = new CommunityContainedInput("ВИНО");
            output.applyITransformation();
            assert.strictEqual(output.toString(), "ВIНО");
        })

        it("should transform 'и' to 'i' in the beginning of the word", () => {
            let output = new CommunityContainedInput("игра");
            output.applyITransformation();
            assert.strictEqual(output.toString(), "iгра");
        })

        it("should transform 'и' to 'i' in the end of the word", () => {
            let output = new CommunityContainedInput("пили");
            output.applyITransformation();
            assert.strictEqual(output.toString(), "пiлi");
        })
    })

    describe('applyVowelTransformation', () => {
        it("should transform a basic vowel to 'i'", () => {
            let output = new CommunityContainedInput("жопа");
            output.applyVowelsTransformation();
            assert.strictEqual(output.toString(), "жiпа");
        })

        it("should transform a basic vowel to 'i' and keep the case", () => {
            let output = new CommunityContainedInput("ЖОПА");
            output.applyVowelsTransformation();
            assert.strictEqual(output.toString(), "ЖIПА");
        })

        it("should NOT transform a basic vowel to 'i' if it is the last vowel in the word", () => {
            let output = new CommunityContainedInput("картошка");
            output.applyVowelsTransformation();
            assert.strictEqual(output.toString(), "кiртiшка");
        })


        it("should NOT transform a vowel to 'i' if it is not basic", () => {
            let nonBasicVowels = RUSSIAN_VOWELS.filter((l) => !BASIC_RUSSIAN_VOWELS.includes(l))
            for (let l in nonBasicVowels) {
                let output = new CommunityContainedInput(`карт${l}шка`);
                output.applyVowelsTransformation();
                assert.strictEqual(output.toString(), `кiрт${l}шка`);
            }
        })
    })

    describe('applyDoubleITransformation', () => {
        it("should transform 'ii' into 'iї'", () => {
            let output = new CommunityContainedInput("вiiбражение");
            output.applyDoubleITransformation();
            assert.strictEqual(output.toString(), "вiїбражение");
        })

        it("should transform 'ii' into 'iї' and keep the case", () => {
            let output = new CommunityContainedInput("ВIIБРАЖЕНИЕ");
            output.applyDoubleITransformation();
            assert.strictEqual(output.toString(), "ВIЇБРАЖЕНИЕ");
        })

        it("should transform 'ii' into 'iї' if it's in the beginning of the word", () => {
            let output = new CommunityContainedInput("iiгова");
            output.applyDoubleITransformation();
            assert.strictEqual(output.toString(), "iїгова");
        })

        it("should transform 'ii' into 'iї' if it's in the end of the word", () => {
            let output = new CommunityContainedInput("счастливii");
            output.applyDoubleITransformation();
            assert.strictEqual(output.toString(), "счастливiї");
        })
    })

    describe('applyDoubleLetterTransformation', () => {
        it("should transform double letter into a single letter", () => {
            let output = new CommunityContainedInput("восстание");
            output.applyDoubleLetterTransformation();
            assert.strictEqual(output.toString(), "востание");
        })

        it("should transform double letter into a single letter and keep the case", () => {
            let output = new CommunityContainedInput("ВОССТАНИЕ");
            output.applyDoubleLetterTransformation();
            assert.strictEqual(output.toString(), "ВОСТАНИЕ");
        })

        it("should transform double letter into a single letter if it's in the beginning of the word", () => {
            let output = new CommunityContainedInput("введение");
            output.applyDoubleLetterTransformation();
            assert.strictEqual(output.toString(), "ведение");
        })

        it("should transform double letter into a single letter if it's in the end of the word", () => {
            let output = new CommunityContainedInput("компресс");
            output.applyDoubleLetterTransformation();
            assert.strictEqual(output.toString(), "компрес");
        })
    })

    describe('applyVNaTransformation', () => {
        it("should replace preposition 'в' with 'на'", () => {
            let output = new CommunityContainedInput("летим на восток");
            output.applyVNaTransformation();
            assert.strictEqual(output.toString(), "летим в восток");
        })

        it("should replace preposition 'в' with 'на' and keep the case", () => {
            let output = new CommunityContainedInput("ЛЕТИМ НА ВОСТОК");
            output.applyVNaTransformation();
            assert.strictEqual(output.toString(), "ЛЕТИМ В ВОСТОК");
        })

        it("should NOT replace 'в' with 'на' if it's a part of a word", () => {
            let output = new CommunityContainedInput("вовсе");
            output.applyVNaTransformation();
            assert.strictEqual(output.toString(), "вовсе");
        })
    })

    describe('applyDoubleConsonantTransformation', () => {
        it("should replace consonant+'ь'+vowel with (double consonant)+vowel", () => {
            let output = new CommunityContainedInput("свинья");
            output.applyDoubleConsonantTransformation();
            assert.strictEqual(output.toString(), "свиння");
        })

        it("should replace consonant+'ь'+vowel with (double consonant)+vowel and keep the case", () => {
            let output = new CommunityContainedInput("ЖИТЬЯ");
            output.applyDoubleConsonantTransformation();
            assert.strictEqual(output.toString(), "ЖИТТЯ");
        })

        it("should NOT replace consonant+'ь'+consonant with (double consonant)+consonant", () => {
            let output = new CommunityContainedInput("лепьп");
            output.applyDoubleConsonantTransformation();
            assert.strictEqual(output.toString(), "лепьп");
        })
    })

    describe('applyTisyaTransformation', () => {
        it("should transform word ending 'ться' to 'тися'", () => {
            let output = new CommunityContainedInput("сбегаться");
            output.applyTisyaTransformation();
            assert.strictEqual(output.toString(), "сбегатися");
        })

        it("should transform word ending 'тся' to 'тися'", () => {
            let output = new CommunityContainedInput("спишутся");
            output.applyTisyaTransformation();
            assert.strictEqual(output.toString(), "спишутися");
        })

        it("should transform word ending 'ться' to 'тися' and keep the case", () => {
            let output = new CommunityContainedInput("СБЕГАТЬСЯ");
            output.applyTisyaTransformation();
            assert.strictEqual(output.toString(), "СБЕГАТИСЯ");
        })

        it("should transform word ending 'тся' to 'тися' and keep the case", () => {
            let output = new CommunityContainedInput("СПИШУТСЯ");
            output.applyTisyaTransformation();
            assert.strictEqual(output.toString(), "СПИШУТИСЯ");
        })
    })

    describe('applyInfinitiveTransformation', () => {
        it("should transform word ending 'ть' to 'ти'", () => {
            let output = new CommunityContainedInput("сбегать");
            output.applyInfinitiveTransformation();
            assert.strictEqual(output.toString(), "сбегати");
        })

        it("should transform word ending 'ть' to 'ти' and keep the case", () => {
            let output = new CommunityContainedInput("СБЕГАТЬ");
            output.applyInfinitiveTransformation();
            assert.strictEqual(output.toString(), "СБЕГАТИ");
        })

        it("should NOT transform word ending 'ть' to 'ти' if it's not in the end of the word", () => {
            let output = new CommunityContainedInput("сбегаться");
            output.applyInfinitiveTransformation();
            assert.strictEqual(output.toString(), "сбегаться");
        })
    })

    describe('applyAbsentLetterTransformation', () => {
        it("should transform 'ы' to 'и'", () => {
            let output = new CommunityContainedInput("рыба");
            output.applyAbsentLetterTransformation();
            assert.strictEqual(output.toString(), "риба");
        })

        it("should transform 'ы' to 'и' and keep the case", () => {
            let output = new CommunityContainedInput("РЫБА");
            output.applyAbsentLetterTransformation();
            assert.strictEqual(output.toString(), "РИБА");
        })

        it("should transform 'ы' to 'и' in the beginning of the word", () => {
            let output = new CommunityContainedInput("ых");
            output.applyAbsentLetterTransformation();
            assert.strictEqual(output.toString(), "их");
        })

        it("should transform 'ы' to 'и' in the end of the word", () => {
            let output = new CommunityContainedInput("псы");
            output.applyAbsentLetterTransformation();
            assert.strictEqual(output.toString(), "пси");
        })
    })

    describe('applyApostropheTransformation', () => {
        it("should transform `ь` to  `'`", () => {
            let output = new CommunityContainedInput("пьеза");
            output.applyApostropheTransformation();
            assert.strictEqual(output.toString(), "п'еза");
        })

        it("should transform `ъ` to  `'`", () => {
            let output = new CommunityContainedInput("подъезд");
            output.applyApostropheTransformation();
            assert.strictEqual(output.toString(), "под'езд");
        })

        it("should transform `ь` to  `'` in the end of the word", () => {
            let output = new CommunityContainedInput("ввысь");
            output.applyApostropheTransformation();
            assert.strictEqual(output.toString(), "ввыс'");
        })
    })

    describe('applySingleVowelWordTransformation', () => {
        it("should transform a vowel to 'i' if it's the only one in the word", () => {
            let output = new CommunityContainedInput("пас");
            output.applySingleVowelWordTransformation();
            assert.strictEqual(output.toString(), "пiс");
        })

        it("should transform a vowel to 'i' if it's the only one in the word and keep the case", () => {
            let output = new CommunityContainedInput("ПАС");
            output.applySingleVowelWordTransformation();
            assert.strictEqual(output.toString(), "ПIС");
        })

        it("should transform a vowel to 'i' if it's the only one in the word, and it's in the beginning", () => {
            let output = new CommunityContainedInput("акт");
            output.applySingleVowelWordTransformation();
            assert.strictEqual(output.toString(), "iкт");
        })

        it("should NOT transform a vowel to 'i' if it's NOT the only one in the word", () => {
            let output = new CommunityContainedInput("ваза");
            output.applySingleVowelWordTransformation();
            assert.strictEqual(output.toString(), "ваза");
        })

        it("should NOT transform a vowel to 'i' if it is the only one in the word, but not basic", () => {
            let nonBasicVowels = RUSSIAN_VOWELS.filter((l) => !BASIC_RUSSIAN_VOWELS.includes(l))
            for (let l in nonBasicVowels) {
                let output = new CommunityContainedInput(`п${l}с`);
                output.applySingleVowelWordTransformation();
                assert.strictEqual(output.toString(), `п${l}с`);
            }
        })
    })
});

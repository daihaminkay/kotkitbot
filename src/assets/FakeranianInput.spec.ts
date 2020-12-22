import FakeranianInput from "./FakeranianInput";
import { BASIC_RUSSIAN_VOWELS, RUSSIAN_VOWELS } from "./FakeranianInput";
import { assert } from "chai";

describe("CommunityContainedInput", () => {
    describe("applyZTransformation", () => {
        it("should transform 'с' to 'з'", () => {
            const output = new FakeranianInput();
            const res = output.applyZTransformation(["сходи"]);
            assert.strictEqual(output.toString(res), "зходи");
        });

        it("should transform 'с' to 'з' and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applyZTransformation(["Сходи"]);
            assert.strictEqual(output.toString(res), "Зходи");
        });

        it("should NOT transform 'с' to 'з' if it's followed by a vowel", () => {
            const output = new FakeranianInput();
            const res = output.applyZTransformation(["собака"]);
            assert.strictEqual(output.toString(res), "собака");
        });

        it("should NOT transform 'с' to 'з' if it's in the middle of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyZTransformation(["обсос"]);
            assert.strictEqual(output.toString(res), "обсос");
        });
    });

    describe("applyETransformation", () => {
        it("should transform 'e' to 'є'", () => {
            const output = new FakeranianInput();
            const res = output.applyETransformation(["перевод"]);
            assert.strictEqual(output.toString(res), "пєрєвод");
        });

        it("should transform 'e' to 'є' and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applyETransformation(["ПЕРЕВОД"]);
            assert.strictEqual(output.toString(res), "ПЄРЄВОД");
        });

        it("should transform 'e' to 'є' in the beginning of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyETransformation(["еретик"]);
            assert.strictEqual(output.toString(res), "єрєтик");
        });

        it("should transform 'e' to 'є' in the end of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyETransformation(["стране"]);
            assert.strictEqual(output.toString(res), "странє");
        });
    });

    describe("applyITransformation", () => {
        it("should transform 'и' to 'i'", () => {
            const output = new FakeranianInput();
            const res = output.applyITransformation(["вино"]);
            assert.strictEqual(output.toString(res), "вiно");
        });

        it("should transform 'и' to 'i' and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applyITransformation(["ВИНО"]);
            assert.strictEqual(output.toString(res), "ВIНО");
        });

        it("should transform 'и' to 'i' in the beginning of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyITransformation(["игра"]);
            assert.strictEqual(output.toString(res), "iгра");
        });

        it("should transform 'и' to 'i' in the end of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyITransformation(["пили"]);
            assert.strictEqual(output.toString(res), "пiлi");
        });
    });

    describe("applyVowelTransformation", () => {
        it("should transform a basic vowel to 'i'", () => {
            const output = new FakeranianInput();
            const res = output.applyVowelsTransformation(["жопа"]);
            assert.strictEqual(output.toString(res), "жiпа");
        });

        it("should transform a basic vowel to 'i' and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applyVowelsTransformation(["ЖОПА"]);
            assert.strictEqual(output.toString(res), "ЖIПА");
        });

        it("should NOT transform a basic vowel to 'i' if it is the last vowel in the word", () => {
            const output = new FakeranianInput();
            const res = output.applyVowelsTransformation(["картошка"]);
            assert.strictEqual(output.toString(res), "кiртiшка");
        });


        it("should NOT transform a vowel to 'i' if it is not basic", () => {
            const nonBasicVowels = RUSSIAN_VOWELS.filter((l) => !BASIC_RUSSIAN_VOWELS.includes(l));
            for (const l in nonBasicVowels) {
                const output = new FakeranianInput();
                const res = output.applyVowelsTransformation([`карт${l}шка`]);
                assert.strictEqual(output.toString(res), `кiрт${l}шка`);
            }
        });
    });

    describe("applyDoubleITransformation", () => {
        it("should transform 'ii' into 'iї'", () => {
            const output = new FakeranianInput();
            const res = output.applyDoubleITransformation(["вiiбражение"]);
            assert.strictEqual(output.toString(res), "вiїбражение");
        });

        it("should transform 'ii' into 'iї' and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applyDoubleITransformation(["ВIIБРАЖЕНИЕ"]);
            assert.strictEqual(output.toString(res), "ВIЇБРАЖЕНИЕ");
        });

        it("should transform 'ii' into 'iї' if it's in the beginning of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyDoubleITransformation(["iiгова"]);
            assert.strictEqual(output.toString(res), "iїгова");
        });

        it("should transform 'ii' into 'iї' if it's in the end of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyDoubleITransformation(["счастливii"]);
            assert.strictEqual(output.toString(res), "счастливiї");
        });
    });

    describe("applyDoubleLetterTransformation", () => {
        it("should transform double letter into a single letter", () => {
            const output = new FakeranianInput();
            const res = output.applyDoubleLetterTransformation(["восстание"]);
            assert.strictEqual(output.toString(res), "востание");
        });

        it("should transform double letter into a single letter and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applyDoubleLetterTransformation(["ВОССТАНИЕ"]);
            assert.strictEqual(output.toString(res), "ВОСТАНИЕ");
        });

        it("should transform double letter into a single letter if it's in the beginning of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyDoubleLetterTransformation(["введение"]);
            assert.strictEqual(output.toString(res), "ведение");
        });

        it("should transform double letter into a single letter if it's in the end of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyDoubleLetterTransformation(["компресс"]);
            assert.strictEqual(output.toString(res), "компрес");
        });
    });

    describe("applyVNaTransformation", () => {
        it("should replace preposition 'в' with 'на'", () => {
            const output = new FakeranianInput();
            const res = output.applyVNaTransformation(["на"]);
            assert.strictEqual(output.toString(res), "в");
        });

        it("should replace preposition 'в' with 'на' and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applyVNaTransformation(["НА"]);
            assert.strictEqual(output.toString(res), "В");
        });

        it("should NOT replace 'в' with 'на' if it's a part of a word", () => {
            const output = new FakeranianInput();
            const res = output.applyVNaTransformation(["вовсе"]);
            assert.strictEqual(output.toString(res), "вовсе");
        });
    });

    describe("applyDoubleConsonantTransformation", () => {
        it("should replace consonant+'ь'+vowel with (double consonant)+vowel", () => {
            const output = new FakeranianInput();
            const res = output.applyDoubleConsonantTransformation(["свинья"]);
            assert.strictEqual(output.toString(res), "свиння");
        });

        it("should replace consonant+'ь'+vowel with (double consonant)+vowel and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applyDoubleConsonantTransformation(["ЖИТЬЯ"]);
            assert.strictEqual(output.toString(res), "ЖИТТЯ");
        });

        it("should NOT replace consonant+'ь'+consonant with (double consonant)+consonant", () => {
            const output = new FakeranianInput();
            const res = output.applyDoubleConsonantTransformation(["лепьп"]);
            assert.strictEqual(output.toString(res), "лепьп");
        });
    });

    describe("applyTisyaTransformation", () => {
        it("should transform word ending 'ться' to 'тися'", () => {
            const output = new FakeranianInput();
            const res = output.applyTisyaTransformation(["сбегаться"]);
            assert.strictEqual(output.toString(res), "сбегатися");
        });

        it("should transform word ending 'тся' to 'тися'", () => {
            const output = new FakeranianInput();
            const res = output.applyTisyaTransformation(["спишутся"]);
            assert.strictEqual(output.toString(res), "спишутися");
        });

        it("should transform word ending 'ться' to 'тися' and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applyTisyaTransformation(["СБЕГАТЬСЯ"]);
            assert.strictEqual(output.toString(res), "СБЕГАТИСЯ");
        });

        it("should transform word ending 'тся' to 'тися' and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applyTisyaTransformation(["СПИШУТСЯ"]);
            assert.strictEqual(output.toString(res), "СПИШУТИСЯ");
        });
    });

    describe("applyInfinitiveTransformation", () => {
        it("should transform word ending 'ть' to 'ти'", () => {
            const output = new FakeranianInput();
            const res = output.applyInfinitiveTransformation(["сбегать"]);
            assert.strictEqual(output.toString(res), "сбегати");
        });

        it("should transform word ending 'ть' to 'ти' and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applyInfinitiveTransformation(["СБЕГАТЬ"]);
            assert.strictEqual(output.toString(res), "СБЕГАТИ");
        });

        it("should NOT transform word ending 'ть' to 'ти' if it's not in the end of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyInfinitiveTransformation(["сбегаться"]);
            assert.strictEqual(output.toString(res), "сбегаться");
        });
    });

    describe("applyAbsentLetterTransformation", () => {
        it("should transform 'ы' to 'и'", () => {
            const output = new FakeranianInput();
            const res = output.applyAbsentLetterTransformation(["рыба"]);
            assert.strictEqual(output.toString(res), "риба");
        });

        it("should transform 'ы' to 'и' and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applyAbsentLetterTransformation(["РЫБА"]);
            assert.strictEqual(output.toString(res), "РИБА");
        });

        it("should transform 'ы' to 'и' in the beginning of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyAbsentLetterTransformation(["ых"]);
            assert.strictEqual(output.toString(res), "их");
        });

        it("should transform 'ы' to 'и' in the end of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyAbsentLetterTransformation(["псы"]);
            assert.strictEqual(output.toString(res), "пси");
        });
    });

    describe("applyApostropheTransformation", () => {
        it("should transform `ь` to  `'`", () => {
            const output = new FakeranianInput();
            const res = output.applyApostropheTransformation(["пьеза"]);
            assert.strictEqual(output.toString(res), "п'еза");
        });

        it("should transform `ъ` to  `'`", () => {
            const output = new FakeranianInput();
            const res = output.applyApostropheTransformation(["подъезд"]);
            assert.strictEqual(output.toString(res), "под'езд");
        });

        it("should transform `ь` to  `'` in the end of the word", () => {
            const output = new FakeranianInput();
            const res = output.applyApostropheTransformation(["ввысь"]);
            assert.strictEqual(output.toString(res), "ввыс'");
        });
    });

    describe("applySingleVowelWordTransformation", () => {
        it("should transform a vowel to 'i' if it's the only one in the word", () => {
            const output = new FakeranianInput();
            const res = output.applySingleVowelWordTransformation(["пас"]);
            assert.strictEqual(output.toString(res), "пiс");
        });

        it("should transform a vowel to 'i' if it's the only one in the word and keep the case", () => {
            const output = new FakeranianInput();
            const res = output.applySingleVowelWordTransformation(["ПАС"]);
            assert.strictEqual(output.toString(res), "ПIС");
        });

        it("should transform a vowel to 'i' if it's the only one in the word, and it's in the beginning", () => {
            const output = new FakeranianInput();
            const res = output.applySingleVowelWordTransformation(["акт"]);
            assert.strictEqual(output.toString(res), "iкт");
        });

        it("should NOT transform a vowel to 'i' if it's NOT the only one in the word", () => {
            const output = new FakeranianInput();
            const res = output.applySingleVowelWordTransformation(["ваза"]);
            assert.strictEqual(output.toString(res), "ваза");
        });

        it("should NOT transform a vowel to 'i' if it is the only one in the word, but not basic", () => {
            const nonBasicVowels = RUSSIAN_VOWELS.filter((l) => !BASIC_RUSSIAN_VOWELS.includes(l));
            for (const l in nonBasicVowels) {
                const output = new FakeranianInput();
                const res = output.applySingleVowelWordTransformation([`п${l}с`]);
                assert.strictEqual(output.toString(res), `п${l}с`);
            }
        });
    });
});

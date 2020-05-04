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

    //TODO: rest of the test
});

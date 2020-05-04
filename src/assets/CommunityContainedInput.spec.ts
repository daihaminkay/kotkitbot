import CommunityContainedInput from "./CommunityContainedInput";
import { assert } from "chai";

describe('CommunityContainedInput', () => {
    describe('applyZTransformation', () => {
        it("should transform 'с' to 'з'", () => {
            let output = new CommunityContainedInput("сходи");
            output.applyZTransformation();
            assert.strictEqual(output.toString(), "зходи")
        })

        it("should NOT transform 'с' to 'з' if it's followed by a vowel", () => {
            let output = new CommunityContainedInput("собака");
            output.applyZTransformation();
            assert.strictEqual(output.toString(), "собака")
        })

        it("should NOT transform 'с' to 'з' if it's in the middle of the word", () => {
            let output = new CommunityContainedInput("обсос");
            output.applyZTransformation();
            assert.strictEqual(output.toString(), "обсос")
        })
    })

    describe('applyETransformation', () => {
        it("should transform 'e' to 'є'", () => {
            let output = new CommunityContainedInput("перевод");
            output.applyETransformation();
            assert.strictEqual(output.toString(), "пєрєвод")
        })

        it("should transform 'e' to 'є' in the beginning of the word", () => {
            let output = new CommunityContainedInput("еретик");
            output.applyETransformation();
            assert.strictEqual(output.toString(), "єрєтик")
        })

        it("should transform 'e' to 'є' in the end of the word", () => {
            let output = new CommunityContainedInput("стране");
            output.applyETransformation();
            assert.strictEqual(output.toString(), "странє")
        })
    })
});

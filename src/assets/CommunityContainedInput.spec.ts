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
});

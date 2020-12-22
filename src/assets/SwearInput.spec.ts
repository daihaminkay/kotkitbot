import { assert } from "chai";
import SwearInput from "./SwearInput";

describe("SwearInput", () => {
    let swearInput: SwearInput;

    beforeEach(() => {
        swearInput = new SwearInput();
    });

    describe("processMessage", () => {
        it("should translate regular ending", () => {
            const message = "привет.";
            const expected = "привет епты";
            assert.strictEqual(swearInput.processMessage(message), expected);
        });

        it("should translate stressed ending", () => {
            const message = "привет!";
            const expected = "привет епты нахуй";
            assert.strictEqual(swearInput.processMessage(message), expected);
        });

        it("should translate mid punctuation", () => {
            const message = "привет, ты как";
            const expected = "привет бля ты как";
            assert.strictEqual(swearInput.processMessage(message), expected);
        });

        it("should translate complex messages", () => {
            const message = "привет, ты как? я так скучал! жаль, тебя не было...";
            const expected = "привет бля ты как епты нахуй я так скучал епты нахуй жаль бля тебя не было епты";
            assert.strictEqual(swearInput.processMessage(message), expected);
        });

    });
});
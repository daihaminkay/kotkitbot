import { assert } from "chai";
import LeetInput from "./LeetInput";

describe("LeetInput", () => {
    let leetInput;

    beforeEach(() => {
        leetInput = new LeetInput();
    });

    describe("getDescription()", () => {
        it("should return correct result", () => {
            assert.strictEqual(leetInput.getDescription(), "m4k35 y0u2 73x7 100k 11k3 7h15.");
        });
    });

    describe("getThumbnailUrl()", () => {
        it("should return correct result", () => {
            assert.strictEqual(leetInput.getThumbnailUrl(), "https://lh3.googleusercontent.com/proxy/2zz2eHImhqyePfgOCNVmH9UPqaGktuCKgwzb0L9PcA-jzoB-STitf4nWEOiVvzv7szlN5JLQp6dmSzVAmw3xmGWiKGN0ZKNRzc5xMt6TmmhvsvOI");
        });
    });

    describe("processMessage()", () => {
        it("should translate special chars", () => {
            const message = "aegiost";
            const expected = "4361057";
            assert.strictEqual(leetInput.processMessage(message), expected);
        });
        it("should not translate regular chars", () => {
            const message = "bcdfhjklmnpqruvwxyz!(){}";
            const expected = "bcdfhjklmnpqruvwxyz!(){}";
            assert.strictEqual(leetInput.processMessage(message), expected);
        });
        it("should translate message", () => {
            const message = "Makes your text look like this!";
            const expected = "m4k35 y0ur 73x7 l00k l1k3 7h15!";
            assert.strictEqual(leetInput.processMessage(message), expected);
        });
    });
});
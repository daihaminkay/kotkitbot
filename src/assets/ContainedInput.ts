export default class ContainedInput {
    private _input: string;

    constructor(input: string) {
        this._input = input;
    }

    applyKitRule(): ContainedInput {
        this._input = this._input.replace(/о/gi, (match: string) => {
            const matchChar = match.charCodeAt(0);
            return matchChar === 1054 ? "I" : "i";
        })

        return this;
    }

    applyVulitsaRule(): ContainedInput {
        this._input = this._input.replace(/^у/i, (match: string) => {
            const matchChar = match.charCodeAt(0);
            return matchChar === 1059 ? "Ву" : "ву";
        })

        return this;
    }

    applyTisyaRule(): ContainedInput {
        this._input = this._input.replace(/(ться|тся)/i, "тися")

        return this;
    }

    applyInfinitiveRule(): ContainedInput {
        this._input = this._input.replace(/(ть$)/i, "ти")

        return this;
    }

    applyAbsentLetterRule(): ContainedInput {
        this._input = this._input.replace(/и/gi, "i").replace(/ы/gi, "и")

        return this;
    }

    toString(): string {
        return this._input;
    }
}
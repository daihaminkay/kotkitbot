import { createMockPool, createMockQueryResult, DataIntegrityError, NotFoundError } from "slonik";
import { DataRetainer } from "./DataRetainer";
import { stub } from "sinon";
import { assert, expect } from "chai";

describe("DataRetainer", () => {
    let retainer: DataRetainer;
    const queryResult = stub();
    before(() => {
        retainer = new DataRetainer("fake_url", createMockPool({
            query: queryResult
        }));
    });
    describe("getUserLanguageMapping", () => {

        it("should return user language mapping", async () => {
            queryResult.resolves(createMockQueryResult([{ user_id: "fake_user", language: "lang1" }]));
            const mapping = await retainer.getUserLanguageMapping("fake_user");
            expect(mapping).to.be.equal("lang1");
        });

        it("should throw an error if more than 1 mapping was returned", async () => {
            queryResult.resolves(createMockQueryResult([{ user_id: "fake_user", language: "lang1" }, { user_id: "fake_user", language: "lang2" }]));
            try {
                await retainer.getUserLanguageMapping("fake_user_id");
                assert.fail("Should have failed");
            } catch (e) {
                expect(e).to.be.instanceOf(DataIntegrityError);
            }
        });

        it("should throw an error if no mappings were returned", async () => {
            queryResult.resolves(createMockQueryResult([]));
            try {
                await retainer.getUserLanguageMapping("fake_user_id");
                assert.fail("Should have failed");
            } catch (e) {
                expect(e).to.be.instanceOf(NotFoundError);
            }
        });
    });

    describe("getUsageStatistics", () => {
        it("should return usage statistics, if there is just 1 user", async () => {
            const userRecords = [{
                user_id: "fake_user",
                user_handle: "user",
                role: "human",
                call_count: 1
            }];
            queryResult.resolves(createMockQueryResult(userRecords));
            const stats = await retainer.getUsageStatistics();
            expect(stats).to.be.deep.equal(userRecords);
        });

        it("should return all usage statistics", async () => {
            const userRecords = [
                {
                    user_id: "fake_user",
                    user_handle: "user",
                    role: "human",
                    call_count: 1
                },
                {
                    user_id: "fake_user2",
                    user_handle: "user2",
                    role: "human",
                    call_count: 1
                }
            ];
            queryResult.resolves(createMockQueryResult(userRecords));
            const stats = await retainer.getUsageStatistics();
            expect(stats).to.be.deep.equal(userRecords);
        });

        it("should throw an error if no users were returned", async () => {
            queryResult.resolves(createMockQueryResult([]));
            try {
                await retainer.getUsageStatistics();
                assert.fail("Should have failed");
            } catch (e) {
                expect(e).to.be.instanceOf(NotFoundError);
            }
        });
    });
});
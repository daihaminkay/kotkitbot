import { sql, createPool, DatabasePoolType } from "slonik";
import { UniqueUser, UserLanguageChoice } from "./DataModels";

export class DataRetainer {
    private pool: DatabasePoolType;
    constructor(databaseUrl: string, pool?: DatabasePoolType) {
        this.pool = pool ?? createPool(databaseUrl + "?ssl=1");
    }

    async initialize(): Promise<void> {
        const createUserTableQuery = sql`
                CREATE TABLE IF NOT EXISTS unique_users (
                    user_id text,
                    user_handle text,
                    role text,
                    call_count int4,
                    PRIMARY KEY(user_id)
                )`;
        await this.pool.query(createUserTableQuery);
        console.log("Initialized user table");

        const createLanguageMapQuery = sql`
                CREATE TABLE IF NOT EXISTS user_language_choice (
                    user_id text UNIQUE,
                    language text,
                    CONSTRAINT fk_user_id
                        FOREIGN KEY(user_id) 
	                        REFERENCES unique_users(user_id)
                )`;
        await this.pool.query(createLanguageMapQuery);
        console.log("Initialized user-language mapping");
    }

    async addUsageRecord(userId: string, userHandle: string, clientRole: string): Promise<void> {
        const insertQuery = sql`INSERT INTO unique_users VALUES (${userId}, ${userHandle}, ${clientRole}, 1) ON CONFLICT (user_id) DO UPDATE SET call_count = unique_users.call_count + 1`;
        await this.pool.query(insertQuery);
    }

    async setUserLanguageMapping(userId: string, language: string): Promise<void> {
        const insertQuery = sql`INSERT INTO user_language_choice VALUES (${userId}, ${language}) ON CONFLICT (user_id) DO UPDATE SET language = ${language}`;
        await this.pool.query(insertQuery);
    }

    async getUserLanguageMapping(clientId: string): Promise<string> {
        const insertQuery = sql<UserLanguageChoice>`SELECT language FROM user_language_choice WHERE user_id = ${clientId} LIMIT 1`;
        const result = await this.pool.one<UserLanguageChoice>(insertQuery);
        return result.language;
    }

    async getUsageStatistics(): Promise<readonly UniqueUser[]> {
        const insertQuery = sql<UniqueUser>`SELECT * FROM unique_users ORDER BY call_count DESC LIMIT 20`;
        return await this.pool.many<UniqueUser>(insertQuery);
    }

}
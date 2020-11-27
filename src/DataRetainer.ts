import { Pool } from 'pg';

export class DataRetainer {
    private pool: Pool;
    constructor(databaseUrl: string) {
        this.pool = new Pool({
            connectionString: databaseUrl
        });
    }

    async initialize() {
        const client = await this.pool.connect();
        try {
            const createUserTableQuery = `
                CREATE TABLE IF NOT EXISTS unique_users (
                    user_id text,
                    user_handle text,
                    role text,
                    call_count int4,
                    PRIMARY KEY(user_id)
                )`
            await client.query(createUserTableQuery);
            console.log("Initialized user table");

            const createLanguageMapQuery = `
                CREATE TABLE IF NOT EXISTS user_language_choice (
                    user_id text UNIQUE,
                    language text,
                    CONSTRAINT fk_user_id
                        FOREIGN KEY(user_id) 
	                        REFERENCES unique_users(user_id)
                )`
            await client.query(createLanguageMapQuery);
            console.log("Initialized user-language mapping");
        } catch (err) {
            console.log(`Failed to initialize the database: ${err}`);
        } finally {
            client.release();
        }
    }

    async addUsageRecord(userId: string, userHandle: string, clientRole: string) {
        const client = await this.pool.connect();
        try {
            const insertQuery = `INSERT INTO unique_users VALUES ('${userId}', '${userHandle}', '${clientRole}', 1) ` +
                `ON CONFLICT (user_id) DO UPDATE SET call_count = unique_users.call_count + 1`
            await client.query(insertQuery);
        } catch (err) {
            console.error(`Failed to add/update user record: ${err}`);
        } finally {
            client.release();
        }
    }

    async setUserLanguageMapping(userId: string, language: string) {
        const client = await this.pool.connect();
        try {
            const insertQuery = `INSERT INTO user_language_choice VALUES ('${userId}', '${language}') ` +
                `ON CONFLICT (user_id) DO UPDATE SET language = '${language}'`
            await client.query(insertQuery);
        } catch (err) {
            console.error(`Failed to add new language mapping: ${err}`);
        } finally {
            client.release();
        }
    }

    async getUserLanguageMapping(clientId: string): Promise<string> {
        const client = await this.pool.connect()
        try {
            const insertQuery = `SELECT language FROM user_language_choice WHERE user_id = '${clientId}' LIMIT 1`
            const result = await client.query(insertQuery);
            return result.rows[0]?.language
        } catch (err) {
            console.error(`Failed to get the language mapping: ${err}`);
        } finally {
            client.release();
        }
    }

    async getUsageStatistics() {
        const client = await this.pool.connect()
        try {
            const insertQuery = "SELECT * FROM unique_users ORDER BY call_count DESC LIMIT 20"
            const result = await client.query(insertQuery);
            return result.rows
        } catch (err) {
            console.error(`Failed to access the database: ${err}`);
            return err;
        } finally {
            client.release();
        }
    }

}
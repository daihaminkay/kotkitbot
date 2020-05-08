import { Pool } from 'pg';

export class DataRetainer {
    private pool: Pool;
    constructor(databaseUrl: string) {
        this.pool = new Pool({
            connectionString: databaseUrl
        });
    }

    async addUsageRecord(clientId: string, clientRole: string) {
        try {
            const client = await this.pool.connect()
            const insertQuery = `INSERT INTO unique_users VALUES ('${clientId}', '${clientRole}', 1) ` +
                `ON CONFLICT (user_id) DO UPDATE SET call_count = unique_users.call_count + 1`
            await client.query(insertQuery);
            client.release();
        } catch (err) {
            console.error(`Failed to update the database: ${err}`);
        }
    }

    async getUsageStatistics() {
        try {
            const client = await this.pool.connect()
            const insertQuery = "SELECT * FROM unique_users ORDER BY call_count DESC LIMIT 20"
            const result = await client.query(insertQuery);
            client.release();
            return result.rows
        } catch (err) {
            console.error(`Failed to access the database: ${err}`);
            return err;
        }
    }

}
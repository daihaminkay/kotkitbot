import { Pool } from 'pg';

export class DataRetainer {
    private pool: Pool;
    constructor(databaseUrl: string) {
        this.pool = new Pool({
            connectionString: databaseUrl,
            ssl: true
        });
    }

    async addUsageRecord(clientId: string, clientRole: string) {
        try {
            const client = await this.pool.connect()
            const insertQuery = `INSERT INTO unique_users VALUES ('${clientId}', '${clientRole}', 1) ` +
                `ON CONFLICT (user_id) DO UPDATE SET call_count = unique_users.call_count + 1`
            const result = await client.query(insertQuery);
            client.release();
        } catch (err) {
            console.error(`Failed to update the database: ${err}`);
        }
    }

}
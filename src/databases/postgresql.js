import { Client } from "pg";

export async function postgresModule() {

    const client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    try {

        await client.connect();

        console.log("Connected to PostgreSQL Successfully!");
        const result = await client.query("SELECT NOW();");

console.log("Current Database Time:");
console.log(result.rows[0].now);

await client.query(`
CREATE TABLE IF NOT EXISTS backup_logs (
    id SERIAL PRIMARY KEY,
    database_name VARCHAR(100),
    backup_time TIMESTAMP,
    status VARCHAR(20)
);
`);

console.log("backup_logs table is ready.");
await client.query(`
INSERT INTO backup_logs(database_name, backup_time, status)
VALUES ('PostgreSQL', NOW(), 'Success');
`);

console.log("Backup log inserted successfully!");
const logs = await client.query("SELECT * FROM backup_logs;");

console.log("\nBackup History:");
console.table(logs.rows);

    }
    catch (error) {

        console.log("Database Connection Failed!");
        console.log(error.message);

    }
    finally {

        await client.end();

        console.log("Database Connection Closed Successfully!");

    }

}
import { Client } from "pg";

async function createBackupLog(client, databaseName, status) {

    await client.query(
        `
        INSERT INTO backup_logs(database_name, backup_time, status)
        VALUES($1, NOW(), $2);
        `,
        [databaseName, status]
    );

    console.log("Backup log inserted successfully!");

}

async function createBackupTable(client) {

    await client.query(`
        CREATE TABLE IF NOT EXISTS backup_logs (
            id SERIAL PRIMARY KEY,
            database_name VARCHAR(100),
            backup_time TIMESTAMP,
            status VARCHAR(20)
        );
    `);

    console.log("backup_logs table is ready.");

}

async function getBackupLogs(client) {

    const logs = await client.query(
        "SELECT * FROM backup_logs ORDER BY id;"
    );

    console.log("\nBackup History:");
    console.table(logs.rows);

}

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

    const currentTimeResult = await client.query("SELECT NOW();");

    console.log("Current Database Time:");
    console.log(currentTimeResult.rows[0].now);

    await createBackupTable(client);

    await createBackupLog(
        client,
        "PostgreSQL",
        "Success"
    );

    await getBackupLogs(client);

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
import sqlite3 from "sqlite3";
import path from "path";

const databasePath = path.join(process.cwd(), "database.sqlite");

const database = new sqlite3.Database(databasePath);

export async function sqliteModule() {

    console.log("SQLite Database Path:");
console.log(databasePath);


    database.serialize(() => {
        database.run(`
            
    CREATE TABLE IF NOT EXISTS backup_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        database_name TEXT,
        backup_time TEXT,
        status TEXT
    )
`);
console.log("SQLite backup_logs table is ready.");

database.run(
    `
    INSERT INTO backup_logs (database_name, backup_time, status)
    VALUES (?, ?, ?)
    `,
    [
        "SQLite",
        new Date().toISOString(),
        "Success"
    ],
    function (error) {

        if (error) {
            console.log(error.message);
            return;
        }

        console.log("SQLite backup log inserted successfully!");

    }
);

database.all(
    "SELECT * FROM backup_logs",
    [],
    (error, rows) => {

        if (error) {
            console.log(error.message);
            return;
        }

        console.log("\nSQLite Backup History:");
        console.table(rows);

    }
);

database.close((error) => {

    if (error) {
        console.log(error.message);
        return;
    }

    console.log("SQLite Connection Closed Successfully!");

});

});

}
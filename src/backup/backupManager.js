import fs from "fs";
import path from "path";
import { exec } from "child_process";

const backupFolder = path.join(process.cwd(), "backups");

if (!fs.existsSync(backupFolder)) {

    fs.mkdirSync(backupFolder);

    console.log("Backups folder created successfully!");

} else {

    console.log("Backups folder already exists.");

}

const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-");

console.log(timestamp);

const backupFileName = `backup_${timestamp}.sql`;

console.log("Backup File Name:");
console.log(backupFileName);

const backupFilePath = path.join(
    backupFolder,
    backupFileName
);

console.log("Backup File Path:");
console.log(backupFilePath);

function createPostgresBackup() {

    const command =
        `"C:\\Program Files\\PostgreSQL\\17\\bin\\pg_dump.exe"` +
        ` -h ${process.env.DB_HOST}` +
        ` -p ${process.env.DB_PORT}` +
        ` -U ${process.env.DB_USER}` +
        ` -d ${process.env.DB_NAME}` +
        ` -F p` +
        ` -f "${backupFilePath}"`;

    console.log(command);

    exec(command, {
        env: {
            ...process.env,
            PGPASSWORD: process.env.DB_PASSWORD
        }
    }, (error, stdout, stderr) => {

        if (error) {
            console.log("Backup Failed!");
            console.log(error.message);
            return;
        }

        if (stderr) {
            console.log(stderr);
        }

        console.log("PostgreSQL Backup Created Successfully!");
        console.log("Backup saved at:");
        console.log(backupFilePath);

    });

}

function createMySQLBackup() {

    const command =
    `"C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump.exe"` +
    ` -h ${process.env.MYSQL_HOST}` +
    ` -P ${process.env.MYSQL_PORT}` +
    ` -u ${process.env.MYSQL_USER}` +
    ` ${process.env.MYSQL_DATABASE}` +
    ` --result-file="${backupFilePath}"`;

    console.log(command);

    exec(command, {
    env: {
        ...process.env,
        MYSQL_PWD: process.env.MYSQL_PASSWORD
    }
}, (error, stdout, stderr) => {

    if (error) {
        console.log("MySQL Backup Failed!");
        console.log(error.message);
        return;
    }

    if (stderr) {
        console.log(stderr);
    }

    console.log("MySQL Backup Created Successfully!");
    console.log("Backup saved at:");
    console.log(backupFilePath);

});

}

export async function backupManager(databaseType) {

    console.log(`Starting ${databaseType} Backup...`);

   switch (databaseType) {

   case "PostgreSQL":
    createPostgresBackup();
    break;
    
   case "MySQL":
    createMySQLBackup();
    break;

    case "MongoDB":
        console.log("MongoDB Backup is not implemented yet.");
        return;

    case "SQLite":
        console.log("SQLite Backup is not implemented yet.");
        return;

    default:
        console.log("Unsupported Database Type!");
        return;

}


}

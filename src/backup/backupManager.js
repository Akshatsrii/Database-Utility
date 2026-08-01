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
        ` -U postgres` +
        ` -d database_utility` +
        ` -F p` +
        ` -f "${backupFilePath}"`;

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
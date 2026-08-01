import dotenv from "dotenv";
dotenv.config();

import { createPostgresBackup } from "./backup/backupManager.js";
import { postgresModule } from "./databases/postgresql.js";

console.log("Database Backup Utility Started");
console.log("Database Host:", process.env.DB_HOST);

createPostgresBackup();

await postgresModule();
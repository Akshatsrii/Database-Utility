import dotenv from "dotenv";
dotenv.config();

import { backupManager } from "./backup/backupManager.js";
import { mongodbModule } from "./databases/mongodb.js";

console.log("Database Backup Utility Started");
console.log("Database Host:", process.env.DB_HOST);

await backupManager("PostgreSQL");

await backupManager("MySQL");
console.log("\nTesting MongoDB Connection...\n");

await mongodbModule();

await backupManager("MongoDB");
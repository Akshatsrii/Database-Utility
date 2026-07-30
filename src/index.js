import dotenv from "dotenv";
dotenv.config();

import { setupCLI } from "./cli/index.js";

// Mocking module execution if needed before DB adapters are fully ready.
// import { postgresModule } from "./databases/postgresql.js";
// postgresModule();

setupCLI();
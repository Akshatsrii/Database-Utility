# Database Backup Utility

A cross-platform CLI utility for database connection testing, backup, restore, compression, local/cloud storage, scheduling, logging, and optional Slack notifications.

Supports **PostgreSQL, MySQL, MongoDB, and SQLite**.

---

## ✨ Features

- Test database connections before running any operation
- Native backup commands (`pg_dump`, `mysqldump`, `mongodump`, SQLite file backup)
- Streaming compression/decompression (zlib)
- Full and selective restore (where supported by the DBMS/backup format)
- Local storage with organized backup folders and listing
- Google Drive upload/download for cloud storage
- Scheduled/automated backups via cron
- Activity logging (start/end time, duration, status, errors)
- Optional Slack notifications on backup success/failure

---

## 🏗️ Architecture

```
BACKUP:
USER -> CLI -> DB Selection -> Connection Test -> Backup -> Compression -> Local/Google Drive Storage -> Logs -> Slack

RESTORE:
Backup -> Download/Local -> Decompress -> DB-specific Restore -> Database
```

### Common Interfaces

| Function | Description |
|---|---|
| `testConnection(config)` | Validates DB credentials/connectivity |
| `backup(config, options)` | Runs native backup for selected DB |
| `restore(config, file, options)` | Restores a backup into a target DB |
| `compress(file)` / `decompress(file)` | Compress or decompress backup files |
| `upload(file)` | Uploads backup to configured storage (local/Google Drive) |
| `log(data)` | Records operation activity |
| `notify(message)` | Sends optional Slack notification |

---

## 📁 Project Structure

```
├── cli/
├── databases/
├── backup/
├── restore/
├── compression/
├── storage/
├── scheduler/
├── notifications/
├── logger/
├── utils/
├── backups/
├── logs/
├── config/
├── .env.example
└── .gitignore
```

---

## 👥 Team & Responsibilities

This project is built by a 3-member team over 14 days (2–3 hrs/day) using parallel development on separate feature branches.

| Member | Responsibility | Branch |
|---|---|---|
| **Riya Bansal** | Database Connectivity + Backup Engine — PostgreSQL, MySQL, MongoDB, SQLite adapters, connection testing, native backup commands, Backup Manager | `feature/database-backup` |
| **Shahnaaj Khan** | Restore + Compression + Logging — compression/decompression, restore flows, selective restore, activity logging | `feature/restore-compression` |
| **Akshat Srivastava** | CLI + Storage + Automation — CLI commands, local storage, scheduler, Google Drive, Slack notifications | `feature/cli-automation` |

---

## 🗓️ Development Roadmap

### Phase 0 — Common Setup (Day 1)
- Initialize Node.js project and GitHub repository
- Create module folders (`cli`, `databases`, `backup`, `restore`, `compression`, `storage`, `scheduler`, `notifications`, `logger`, `utils`, `backups`, `logs`, `config`)
- Add `.env.example` and `.gitignore` (never commit real secrets)
- Create feature branches
- Finalize common function inputs/outputs and error format

### Akshat Srivastava — Database Connectivity + Backup Engine
| Day | Task |
|---|---|
| 2 | PostgreSQL adapter — connection testing with clear error reporting |
| 3 | PostgreSQL backup via `pg_dump`, timestamped and verified output |
| 4 | Backup Manager — selects the correct DB adapter, extendable design |
| 5 | MySQL connection testing + `mysqldump` backup |
| 6 | MongoDB connection testing + `mongodump` backup/archive |
| 7 | SQLite backup + centralized error handling (credentials, DB unavailable, missing native tool, permissions, file errors) |

### Riya Bansal — Restore + Compression + Logging
| Day | Task |
|---|---|
| 2 | Streaming compression/decompression using Node.js `zlib` (dummy SQL file for independent start) |
| 3 | Logging module — start/end time, duration, status, DB type, file, errors (Winston) |
| 4 | PostgreSQL restore into a test DB with data verification |
| 5 | MySQL restore with clear failure messages |
| 6 | MongoDB restore (`mongorestore`) with collection verification |
| 7 | Selective (table/collection-specific) restore where supported, with documented limitations |

### Shahnaaj Khan — CLI + Storage + Automation
| Day | Task |
|---|---|
| 2 | Basic CLI using Commander.js — `help`, `test`, `backup`, `restore`, `list` commands |
| 3 | CLI options — `--db`, `--file`, required-field validation and help messages |
| 4 | Local storage — organized backup folders, listing, safe file handling |
| 5 | Scheduler — `node-cron` integration with the common backup interface |
| 6 | Google Drive — backup upload/download, credentials via environment variables |
| 7 | Slack notifications — optional success/failure messages with DB type, status, time, error details |

---

## ⚙️ Prerequisites

- Node.js (LTS recommended)
- Native DB CLI tools installed and available on PATH: `pg_dump`/`pg_restore`, `mysqldump`/`mysql`, `mongodump`/`mongorestore`
- Google Drive API credentials (OAuth client ID/secret, or service account) if using Drive storage
- Slack Incoming Webhook URL (if using notifications)

---

## 🚀 Installation

```bash
git clone <repo-url>
cd database-backup-utility
npm install
cp .env.example .env
```

Fill in your `.env` with database credentials, Google Drive API credentials, and Slack webhook URL as needed.

---

## 🖥️ Usage

```bash
# Test a database connection
node cli test --db postgres

# Run a backup
node cli backup --db mysql

# List available backups
node cli list

# Restore from a backup file
node cli restore --db mongodb --file ./backups/backup_2026-07-31.gz
```

---

## 🔐 Environment Variables

Configure the following in `.env` (see `.env.example`):

```
DB_TYPE=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

GOOGLE_DRIVE_CLIENT_ID=
GOOGLE_DRIVE_CLIENT_SECRET=
GOOGLE_DRIVE_REFRESH_TOKEN=
GOOGLE_DRIVE_FOLDER_ID=

SLACK_WEBHOOK_URL=
```

---

## 🤝 Contributing

1. Fork the repo and create your feature branch from `main`
2. Follow the common interface contracts defined in Phase 0
3. Keep secrets out of commits — use `.env` only
4. Open a PR for review before merging into `main`

---

## 📄 License

MIT

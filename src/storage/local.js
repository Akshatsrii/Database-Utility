import fs from 'fs';
import path from 'path';

// Define the root backup directory. This could also come from process.env in the future.
const BACKUP_ROOT_DIR = path.resolve(process.cwd(), 'backups');

/**
 * Ensures the backup directory exists for a specific database type.
 * @param {string} [dbType] - Optional database type (e.g., 'postgres'). If not provided, creates the root backups dir.
 * @returns {string} The resolved path to the directory.
 */
export function ensureBackupDir(dbType = '') {
  const targetDir = path.join(BACKUP_ROOT_DIR, dbType);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  return targetDir;
}

/**
 * Lists all backup files. If dbType is provided, filters by that database type.
 * @param {string} [dbType] - Optional database type to filter by.
 * @returns {Array<{file: string, dbType: string, size: number, createdAt: Date}>} List of backup details.
 */
export function listBackups(dbType = null) {
  const backups = [];
  
  // Ensure root exists so we don't crash if it's completely empty
  ensureBackupDir();

  const typesToScan = dbType ? [dbType] : fs.readdirSync(BACKUP_ROOT_DIR).filter(file => {
    return fs.statSync(path.join(BACKUP_ROOT_DIR, file)).isDirectory();
  });

  for (const type of typesToScan) {
    const typeDir = path.join(BACKUP_ROOT_DIR, type);
    if (fs.existsSync(typeDir)) {
      const files = fs.readdirSync(typeDir);
      for (const file of files) {
        const filePath = path.join(typeDir, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          backups.push({
            file,
            dbType: type,
            size: stats.size,
            createdAt: stats.mtime,
            path: filePath
          });
        }
      }
    }
  }

  // Sort by created time descending (newest first)
  return backups.sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * Gets the safe file path for a backup, checking if it exists.
 * @param {string} dbType - The database type.
 * @param {string} filename - The backup filename.
 * @returns {string|null} The absolute file path if it exists, otherwise null.
 */
export function getBackupPath(dbType, filename) {
  const filePath = path.join(BACKUP_ROOT_DIR, dbType, filename);
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  return null;
}

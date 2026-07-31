import { Command } from 'commander';
import { listBackups } from '../storage/local.js';
import { startScheduler } from '../scheduler/index.js';

export function setupCLI() {
  const program = new Command();

  program
    .name('db-backup-utility')
    .description('Cross-platform CLI utility for database connection testing, backup, restore, and more.')
    .version('1.0.0');

  program.command('test')
    .description('Test database connection')
    .requiredOption('--db <type>', 'Database type (e.g., postgres, mysql, mongodb, sqlite)')
    .action((options) => {
      console.log(`Mock: Testing database connection for ${options.db}...`);
    });

  program.command('backup')
    .description('Backup database')
    .requiredOption('--db <type>', 'Database type (e.g., postgres, mysql, mongodb, sqlite)')
    .action((options) => {
      console.log(`Mock: Backing up ${options.db} database...`);
    });

  program.command('restore')
    .description('Restore database')
    .requiredOption('--db <type>', 'Database type (e.g., postgres, mysql, mongodb, sqlite)')
    .requiredOption('--file <path>', 'Path to the backup file to restore')
    .action((options) => {
      console.log(`Mock: Restoring ${options.db} database from file ${options.file}...`);
    });

  program.command('list')
    .description('List backups')
    .option('--db <type>', 'Optional: Filter backups by database type')
    .action((options) => {
      console.log(`Listing available backups${options.db ? ` for ${options.db}` : ''}...\n`);
      
      try {
        const backups = listBackups(options.db);
        
        if (backups.length === 0) {
          console.log('No backups found.');
          return;
        }

        console.table(
          backups.map(b => ({
            Database: b.dbType,
            File: b.file,
            'Size (MB)': (b.size / (1024 * 1024)).toFixed(2),
            Date: b.createdAt.toLocaleString()
          }))
        );
      } catch (error) {
        console.error('Error listing backups:', error.message);
      }
    });

  program.command('schedule')
    .description('Schedule periodic backups')
    .requiredOption('--db <type>', 'Database type (e.g., postgres, mysql, mongodb, sqlite)')
    .requiredOption('--cron <expression>', 'Cron expression for schedule (e.g., "0 0 * * *")')
    .action((options) => {
      try {
        const dummyBackupFunction = (dbType) => {
          console.log(`Mock: Executing backup for ${dbType}...`);
        };
        startScheduler(options.db, options.cron, dummyBackupFunction);
        console.log(`Scheduler is now running. Press Ctrl+C to stop.`);
      } catch (error) {
        console.error('Failed to start scheduler:', error.message);
      }
    });

  program.parse(process.argv);
}

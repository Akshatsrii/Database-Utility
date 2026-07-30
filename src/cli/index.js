import { Command } from 'commander';

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
      const filterText = options.db ? ` for ${options.db}` : '';
      console.log(`Mock: Listing available backups${filterText}...`);
    });

  program.parse(process.argv);
}

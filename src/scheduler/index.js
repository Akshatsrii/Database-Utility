import cron from 'node-cron';

/**
 * Starts a scheduled backup job using node-cron.
 * @param {string} dbType - The database type to backup (e.g., 'postgres').
 * @param {string} cronExpression - The cron schedule expression.
 * @param {Function} backupCallback - The function to call when the schedule triggers.
 * @returns {cron.ScheduledTask} The cron task instance.
 */
export function startScheduler(dbType, cronExpression, backupCallback) {
  if (!cron.validate(cronExpression)) {
    throw new Error(`Invalid cron expression: ${cronExpression}`);
  }

  console.log(`Starting scheduler for ${dbType} database with cron: '${cronExpression}'`);
  
  const task = cron.schedule(cronExpression, () => {
    console.log(`\n[${new Date().toISOString()}] Scheduled backup triggered for ${dbType}...`);
    try {
      // Call the common backup interface (which will be fully implemented by Member 1)
      backupCallback(dbType);
    } catch (error) {
      console.error(`Scheduled backup failed:`, error.message);
    }
  });

  return task;
}

import { IncomingWebhook } from '@slack/webhook';

/**
 * Sends a notification to a Slack channel using an Incoming Webhook.
 * 
 * @param {Object} backupResult - Details of the backup operation.
 * @param {string} backupResult.dbType - The database type (e.g., 'postgres').
 * @param {string} backupResult.status - 'success' or 'failure'.
 * @param {string} [backupResult.fileName] - Name of the generated backup file (if successful).
 * @param {string} [backupResult.errorDetails] - Error message (if failed).
 */
export async function sendSlackNotification({ dbType, status, fileName, errorDetails }) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    console.log('Skipping Slack notification: SLACK_WEBHOOK_URL is not set.');
    return;
  }

  const webhook = new IncomingWebhook(url);
  
  const time = new Date().toLocaleString();
  const isSuccess = status === 'success';

  const message = {
    text: `Database Backup ${isSuccess ? 'Success :white_check_mark:' : 'Failed :x:'}`,
    attachments: [
      {
        color: isSuccess ? '#36a64f' : '#ff0000',
        fields: [
          {
            title: 'Database Type',
            value: dbType,
            short: true
          },
          {
            title: 'Status',
            value: isSuccess ? 'Success' : 'Failure',
            short: true
          },
          {
            title: 'Time',
            value: time,
            short: false
          }
        ]
      }
    ]
  };

  if (isSuccess && fileName) {
    message.attachments[0].fields.push({
      title: 'File Name',
      value: fileName,
      short: false
    });
  }

  if (!isSuccess && errorDetails) {
    message.attachments[0].fields.push({
      title: 'Error Details',
      value: errorDetails,
      short: false
    });
  }

  try {
    await webhook.send(message);
    console.log('Slack notification sent successfully.');
  } catch (error) {
    console.error('Failed to send Slack notification:', error.message);
  }
}

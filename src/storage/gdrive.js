import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

/**
 * Initializes the Google Drive API client using a Service Account.
 * Requires GOOGLE_APPLICATION_CREDENTIALS environment variable or google-service-account.json in the root.
 */
function getDriveClient() {
  try {
    const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.resolve(process.cwd(), 'google-service-account.json');
    
    if (!fs.existsSync(keyFilePath)) {
      throw new Error(`Service account key file not found at ${keyFilePath}. Please create a service account and save the JSON key here.`);
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    return google.drive({ version: 'v3', auth });
  } catch (error) {
    console.error('Failed to initialize Google Drive client:', error.message);
    return null;
  }
}

/**
 * Uploads a file to Google Drive.
 * @param {string} filePath - Absolute path to the local file.
 * @param {string} fileName - Name of the file to save on Drive.
 * @returns {Promise<string>} The uploaded file's Drive ID.
 */
export async function uploadToDrive(filePath, fileName) {
  const drive = getDriveClient();
  if (!drive) return null;

  const folderId = process.env.GDRIVE_FOLDER_ID;
  if (!folderId) {
    console.error('Error: GDRIVE_FOLDER_ID environment variable is missing.');
    return null;
  }

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File to upload does not exist: ${filePath}`);
    return null;
  }

  try {
    console.log(`Uploading ${fileName} to Google Drive...`);
    const fileMetadata = {
      name: fileName,
      parents: [folderId]
    };
    const media = {
      mimeType: 'application/octet-stream',
      body: fs.createReadStream(filePath)
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id'
    });

    console.log(`Upload successful! Google Drive File ID: ${response.data.id}`);
    return response.data.id;
  } catch (error) {
    console.error('Error uploading to Google Drive:', error.message);
    return null;
  }
}

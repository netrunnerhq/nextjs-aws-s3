import { promises as fs } from "fs";
import * as path from "path";
import { TEMPLATE_API } from "./constants/_code-gen-presigned-api";
import { TEMPLATE_UPLOAD_COMPONENT } from "./constants/_code-gen-upload-component";
import {
  API_FILE_NAME,
  API_DIR_PATH,
  PAGES_FILE_NAME,
  PAGES_DIR_PATH,
  ENV_DIR_PATH,
} from "./constants/file-names";

async function createDirectory(directoryPath: string): Promise<void> {
  try {
    await fs.mkdir(directoryPath, { recursive: true });
  } catch (err) {
    throw new Error(
      "[createFiles.ts] Error creating directory: " + directoryPath
    );
  }
}

async function writeFile(filePath: string, fileContent: string): Promise<void> {
  await fs.writeFile(filePath, fileContent, "utf-8");
}

export interface IWriteFileResponse {
  apiFilePath: string;
  pagesFilePath: string;
}

export async function createInitFiles(
  bucketName: string
): Promise<IWriteFileResponse> {
  // Define the path where to write the new api that will upload files to S3
  const apiDirPath = path.join(process.cwd(), API_DIR_PATH);
  const apiFilePath = path.join(apiDirPath, API_FILE_NAME);

  // define the path where to create a new page file for the upload demo
  const pagesDirPath = path.join(process.cwd(), PAGES_DIR_PATH);
  const pagesFilePath = path.join(pagesDirPath, PAGES_FILE_NAME);

  //
  const envDirPath = path.join(process.cwd(), ENV_DIR_PATH);
  const envFilePath = path.join(envDirPath, ".env.local");

  // Read the contents of the ".env" file in the pagesDirPath
  const envFileContent = await fs.readFile(envFilePath, "utf-8");

  // Define the code template of the new files. append the new bucketname to the existing .env.local file
  const apiCodeContent = TEMPLATE_API;
  const pagesCodeContent = TEMPLATE_UPLOAD_COMPONENT;
  const updatedEnvFileContent = `${envFileContent}\nS3_BUCKET_NAME=${bucketName}`;

  // Create the directories if they're not present yet
  await createDirectory(apiDirPath);
  await createDirectory(pagesDirPath);

  // Write the updated contents to the .env file
  await writeFile(envFilePath, updatedEnvFileContent);

  // Write the new files to disk
  await writeFile(apiFilePath, apiCodeContent);
  await writeFile(pagesFilePath, pagesCodeContent);

  return {
    apiFilePath,
    pagesFilePath,
  };
}

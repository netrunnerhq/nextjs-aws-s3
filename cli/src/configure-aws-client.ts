import * as dotenv from "dotenv";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

dotenv.config({ path: `.env.local`, override: true });

export async function getLocalEnvAWSAccountId(): Promise<string> {
  try {
    const stsClient = new STSClient({});
    const command = new GetCallerIdentityCommand({});
    const response = await stsClient.send(command);
    return response.Account ?? "";
  } catch (error) {
    console.error("Error retrieving default account ID:", error);
    throw error;
  }
}

export interface IAwsAccountConfig {
  region: string;
  accountId?: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken?: string;
  };
}

function validateEnvVar(varName: string, varValue: string | undefined): void {
  if (!varValue) throw new Error(`${varName} must be set in the environment`);
}

export const getEnvAwsAccountConfig = async (): Promise<IAwsAccountConfig> => {
  const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_ACCOUNT_ID: accountIdFromEnv,
  } = process.env;

  validateEnvVar("AWS_ACCESS_KEY_ID", AWS_ACCESS_KEY_ID);
  validateEnvVar("AWS_SECRET_ACCESS_KEY", AWS_SECRET_ACCESS_KEY);
  validateEnvVar("AWS_REGION", AWS_REGION);

  const AWS_ACCOUNT_ID = accountIdFromEnv ?? (await getLocalEnvAWSAccountId());
  validateEnvVar("AWS_ACCOUNT_ID", AWS_ACCOUNT_ID);

  return {
    region: "" + AWS_REGION,
    accountId: "" + AWS_ACCOUNT_ID,
    credentials: {
      accessKeyId: "" + AWS_ACCESS_KEY_ID,
      secretAccessKey: "" + AWS_SECRET_ACCESS_KEY,
    },
  };
};

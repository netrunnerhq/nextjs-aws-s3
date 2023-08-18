import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import {
  IAwsAccountConfig,
  getEnvAwsAccountConfig,
} from "./configure-aws-client";

export async function assumeRole(
  targetAccountID: string,
  targetRoleName: string,
  targetExternalId: string,
  targetRegion: string
): Promise<IAwsAccountConfig> {
  if (!targetAccountID || !targetRoleName || !targetExternalId) {
    throw new Error(
      "Missing required input. Please provide targetAccountID, targetRoleName, and targetExternalId."
    );
  }

  const uniqueSessionName = `AssumedRoleSession_${Date.now()}`;

  const assumeRoleParams = {
    RoleArn: `arn:aws:iam::${targetAccountID}:role/${targetRoleName}`,
    RoleSessionName: uniqueSessionName,
    ExternalId: targetExternalId,
  };

  const config = await getEnvAwsAccountConfig();
  const stsClient = new STSClient(config);

  try {
    const assumeRoleCommand = new AssumeRoleCommand(assumeRoleParams);
    const data = await stsClient.send(assumeRoleCommand);
    const assumedCredentials = data.Credentials;

    return {
      region: `${targetRegion}`, // Replace with your desired AWS region
      credentials: {
        accessKeyId: `${assumedCredentials?.AccessKeyId}`,
        secretAccessKey: `${assumedCredentials?.SecretAccessKey}`,
        sessionToken: `${assumedCredentials?.SessionToken}`,
      },
    };
  } catch (err) {
    console.error("Error assuming role:", err);
    throw err;
  }
}

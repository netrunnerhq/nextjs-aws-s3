import {
  IAMClient,
  CreateRoleCommand,
  AttachRolePolicyCommand,
  GetRoleCommand,
} from "@aws-sdk/client-iam";
import { IAwsAccountConfig } from "../configure-aws-client";
import { createRoleParams } from "./createRoleParams";
import chalk from "chalk";

export interface ICreateIamRoleInTargetAccountProps {
  targetNewRoleName: string;
  trustId: string;
  targetAccountClientConfig: IAwsAccountConfig;
}

async function doesRoleExist(iamClient: IAMClient, roleName: string) {
  const getRoleCommand = new GetRoleCommand({ RoleName: roleName });

  try {
    await iamClient.send(getRoleCommand);
    return true;
  } catch (err) {
    return false;
  }
}

async function createAndAttachIamPolicies(
  iamClient: IAMClient,
  roleName: string,
  trustId: string
) {
  const createRoleCommand = new CreateRoleCommand(
    createRoleParams(roleName, trustId)
  );

  try {
    const createRoleResponse = await iamClient.send(createRoleCommand);
    const roleArn = createRoleResponse?.Role?.Arn;

    console.log("[implement-policy.ts] createRoleResponse", createRoleResponse);

    const attachCloudWatchPolicyCommand = new AttachRolePolicyCommand({
      PolicyArn: "arn:aws:iam::aws:policy/CloudWatchLogsReadOnlyAccess",
      RoleName: roleName,
    });
    await iamClient.send(attachCloudWatchPolicyCommand);

    const attachS3PolicyCommand = new AttachRolePolicyCommand({
      PolicyArn: "arn:aws:iam::aws:policy/AmazonS3FullAccess",
      RoleName: roleName,
    });
    await iamClient.send(attachS3PolicyCommand);
    console.log(
      `[implement-policy.ts] Successfully created the ${roleName} role.\nRole ARN: ${roleArn}`
    );
  } catch (err) {
    console.error(
      `[implement-policy.ts] Error creating the ${roleName} role:`,
      err
    );
    return false;
  }
}

export async function createIamRoleInTargetAccount({
  targetNewRoleName,
  trustId,
  targetAccountClientConfig,
}: ICreateIamRoleInTargetAccountProps): Promise<void | boolean> {
  const { accountId } = targetAccountClientConfig;

  if (
    !accountId ||
    !targetNewRoleName ||
    !trustId ||
    !targetAccountClientConfig
  ) {
    throw new Error(
      "Missing required properties in ICreateIamRoleInTargetAccountProps"
    );
  }

  const iamClient = new IAMClient(targetAccountClientConfig);

  if (await doesRoleExist(iamClient, targetNewRoleName)) {
    console.log(
      chalk.redBright(
        `[implement-policy.ts] The role ${targetNewRoleName} already exists, skipping creation of policies\n`
      )
    );
    return true;
  }

  try {
    await createAndAttachIamPolicies(iamClient, targetNewRoleName, trustId);
  } catch (err) {
    console.error(`Error creating the ${targetNewRoleName} role:`, err);
    return false;
  }
}

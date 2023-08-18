import { Command, Args } from "@oclif/core";
import { createIamRoleInTargetAccount } from "../iam/index";
import { getEnvAwsAccountConfig } from "../configure-aws-client";

import { createInitFiles } from "../create-files";
import { updateUser } from "../update-user";
import { launchBucketApi } from "../launch-bucket";
import { fetchUserById } from "../fetch-user";

import { DEFAULT_ROLE_NAME, STATUS_IAM_ROLE_CREATED } from "../constants/index";

export default class Init extends Command {
  static description =
    "Creates an upload demo in your nextjs project, consisting of an API route and upload demo page component.";

  static args = {
    userId: Args.string({
      name: "userId",
      required: true,
      description: "The ID of the user",
    }),
  };

  public async run(): Promise<void> {
    try {
      const { args } = await this.parse(Init);

      const user = await fetchUserById(args.userId);
      const localAwsClientConfigForTarget = await getEnvAwsAccountConfig();

      const { userId, trustId, quickStartBucketName } = user;

      if (!quickStartBucketName) throw new Error("No quickstartbucket found");
      if (!userId) throw new Error("No user id found in the retrieved user");
      if (!trustId) throw new Error("No trust id found in the retrieved user");

      await createIamRoleInTargetAccount({
        targetAccountClientConfig: localAwsClientConfigForTarget,
        targetNewRoleName: DEFAULT_ROLE_NAME,
        trustId: trustId,
      });

      await updateUser(userId, {
        quickStartStatus: STATUS_IAM_ROLE_CREATED,
        targetAccountId: localAwsClientConfigForTarget.accountId,
        targetRoleName: DEFAULT_ROLE_NAME,
        iamRegion: localAwsClientConfigForTarget.region,
      });

      const reponse = await launchBucketApi({
        userId: userId,
        bucketParams: {
          region: localAwsClientConfigForTarget.region,
          templateName: "FILE_UPLOADS",
          serviceName: "quickstart-netrunner",
        },
      });
      console.log("[launchBucketApi] response", reponse);
      await createInitFiles(quickStartBucketName);
    } catch (error) {
      console.error(`Error in Init: ${error}`);
      throw error;
    }
  }
}

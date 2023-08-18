import { CreateRoleCommandInput } from "@aws-sdk/client-iam";

export function createRoleParams(
  targetNewRoleName: string,
  trustId: string
): CreateRoleCommandInput {
  const NETRUNNER_AWS_ACCOUNT_ID = "395261708130";
  const roleParams = {
    RoleName: targetNewRoleName,
    AssumeRolePolicyDocument: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: {
            AWS: [
              `arn:aws:iam::${NETRUNNER_AWS_ACCOUNT_ID}:user/netrunner-app`,
            ],
          },
          Action: "sts:AssumeRole",
          Condition: {
            StringEquals: {
              "sts:ExternalId": `${trustId}`,
            },
          },
        },
      ],
    }),
  };

  return roleParams;
}

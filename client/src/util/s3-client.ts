import { S3Client } from "@aws-sdk/client-s3";
import { TS3Config, getConfig } from "./config";

export function getS3Client(config: TS3Config) {
  let client = new S3Client({
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
    region: config.region,
  });

  return client;
}

export const getS3ClientNative = () => {
  // this version of the function gets the config from the environment variables
  const params = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.S3_BUCKET_NAME,
  };

  let config = getConfig(params);

  return getS3Client(config);
};

import { v4 as uuidv4 } from "uuid";

export type TS3Config = {
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  region: string;
};

export type TGetConfigParams = {
  accessKeyId: string | undefined;
  secretAccessKey: string | undefined;
  bucket: string | undefined;
  region: string | undefined;
};

function validateParams(params: TGetConfigParams) {
  const { accessKeyId, secretAccessKey, bucket, region } = params;

  if (!accessKeyId) {
    throw new Error("Missing AWS_ACCESS_KEY_ID environment variable");
  }

  if (!secretAccessKey) {
    throw new Error("Missing AWS_SECRET_ACCESS_KEY environment variable");
  }
  if (!bucket) {
    console.warn(
      "\x1b[41m\x1b[31m%s\x1b[0m",
      "Missing BUCKET_NAME environment variable"
    );
  }

  if (!region) {
    console.warn(
      "\x1b[41m\x1b[31m%s\x1b[0m",
      "Missing AWS_REGION environment variable"
    );
  }
}

export function getConfig(params: TGetConfigParams): TS3Config {
  validateParams(params);

  const { accessKeyId, secretAccessKey, bucket, region } = params;

  // If bucket or region are not defined, we use a default value
  const _DEFAULT_BUCKET_NAME = `--undefined-bucket-name-${uuidv4()}`;
  const _DEFAULT_REGION = "us-east-1";

  const config: TS3Config = {
    accessKeyId: `${accessKeyId}`,
    secretAccessKey: `${secretAccessKey}`,
    region: `${region || _DEFAULT_REGION}`,
    bucket: `${bucket || _DEFAULT_BUCKET_NAME}`,
  };

  return config;
}

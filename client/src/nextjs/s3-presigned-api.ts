import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getS3ClientNative } from "../util";
import { validateStringInput } from "../util/helpers";

interface S3UploadResponse {
  signed_url: string;
  params: any;
  command: any;
}

export async function apiSignS3Url(
  filename: string | string[],
  filetype: string | string[]
): Promise<S3UploadResponse> {
  const client = getS3ClientNative();
  filename = validateStringInput(filename);
  filetype = validateStringInput(filetype);

  const objectKey = `${filename}-${Date.now()}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: objectKey,
    ContentType: filetype,
    CacheControl: "max-age=630720000",
    Metadata: {
      metadata1: "value12",
      metadata2: "value2",
    },
  };

  const command = new PutObjectCommand(params);
  const signed_url = await getSignedUrl(client, command, { expiresIn: 3600 });

  return { signed_url, params, command };
}

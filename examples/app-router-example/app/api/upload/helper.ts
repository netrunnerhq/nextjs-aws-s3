// app/api/upload.ts
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

export function getAwsConsoleUrl(
  bucketName: string,
  region: string,
  objectKey: string
): string {
  return `https://s3.console.aws.amazon.com/s3/object/${bucketName}?region=${region}&prefix=${objectKey}`;
}

export async function getPresignedUrlS3({
  bucketName,
  objectKey,
  client,
  requestType,
}: {
  bucketName: string;
  objectKey: string;
  client?: S3Client;
  requestType?: "put" | "get";
}): Promise<string> {
  if (!client) throw new Error("[presigned-url.ts] client is required");
  if (!bucketName) throw new Error("[presigned-url.ts] bucketName is required");
  if (!objectKey) throw new Error("[presigned-url.ts] objectKey is required");
  if (!requestType)
    throw new Error("[presigned-url.ts] requestType is required");

  try {
    let command;

    switch (requestType) {
      case "get":
        command = new GetObjectCommand({
          Bucket: bucketName,
          Key: objectKey,
        });
        break;
      case "put":
        command = new PutObjectCommand({
          Bucket: bucketName,
          Key: objectKey,
        });
        break;
      default:
        throw new Error(
          "[presigned-url.ts] Invalid request type. It should be either 'put' or 'get'."
        );
    }

    const signedUrl = await getSignedUrl(client as any, command as any, {
      expiresIn: 3600,
    });

    return signedUrl;
  } catch (err) {
    console.error("Error generating presigned URL:", err);
    throw err;
  }
}

// pages/api/getPresignedUrl.ts
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";

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

const s3Client = new S3Client({
  region: `${process.env.AWS_REGION}`,
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { objectKey, requestType } = req.body;

  console.log("[getPresignedUrl.ts] req.body", {
    reqBody: req.body,
  });

  if (!objectKey) {
    res.status(400).json({ error: "Object key is required" });
    return;
  }

  if (!requestType) {
    res.status(400).json({ error: "Request type is required" });
    return;
  }

  try {
    const signedUrl = await getPresignedUrlS3({
      bucketName: `${process.env.S3_BUCKET_NAME}`,
      objectKey,
      requestType,
      client: s3Client,
    });

    res.status(200).json({ url: signedUrl });
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: "Failed to generate presigned URL." });
  }
}

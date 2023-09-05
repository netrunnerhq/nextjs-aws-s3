// app/api/upload.ts
import { S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getAwsConsoleUrl, getPresignedUrlS3 } from "./helper";

const s3Client = new S3Client({
  region: `${process.env.AWS_REGION}`,
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  },
});

export async function POST(req: Request) {
  const body = await req.json();
  const { objectKey, requestType } = body;

  if (!objectKey) {
    return NextResponse.json(
      { error: "[api/upload/route.ts] Object key is required" },
      { status: 400 }
    );
  }

  if (!requestType) {
    return NextResponse.json(
      { error: "[api/upload/route.ts] Request type is required" },
      { status: 400 }
    );
  }

  try {
    const signedUrl = await getPresignedUrlS3({
      bucketName: `${process.env.S3_BUCKET_NAME}`,
      objectKey,
      requestType,
      client: s3Client,
    });

    const awsConsoleUrl = getAwsConsoleUrl(
      `${process.env.S3_BUCKET_NAME}`,
      `${process.env.AWS_REGION}`,
      objectKey
    );

    return NextResponse.json({ signedUrl, awsConsoleUrl });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Failed to generate presigned URL." },
      { status: 500 }
    );
  }
}

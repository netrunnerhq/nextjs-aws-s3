import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";

const bucketName = "storengine-v0.43-quick-start-uploads-nextjs";
const region = "eu-west-1";

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const command = new ListObjectsCommand({
    Bucket: bucketName,
  });

  try {
    const data = await s3Client.send(command);
    const contents = data.Contents || [];
    const objects = contents.map((obj) => ({
      Key: obj.Key,
      url: `https://${bucketName}.s3.${region}.amazonaws.com/${obj.Key}`,
    }));
    res.status(200).json(objects);
  } catch (error) {
    console.error("Error retrieving objects:", error);
    res.status(500).json({
      error: "Error retrieving objects",
    });
  }
}

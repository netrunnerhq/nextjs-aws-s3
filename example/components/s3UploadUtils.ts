import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: "eu-west-1",
  credentials: {
    accessKeyId: `${process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY}`,
  },
});

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const uploadParams = {
      Bucket: "storengine-v0.43-quick-start-uploads-nextjs",
      Key: file.name,
      Body: file,
    };
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("File uploaded successfully. S3 response:", data);
    return file.name; // Return the object key after successful upload.
  } catch (err) {
    console.error("Error occurred while uploading file:", err);
    throw err; // Propagate the error to the caller so it can be handled appropriately.
  }
};

async function getPresignedUrl(
  objectKey: string,
  action: "put" | "get"
): Promise<{
  signedUrl: string;
  awsConsoleUrl: string;
}> {
  try {
    const response = await fetch("/api/generateImgUrl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        objectKey,
        requestType: action,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get presigned URL");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting presigned URL:", error);
    throw error;
  }
}

export async function uploadFileToS3(file: File): Promise<{
  uploadedImgUrl: string;
  awsConsoleUrl: string;
}> {
  try {
    // Step 1: Get the presigned URL for upload
    const { signedUrl: uploadFileUrl, awsConsoleUrl } = await getPresignedUrl(
      file.name,
      "put"
    );
    if (!uploadFileUrl) throw Error("[f:uploadFileToS3] undef uploadFileUrl");
    if (!awsConsoleUrl) throw Error("[f:uploadFileToS3] undef awsConsoleUrl");

    // Step 2: Upload the file using the presigned URL
    const uploadResponse = await fetch(uploadFileUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload the file to S3");
    }

    console.log("File uploaded successfully to S3 via presigned URL");

    // Step 3: Get the URL of the uploaded file for rendering/viewing
    const { signedUrl: uploadedImgUrl } = await getPresignedUrl(
      file.name,
      "get"
    );

    return {
      uploadedImgUrl,
      awsConsoleUrl,
    };
  } catch (err) {
    console.error("Error occurred while uploading file:", err);
    throw err;
  }
}

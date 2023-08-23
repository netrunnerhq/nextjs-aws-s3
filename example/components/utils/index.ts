export const presignedUrlGet = async (
  objectKey: string,
  requestType: "put" | "get"
): Promise<string> => {
  try {
    const response = await fetch("/api/generateImgUrl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        objectKey,
        requestType: requestType,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get presigned URL");
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    throw error;
  }
};

export const uploadFile = async (file: File): Promise<string> => {
  try {
    // Step 1: Get the presigned URL from the helper function
    const url = await presignedUrlGet(file.name, "put");

    // Step 2: Use the presigned URL to upload the file
    await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    console.log("File uploaded successfully to S3 via presigned URL");

    // Step 3: Get the URL of the uploaded file
    const uploadedImgUrl = await presignedUrlGet(file.name, "get");
    return uploadedImgUrl; // Return the object key after successful upload.
  } catch (err) {
    console.error("Error occurred while uploading file:", err);
    throw err; // Propagate the error to the caller so it can be handled appropriately.
  }
};

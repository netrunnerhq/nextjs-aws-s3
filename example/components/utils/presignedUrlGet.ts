export const presignedUrlGet = async (objectKey: string): Promise<string> => {
  try {
    const response = await fetch("/api/getPresignedUrl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        objectKey,
        requestType: "get",
      }),
    });

    const data = await response.json();
    return data.url;
  } catch (error) {
    throw error;
  }
};

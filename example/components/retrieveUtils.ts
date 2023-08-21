export const retrieveFiles = async () => {
  try {
    const response = await fetch("/api/s3Objects");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error occurred while retrieving files:", err);
  }
};



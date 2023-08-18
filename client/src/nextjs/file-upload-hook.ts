import axios from "axios";
import { FileUploadInput } from "./components/FileUploadInput";

function validateS3SignedUrl(url: string) {
  const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

  if (!regex.test(url)) {
    throw new Error("[UploadSection/uploadFile] Invalid URL");
  }
}

export async function fetchPresignedUrl(
  filename: string,
  filetype: string
): Promise<string> {
  const res = await fetch(
    `/api/upload-presigned?filename=${filename}&filetype=${encodeURIComponent(
      filetype
    )}`
  );
  const signed_url = (await res.json()).signed_url;
  validateS3SignedUrl(signed_url);
  return signed_url;
}

export async function uploadFile(file: File): Promise<any> {
  if (!file) {
    throw new Error("[UploadSection/uploadFile] NO FILE");
  }

  const signed_url = await fetchPresignedUrl(
    file.name || "unknown-front-end-filename",
    file.type
  );

  try {
    const upload_response = await axios.put(signed_url, file);
    return upload_response;
  } catch (err) {
    console.error({ err });
    return err;
  }
}

export const useFileUpload = () => ({
  FileUploadInput,
  uploadFile,
});

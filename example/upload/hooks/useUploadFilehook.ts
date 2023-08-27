import { useState } from "react";
import { uploadFileToS3 } from "../utils/index";
import { TStatus } from "../components/Status";
import { FilePreview } from "../components/FilePreview";

export const useUploadFileHook = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<TStatus>("idle");
  const [awsConsole, setAwsConsole] = useState<string | null>(null);

  const handleFileUpload = async (file: File | undefined) => {
    if (!file) return;

    try {
      setStatus("loading");
      const { uploadedImgUrl, awsConsoleUrl } = await uploadFileToS3(file);
      setImgUrl(uploadedImgUrl);
      setAwsConsole(awsConsoleUrl);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return {
    imgUrl,
    status,
    awsConsole,
    handleFileUpload,
    FilePreview,
  };
};

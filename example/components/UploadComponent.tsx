import { useEffect, useState, FC } from "react";
import { uploadFile } from "./s3UploadUtils";

export const UploadComponent: FC = () => {
  const [selectedFile, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  }, [selectedFile]);

  return (
    <input
      type="file"
      onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
    />
  );
};

import React, { useState, FC } from "react";
import { uploadFile } from "./utils/uploadFileUtil";
import { Status } from "./Status";
import { presignedUrlGet } from "./utils/presignedUrlGet";

export const UploadComponent: FC = () => {
  const [displayUrl, setDisplayUrl] = useState<string | null>(null);
  const [status, setStatus] = useState("idle");

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;

    try {
      setStatus("loading");
      await uploadFile(file);
      const uploadedImgUrl = await presignedUrlGet(file.name);
      setDisplayUrl(uploadedImgUrl);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <input
        onChange={(e) => handleUpload(e.target.files?.[0])}
        type="file"
        className="my-20 text-black"
      />
      {displayUrl && status === "success" && (
        <img src={displayUrl} alt="uploaded file" className="max-h-80 m-auto" />
      )}
      <Status status={status} />
    </>
  );
};

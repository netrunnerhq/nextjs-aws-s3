import React, { useState, FC } from "react";
import { uploadFile } from "./utils";
import { Status } from "./Status";

export const UploadComponent: FC = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [status, setStatus] = useState("idle");

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;

    try {
      setStatus("loading");
      const uploadedImgUrl = await uploadFile(file);
      setImgUrl(uploadedImgUrl);
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
      {imgUrl && status === "success" && (
        <img src={imgUrl} alt="uploaded file" className="max-h-80 m-auto" />
      )}
      <Status status={status} />
    </>
  );
};

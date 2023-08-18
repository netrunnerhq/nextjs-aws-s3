import React from "react";
import { useFileUpload } from "../file-upload-hook";

export function DemoUploadComponent() {
  // This is the component as we show it in the demo
  const { FileUploadInput, uploadFile } = useFileUpload();
  return <FileUploadInput handleUpload={uploadFile} />;
}

export const TEMPLATE_UPLOAD_COMPONENT = `

import { useFileUpload } from "@storengine/client";

export default function UploadComponent() {
  const { FileUploadInput, uploadFile } = useFileUpload();
  // @ts-ignore
  return <FileUploadInput handleUpload={uploadFile} />;
}
`;

import { useUploadFile } from "./hooks/useUploadFile";
import { FilePreview } from "./components/FilePreview";

export function UploadComponent() {
  const { handleFileUpload, imgUrl, status, awsConsole } = useUploadFile();

  return (
    <>
      <input
        onChange={(e) => handleFileUpload(e.target.files?.[0])}
        type="file"
        className="my-16 text-black"
      />
      <FilePreview imgUrl={imgUrl} status={status} awsConsole={awsConsole} />
    </>
  );
}

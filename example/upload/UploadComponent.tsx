import { useUploadFileHook } from "./hooks/useUploadFilehook";

export function UploadComponent() {
  const { imgUrl, status, awsConsole, handleFileUpload, FilePreview } =
    useUploadFileHook();

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

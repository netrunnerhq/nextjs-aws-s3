import { useEffect, useState, FC } from "react";
import { uploadFile } from "./s3UploadUtils";

interface DisplayFileProps {
  url: string;
  objectKey: string;
}

const DisplayFileComponent: FC<DisplayFileProps> = ({ url, objectKey }) => {
  const isImage = (filename: string) => {
    const extensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const fileExtension = filename.split(".").pop()?.toLowerCase() || "";
    return extensions.includes(fileExtension);
  };

  if (isImage(objectKey)) {
    return <img src={url} alt={objectKey} style={{ width: "300px" }} />;
  } else {
    return (
      <a
        href={url}
        download={objectKey}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download {objectKey}
      </a>
    );
  }
};

export const UploadComponent: FC = () => {
  const [selectedFile, setFile] = useState<File | null>(null);
  const [displayUrl, setDisplayUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getPresignedUrl = async (objectKey: string): Promise<string> => {
    try {
      const response = await fetch("/api/getPresignedUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          objectKey,
          expirationTimeInSeconds: 3600,
          requestType: "get",
        }),
      });

      const data = await response.json();
      console.log({
        data,
      });
      return data.url;
    } catch (error) {
      setStatus("error");
      setErrorMessage("Error fetching presigned URL. Please try again later.");
      throw error;
    }
  };

  useEffect(() => {
    if (selectedFile) {
      setStatus("loading");
      uploadFile(selectedFile)
        .then((objectKey) => getPresignedUrl(objectKey)) // type error = Argument of type 'void' is not assignable to parameter of type 'string'.ts(2345)
        .then((url) => {
          setDisplayUrl(url);
          setStatus("success");
        })
        .catch((error) => {
          setStatus("error");
          setErrorMessage("Error uploading file. Please try again later.");
        });
    }
  }, [selectedFile]);

  return (
    <>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <br />
      {status === "loading" && <p>Uploading...</p>}
      {status === "error" && <p>{errorMessage}</p>}
      <br />
      {displayUrl && (
        <DisplayFileComponent
          url={displayUrl}
          objectKey={selectedFile?.name || ""}
        />
      )}
    </>
  );
};

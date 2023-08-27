import React from "react";
import { Status, TStatus } from "./Status";

const FilePreview: React.FC<{
  imgUrl: string | null;
  status: TStatus;
  awsConsole: string | null;
}> = ({ imgUrl, status, awsConsole }) => {
  return (
    <>
      <Status status={status} awsConsoleObjectUrl={awsConsole} />
      {imgUrl && status === "success" && (
        <img
          src={imgUrl}
          alt="uploaded file"
          className="max-h-80 m-auto pt-20"
        />
      )}
    </>
  );
};

export { FilePreview };

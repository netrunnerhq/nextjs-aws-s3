import React from "react";
import { IconUpload } from "./icons/IconUpload";

export type TStatus = "idle" | "loading" | "error" | "success";

interface StatusProps {
  status: TStatus;
  awsConsoleObjectUrl: string | null;
}

export const Status: React.FC<StatusProps> = ({
  status,
  awsConsoleObjectUrl,
}) => {
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-700" />
      </div>
    );
  }

  if (status === "error") {
    return <p>An error has occured while uploading the file</p>;
  }

  if (status === "success") {
    return (
      <div className="flex justify-center items-center h-20 underline-offset-[15px] underline decoration-2 decoration-indigo-500">
        <a
          href={`${awsConsoleObjectUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/80 mt-8"
        >
          <IconUpload />
          &nbsp;AWS Console Link
        </a>
      </div>
    );
  }

  return null;
};

import React from "react";

interface StatusProps {
  status: string;
}

export const Status: React.FC<StatusProps> = ({ status }) => {
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

  return null;
};

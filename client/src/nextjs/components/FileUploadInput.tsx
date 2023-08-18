import React from "react";

export function FileUploadInput({ handleUpload }: { handleUpload: any }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0]!;
    if (!file) {
      return alert("No file selected.");
    } else {
      handleUpload(file);
    }
  };

  return (
    <input
      type="file"
      accept="image/png, image/jpeg"
      onChange={handleFileChange}
    />
  );
}

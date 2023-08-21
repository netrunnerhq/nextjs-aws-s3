import { useState, useEffect } from "react";
import { retrieveFiles } from "./retrieveUtils";

const RetrieveComponent = () => {
  const [files, setFiles] = useState<
    {
      Key: string;
      url: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await retrieveFiles();
      setFiles(files);
    };
    fetchFiles();
  }, []);

  return (
    <div>
      {files.map((file) => (
        <div key={file.Key}>
          File:
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            {file.Key}
          </a>
        </div>
      ))}
    </div>
  );
};

export default RetrieveComponent;

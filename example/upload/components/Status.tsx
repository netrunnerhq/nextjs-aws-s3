import { IconUpload } from "./icons/IconUpload";

export type TStatus = "idle" | "loading" | "error" | "success";

export function Status({
  status,
  awsConsoleObjectUrl,
}: {
  status: TStatus;
  awsConsoleObjectUrl: string | null;
}) {
  const isLoading = status === "loading";
  const isError = status === "error";
  const isSuccess = status === "success";

  console.log("[status is rendered]", {
    status,
    awsConsoleObjectUrl,
  });

  return (
    <div className="text-black text-lg">
      {isLoading && (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-700" />
        </div>
      )}

      {isError && <p>An error has occured while uploading the file</p>}

      {isSuccess && awsConsoleObjectUrl && (
        <div className="flex justify-center items-center h-20 underline-offset-[15px] underline decoration-2 decoration-indigo-500">
          <a
            href={awsConsoleObjectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/80 mt-8"
          >
            <IconUpload />
            &nbsp;AWS Console Link
          </a>
        </div>
      )}
    </div>
  );
}

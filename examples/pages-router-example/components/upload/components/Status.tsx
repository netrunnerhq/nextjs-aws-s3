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

  return (
    <div className="text-black">
      {isLoading && (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-700" />
        </div>
      )}

      {isError && <p>An error has occured while uploading the file</p>}

      {isSuccess && awsConsoleObjectUrl && (
        <div className="mt-10 text-center text-black/80 hover:text-black/60 h-20 underline-offset-[15px] underline decoration-4 decoration-indigo-600 hover:decoration-indigo-300">
          <a
            href={awsConsoleObjectUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconUpload />
            &nbsp;AWS Console Link
          </a>
        </div>
      )}
    </div>
  );
}

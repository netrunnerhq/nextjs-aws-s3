export * from "./util/s3-client";
export * from "./util/config";
export * from "./nextjs/s3-presigned-api";
export * from "./nextjs/file-upload-hook";

// for testing purposes should be removed at some point
export function demo(a: number, b: number): number {
  console.log("The package is correctly compiled and distributed!");
  return a + b;
}

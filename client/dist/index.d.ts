import { S3Client } from '@aws-sdk/client-s3';

type TS3Config = {
    accessKeyId: string;
    secretAccessKey: string;
    bucket: string;
    region: string;
};
type TGetConfigParams = {
    accessKeyId: string | undefined;
    secretAccessKey: string | undefined;
    bucket: string | undefined;
    region: string | undefined;
};
declare function getConfig(params: TGetConfigParams): TS3Config;

declare function getS3Client(config: TS3Config): S3Client;
declare const getS3ClientNative: () => S3Client;

interface S3UploadResponse {
    signed_url: string;
    params: any;
    command: any;
}
declare function apiSignS3Url(filename: string | string[], filetype: string | string[]): Promise<S3UploadResponse>;

declare function FileUploadInput({ handleUpload }: {
    handleUpload: any;
}): JSX.Element;

declare function fetchPresignedUrl(filename: string, filetype: string): Promise<string>;
declare function uploadFile(file: File): Promise<any>;
declare const useFileUpload: () => {
    FileUploadInput: typeof FileUploadInput;
    uploadFile: typeof uploadFile;
};

declare function demo(a: number, b: number): number;

export { TGetConfigParams, TS3Config, apiSignS3Url, demo, fetchPresignedUrl, getConfig, getS3Client, getS3ClientNative, uploadFile, useFileUpload };

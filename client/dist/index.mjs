import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import axios from 'axios';
import React from 'react';

function validateParams(params) {
  const { accessKeyId, secretAccessKey, bucket, region } = params;
  if (!accessKeyId) {
    throw new Error("Missing AWS_ACCESS_KEY_ID environment variable");
  }
  if (!secretAccessKey) {
    throw new Error("Missing AWS_SECRET_ACCESS_KEY environment variable");
  }
  if (!bucket) {
    console.warn(
      "\x1B[41m\x1B[31m%s\x1B[0m",
      "Missing BUCKET_NAME environment variable"
    );
  }
  if (!region) {
    console.warn(
      "\x1B[41m\x1B[31m%s\x1B[0m",
      "Missing AWS_REGION environment variable"
    );
  }
}
function getConfig(params) {
  validateParams(params);
  const { accessKeyId, secretAccessKey, bucket, region } = params;
  const _DEFAULT_BUCKET_NAME = `--undefined-bucket-name-${v4()}`;
  const _DEFAULT_REGION = "us-east-1";
  const config = {
    accessKeyId: `${accessKeyId}`,
    secretAccessKey: `${secretAccessKey}`,
    region: `${region || _DEFAULT_REGION}`,
    bucket: `${bucket || _DEFAULT_BUCKET_NAME}`
  };
  return config;
}

function getS3Client(config) {
  let client = new S3Client({
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    },
    region: config.region
  });
  return client;
}
const getS3ClientNative = () => {
  const params = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.S3_BUCKET_NAME
  };
  let config = getConfig(params);
  return getS3Client(config);
};

function validateStringInput(input) {
  if (!input) {
    throw new Error("Input cannot be empty");
  } else if (Array.isArray(input)) {
    return input.join(",");
  } else {
    return input;
  }
}

async function apiSignS3Url(filename, filetype) {
  const client = getS3ClientNative();
  filename = validateStringInput(filename);
  filetype = validateStringInput(filetype);
  const objectKey = `${filename}-${Date.now()}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: objectKey,
    ContentType: filetype,
    CacheControl: "max-age=630720000",
    Metadata: {
      metadata1: "value12",
      metadata2: "value2"
    }
  };
  const command = new PutObjectCommand(params);
  const signed_url = await getSignedUrl(client, command, { expiresIn: 3600 });
  return { signed_url, params, command };
}

function FileUploadInput({ handleUpload }) {
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) {
      return alert("No file selected.");
    } else {
      handleUpload(file);
    }
  };
  return /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "file",
      accept: "image/png, image/jpeg",
      onChange: handleFileChange
    }
  );
}

function validateS3SignedUrl(url) {
  const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
  if (!regex.test(url)) {
    throw new Error("[UploadSection/uploadFile] Invalid URL");
  }
}
async function fetchPresignedUrl(filename, filetype) {
  const res = await fetch(
    `/api/upload-presigned?filename=${filename}&filetype=${encodeURIComponent(
      filetype
    )}`
  );
  const signed_url = (await res.json()).signed_url;
  validateS3SignedUrl(signed_url);
  return signed_url;
}
async function uploadFile(file) {
  if (!file) {
    throw new Error("[UploadSection/uploadFile] NO FILE");
  }
  const signed_url = await fetchPresignedUrl(
    file.name || "unknown-front-end-filename",
    file.type
  );
  try {
    const upload_response = await axios.put(signed_url, file);
    return upload_response;
  } catch (err) {
    console.error({ err });
    return err;
  }
}
const useFileUpload = () => ({
  FileUploadInput,
  uploadFile
});

function demo(a, b) {
  console.log("The package is correctly compiled and distributed!");
  return a + b;
}

export { apiSignS3Url, demo, fetchPresignedUrl, getConfig, getS3Client, getS3ClientNative, uploadFile, useFileUpload };
//# sourceMappingURL=index.mjs.map

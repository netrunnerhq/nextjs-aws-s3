<h2 align="center">
⚡️ Implement AWS S3 In Your Next.js App In Under 5 Minutes
</h2>

<p align="center">
  <img src="./docs/logo/gifs/file-upload.gif" alt="Netrunner demo hero gif" width="80%"> 
  <!-- <img src="./docs/logo/gifs/demo.gif" alt="Netrunner demo hero gif" height="360px"> -->
</p>

<p align="center">
<a href="https://netrunnerhq.com">👩‍💻 Demo</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="./examples">🦾 Examples</a
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://netrunnerhq.com">🕸️ Website</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#-getting-started">🤝 Contribute</a>
</p>

<h1></h1>

Netrunner is a batteries included tool to implement secure AWS storage in Next.js apps. Unlike other tools, it also solves the problem of configuring S3 buckets in your AWS account. Here's how it works:

1. view the [example](/examples) repositories for both app-and-pages router
2. create an S3 bucket in the Netrunner dashboard: https://netrunnerhq.com/
3. copy the template .env file in your terminal: ```cp .env.template .env.local``` and paste your S3 bucket name and env variables
4. run  ```pnpm dev``` and upload a file!

## 🪄 Get started with Next.js and AWS S3 file uploads

<!-- @todo: follow Xata.io or Stripe documentation to make it clean-->

Make sure you have a Next.js app and AWS account at the ready. Let's get started!

### 🔋 Step 1. Package installation

First install the Netrunner [npm](https://npmwebsite.com) package to handle file uploads.

```console
npm install @netrunner/next-s3
```

```console
yarn add @netrunner/next-s3
```

```console
pnpm add @netrunner/nextjs-s3
```

### 🌱 Step 2. Implement file upload component

When using app router:

```tsx
// app/upload-page.tsx or for page router: pages/upload-page.tsx
import { useFileUpload } from "netrunnerhq/next-s3-upload";

export default function UploadComponent() {
  const { FileUploadInput, uploadFile } = useFileUpload();
  return <FileUploadInput handleUpload={uploadFile} />;
}
```

### 🔌 Step 3. Create a new API route

```tsx
// app/upload/route.ts or for page router: pages/api/upload.ts
import { apiSignS3Url } from "@netrunnerhq/client";

export default async function handler(req, res) {
  if (req.method !== "GET")
    // different res for app router
    return res.status(405).json({ message: "Method not allowed" });

  if (!req.query.filename || !req.query.filetype)
    return res.status(400).json({ message: "Missing filename or filetype" });

  try {
    const { filename, filetype } = req.query;
    const { signed_url } = await apiSignS3Url(filename, filetype);
    res.status(200).json({ signed_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}
```

### 🪣 Step 4. Bucket configuration

- Create an S3 bucket inside your AWS account from the Netrunner app by logging in with GitHub and following the quickstart on [netrunnerhq.com](https://netrunnerhq.com/)

- Enter your AWS account ID that you can find on the right top of the AWS console

- Verify in your AWS console if the bucket is deployed correctly in the S3 service [page](https://s3.console.aws.amazon.com/s3/home?region=us-east-1)

<p align="center">
  <img src="./docs/logo/gifs/bucket-creation.gif" alt="Netrunner bucket creation gif" width="80%">
</p>

### 🎉 Step 5. Environment variables and upload file!

- Add the environment variables to your .env.local file for the bucket name and region. You can copy them from the Netrunner console.

- Run your app and or use the [examples](https://github.com/netrunnerhq/nextjs-aws-s3/tree/main/examples) code in this repository if convenient.

- Click the upload button to select a test image. The file should upload correctly!

<p align="center">
  <img src="./docs/logo/gifs/file-upload.gif" alt="Netrunner file upload gif" width="80%">
</p>

## 🦾 About Netrunner

Netrunner is being developed by [Vincent Hus](https://github.com/davincios) with the mission to enable JavaScript software engineers to transform their AWS cloud account into a personalised Firebase developer platform.

You can learn more by visiting our [website](https://netrunnerhq.com) or ping Vincent on twitter [@jvf_hus](https://twitter.com/vincent_hus)

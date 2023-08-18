<!-- <p align="center">
<em>🛜🏃🦾 Turn your AWS account into a personalised Firebase with Netrunner 🛜🏃🦾</em>
</p>
<p align="center">
 <img src="docs/logo/netrunner-main-character.png" height="130" width="130" alt="Netrunner Logo"/>
</p>
<p align="center">
   <img alt="Node version" src="https://img.shields.io/static/v1?label=node&message=%20%3E=18&logo=node.js&color=2334D058" />
      <img src="https://img.shields.io/badge/lang-English-blue.svg" alt="English">
</p> -->

<h2 align="center">
⚡️ Implement AWS S3 In Your Next.js App In Under 5 Minutes
</h2>
<p align="center">
<a href="https://netrunnerhq.com">👩‍💻 Demo</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="/example/">🌱 App Router Example</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="/example/">🏞️ Page Router Example</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://netrunnerhq.com">🕸️ Website</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#-getting-started">🤝 Contribute</a>
</p>

Netrunner is a batteries included tool to implement secure AWS storage in Next.js apps. Unlike other tools, it also solves the problem of configuring S3 buckets in your AWS account. How it works:

1. Automatically configure an S3 bucket in your AWS account using best practice CORS config and IAM policies.
2. Implement file uploads in a couple lines of code through an npm package.
3. View and manage files in a helpfull UI dashboard.
   <br />

Netrunner is being developed by [Vincent Hus](https://github.com/davincios) and you can watch a demo video [here]()
<br />

<p align="center">
  <img src="./docs/logo/demo.gif" alt="Wing Demo" height="360px">
</p>

## 🪄 Getting Started

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
// pages/upload-page.tsx
import { useFileUpload } from "@netrunner/nextjs-aws-s3";
```

When using page router:

```tsx
// pages/upload-page.tsx
import { useFileUpload } from "@netrunner/nextjs-aws-s3";
```

### 🎋 Step 3. Create a new API route api/upload-file.ts

### Step 4. Create a new API route api/upload-file.ts

Pre-requisites:

1. Login with GitHub on NetrunnerHq.com and proceed through the quick-start.
2.

The easiest way to get started with Netrunner is the automatic setup CLI available on [npm](https://www.npmjs.com/package/@storengine/client). The cli sets up the following for Netrunner:

- Environment variables.
- Example code repository
- A quickstart S3 bucket in your cloud account

## 🚀 Tech Stack

- ✅ Framework: Nextjs 13 + Typescript + FastAPI
- ✅ Auth: Auth0.js
- ✅ Database: MongoDB.
- ✅ Styling: TailwindCSS + RadixUI.
- ✅ Infrasturcture as a code: Terraform + CloudFormation
- ✅ Cloud platform: AWS

## ✨ UI Screenshot

<br />
<p align="center">
 <img src="docs/logo/screenshot-25-july.png" width="800" alt="Screenshot"/>
</p>
<br />

## 🎉 Features

- [x] ☁️ AWS S3 bucket creation and secure configuration for file uploads
- [x] 🦾 Ready-to-use code snippets using AWS v3 or Netrunner SDKs
- [x] 🔗 Easy storage, organization, and serving of large files
- [x] 🏞️ Media previews, including videos and images
- [ ] 🔓 Security policy creation from the UI (coming soon)
- [ ] 🧠 Log streaming & OpenAI GPT-4 automated bug fixing (coming soon)
- [ ] 🪐 Lambda functions and database provisioning (coming soon)

Netrunner is currently in closed beta. You can sign up for beta access on the Netrunner [website](https://netrunnerhq.com).

## 🦾 About Netrunner

We are on a mission to enable JavaScript software engineers to transform their AWS cloud account into an AI-powered, personalised Firebase developer platform. Learn more by visiting our [website](https://netrunnerhq.com).

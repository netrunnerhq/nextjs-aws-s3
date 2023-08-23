import { Inter } from "next/font/google";
import { UploadComponent } from "@/components/UploadComponent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={` min-h-screen text-lg items-center p-24 ${inter.className}`}
    >
      <p className="text-white fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-black pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-900 dark:from-inherit">
        Next.js to AWS S3 upload file example
      </p>
      <UploadComponent />
      <div className="fixed bottom-0 left-0 flex h-[100px] w-full items-end justify-cente  dark:bg-zinc-900">
        <a
          className="m-auto pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          By Netrunner (netrunnerhq.com)
        </a>
      </div>
    </main>
  );
}

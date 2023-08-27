import { Inter } from "next/font/google";
import { UploadComponent } from "@/upload/UploadComponent";

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
      <div className="fixed bottom-0 left-0 flex h-[100px] w-full items-end justify-center  dark:bg-zinc-900" />
    </main>
  );
}

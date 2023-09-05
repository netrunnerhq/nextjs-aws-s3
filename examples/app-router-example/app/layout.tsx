"use client";

import "../styles/globals.css";
import { Footer, Header } from "@/utils/components/Common";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

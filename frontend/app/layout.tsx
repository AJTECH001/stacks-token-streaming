import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stacks DeFi Suite",
  description: "Token Streaming and Decentralized Exchange on Stacks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col gap-8 w-full bg-gray-900 text-white">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}

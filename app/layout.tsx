import type { Metadata } from "next";
import { satoshi, clashDisplay } from "@/lib/fonts";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "HLL0WRLD ©",
  description: "Created with Next.JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${clashDisplay.variable} antialiased`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}

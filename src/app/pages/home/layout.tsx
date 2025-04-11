import type { Metadata } from "next";
import React from "react";
import "@app/styles/globals.css";
import { Navbar } from "@/app/pages/home/navbar";
import Credit from "../../components/credit";

export const metadata: Metadata = {
  title: "OBAC.ac.th",
  description: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ | OBAC",
  metadataBase: new URL("https://ekawit.ac.th"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "OBAC.ac.th",
    description: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ | OBAC",
    url: "https://ekawit.ac.th",
    siteName: "ekawit",
    images: [
      {
        url: "/banner/banner.jpg", 
        width: 1200,
        height: 630,
        alt: "OBAC Open Graph Image",
      },
    ],
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="mt-28 mb-20">
         {children} 
        </div>
        <Credit />
      </body>
    </html>
  );
}

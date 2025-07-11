import type { Metadata } from "next";
import React from "react";
import "@app/styles/globals.css";
import { HomePageNavBar } from "@/components/common/NavBar/HomePageNavBar";
import HomeFooter from "@/components/common/Footer/HomeFooter";
import ClientParallaxWrapper from "@/components/Wrapper/ClientParallaxWrapper";

export const metadata: Metadata = {
  title: "เอกวิทย์บริหารธุรกิจ",
  description: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ | OBAC",
  metadataBase: new URL("https://ekawit.ac.th"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "เอกวิทย์บริหารธุรกิจ OBAC",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ClientParallaxWrapper>
          <HomePageNavBar />
          <div className="pb-10">{children}</div>
          <HomeFooter />
        </ClientParallaxWrapper>
      </body>
    </html>
  );
}

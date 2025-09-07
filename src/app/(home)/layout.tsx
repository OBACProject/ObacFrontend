import type { Metadata } from "next";
import React from "react";
import "@app/styles/globals.css";
import { HomePageNavBar } from "@/components/common/NavBar/HomePageNavBar";
import HomeFooter from "@/components/common/Footer/HomeFooter";
import ClientParallaxWrapper from "@/components/Wrapper/ClientParallaxWrapper";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://ekawit.ac.th"),
  title: {
    default: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ",
    template: "%s | วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ",
  },
  description: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ (OBAC)",
  alternates: { canonical: "https://ekawit.ac.th/" },
  applicationName: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ",
  icons: { icon: "/favicon.ico", apple: "/asset/obac-logo.png" },
  openGraph: {
    title: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ",
    description: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ (OBAC)",
    url: "https://ekawit.ac.th",
    siteName: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ",
    images: [
      { url: "/banner/banner.jpg", width: 1200, height: 630, alt: "OBAC" },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ",
    description: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ (OBAC)",
    images: ["/banner/banner.jpg"],
  },
  robots: { index: true, follow: true },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ",
  alternateName: ["เอกวิทย์บริหารธุรกิจ", "OBAC"],
  url: "https://ekawit.ac.th/",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  name: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ",
  alternateName: "Ekawit Business Administration Vocational College (OBAC)",
  url: "https://ekawit.ac.th/",
  logo: "https://ekawit.ac.th/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ClientParallaxWrapper>
          <HomePageNavBar />
          <div className="flex-grow">{children}</div>
          <HomeFooter />
        </ClientParallaxWrapper>
      </body>
    </html>
  );
}

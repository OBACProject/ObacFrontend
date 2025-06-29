
import React from "react";
import "@app/styles/globals.css";
import { Metadata } from "next";
import ClientProviders from "./clientproviders";

export const metadata: Metadata = {
  title: "OBAC",
  description: "เอกวิทย์บริหารธุรกิจ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}

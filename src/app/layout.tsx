
import React from "react";
import "@app/styles/globals.css";
import { Metadata } from "next";

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
         {children} 
      </body>
    </html>
  );
}

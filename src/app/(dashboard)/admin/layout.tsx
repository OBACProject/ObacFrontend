import type { Metadata } from "next";
import React from "react";
import "@app/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileData } from "@/resource/students/studentSidebarData";
import { AdminSideBar } from "../../../components/common/SideBar/AdminSideBar";
import { AdminSidebarData } from "@/resource/admin/adminSidebarData";
import HomeFooter from "@/components/common/Footer/HomeFooter";

export const metadata: Metadata = {
  title: "ระบบผู้ดูแล",
  description: "Admin OBAC",
  icons: {
    icon: "/favicon.ico",
    apple: "/asset/obac-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex flex-col">
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          className="z-50"
        />
        <AdminSideBar
          menuItems={AdminSidebarData.menuItems}
          profileData={ProfileData}
        />
        <div className=" flex-1  pt-20 pl-10 ">{children}</div>
        <HomeFooter />
      </body>
    </html>
  );
}

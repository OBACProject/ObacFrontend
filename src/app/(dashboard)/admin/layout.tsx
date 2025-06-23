import type { Metadata } from "next";
import React from "react";
import "@app/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StudentSidebar } from "@/components/common/SideBar/StudentSidebar";
import {
  ProfileData,
  StudentSidebarData,
} from "@/resource/students/studentSidebarData";
import { AdminSideBar } from "../../../components/common/SideBar/AdminSideBar";
import { AdminSidebarData } from "@/resource/admin/adminSidebarData";

export const metadata: Metadata = {
  title: "Obac.ac.th - Admin",
  description: "Admin OBAC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <SidebarProvider> */}
        {/* Pass StudentSidebarData to StudentSidebar */}
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          className="z-50"
        />
        <AdminSideBar
          menuItems={AdminSidebarData.menuItems}
          profileData={ProfileData}
        />
        <div className="pt-20 lg:pl-10">{children}</div>
      </body>
    </html>
  );
}

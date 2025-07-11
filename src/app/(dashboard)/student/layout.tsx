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

export const metadata: Metadata = {
  title: "OBAC-student.ac.th",
  description: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ | OBAC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          className="z-50"
        />
        <StudentSidebar
          menuItems={StudentSidebarData.menuItems}
          profileData={ProfileData}
        />
        <div className="pt-20 lg:pl-10">{children}</div>
      </body>
    </html>
  );
}

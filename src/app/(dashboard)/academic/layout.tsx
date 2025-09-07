import "@app/styles/globals.css";
import { AcademicSidebar } from "../../../components/common/SideBar/AcademicSidebar";
import {
  AcademicSideBarData,
  ProfileData,
} from "@/resource/academics/sidebarData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeFooter from "@/components/common/Footer/HomeFooter";

export const metadata = {
  title: "ระบบฝ่ายทะเบียน",
  description: "ฝ่ายทะเบียน OBAC",
  icons: {
    icon: "/favicon.ico",
    apple: "/asset/obac-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          className="z-50"
        />
        <AcademicSidebar
          menuItems={AcademicSideBarData.menuItems}
          profileData={ProfileData}
        />
        <div className="flex-1 pt-20 lg:pl-10 ">{children}</div>
        <HomeFooter />
      </body>
    </html>
  );
}

import HomeFooter from "@/components/common/Footer/HomeFooter";
import { AcademicSidebar } from "@/components/common/SideBar/AcademicSidebar";
import { AcademicSideBarData } from "@/resource/academics/sidebarData";
import { ProfileData } from "@/resource/students/studentSidebarData";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          className="z-50"
        />
        <AcademicSidebar
          menuItems={AcademicSideBarData.menuItems}
          profileData={ProfileData}
        />
        <main className="flex-1 pt-20 lg:pl-10">
          <div className="pb-8">{children}</div>
        </main>
        <HomeFooter />
      </body>
    </html>
  );
}
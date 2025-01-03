import { TeacherSideBarData } from "@/resource/teachers/sidebarData";
import { TeacherSidebar } from "./sidebar/teacherSidebar";
import "@app/styles/globals.css";
import { ProfileData } from "@/resource/teachers/sidebarData";
export const metadata = {
  title: "OBAC-teacher.ac.th",
  description: "Generated by FavTeam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TeacherSidebar
          menuItems={TeacherSideBarData.menuItems}
          profileData={ProfileData}
        />
        {children}
      </body>
    </html>
  );
}

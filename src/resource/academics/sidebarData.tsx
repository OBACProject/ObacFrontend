import {
  BookUser,
  TableProperties,
  Grid2X2Plus,
  ContactRound,
  FileSpreadsheet,
  OctagonX,
  UsersRound,
  UserRound,
} from "lucide-react";

export interface AcademicSidebarProps {
  menuItems: {
    title: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

export interface ProfileData {
  name: string;
  href: string;
}

export const ProfileData: ProfileData = {
  name: "Patarajarin Napakarn",
  href: "/pages/academic",
};

export const AcademicSideBarData: AcademicSidebarProps = {
  menuItems: [
    {
      title: "ข้อมูลผู้ใช้",
      href: "/pages/academic",
      icon: (
        <UserRound
          style={{ width: "2.0rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    // {
    //   title: "จัดตารางเรียน",
    //   tooltip: "schedule",
    //   href: "/pages/academic/course-management",
    //   icon: (
    //     <TableProperties
    //       style={{ width: "2.0rem", height: "2.5rem" }}
    //       className="text-[#0C2943]"
    //     />
    //   ),
    // },
    {
      title: "จัดตารางเรียนตารางสอน",
      href: "/pages/academic/schedule-management",
      icon: (
        <TableProperties
          style={{ width: "2.0rem", height: "2.2rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "จัดการรายวิชา",
      href: "/pages/academic/subject-management",
      icon: (
        <Grid2X2Plus
          style={{ width: "2.0rem", height: "2.2rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "รายชื่อนักเรียน",
      href: "/pages/academic/student-info-list",
      icon: (
        <BookUser
          style={{ width: "2.2rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "รายชื่ออาจารย์",
      href: "/pages/academic/teacher-info-list",
      icon: (
        <ContactRound
          style={{ width: "2.1rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "ออกเกรดรายวิชา",
      href: "/pages/academic/grading",
      icon: (
        <FileSpreadsheet
          style={{ width: "2.2rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "ออกเกรดรายวิชา",
      href: "/pages/academic/grading/management",
      icon: (
        <FileSpreadsheet
          style={{ width: "2.2rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "รายชื่อไม่ผ่านเกณฑ์วิชา",
      href: "/pages/academic/student-failed",
      icon: (
        <OctagonX
          style={{ width: "2.0rem", height: "2.0rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "รายชื่อผู้สมัครเข้าศึกษา",
      href: "/pages/academic/register-student",
      icon: (
        <UsersRound
          style={{ width: "2.0rem", height: "2.0rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
  ],
};

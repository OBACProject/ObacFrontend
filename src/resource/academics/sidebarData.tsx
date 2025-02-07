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
    tooltip: string;
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
      tooltip: "schedule",
      href: "/pages/academic",
      icon: (
        <UserRound
          style={{ width: "2.0rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "จัดตารางเรียน",
      tooltip: "schedule",
      href: "/pages/academic/course-management",
      icon: (
        <TableProperties
          style={{ width: "2.0rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "จัดตารางสอน",
      tooltip: "grade",
      href: "/pages/academic/schedule-management",
      icon: (
        <Grid2X2Plus
          style={{ width: "2.0rem", height: "2.2rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "รายชื่อนักเรียน",
      tooltip: "schedule",
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
      tooltip: "schedule",
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
      tooltip: "schedule",
      href: "/pages/academic/grading",
      icon: (
        <FileSpreadsheet
          style={{ width: "2.2rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "รายชื่อไม่ผ่านเกณฑ์วิชา",
      tooltip: "schedule",
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
      tooltip: "schedule",
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

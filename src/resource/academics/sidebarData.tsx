import {
  BookUser,
  TableProperties,
  Grid2X2Plus,
  FileSpreadsheet,
  UsersRound,
  UserRound,
  School,
  ArrowUpDown,
  OctagonMinus,
  ScrollText,
} from "lucide-react";

export interface AcademicSidebarProps {
  menuItems: {
    title: string;
    href: string;
    headLink: string;
    icon: React.ReactNode;
    subMenu?: {
      title: string;
      href: string;
      icon: React.ReactNode;
    }[];
  }[];
}

export interface ProfileData {
  name: string;
  href: string;
}

export const ProfileData: ProfileData = {
  name: "username",
  href: "/pages/academic",
};

export const AcademicSideBarData: AcademicSidebarProps = {
  menuItems: [
    {
      title: "ข้อมูลผู้ใช้",
      href: "/pages/academic/profile",
      headLink: "/pages/academic/profile",
      icon: <UserRound style={{ width: "2.0rem", height: "2.5rem" }} />,
    },
    {
      title: "ออกเกรดรายวิชา",
      href: "/pages/academic/grading",
      headLink: "/pages/academic/grading",
      icon: <ScrollText style={{ width: "2.2rem", height: "2.5rem" }} />,
    },
    {
      title: "ระบบจัดการคะแนน",
      href: "/pages/academic/score/management",
      headLink: "/pages/academic/score/management",
      icon: <FileSpreadsheet style={{ width: "2.1rem", height: "2.5rem" }} />,
    },
    {
      title: "ข้อมูลนักเรียน",
      href: "/pages/academic/student-info-list",
      headLink: "/pages/academic/student-info-list",
      icon: <BookUser style={{ width: "2.2rem", height: "2.5rem" }} />,
    },
    {
      title: "จัดตารางเรียนตารางสอน",
      href: "/pages/academic/schedule-management",
      headLink: "/pages/academic/schedule-management",
      icon: <TableProperties style={{ width: "2.0rem", height: "2.2rem" }} />,
    },
    {
      title: "จัดการรายวิชา",
      href: "/pages/academic/subject-management",
      headLink: "/pages/academic/subject-management",
      icon: <Grid2X2Plus style={{ width: "2.0rem", height: "2.2rem" }} />,
    },
    {
      title: "ระบบเลื่อนชั้นเรียน",
      href: "/pages/academic/upLevel",
      headLink: "/pages/academic/upLevel",
      icon: <ArrowUpDown className=" h-8 w-8" />,
    },
    {
      title: "นักเรียนไม่ผ่านเกณฑ์",
      href: "/pages/academic/FailedStudent",
      headLink: "/pages/academic/FailedStudent",
      icon: <OctagonMinus className=" h-8 w-8" />,
    },
  ],
};

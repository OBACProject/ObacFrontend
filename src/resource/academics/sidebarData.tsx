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
  Paperclip,
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
  href: "/academic",
};

export const AcademicSideBarData: AcademicSidebarProps = {
  menuItems: [
    {
      title: "ข้อมูลผู้ใช้",
      href: "/academic/profile",
      headLink: "/academic/profile",
      icon: <UserRound style={{ width: "2.0rem", height: "2.5rem" }} />,
    },
    {
      title: "ออกเกรดรายวิชา",
      href: "/academic/grading/student-classroom",
      headLink: "/academic/grading/student-classroom",
      icon: <ScrollText style={{ width: "2.2rem", height: "2.5rem" }} />,
    },
    {
      title: "ระบบจัดการคะแนน",
      href: "/academic/score-management",
      headLink: "/academic/score-management",
      icon: <FileSpreadsheet style={{ width: "2.1rem", height: "2.5rem" }} />,
    },
    {
      title: "ข้อมูลนักเรียน",
      href: "/academic/student-name-list",
      headLink: "/academic/student-name-list",
      icon: <BookUser style={{ width: "2.2rem", height: "2.5rem" }} />,
    },
    {
      title: "จัดตารางเรียนตารางสอน",
      href: "/academic/schedule-management",
      headLink: "/academic/schedule-management",
      icon: <TableProperties style={{ width: "2.0rem", height: "2.2rem" }} />,
    },
    {
      title: "จัดการรายวิชา",
      href: "/academic/subject-management",
      headLink: "/academic/subject-management",
      icon: <Grid2X2Plus style={{ width: "2.0rem", height: "2.2rem" }} />,
    },
    {
      title: "ระบบเลื่อนชั้นเรียน",
      href: "/academic/promote-student",
      headLink: "/academic/promote-student",
      icon: <ArrowUpDown className=" h-8 w-8" />,
    },
    {
      title: "นักเรียนไม่ผ่านเกณฑ์",
      href: "/academic/student-not-pass",
      headLink: "/academic/student-not-passt",
      icon: <OctagonMinus className=" h-8 w-8" />,
    },
    {
      title: "ตัวอย่างเอกสาร",
      href: "/academic/document",
      headLink: "/academic/document",
      icon: <Paperclip className=" h-8 w-8" />,
    },
  ],
};

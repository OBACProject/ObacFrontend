import {
  BookUser,
  TableProperties,
  Grid2X2Plus,
  FileSpreadsheet,
  UsersRound,
  UserRound,
  School,
  FileSliders,
  ArrowUpDown,
  OctagonMinus,
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
  name: "Patarajarin Napakarn",
  href: "/pages/academic",
};

export const AcademicSideBarData: AcademicSidebarProps = {
  menuItems: [
    {
      title: "ข้อมูลผู้ใช้",
      href: "/pages/academic",
      headLink: "none",
      icon: (
        <UserRound
          style={{ width: "2.0rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "ออกเกรดรายวิชา",
      href: "/pages/academic/grading",
      headLink: "/pages/academic/grading",
      icon: (
        <FileSliders
          style={{ width: "2.2rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "ระบบจัดการคะแนน",
      href: "/pages/academic/score/management/classroom",
      headLink: "/pages/academic/score/management",
      icon: (
        <FileSpreadsheet
          style={{ width: "2.1rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
      subMenu: [
        {
          title: "จัดการคะแนน(ห้อง)",
          href: "/pages/academic/score/management/classroom",
          icon: (
            <School
              style={{ width: "2.2rem", height: "2.5rem" }}
              className="text-[#0C2943]"
            />
          ),
        },
        {
          title: "จัดการคะแนน(รายบุคคล)",
          href: "/pages/academic/score/management/individual",
          icon: (
            <UsersRound
              style={{ width: "2.2rem", height: "2.5rem" }}
              className="text-[#0C2943]"
            />
          ),
        },
      ],
    },
    {
      title: "ข้อมูลนักเรียน",
      href: "/pages/academic/student-info-list",
      headLink: "/pages/academic/student-info-list",
      icon: (
        <BookUser
          style={{ width: "2.2rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "จัดตารางเรียนตารางสอน",
      href: "/pages/academic/schedule-management",
      headLink: "/pages/academic/schedule-management",
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
      headLink: "/pages/academic/subject-management",
      icon: (
        <Grid2X2Plus
          style={{ width: "2.0rem", height: "2.2rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "ระบบเลื่อนชั้นเรียน",
      href: "/pages/academic/upLevel",
      headLink: "/pages/academic/upLevel",
      icon: <ArrowUpDown className="text-[#0C2943] h-8 w-8" />,
    },
    {
      title: "นักเรียนไม่ผ่านเกณฑ์",
      href: "/pages/academic/FailedStudent",
      headLink: "/pages/academic/FailedStudent",
      icon: <OctagonMinus className="text-[#0C2943] h-8 w-8" />,
    },
  ],
};

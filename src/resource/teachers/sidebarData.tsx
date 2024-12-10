import {
    FilePen,
    CreditCard,
    GraduationCap,
  } from "lucide-react";


  export interface TeacherSidebarProps {
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
    href: "/pages/teacher/profile",
  };
  

  export const TeacherSideBarData: TeacherSidebarProps = {
    menuItems: [
      {
        title: "ข้อมูลอาจารย์",
        tooltip: "schedule",
        href: "/pages/teacher/profile",
        icon: (
          <FilePen
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-[#0C2943]"
          />
        ),
      },
      {
        title: "รายวิชา",
        tooltip: "grade",
        href: "/pages/teacher/subject",
        icon: (
          <GraduationCap
            style={{ width: "2.3rem", height: "2.5rem" }}
            className="text-[#0C2943]"
          />
        ),
      },
      {
        title: "ตารางสอน",
        tooltip: "schedule",
        href: "/pages/teacher/schedule",
        icon: (
          <CreditCard
            style={{ width: "2.2rem", height: "2.5rem" }}
            className="text-[#0C2943]"
          />
        ),
      }
    ],
  };
  
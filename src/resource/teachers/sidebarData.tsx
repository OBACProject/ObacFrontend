import {  CreditCard, GraduationCap, UserRound } from "lucide-react";

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
  href: "/teacher/profile",
};

export const TeacherSideBarData: TeacherSidebarProps = {
  menuItems: [
    {
      title: "ข้อมูลอาจารย์",
      tooltip: "schedule",
      href: "/teacher/profile",
      icon: (
        <UserRound
          style={{ width: "2.0rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "รายวิชา",
      tooltip: "grade",
      href: "/teacher/subject",
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
      href: "/teacher/schedule",
      icon: (
        <CreditCard
          style={{ width: "2.2rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
  ],
};

import {
  BookOpen,
  BookText,
  Calendar,
  CalendarDays,
  CreditCard,
  GraduationCap,
  UserRound,
} from "lucide-react";

export interface StudentSidebarProps {
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
  id: string;
  name: string;
  href: string;
}
export const ProfileData: ProfileData = {
  name: "username",
  id: "0000",
  href: "/student",
};

export const StudentSidebarData: StudentSidebarProps = {
  menuItems: [
    {
      title: "ข้อมูลผู้ใช้",
      href: "/student/profile",
      headLink: "/student/profile",
      icon: <UserRound className="w-8 h-8" />,
    },
    {
      title: "ผลการเรียน",
      href: "/student/educate-information",
      headLink: "/student/educate-information",
      icon: <BookOpen className="w-8 h-8" />,
    },
    {
      title: "ตารางเรียน",
      href: "/student/schedule",
      headLink: "/student/schedule",
      icon: <Calendar className="w-8 h-8" />,
    },
  ],
};


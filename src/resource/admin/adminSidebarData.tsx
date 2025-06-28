import {
  GraduationCap,
  BookMarked,
  CalendarClock,
  UserRoundPen,
  Newspaper,
  House,
} from "lucide-react";

export interface ProfileData {
  name: string;
  href: string;
}

export interface AdminSidebarProps {
  menuItems: {
    title: string;
    tooltip: string;
    href: string;
    headLink:string;
    icon: React.ReactNode;
    subMenu?: {
      title: string;
      href: string;
      icon: React.ReactNode;
    }[];
  }[];
}

export const ProfileData: ProfileData = {
  name: "Admin",
  href: "/admin/eventManagement",
};

export const AdminSidebarData: AdminSidebarProps = {
  menuItems: [
    {
      title: "หน้าหลัก",
      tooltip: "หน้าหลักผู้ใช้",
      href: "/admin/profile",
      headLink:"/admin/profile",
      icon: (
        <House
          style={{ width: "2.0rem", height: "2.0rem" }}
        />
      ),
    },
    {
      title: "จัดการนักเรียน",
      tooltip: "จัดการนักเรียน",
      href: "/admin/student-management",
      headLink:"/admin/student-management",
      icon: (
        <GraduationCap
          style={{ width: "2.0rem", height: "2.0rem" }}
        />
      ),
    },
    {
      title: "จัดการอาจารย์",
      tooltip: "จัดการอาจารย์",
      href: "/admin/teacher-management",
      headLink:"/admin/teacher-management",
      icon: (
        <UserRoundPen
          style={{ width: "2.0rem", height: "2.0rem" }}

        />
      ),
    },
    {
      title: "จัดการบุคลากรภายใน",
      tooltip: "จัดการบุคลากรภายใน",
      href: "/admin/academic-management",
      headLink:"/admin/academic-management",
      icon: (
        <BookMarked
          style={{ width: "2.0rem", height: "2.0rem" }}
        />
      ),
    },
    {
      title: "กิจกรรม",
      tooltip: "กิจกรรม",
      href: "/admin/event-management",
      headLink: "/admin/event-management",
      icon: (
        <CalendarClock
          style={{ width: "2.0rem", height: "2.0rem" }}
        />
      ),
    },
    {
      title: "ข่าวสาร",
      tooltip: "ข่าวสาร",
      href: "/admin/news-management",
      headLink: "/admin/news-management",
      icon: <Newspaper style={{ width: "2.0rem", height: "2.0rem" }} />,
    },
  ],
};

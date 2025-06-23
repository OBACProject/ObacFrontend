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
      href: "/admin/studentManagement",
      headLink:"/admin/studentManagement",
      icon: (
        <GraduationCap
          style={{ width: "2.0rem", height: "2.0rem" }}
        />
      ),
    },
    {
      title: "จัดการอาจารย์",
      tooltip: "จัดการอาจารย์",
      href: "/admin/teacherManagement",
      headLink:"/admin/teacherManagement",
      icon: (
        <UserRoundPen
          style={{ width: "2.0rem", height: "2.0rem" }}

        />
      ),
    },
    {
      title: "จัดการบุคลากรภายใน",
      tooltip: "จัดการบุคลากรภายใน",
      href: "/admin/academicManagement",
      headLink:"/admin/academicManagement",
      icon: (
        <BookMarked
          style={{ width: "2.0rem", height: "2.0rem" }}
        />
      ),
    },
    {
      title: "กิจกรรม",
      tooltip: "กิจกรรม",
      href: "/admin/eventManagement",
      headLink: "/admin/eventManagement",
      icon: (
        <CalendarClock
          style={{ width: "2.0rem", height: "2.0rem" }}
        />
      ),
    },
    {
      title: "ข่าวสาร",
      tooltip: "ข่าวสาร",
      href: "/admin/newsManagement",
      headLink: "/admin/newsManagement",
      icon: <Newspaper style={{ width: "2.0rem", height: "2.0rem" }} />,
    },
  ],
};

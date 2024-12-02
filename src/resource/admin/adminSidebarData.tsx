import {
  GraduationCap,
  BookMarked,
  CalendarClock,
  UserRoundPen,
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
    icon: React.ReactNode;
  }[];
}

export const ProfileData: ProfileData = {
  name: "Admin",
  href: "/pages/admin/eventManagement",
};

export const AdminSidebarData: AdminSidebarProps = {
  menuItems: [
    {
      title: "จัดการกิจกรรม",
      tooltip: "eventManagement",
      href: "/pages/admin/eventManagement",
      icon: (
        <CalendarClock
          style={{ width: "2.5rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "จัดการนิสิต",
      tooltip: "studentManagement",
      href: "/pages/admin/studentManagement",
      icon: (
        <GraduationCap
          style={{ width: "2.5rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "จัดการอาจารย์",
      tooltip: "teacherManagement",
      href: "/pages/admin/teacherManagement",
      icon: (
        <UserRoundPen
          style={{ width: "2.5rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "จัดการบุคลากรภายใน",
      tooltip: "subjectManagement",
      href: "/pages/admin/academicManagement",
      icon: (
        <BookMarked
          style={{ width: "2.5rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
  ],
};

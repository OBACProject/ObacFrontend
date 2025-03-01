import {
  BookUser,
  TableProperties,
  Grid2X2Plus,
  ContactRound,
  FileSpreadsheet,
  UsersRound,
  UserRound,
  School,
  FileSliders,
} from "lucide-react";

export interface AcademicSidebarProps {
  menuItems: {
    title: string;
    href: string;
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
      icon: (
        <UserRound
          style={{ width: "2.0rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    }
    ,
    {
      title: "ออกเกรดรายวิชา",
      href: "/pages/academic/grading",
      icon: (
        <FileSliders
          style={{ width: "2.2rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "ระบบจัดการคะแนน",
      href: "/pages/academic/grading/management/classroom",
      icon: (
        <FileSpreadsheet
          style={{ width: "2.1rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
      subMenu: [
        {
          title: "จัดการคะแนน(ห้อง)",
          href: "/pages/academic/grading/management/classroom",
          icon: (
            <School
              style={{ width: "2.2rem", height: "2.5rem" }}
              className="text-[#0C2943]"
            />
          ),
        },
        {
          title: "จัดการคะแนน(รายบุคคล)",
          href: "/pages/academic/grading/management/individual",
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
      icon: (
        <BookUser
          style={{ width: "2.2rem", height: "2.5rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    // {
    //   title: "ข้อมูลอาจารย์",
    //   href: "/pages/academic/teacher-info-list",
    //   icon: (
    //     <ContactRound
    //       style={{ width: "2.1rem", height: "2.5rem" }}
    //       className="text-[#0C2943]"
    //     />
    //   ),
    // },
    
    {
      title: "จัดตารางเรียนตารางสอน",
      href: "/pages/academic/schedule-management",
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
      icon: (
        <Grid2X2Plus
          style={{ width: "2.0rem", height: "2.2rem" }}
          className="text-[#0C2943]"
        />
      ),
    },
    {
      title: "รายชื่อผู้สมัครเข้าศึกษา",
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

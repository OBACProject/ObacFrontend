import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { Boxes, CalendarRange, Component, Cpu, HandCoins, HandIcon ,Landmark , Lightbulb, Newspaper, NotebookTabs, Phone, Plane, TvMinimalPlay, Users } from "lucide-react";
interface DropMenuList {
  menuName: string;
  menuIcon: React.ReactNode;
  tab: string;
}

export interface DropMenuProps {
  menuTopic: string;
  href: string;
  menuList: DropMenuList[];
}

export const NavbarData: DropMenuProps[] = [
  {
    menuTopic: "เกี่ยวกับ OBAC",
    href: "/about",
    menuList: [
      {
        menuName: "ประวัติมหาลัย",
        menuIcon: <NotebookTabs
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "history",
      },
      {
        menuName: "วิสัยทัศน์ / ปรัชญา",
        menuIcon: <Lightbulb
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "vision",
      },
      {
        menuName: "อัตลักษณ์ / เอกลักษณ์",
        menuIcon: <Component
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "symbol",
      },
    ],
  },
  {
    menuTopic: "หลักสูตรเปิดสอน",
    href: "/program",
    menuList: [
      {
        menuName: "การบัญชี",
        menuIcon: <HandCoins
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "accounting",
      },
      {
        menuName: "การตลาด",
        menuIcon: <Landmark
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "marketing",
      },
      {
        menuName: "เทคโนโลยีธุรกิจดิจิทัล",
        menuIcon: <Cpu
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "digital",
      },
      {
        menuName: "ดิจิทัลกราฟฟิก",
        menuIcon: <TvMinimalPlay
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "graphic",
      },
      {
        menuName: "การท่องเที่ยว",
        menuIcon: <Plane
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "tourism",
      },
    ],
  },
  {
    menuTopic: "โครงสร้างการบริหารวิทยาลัย",
    href: "/ManagementStructure",
    menuList: [
      {
        menuName: "โครงสร้างการบริหาร",
        menuIcon: <Users
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "management",
      },
      {
        menuName: "คณะผู้บริหารวิทยาลัย",
        menuIcon: <Boxes
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "executive",
      },
    ],
  },
  {
    menuTopic: "ข่าวสารและกิจกรรม",
    href: "/news",
    menuList: [
      {
        menuName: "กิจกรรม",
        menuIcon: <CalendarRange
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "activity",
      },
      {
        menuName: "ข่าวสาร",
        menuIcon: <Newspaper
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "news",
      },
    ],
  },
  {
    menuTopic: "ติดต่อ",
    href: "/contact",
    menuList: [
      {
        menuName: "ติดต่อวิทยาลัย",
        menuIcon: <Phone
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-[#0C2943]"
      />,
        tab: "contact",
      },
    ],
  },
];

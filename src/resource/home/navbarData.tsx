


import { Boxes, CalendarRange, Component, Cpu, HandCoins ,Landmark , Lightbulb, Newspaper, NotebookTabs, Phone, Plane, TvMinimalPlay, Users } from "lucide-react";
interface DropMenuList {
  menuName: string;
  menuIcon: React.ReactNode;
  tab: string;
  href:string;
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
        className="text-white transition-colors"
      />,
        tab: "history",
        href:"/pages/home/aboutObac/history"
      },
      {
        menuName: "วิสัยทัศน์ / ปรัชญา",
        menuIcon: <Lightbulb
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-white  transition-colors"
      />,
        tab: "vision",
        href:"/pages/home/aboutObac/symbol"
      },
      {
        menuName: "อัตลักษณ์ / เอกลักษณ์",
        menuIcon: <Component
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-white  transition-colors"
      />,
        tab: "symbol",
        href:"/pages/home/aboutObac/vision"
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
        className="text-white  transition-colors"
      />,
        tab: "accounting",
        href:"/pages/home"
      },
      {
        menuName: "การตลาด",
        menuIcon: <Landmark
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-white  transition-colors"
      />,
        tab: "marketing",
        href:"/pages/home"
      },
      {
        menuName: "เทคโนโลยีธุรกิจดิจิทัล",
        menuIcon: <Cpu
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-white  transition-colors"
        />,
        tab: "digital",
        href:"/pages/home"
      },
      {
        menuName: "ดิจิทัลกราฟฟิก",
        menuIcon: <TvMinimalPlay
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-white  transition-colors"
      />,
        tab: "graphic",
        href:"/pages/home"
      },
      {
        menuName: "การท่องเที่ยว",
        menuIcon: <Plane
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-white  transition-colors "
      />,
        tab: "tourism",
        href:"/pages/home"
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
       className="text-white  transition-colors"
      />,
        tab: "management",
        href:"/pages/home/managementStructure/executive",
      },
      {
        menuName: "คณะผู้บริหารวิทยาลัย",
        menuIcon: <Boxes
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-white  transition-colors"
      />,
        tab: "executive",
        href:"/pages/home/managementStructure/management"
      },
    ],
  },
  {
    menuTopic: "ข่าวสารและกิจกรรม",
    href: "/pages/home/news",
    menuList: [
      {
        menuName: "กิจกรรม",
        menuIcon: <CalendarRange
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-white  transition-colors"
      />,
        tab: "activity",
        href:"/pages/home/"
      },
      {
        menuName: "ข่าวสาร",
        menuIcon: <Newspaper
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-white  transition-colors"
      />,
        tab: "news",
        href:"/pages/home/news"
      },
    ],
  },
  {
    menuTopic: "ติดต่อ",
    href: "/pages/home/contact",
    menuList: [
      {
        menuName: "ติดต่อวิทยาลัย",
        menuIcon: <Phone
        style={{ width: "2.0rem", height: "2.5rem" }}
        className="text-white  transition-colors"
      />,
        tab: "contact",
        href:"/pages/home/contact"
      },
    ],
  },
];

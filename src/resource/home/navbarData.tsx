import {
  Boxes,
  CalendarRange,
  Component,
  Cpu,
  HandCoins,
  Landmark,
  Lightbulb,
  Newspaper,
  NotebookTabs,
  Phone,
  Plane,
  TvMinimalPlay,
  Users,
} from "lucide-react";
interface DropMenuList {
  menuName: string;
  menuIcon: React.ReactNode;
  tab: string;
  href: string;
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
        menuIcon: (
          <NotebookTabs
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white transition-colors"
          />
        ),
        tab: "history",
        href: "/about/history-obac",
      },
      {
        menuName: "วิสัยทัศน์ / ปรัชญา",
        menuIcon: (
          <Lightbulb
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white  transition-colors"
          />
        ),
        tab: "vision",
        href: "/about/symbol-obac",
      },
      {
        menuName: "อัตลักษณ์ / เอกลักษณ์",
        menuIcon: (
          <Component
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white  transition-colors"
          />
        ),
        tab: "symbol",
        href: "/about/vision-obac",
      },
    ],
  },
  {
    menuTopic: "หลักสูตรเปิดสอน",
    href: "/program",
    menuList: [
      {
        menuName: "การบัญชี",
        menuIcon: (
          <HandCoins
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white  transition-colors"
          />
        ),
        tab: "accounting",
        href: "/program/accounting",
      },
      {
        menuName: "การตลาด",
        menuIcon: (
          <Landmark
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white  transition-colors"
          />
        ),
        tab: "marketing",
        href: "/program/marketing",
      },
      {
        menuName: "เทคโนโลยีธุรกิจดิจิทัล",
        menuIcon: (
          <Cpu
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white  transition-colors"
          />
        ),
        tab: "computer-business",
        href: "/program/computer-business",
      },
      {
        menuName: "ดิจิทัลกราฟฟิก",
        menuIcon: (
          <TvMinimalPlay
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white  transition-colors"
          />
        ),
        tab: "computer-graphic",
        href: "/program/computer-graphic",
      },
      {
        menuName: "การท่องเที่ยว",
        menuIcon: (
          <Plane
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white  transition-colors "
          />
        ),
        tab: "tourism",
        href: "/program/tourism-management",
      },
    ],
  },
  {
    menuTopic: "โครงสร้างการบริหารวิทยาลัย",
    href: "/structure",
    menuList: [
      {
        menuName: "โครงสร้างการบริหาร",
        menuIcon: (
          <Users
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white  transition-colors"
          />
        ),
        tab: "management",
        href: "/structure/executive",
      },
      {
        menuName: "คณะผู้บริหารวิทยาลัย",
        menuIcon: (
          <Boxes
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white  transition-colors"
          />
        ),
        tab: "executive",
        href: "/structure/management",
      },
    ],
  },
  {
    menuTopic: "ข่าวสารและกิจกรรม",
    href: "/",
    menuList: [
      {
        menuName: "กิจกรรม",
        menuIcon: (
          <CalendarRange
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white  transition-colors"
          />
        ),
        tab: "activity",
        href:"/events"
      },
      {
        menuName: "ข่าวสาร",
        menuIcon: (
          <Newspaper
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white  transition-colors"
          />
        ),
        tab: "news",
        href: "/news",
      },
    ],
  },
  {
    menuTopic: "ติดต่อ",
    href: "/contact-obac",
    menuList: [
      {
        menuName: "ติดต่อวิทยาลัย",
        menuIcon: (
          <Phone
            style={{ width: "2.0rem", height: "2.5rem" }}
            className="text-white  transition-colors"
          />
        ),
        tab: "contact",
        href: "/contact-obac",
      },
    ],
  },
];

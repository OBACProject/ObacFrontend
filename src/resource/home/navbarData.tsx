import {
  BookA,
  BookOpen,
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
  Building,
  TvMinimalPlay,
  Users,
  ClipboardList,
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
        menuName: "ประวัติ",
        menuIcon: (
          <NotebookTabs
            className="text-white transition-colors w-6 h-6 "
          />
        ),
        tab: "history",
        href: "/about/history-obac",
      },
      {
        menuName: "วิสัยทัศน์ / ปรัชญา",
        menuIcon: (
          <Lightbulb
            className="text-white  transition-colors w-6 h-6 "
          />
        ),
        tab: "vision",
        href: "/about/symbol-obac",
      },
      {
        menuName: "อัตลักษณ์ / เอกลักษณ์",
        menuIcon: (
          <Component
            className="text-white  transition-colors w-6 h-6 " 
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
          
            className="text-white  transition-colors w-6 h-6 "
          />
        ),
        tab: "accounting",
        href: "/program/accounting",
      },
      {
        menuName: "การตลาด",
        menuIcon: (
          <Landmark

            className="text-white  transition-colors w-6 h-6 "
          />
        ),
        tab: "marketing",
        href: "/program/marketing",
      },
      {
        menuName: "เทคโนโลยีธุรกิจดิจิทัล",
        menuIcon: (
          <Cpu
            className="text-white  transition-colors w-6 h-6 "
          />
        ),
        tab: "computer-business",
        href: "/program/computer-business",
      },
      {
        menuName: "ดิจิทัลกราฟฟิก",
        menuIcon: (
          <TvMinimalPlay
            className="text-white  transition-colors w-6 h-6 "
          />
        ),
        tab: "computer-graphic",
        href: "/program/computer-graphic",
      },
      {
        menuName: "การท่องเที่ยว",
        menuIcon: (
          <Plane
            className="text-white w-6 h-6  transition-colors "
          />
        ),
        tab: "tourism",
        href: "/program/tourism-management",
      },
      {
        menuName: "สาขาการจัดการสำนักงาน",
        menuIcon: (
          <ClipboardList
            className="text-white w-6 h-6  transition-colors "
          />
        ),
        tab: "office",
        href: "/program/office-management",
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
            className="text-white  transition-colors w-6 h-6 "
          />
        ),
        tab: "management",
        href: "/structure/executive",
      },
      {
        menuName: "คณะผู้บริหารวิทยาลัย",
        menuIcon: (
          <Boxes

            className="text-white  transition-colors w-6 h-6 "
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
            className="text-white  transition-colors w-6 h-6 "
          />
        ),
        tab: "activity",
        href:"/events"
      },
      {
        menuName: "ข่าวสาร",
        menuIcon: (
          <Newspaper
            className="text-white  transition-colors w-6 h-6 "
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
            className="text-white  transition-colors"
          />
        ),
        tab: "contact",
        href: "/contact-obac",
      },
    ],
  },
];



export const DropDownIconPhone: React.ReactNode[] = [
  <BookA className="w-5 h-5" key="info" />,         
  <BookOpen className="w-5 h-5" key="book" />,      
  <Building className="w-5 h-5" key="sitemap" />,   
  <Newspaper className="w-5 h-5" key="news" />,     
  <Phone className="w-5 h-5" key="phone" />,      
];
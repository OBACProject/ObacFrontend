import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faLaptop,
  faMagnifyingGlassDollar,
  faPen,
  faPenRuler,
  faPeopleLine,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface DropMenuList {
  menuName: string;
  menuIcon: React.ReactNode;
  tab: string;
}

interface DropMenuProps {
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
        menuIcon: <FontAwesomeIcon icon={faBook} />,
        tab: "history",
      },
      {
        menuName: "วิสัยทัศน์ / ปรัชญา",
        menuIcon: <FontAwesomeIcon icon={faPen} />,
        tab: "vision",
      },
      {
        menuName: "อัตลักษณ์ / เอกลักษณ์",
        menuIcon: <FontAwesomeIcon icon={faPeopleLine} />,
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
        menuIcon: <FontAwesomeIcon icon={faReceipt} />,
        tab: "accounting",
      },
      {
        menuName: "การตลาด",
        menuIcon: <FontAwesomeIcon icon={faMagnifyingGlassDollar} />,
        tab: "marketing",
      },
      {
        menuName: "เทคโนโลยีธุรกิจดิจิทัล",
        menuIcon: <FontAwesomeIcon icon={faPeopleLine} />,
        tab: "digital",
      },
      {
        menuName: "ดิจิทัลกราฟฟิก",
        menuIcon: <FontAwesomeIcon icon={faLaptop} />,
        tab: "graphic",
      },
      {
        menuName: "การท่องเที่ยว",
        menuIcon: <FontAwesomeIcon icon={faPenRuler} />,
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
        menuIcon: <FontAwesomeIcon icon={faBook} />,
        tab: "management",
      },
      {
        menuName: "คณะผู้บริหารวิทยาลัย",
        menuIcon: <FontAwesomeIcon icon={faPeopleLine} />,
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
        menuIcon: <FontAwesomeIcon icon={faReceipt} />,
        tab: "activity",
      },
      {
        menuName: "ข่าวสาร",
        menuIcon: <FontAwesomeIcon icon={faReceipt} />,
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
        menuIcon: <FontAwesomeIcon icon={faReceipt} />,
        tab: "contact",
      },
    ],
  },
];

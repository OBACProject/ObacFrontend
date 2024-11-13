import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPen, faPeopleLine } from "@fortawesome/free-solid-svg-icons";

interface DropMenuProps {
  menuName: string;
  menuIcon: React.ReactNode;
  href: string;
}

export const AboutObac: DropMenuProps[] = [
  {
    menuName: "ประวัติมหาลัย",
    menuIcon: <FontAwesomeIcon icon={faBook} />,
    href: "/history",
  },
  {
    menuName: "วิสัยทัศน์ / ปรัชญา",
    menuIcon: <FontAwesomeIcon icon={faPen} />,
    href: "/vision",
  },
  {
    menuName: "อัตลักษณ์ / เอกลักษณ์",
    menuIcon: <FontAwesomeIcon icon={faPeopleLine} />,
    href: "/symbol",
  },
];

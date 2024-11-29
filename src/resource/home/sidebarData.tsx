import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DropMenuList {
  menuName: string;
  menuIcon: React.ReactNode;
}

export const SidebarData: DropMenuList[] = [
  {
    menuName: "กระทรวงศึกษาธิการ",
    menuIcon: <FontAwesomeIcon icon={faBook} />,
  },
  {
    menuName: "กระทรวงศึกษาธิการ 1",
    menuIcon: <FontAwesomeIcon icon={faBook} />,
  },
  {
    menuName: "กระทรวงศึกษาธิการ 2",
    menuIcon: <FontAwesomeIcon icon={faBook} />,
  },
  {
    menuName: "กระทรวงศึกษาธิการ 3",
    menuIcon: <FontAwesomeIcon icon={faBook} />,
  },
];

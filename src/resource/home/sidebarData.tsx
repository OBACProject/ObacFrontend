import { BookText } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DropMenuList {
  menuName: string;
  menuIcon: React.ReactNode;
}

export const SidebarData: DropMenuList[] = [
  {
    menuName: "กระทรวงศึกษาธิการ",
    menuIcon: <BookText
    style={{ width: "2.2rem", height: "2.5rem" }}
    className="text-[#0C2943]"
  />,
  },
  {
    menuName: "กระทรวงศึกษาธิการ 1",
    menuIcon:<BookText
    style={{ width: "2.2rem", height: "2.5rem" }}
    className="text-[#0C2943]"
  />,
  },
  {
    menuName: "กระทรวงศึกษาธิการ 2",
    menuIcon: <BookText
    style={{ width: "2.2rem", height: "2.5rem" }}
    className="text-[#0C2943]"
  />,
  },
  {
    menuName: "กระทรวงศึกษาธิการ 3",
    menuIcon: <BookText
    style={{ width: "2.2rem", height: "2.5rem" }}
    className="text-[#0C2943]"
  />,
  },
];

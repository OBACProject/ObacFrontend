"use client";

import {
  AcademicSidebarProps,
  ProfileData,
} from "@/resource/academics/sidebarData";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CircleUserRound,
  DoorOpen,
  Menu,
  Settings,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { logout } from "@/lib/authentication";

export function AcademicSidebar({
  menuItems,
  profileData,
  ...props
}: AcademicSidebarProps & { profileData: ProfileData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState(profileData.name);
  const [triggerDropdown, setTriggerDropdown] = useState<boolean>(false);
  useEffect(() => {
    const cookieName = Cookies.get("name");
    if (cookieName) {
      setUserName(cookieName);
    }
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUserName("");
      router.push("/pages/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleMouseEnter = (index: number) => {
    if (submenuTimeout) clearTimeout(submenuTimeout); // Clear any existing timeout
    const timeout = setTimeout(() => {
      setOpenSubMenu(index);
    }, 200); // Delay before showing submenu
    setSubmenuTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (submenuTimeout) clearTimeout(submenuTimeout); // Clear timeout before hiding
    const timeout = setTimeout(() => {
      setOpenSubMenu(null);
    }, 200); // Delay before hiding submenu
    setSubmenuTimeout(timeout);
  };

  return (
    <div className="fixed flex flex-col z-20  w-full">
      <header className="flex w-full items-center gap-2 bg-background border-b px-4  ">
        <div className="flex h-[80px]  items-center">
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="ml-4 text-gray-500 hover:text-gray-700 flex items-center"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div className=" flex justify-start ml-8 items-center w-full gap-6 h-full">
          <img
            src="/images/obac_navbar_logo.png"
            alt="obac-logo"
            style={{
              width: "3.5rem",
              height: "3.5rem",
              objectFit: "contain",
            }}
          />
          <span
            className="text-center text-lg py-2"
            style={{ userSelect: "none" }}
          >
            วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
          </span>
        </div>
        <button
          onClick={() => setTriggerDropdown(!triggerDropdown)}
          className="flex h-full py-2 hover:bg-gray-100 rounded-sm items-center px-5 gap-6"
        >
          <div
            className="flex gap-2 items-center"
            style={{ userSelect: "none" }}
          >
            <div className="flex items-center">
              <CircleUserRound className="w-10 h-10 text-[#0C2943]" />
            </div>
            <p className="text-[#0C2943] text-sm font-medium truncate w-auto">
              {userName}
            </p>
          </div>
        </button>
        {triggerDropdown && (
          <div className="px-4 py-4 z-50 rounded-sm bg-white shadow-md border border-gray-200 fixed grid gap-1 top-20 right-5">
            <div className="py-1 justify-center cursor-not-allowed w-[150px] duration-300 rounded-sm hover:bg-gray-200 text-gray-700 flex gap-2 items-center ">
              <Settings className="w-5 h-5" />
              ตั้งค่าผู้ใช้งาน
            </div>
            {loading ? (
              <button
                className=" w-[150px] justify-center items-center duration-300 text-sm rounded-sm py-1 bg-red-400 hover:bg-red-600 text-white flex gap-2"
                style={{ userSelect: "none" }}
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                ออกจากระบบ
              </button>
            ) : (
              <button
                onClick={handleLogout}
                disabled={loading}
                className=" w-[150px] justify-center items-center duration-300 text-sm rounded-sm py-1 bg-red-400 hover:bg-red-600 text-white flex gap-2"
                style={{ userSelect: "none" }}
              >
                <DoorOpen className="w-5 h-5" />
                ออกจากระบบ
              </button>
            )}
          </div>
        )}
      </header>

      <SidebarMenu
        menuItems={menuItems}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </div>
  );
}
export function SidebarMenu({
  menuItems,
  isVisible,
  setIsVisible,
}: {
  menuItems: AcademicSidebarProps["menuItems"];
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [delayedSubMenu, setDelayedSubMenu] = useState<number | null>(null);

  const handleMouseEnter = (index: number, subMenu: any) => {
    setHoveredIndex(index);
    if (subMenu) {
      setTimeout(() => {
        setDelayedSubMenu(index);
      }, 200); // Delay of 200ms before showing the submenu
    }
  };

  const handleMouseLeave = (index: number, subMenu: any) => {
    setHoveredIndex(null);
    if (subMenu) {
      setTimeout(() => {
        setDelayedSubMenu(null);
      }, 200); // Delay of 200ms before showing the submenu
    }
  };

  return (
    <div className="absolute left-0 top-20" style={{ userSelect: "none" }}>
      <div
        className={`${
          !isVisible
            ? "shadow-md shadow-gray-300 border-r border-r-gray-200 pr-1"
            : "pr-0"
        } absolute left-0 h-full w-16 z-50 min-h-screen bg-white border-t border-t-gray-200 pl-1 py-4`}
      >
        <div className="grid gap-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(index, item.subMenu)}
              onMouseLeave={() => handleMouseLeave(index, item.subMenu)}
              className="relative"
            >
              <a href={item.href}>
                <button
                  className={`${
                    isVisible ? "rounded-r-none rounded-l-md" : "rounded-md"
                  } h-12 flex items-center w-full px-1 group duration-300 ${
                    hoveredIndex === index ? "bg-gray-200" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                </button>
              </a>
              {item.subMenu && delayedSubMenu === index && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-full top-0 ml-2 bg-white shadow-lg border border-gray-200 rounded-md w-60 z-50"
                >
                  {item.subMenu.map((subItem, subIndex) => (
                    <a key={subIndex} href={subItem.href}>
                      <button className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100">
                        {subItem.title}
                      </button>
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Sidebar Toggle Button */}
      <motion.div
        animate={isVisible ? { x: 270 } : { x: 60 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-fit text-white"
      >
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="absolute py-5 px-0 translate-y-1 bg-gradient-to-b from-sky-600/30 to-gray-800/30 backdrop-blur-md text-white rounded-r-md"
        >
          <ChevronRight
            style={{ width: "2.0rem", height: "2.0rem" }}
            className={`${
              isVisible ? "rotate-180" : ""
            } text-white duration-700`}
          />
        </button>
      </motion.div>

      {/* Expanded Sidebar */}
      <motion.div
        initial={{ x: -232, opacity: 1 }}
        animate={isVisible ? { x: 50 } : { x: -160 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-full fixed top-20 left-0 w-56 z-40 min-h-screen border bg-white border-r border-t border-t-gray-200 border-gray-200 shadow-md px-2 py-4"
      >
        <div className="grid gap-2 relative">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => {
                setHoveredIndex(index);
                if (item.subMenu) setOpenSubMenu(index);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setOpenSubMenu(null);
              }}
              className="relative"
            >
              <button
                onClick={() => {
                  if (!item.subMenu) router.push(item.href);
                }}
                className={`h-12 flex items-center w-full px-4 group rounded-md duration-300 ${
                  hoveredIndex === index ? "bg-gray-200" : ""
                } relative`}
              >
                <div className="flex items-center gap-4 w-full">
                  <p className="line-clamp-1 h-fit text-[#0C2943] text-[16px] overflow-hidden duration-300">
                    {item.title}
                  </p>
                </div>

                {/* Tooltip */}
                {hoveredIndex === index && !item.subMenu && (
                  <div
                    className="absolute bg-slate-900 text-white p-2 rounded-md w-28"
                    style={{
                      left: "100%",
                      top: "50%",
                      transform: "translateY(-50%)",
                      marginLeft: "10px",
                      padding: "4px 8px",
                      zIndex: 100,
                    }}
                  >
                    {item.title}
                  </div>
                )}
              </button>

              {/* Display submenu if it exists */}
              {item.subMenu && openSubMenu === index && (
                <div className="absolute left-full top-0 ml-2 bg-white shadow-lg border -translate-x-2 border-gray-200 rounded-md w-60 z-50">
                  {item.subMenu.map((subItem, subIndex) => (
                    <a key={subIndex} href={subItem.href}>
                      <button className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100">
                        {subItem.title}
                      </button>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

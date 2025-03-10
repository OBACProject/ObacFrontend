"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CircleUserRound,
  DoorOpen,
  Loader2,
  LogOut,
  Menu,
  Settings,
} from "lucide-react";
import {
  ProfileData,
  TeacherSidebarProps,
} from "@/resource/teachers/sidebarData";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { logout } from "@/lib/authentication";

export default function TeacherSidebar({
  menuItems,
  profileData,
  ...props
}: TeacherSidebarProps & { profileData: ProfileData }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState(profileData.name);
  const [triggerDropdown, setTriggerDropdown] = useState<boolean>(false);
  useEffect(() => {
    const cookieName = Cookies.get("name");
    if (cookieName) {
      setUserName(cookieName);
    }
  }, []);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUserName("");
      Cookies.remove("token");
      router.push("/pages/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
  menuItems: TeacherSidebarProps["menuItems"];
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track which index is hovered

  return (
    <div className="absolute left-0 top-20">
      <div
        className={`${
          !isVisible
            ? "shadow-md shadow-gray-300 border-r border-r-gray-200 pr-1"
            : "pr-0"
        } absolute left-0 h-full w-16 z-50 min-h-screen bg-white border-t border-t-gray-200 text-white pl-1  py-4`}
      >
        <div className="grid gap-2">
          {menuItems.map((item, index) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <a key={index} href={item.href}>
                <button
                  className={`${
                    isVisible ? "rounded-r-none rounded-l-md" : "rounded-md"
                  }  h-12 flex items-center w-full px-1 group  duration-300 ${
                    hoveredIndex === index ? "bg-gray-200 " : ""
                  }  ${
                    isActive
                      ? "bg-gradient-to-tr from-pink-300 to-orange-200 text-white"
                      : "bg-white"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                </button>
              </a>
            );
          })}
        </div>
      </div>

      <motion.div
        animate={isVisible ? { x: 242 } : { x: 60 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-fit text-white"
      >
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="absolute  py-5 px-0 translate-y-1 bg-gradient-to-b from-pink-600/30 to-gray-800/30 backdrop-blur-md z-50 text-white rounded-r-md"
        >
          <ChevronRight
            style={{ width: "2.0rem", height: "2.0rem" }}
            className={`${
              isVisible ? "rotate-180" : ""
            } text-white duration-700`}
          />
        </button>
      </motion.div>

      <motion.div
        initial={{ x: -232, opacity: 1 }}
        animate={isVisible ? { x: 50 } : { x: -160 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full fixed top-20 left-0  w-48 z-40 min-h-screen bg-white border-r border-t border-t-gray-200 border-gray-200 shadow-md shadow-gray-200 text-white px-2 py-4"
      >
        <div className="grid gap-2">
          {menuItems.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => router.push(item.href)}
                className={`h-12 flex items-center w-full px-4 group rounded-md duration-300 ${
                  hoveredIndex === index ? "bg-gray-200" : ""
                } `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-4 w-full">
                  <span className=" text-[#0C2943] text-[16px] overflow-hidden h-fit duration-300">
                    <p className="line-clamp-1 h-fit">{item.title}</p>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

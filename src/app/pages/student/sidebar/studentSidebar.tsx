"use client";

import {
  StudentSidebarProps,
  ProfileData,
} from "@/resource/students/studentSidebarData";
import { motion } from "framer-motion";
import { ChevronRight, CircleUserRound, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { logout } from "@/lib/authentication";

export function StudentSidebar({
  menuItems,
  profileData,
  ...props
}: StudentSidebarProps & { profileData: ProfileData }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState(profileData.name);

  useEffect(() => {
    const cookieName = Cookies.get("name");
    if (cookieName) {
      setUserName(cookieName);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // Call the shared logout function
      setUserName(""); // Clear the username state
      router.push("/pages/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed flex flex-col z-20  w-full">
      <header className="flex w-full items-center gap-2 bg-background border-b px-4 py-2 ">
        <div className="flex h-[64px] items-center">
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
          <span className="text-center text-lg py-2">
            วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href={profileData.href} className="flex items-center">
            <CircleUserRound className="w-10 h-10 text-[#0C2943]" />
          </Link>
          <p className="text-[#0C2943] text-sm font-medium truncate w-auto">
            {userName}
          </p>
          <button
            onClick={handleLogout}
            className="px-5 items-center rounded-md py-1 bg-red-400 hover:bg-red-600 text-white flex gap-2"
          >
            Logout
          </button>
        </div>
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
  menuItems: StudentSidebarProps["menuItems"];
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track which index is hovered

  return (
    <div className="absolute left-0 top-20">
      <div
        className={`${
          !isVisible
            ? "shadow-md shadow-gray-300 border-r border-r-gray-200 pr-1"
            : "pr-0"
        } absolute left-0 h-full w-16 z-10 min-h-screen bg-white border-t border-t-gray-200 text-white pl-1  py-4`}
      >
        <div className="grid gap-2">
          {menuItems.map((item, index) => (
            <a key={index} href={item.href}>
              <button
                className={`${
                  isVisible ? "rounded-r-none rounded-l-md" : "rounded-md"
                }  h-12 flex items-center w-full px-1 group  duration-300 ${
                  hoveredIndex === index ? "bg-gray-200 " : ""
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
          ))}
        </div>
      </div>

      <motion.div
        animate={isVisible ? { x: 242 } : { x: 60 }}
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

      <motion.div
        initial={{ x: -232, opacity: 1 }}
        animate={isVisible ? { x: 50 } : { x: -130 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-full w-48 z-40 min-h-screen bg-white border-r border-t border-t-gray-200 border-gray-200 shadow-md shadow-gray-200 text-white px-2 py-4"
      >
        <div className="grid gap-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.href)}
              className={`h-12 flex items-center w-full px-4 group rounded-md duration-300 ${
                hoveredIndex === index ? "bg-gray-200" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-4 w-full">
                <span className=" text-[#0C2943] text-[16px] overflow-hidden h-fit duration-300">
                  <p className="line-clamp-1 h-fit">{item.title}</p>
                </span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

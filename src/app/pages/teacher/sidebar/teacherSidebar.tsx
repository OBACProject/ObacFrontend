"use client";

import {
  TeacherSidebarProps,
  ProfileData,
} from "@/resource/teachers/sidebarData";
import { CircleUserRound } from "lucide-react";
import React from "react";

export function TeacherSidebar({
  menuItems,
  profileData,
  ...props
}: TeacherSidebarProps & { profileData: ProfileData }) {
  return (
    <header className="flex w-screen top-0 bg-background shrink-0 items-center gap-2 border-b px-4 py-2">
      <SidebarMenu
        name={profileData.name}
        href={profileData.href}
        id="6410450958"
        menuItems={menuItems}
      />
      <div className="flex justify-center items-center w-full gap-6 h-full">
        <img
          src="/images/obac_navbar_logo.png"
          alt="obac-logo"
          style={{
            width: "3.5rem",
            height: "3.5rem",
          }}
        />
        <span className="text-center text-lg py-2">
          วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
        </span>
      </div>
    </header>
  );
}

export function SidebarMenu({
  name,
  href,
  menuItems,
}: {
  name: string;
  id: string;
  href: string;
  menuItems: TeacherSidebarProps["menuItems"];
}) {
  const truncatedTitle = name.length > 25 ? `${name.slice(0, 22)}...` : name;

  return (
    <div className="border-r-2 pt-2 bg-white fixed top-0 left-0 flex flex-col h-screen p-1 transition-transform group hover:w-64 w-20 z-40 ">
      <div className="flex h-[48px] ">
        <a href={href} className="flex   items-center justify-start">
          <button className="flex items-start  ">
            <CircleUserRound
              style={{ width: "3.5rem", height: "3rem" }}
              className="text-[#0C2943]"
            />
          </button>
        </a>
        <div className="flex flex-col gap-2 mr-4">
          <span className="text-[#0C2943] text-sm font-medium block opacity-0 pt-4  group-hover:opacity-100 ">
            {truncatedTitle}
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="border-t-2 pt-2 mt-4">
        {menuItems.map((item, index) => (
          <a key={index} href={item.href}>
            <button className="h-12  flex items-center w-full px-3 group focus:bg-gray-200 hover:bg-gray-200 rounded-md  duration-300">
              <div className="flex items-center gap-4 w-full">
                <div className=" h-10 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="ml-2 text-[#0C2943] text-sm opacity-0 group-hover:opacity-100 ">
                  {item.title}
                </span>
              </div>
            </button>
          </a>
        ))}
      </div>
    </div>
  );
}

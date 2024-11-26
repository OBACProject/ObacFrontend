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
            objectFit: "contain",
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
    <div className="border-r-2 transition-transform bg-white fixed top-0 left-0 flex flex-col h-screen hover:w-64 w-20 p-1  group  ">
      <div className="flex gap-2  mb-2">
        <a href={href} className="flex items-center justify-start">
          <button className="flex  items-start  ">
            <CircleUserRound
              style={{ width: "3.5rem", height: "3rem" }}
              className="text-[#0C2943]"
            />
          </button>
        </a>
        <div className="flex flex-co pt-4  mr-4  ">
          <span className="text-[#0C2943] text-xs font-medium  block opacity-0 group-hover:opacity-100 ">
            {truncatedTitle}
          </span>
        </div>
      </div>

      <div className="border-t-2 py-1 mt-4">
        {menuItems.map((item, index) => (
          <a key={index} href={item.href}>
            <button className=" duration-500 h-12 flex items-center w-full px-2 hover:bg-gray-200 rounded-md ">
              <div className="flex items-center gap-4 w-full">
                <div className="w-10 h-10 flex items-center justify-center">
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

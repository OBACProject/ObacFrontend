"use client";

import {
  TeacherSidebarProps,
  ProfileData,
} from "@/resource/teachers/sidebarData";
import { CircleUserRound, Menu } from "lucide-react";
import React, { useState } from "react";

export function TeacherSidebar({
  menuItems,
  profileData,
  ...props
}: TeacherSidebarProps & { profileData: ProfileData }) {
  const [isPinned, setIsPinned] = useState(false);

  return (
    <div className="flex flex-col absolute w-full ">
      {/* Header */}
      <header className="flex w-full items-center gap-2 bg-background border-b px-4 py-2 z-10">
        <div className="flex h-[64px] items-center">
          <button
            onClick={() => setIsPinned(!isPinned)}
            className="ml-4 text-gray-500 hover:text-gray-700 flex items-center"
          >
            <Menu className="w-6 h-6" />{" "}
            {/* Toggles between pinned and collapsed */}
          </button>
        </div>
        {/* Logo */}
        <div className="flex justify-start ml-8 items-center w-full gap-6 h-full">
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
        {/* Profile Section in Header */}
        <div className="flex items-center gap-4 ml-12">
          <a href={profileData.href} className="flex items-center">
            <CircleUserRound
              style={{ width: "2.5rem", height: "2.5rem" }}
              className="text-[#0C2943]"
            />
          </a>
          <div className="ml-4">
            <span className="text-[#0C2943] text-sm font-medium block">
              {profileData.name.length > 25
                ? `${profileData.name.slice(0, 22)}...`
                : profileData.name}
            </span>
          </div>
        </div>
      </header>

      {/* Sidebar under the Header */}
      <SidebarMenu menuItems={menuItems} isPinned={isPinned} />
    </div>
  );
}

export function SidebarMenu({
  menuItems,
  isPinned,
}: {
  menuItems: TeacherSidebarProps["menuItems"];
  isPinned: boolean;
}) {
  return (
    <div
      className={`border-r-2 bg-white flex flex-col  transition-all duration-300 min-h-screen z-50 ${
        isPinned ? "w-64" : "w-20 group hover:w-64"
      }`}
    >
      {/* Menu Items */}
      <div className="mt-4">
        {menuItems.map((item, index) => (
          <a key={index} href={item.href}>
            <button className="h-12 flex items-center w-full px-4 group hover:bg-gray-200 rounded-md duration-300">
              <div className="flex items-center gap-4 w-full">
                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center">
                  {item.icon}
                </div>
                {/* Title */}
                {isPinned ? (
                  // When sidebar is pinned
                  <span className="ml-2 text-[#0C2943] text-sm opacity-100 overflow-hidden h-fit transition-opacity duration-300">
                    <p className="line-clamp-1 h-fit ">{item.title}</p>
                  </span>
                ) : (
                  // When sidebar is collapsed
                  <span className="ml-2 text-[#0C2943] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.title}
                  </span>
                )}
              </div>
            </button>
          </a>
        ))}
      </div>
    </div>
  );
}

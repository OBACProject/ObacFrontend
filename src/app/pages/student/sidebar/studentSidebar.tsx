"use client";

import {
  StudentSidebarProps,
  ProfileData,
} from "@/resource/students/sidebarData";
import { CircleUserRound, PanelLeft } from "lucide-react";
import React from "react";

export function StudentSidebar({
  menuItems,
  profileData,
  ...props
}: StudentSidebarProps & { profileData: ProfileData }) {
  return (
    <header className="flex w-screen top-0 bg-background shrink-0 items-center gap-2 border-b px-4 py-2">
      {/* sidebar with info and menu */}
      <SidebarMenu
        name={profileData.name}
        href={profileData.href}
        id="6410450958"
        menuItems={menuItems}
      />

      {/* Navbar */}
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
  id,
  href,
  menuItems,
}: {
  name: string;
  id: string;
  href: string;
  menuItems: StudentSidebarProps["menuItems"];
}) {
  const truncatedTitle = name.length > 25 ? `${name.slice(0, 22)}...` : name;

  return (
    <div className="border-r-2 bg-white fixed top-2 left-0 flex flex-col h-screen p-1 transition-transform duration-500 ease-in-out group hover:w-64 w-20 z-10">
      <div className="flex gap-2 mb-4 items-center px-2">
        <a href={href} className="flex items-center justify-start">
          <button className="flex items-start gap-4">
            <CircleUserRound
              style={{ width: "3.5rem", height: "3rem" }}
              className="text-[#0C2943]"
            />
          </button>
        </a>
        <div className="flex flex-col gap-2 mr-4 overflow-hidden">
          <span className="text-[#0C2943] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {truncatedTitle}
          </span>
          <span className="text-[#0C2943] text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {id}
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="border-t-2 mt-4">
        {menuItems.map((item, index) => (
          <a key={index} href={item.href}>
            <button className="h-12 flex items-center w-full px-2 group">
              <div className="flex items-center gap-4 w-full">
                <div className="w-10 h-10 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="ml-2 text-[#0C2943] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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

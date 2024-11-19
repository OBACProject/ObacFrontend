"use client";

import {
  StudentSidebarProps,
  ProfileData,
} from "@/resource/students/sidebarData";
import { CircleUserRound, PanelLeft } from "lucide-react";
import React from "react";
import Image from "next/image";

export function StudentSidebar({
  menuItems,
  profileData,
  ...props
}: StudentSidebarProps & { profileData: ProfileData }) {
  return (
    <header className="flex w-screen top-0 bg-background h-14 shrink-0 items-center gap-2 border-b px-4">
      {/* sidebar with info and menu */}
      <SidebarMenu
        name={profileData.name}
        href={profileData.href}
        id="6410450958"
        menuItems={menuItems}
      />

      {/* Navbar */}
      <div className="flex justify-center items-center w-full gap-6">
        <Image
          src="/images/obac_navbar_logo.png"
          alt="obac-logo"
          style={{ objectFit: "contain" }}
          width={36}
          height={36}
        />
        <span className="text-center text-lg">
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
    <div className="border-r-2 mb-6 bg-white fixed top-2 left-0 flex-col h-screen p-1  duration-300 ease-in-out group   w-64   z-10">
      <div className="flex gap-2 mb-4">
        <a href={href} className="flex items-center justify-start">
          <button className="flex items-start gap-6 ">
            <CircleUserRound
              style={{ width: "3.5rem", height: "3rem" }}
              className="text-[#0C2943]"
            />
          </button>
        </a>
        <div className="flex flex-col gap-0 mr-4">
          <span className="text-[#0C2943] text-xs font-medium  duration-300">
            {truncatedTitle}
          </span>
          <span className="text-[#0C2943] text-xs   duration-300">
            {id}
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="border-t-2 ">
        {menuItems.map((item, index) => (
          <a key={index} href={item.href}>
            <button className="flex justify-start items-center hover:bg-gray-200 py-2 w-full  px-2">
              <div className="flex items-center justify-start gap-4 w-full">
                <div className="w-12 h-12 flex items-center justify-center">
                  {item.icon}
                </div>

                <span className="ml-2 text-[#0C2943] text-base opacity-100 duration-300">
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

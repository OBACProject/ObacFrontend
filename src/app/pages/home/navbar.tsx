import React from "react";
import Image from "next/image";
import { NavbarData } from "@/resource/home/navbarData";
import DropMenu from "@/app/components/dropdown/dropdown-menu-1";

export function Navbar() {
  return (
    <header className="flex flex-col shadow-xl">
      {/* Logo and Name */}
      <div className="h-1/2">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 sm:ml-12">
          {/* Logo */}
          <Image
            src="/images/obac-logo.png"
            alt="obac-logo"
            style={{ objectFit: "contain" }}
            width={80}
            height={80}
            className="p-4"
          />
          {/* Name university */}
          <div className="flex flex-col justify-start font-inter font-bold p-2 text-[#2E58A2] ">
            <span className="sm:text-sm ">วิทยาลัยอาชีวศึกษา</span>
            <span className="sm:text-xl ">เอกวิทย์บริหารธุรกิจ</span>
            <span className="sm:text-lg ">
              Ekawit Business Administration Vocational College
            </span>
          </div>
        </div>
      </div>
      {/* menu bar */}
      <div className=" text-white w-full flex justify-center bg-[#2E58A2]">
        <DropMenu menuData={NavbarData} />
      </div>
    </header>
  );
}

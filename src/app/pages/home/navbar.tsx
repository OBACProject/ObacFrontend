import React from "react";
import Image from "next/image";
import DropMenu from "@/app/components/dropdown/dropdown-menu-1";

export function Navbar() {
  return (
    <header className="flex flex-col shadow-xl">
      {/* Logo and Name */}
      <div className="flex flex-col sm:flex-row p-6 gap-6 sm:gap-10 sm:ml-12">
        {/* Logo */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 p-6">
          <Image
            src="/images/obac-logo.png"
            alt="obac-logo"
            layout="fill"
            style={{ objectFit: "contain" }}
          />
        </div>
        {/* Name university */}
        <div className="flex flex-col gap-2 justify-start font-inter font-bold p-6 text-[#2E58A2] ">
          <span className="text-xl sm:text-2xl ">วิทยาลัยอาชีวศึกษา</span>
          <span className="text-2xl sm:text-4xl ">เอกวิทย์บริหารธุรกิจ</span>
          <span className="text-xl sm:text-2xl ">
            Ekawit Business Administration Vocational College
          </span>
        </div>
      </div>
      {/* menu bar */}
      <div className="bg-[#2E58A2] flex flex-auto p-6 text-white text-3xl ">
        <div className="mx-10">
          {/* <DropMenu menuName="About OBAC" menuList={menuList} /> */}
        </div>
      </div>
    </header>
  );
}

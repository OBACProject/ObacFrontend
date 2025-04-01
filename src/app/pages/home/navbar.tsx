"use client";
import React, { useState } from "react";
import { NavbarData } from "@/resource/home/navbarData";
import DropMenu from "@/app/components/dropdown/dropdown-menu-1";
import { CircleCheck, Menu, X } from "lucide-react";
import DropDownMobile from "@/app/components/dropdown/dropdown-mobile";
import Link from "next/link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // bg-[#0b0f68] #0C243C
  return (
    <header className="grid w-full top-0 left-0 bg-[#143d66] shadow-xl fixed z-50">
      {/* Logo and Name */}
      <div className="h-fit">
        <div className="flex justify-between items-center  sm:px-2 py-1">
          {/* Logo */}
          <div className="lg:px-20 md:px-10">
            <a href="/pages/home" className="flex items-center">
              <img
                src="/images/obac-logo.png"
                alt="obac-logo"
                className="p-1 w-auto h-16 lg:h-20 md:h-18"
              />
              {/* Name university */}
              <div className="flex flex-col justify-start  font-bold p-2 pl-6 text-white font-prompt">
                {/* Hidden for small screens */}
                <span className="hidden md:block text-lg">
                  Ekawit Business Administration Vocational College
                </span>
                <span className="text-sm">
                  วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
                </span>
              </div>
            </a>
          </div>

          {/* Sign In Button */}
          <div className="hidden sm:flex justify-end items-center lg:px-10 md:px-8"></div>

          {/* Hamburger Menu Icon */}
          <button
            className="sm:hidden text-blue-900 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:flex flex-col sm:flex-row bg-[#7E8C9C] items-center h-fit text-white sm:py-1 px-6  justify-between`}
      >
        <div className="flex flex-col sm:flex-row w-full items-center ">
          {isMenuOpen ? (
            <DropDownMobile menuData={NavbarData} />
          ) : (
            <DropMenu menuData={NavbarData} />
          )}
        </div>

        <div className="flex gap-2 justify-end items-center w-2/6">
          <Link
            href="/pages/register"
            className="flex gap-2 lg:py-0.5 lg:h-fit items-center font-prompt justify-center sm:py-1 px-6  w-fit bg-[#143d66] border-white border-2 rounded-full text-white text-base hover:bg-white hover:text-blue-900 duration-500"
          >
            <p className="line-clamp-1">สมัครออนไลน์</p>
            <CircleCheck className="w-5 h-5" />
          </Link>
          <Link
            href="/pages/login"
            className="px-4 lg:py-0.5 lg:h-fit flex gap-2 group rounded-full text-[16px] border  justify-center items-center border-white   text-white  hover:bg-white hover:text-black duration-500 font-prompt_Light"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </header>
  );
}

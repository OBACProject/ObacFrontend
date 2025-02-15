"use client";
import React, { useState } from "react";
import Image from "next/image";
import { NavbarData } from "@/resource/home/navbarData";
import DropMenu from "@/app/components/dropdown/dropdown-menu-1";
import { CircleCheck, LogIn, Menu, Shield, X } from "lucide-react";
import DropDownMobile from "@/app/components/dropdown/dropdown-mobile";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex flex-col w-full top-0 left-0 bg-white shadow-xl fixed z-50">
      {/* Logo and Name */}
      <div className="h-fit">
        <div className="flex justify-between items-center lg:pl-10 lg:pr-2 sm:px-2 py-1">
          {/* Logo */}
          <a href="/pages/home" className="flex items-center">
            <Image
              src="/images/obac-logo.png"
              alt="obac-logo"
              width={70}
              height={20}
              className="p-1 w-auto h-16 lg:h-20 md:h-18"
            />
            {/* Name university */}
            <div className="flex flex-col justify-start font-inter font-bold p-2 pl-6 text-[#2E58A2]">
              {/* Hidden for small screens */}
              <span className="hidden md:block text-lg">
                Ekawit Business Administration Vocational College
              </span>
              <span className="text-sm">
                วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
              </span>
            </div>
          </a>

          {/* Sign In Button */}
          <div className="hidden sm:flex justify-end items-center">
            <a
              href="/pages/login"
              className="px-4 py-2 flex gap-2 group rounded-md text-[16px] border-[1.5px] justify-center items-center border-blue-800  text-blue-800 hover:text-blue-600 hover:border-blue-600"
            >
              เข้าสู่ระบบ
                <Shield style={{width:"1.5rem" , height:"1.5rem"}} className="text-blue-800 group-hover:text-blue-600"/>
            </a>
          </div>

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
        } sm:flex flex-col sm:flex-row bg-blue-950 items-center h-fit text-white sm:py-1 px-6 w-full justify-between`}
      >
        <div className="flex flex-col sm:flex-row w-full items-center ">
          {isMenuOpen ? (
            <DropDownMobile menuData={NavbarData} />
          ) : (
            // Show DropMenu for larger screens
            <DropMenu menuData={NavbarData} />
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-start sm:px-2 sm:py-1 gap-2 lg:w-1/6 w-fit">
          <a
            href="/pages/register"
            className="flex gap-2 items-center justify-center sm:py-1 px-6  w-fit bg-blue-950 border-white border-2 rounded-full text-white text-base hover:bg-white hover:text-blue-900 "
          >
            <p className="line-clamp-1">สมัครออนไลน์</p>
              <CircleCheck style={{width:"1.5rem",height:"1.5rem"}} />
          </a>
        </div>
      </div>
    </header>
  );
}

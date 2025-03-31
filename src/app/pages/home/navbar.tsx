"use client";
import React, { useState } from "react";
import Image from "next/image";
import { NavbarData } from "@/resource/home/navbarData";
import DropMenu from "@/app/components/dropdown/dropdown-menu-1";
import { CircleCheck, LogIn, Menu, Shield, X } from "lucide-react";
import DropDownMobile from "@/app/components/dropdown/dropdown-mobile";
import Link from "next/link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // bg-[#0b0f68]
  return (
    <header className="grid w-full top-0 left-0 bg-[#0C243C] shadow-xl fixed z-50">
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
              <div className="flex flex-col justify-start font-inter font-bold p-2 pl-6 text-white">
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
          <div className="hidden sm:flex justify-end items-center lg:px-10 md:px-8">
           
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
            className="flex gap-2 items-center justify-center sm:py-1 px-6  w-fit bg-[#0b0f68] border-white border-2 rounded-full text-white text-base hover:bg-white hover:text-blue-900 "
          >
            <p className="line-clamp-1">สมัครออนไลน์</p>
            <CircleCheck className="w-5 h-5" />
          </Link>
          <Link
              href="/pages/login"
              className="px-4 py-1 flex gap-2 group rounded-full text-[16px] border-[1.5px] justify-center items-center border-white   text-white hover:text-gray-100  hover:scale-105 duration-500"
            >
              เข้าสู่ระบบ
              {/* <Shield
                style={{ width: "1.5rem", height: "1.5rem" }}
                className="text-white group-hover:text-gray-100"
              /> */}
            </Link>
        </div>
      </div>
    </header>
  );
}

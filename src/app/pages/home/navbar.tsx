"use client";
import React, { useState } from "react";
import Image from "next/image";
import { NavbarData } from "@/resource/home/navbarData";
import DropMenu from "@/app/components/dropdown/dropdown-menu-1";
import { CircleCheck, LogIn, Menu, X } from "lucide-react";
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
              className="px-4 py-2 flex rounded-md bg-blue-900 text-white hover:bg-blue-700"
            >
              Sign In
              <div className="mt-0.5 ml-2 text-xl">
                <LogIn />
              </div>
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
        } sm:flex flex-col sm:flex-row bg-blue-950 text-white sm:py-1 px-6 w-full justify-between`}
      >
        <div className="flex flex-col sm:flex-row w-full items-center ">
          {isMenuOpen ? (
            <DropDownMobile menuData={NavbarData} />
          ) : (
            // Show DropMenu for larger screens
            <DropMenu menuData={NavbarData} />
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end items-start sm:px-2 sm:py-1 m-2 w-1/6">
          <a
            href="/pages/login"
            className="flex gap-2 items-center justify-center sm:py-2 px-6 bg-blue-950 border-white border-2 rounded-full text-white text-base hover:bg-blue-700"
          >
            สมัครออนไลน์
            <div>
              <CircleCheck />
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}

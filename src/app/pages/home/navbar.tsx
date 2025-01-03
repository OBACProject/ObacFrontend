"use client";
import React, { useState } from "react";
import Image from "next/image";
import { NavbarData } from "@/resource/home/navbarData";
import DropMenu from "@/app/components/dropdown/dropdown-menu-1";
import { CircleCheck, Menu, Shield, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex flex-col w-full top-0 left-0 bg-white shadow-xl fixed z-50">
      {/* Logo and Name */}
      <div className="h-1/2">
        <div className="flex justify-between items-center px-6 sm:px-12 py-4">
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
            <div className="flex flex-col justify-start font-inter font-bold text-sm lg:text-lg p-2 pl-6 text-[#2E58A2] ">
              <span className="text-sm lg:text-lg sm:text-lg line-clamp-3 ">
                Ekawit Business Administration Vocational College
              </span>
              <span className="sm:text-sm hidden lg:block md:block sm:block ">
                วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
              </span>
            </div>
          </a>

          <div className="justify-end grid place-items-center px-10 lg:mr-6 md:mr-6 overflow-hidden h-fi sm:px-2 sm:py-1">
            <a
              href="/pages/login"
              className="overflow-hidden h-fit px-4 py-2 gap-2 flex rounded-md bg-blue-900 text-white hover:bg-blue-700 "
            >
              <div className="hidden lg:block md:block line-clamp-1  h-fit ">
                ระบบผู้ใช้
              </div>
              <div className="lg:hidden md:hidden ">Login</div>
              <div className="">
                <Shield
                  style={{ width: "1.6rem", height: "1.5rem" }}
                  className="text-white hidden lg:block md:block"
                />
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
      <div className=" text-white  h-12 lg:h-auto md:h-auto sm:h-auto w-full flex py-1 px-0 lg:px-6 md:px-6 sm:px-2 justify-between bg-blue-950">
        <div className="flex ">
          <DropMenu menuData={NavbarData} />
        </div>

        <div className="justify-end flex place-items-center lg:px-10 md:px-10 px-1 sm:px-2 sm:py-1">
          <a
            href="/pages/register"
            className="flex gap-2 justify-center  py-1  bg-blue-950 px-10 border-white border-2 rounded-full text-white text-xl hover:bg-white hover:text-blue-950 "
          >
            สมัครออนไลน์
            <div className="pt-0.5">
              <CircleCheck className="" />
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}

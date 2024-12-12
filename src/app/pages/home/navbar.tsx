import React from "react";
import Image from "next/image";
import { NavbarData } from "@/resource/home/navbarData";
import DropMenu from "@/app/components/dropdown/dropdown-menu-1";
import {  CircleCheck, LogIn } from "lucide-react";

export function Navbar() {
  return (
    <header className="flex flex-col w-full top-0 left-0 bg-white shadow-xl fixed z-50">
      {/* Logo and Name */}
      <div className="h-1/2">
        <div className="flex justify-between sm:flex-row gap-6 sm:gap-10 sm:ml-12">
          {/* Logo */}
          <a href="/pages/home" className="flex">
            <Image
              src="/images/obac-logo.png"
              alt="obac-logo"
              width={70}
              height={20}
              className="p-1 w-auto h-16"
            />
            {/* Name university */}
            <div className="flex flex-col justify-start font-inter font-bold p-2 pl-6 text-[#2E58A2] ">
              <span className="sm:text-lg ">
                Ekawit Business Administration Vocational College
              </span>
              <span className="sm:text-sm ">วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ</span>
            </div>
          </a>

          <div className="justify-end grid place-items-center px-10 mr-6 sm:px-2 sm:py-1">
            <a href="/pages/login" className="px-4 py-2 flex rounded-md bg-blue-900 text-white hover:bg-blue-700 ">ระบบผู้ใช้
              <div className="mt-0.5 ml-2 text-xl">
                {/* <LogIn /> */}
              </div>

            </a>
          </div>
        </div>
      </div>
      <div className=" text-white w-full flex py-1 px-6 justify-between bg-blue-950">
        <div className="flex ">
          <DropMenu menuData={NavbarData} />
        </div>

        <div className="justify-end flex place-items-center px-10 sm:px-2 sm:py-1">
          <a href="/pages/register/student" className="flex gap-2 justify-center  py-1  bg-blue-950 px-10 border-white border-2 rounded-full text-white text-xl hover:bg-white hover:text-blue-950 ">
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

"use client";
import React, { useState, useEffect } from "react";
import { NavbarData } from "@/resource/home/navbarData";
import DropMenu from "@/components/common/dropdown/dropdown-menu-1";
import DropDownMobile from "@/components/common/dropdown/dropdown-mobile";
import { CircleCheck, Menu, X } from "lucide-react";
import Link from "next/link";
import FadeInOnScroll from "@/components/Effect/FadInScroll";
import { cn } from "@/lib/utils";

export function HomePageNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#143d66] shadow-xl">
     
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-20 py-2">
      
        <a href="/" className="flex items-center">
          <img
            src="/images/obac-logo.png"
            alt="obac-logo"
            className="h-14 md:h-18 lg:h-20 w-auto p-1"
          />
          <div className="flex flex-col justify-start text-white font-bold font-prompt pl-4">
            <span className="hidden md:block text-lg leading-tight">
              Ekawit Business Administration Vocational College
            </span>
            <span className="text-sm leading-tight">
              วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ
            </span>
          </div>
        </a>

       
        <div className="hidden md:flex gap-3">
          <Link
            href="/register"
            className="flex items-center gap-2 px-6 py-1 bg-[#143d66] border-white border-2 rounded-full text-white text-base hover:bg-white hover:text-blue-900 duration-500 font-prompt"
          >
            สมัครออนไลน์
            <CircleCheck className="w-5 h-5" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 px-6 py-1 border border-white rounded-full text-white text-base hover:bg-white hover:text-black duration-500 font-prompt_Light"
          >
            เข้าสู่ระบบ
          </Link>
        </div>

        
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

    
      <div
        className={cn(
          "w-full bg-[#7E8C9C] px-4 sm:px-6 md:px-10 lg:px-20 py-2 text-white",
          isMenuOpen || !isMobile
            ? "block animate-fade-slide-down"
            : "hidden"
        )}
      >


        <div className="w-full">
          {isMobile ? (
            <DropDownMobile menuData={NavbarData} />
          ) : (
            <DropMenu menuData={NavbarData} />
          )}
        </div>

        {isMobile && (
          <div className="flex flex-col sm:flex-row gap-2 mt-3 md:mt-0 justify-end items-center w-full md:w-auto">
            <Link
              href="/register"
              className="flex items-center gap-2 px-6 py-1 bg-[#143d66] border-white border-2 rounded-full text-white text-base hover:bg-white hover:text-blue-900 duration-500 font-prompt"
            >
              สมัครออนไลน์
              <CircleCheck className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 px-6 py-1 border border-white rounded-full text-white text-base hover:bg-white hover:text-black duration-500 font-prompt_Light"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { NavbarData, NavbarMobile } from "@/resource/home/navbarData";
import DropMenu from "@/components/common/dropdown/dropdown-menu-1";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function HomePageNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openSubs, setOpenSubs] = useState<Record<number, boolean>>({});
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1200);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
            href="/login"
            className="flex items-center gap-2 px-8 py-1 border-2 border-white rounded-full text-white text-base hover:bg-white hover:text-black duration-500 font-prompt_Light"
          >
            เข้าสู่ระบบ
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-drawer"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      <div
        className={cn(
          "w-full bg-[#7E8C9C] px-4 sm:px-6 md:px-10 lg:px-20 lg:py-2 text-white",
          !isMobile ? "block" : isMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="w-full">
          <div className="hidden md:block lg:block ">
            <DropMenu menuData={NavbarData} />
          </div>
        </div>
      </div>

      <aside
        id="mobile-drawer"
        className={cn(
          "fixed top-0 right-0 h-full w-full bg-white shadow-lg z-[60] transform-gpu transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-300 bg-[#143d66]">
          <p className="text-lg text-white font-prompt px-2">เมนูทั้งหมด</p>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="cursor-pointer px-2 active:bg-white duration-300 group h-full py-0.5 rounded-md"
            aria-label="Close menu"
          >
            <X className="w-7 h-7 text-white duration-300 group-active:text-blue-400" />
          </button>
        </div>
        <nav className="px-3 py-2 w-full">
          <div className="px-4 py-1 my-2 w-full grid ">
            <Link
              href={"/"}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-800 font-prompt "
            >
              หน้าหลัก
            </Link>
          </div>
          {NavbarMobile.map((item, idx) => {
            const hasSub =
              Array.isArray(item.menuList) && item.menuList.length > 0;
            return (
              <div key={idx} className="w-full grid">
                {hasSub ? (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenSubs((prev) => ({ ...prev, [idx]: !prev[idx] }))
                    }
                    aria-expanded={!!openSubs[idx]}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-md py-2.5 px-4 text-left transition",
                      "text-gray-800 active:bg-gray-200 active:text-gray-900 "
                    )}
                  >
                    <span className="font-prompt text-base">
                      {item.menuTopic}
                    </span>
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 duration-300",
                        openSubs[idx] ? "rotate-90" : "rotate-0"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-md w-full py-2.5 px-4 transition text-gray-800 active:bg-gray-200 active:text-gray-900 active:scale-95"
                  >
                    <span className="font-prompt text-base">
                      {item.menuTopic}
                    </span>
                  </Link>
                )}

                {hasSub && (
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      openSubs[idx] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <ul className="pl-3 pr-2 py-1 space-y-1">
                        {item.menuList!.map((sub, sidx) => (
                          <li key={sidx}>
                            <Link
                              href={sub.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-3 rounded-md w-full py-2 px-3 transition text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                            >
                              {sub.menuIcon}
                              <span className="font-prompt text-[15px]">
                                {sub.menuName}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="px-6 w-full grid ">
          <Link
            href={"/login"}
            onClick={() => setIsMenuOpen(false)}
            className="w-full py-1 font-prompt rounded-md text-center bg-[#143d66] text-white "
          >
            เข้าสู่ระบบผู้ใช้งาน
          </Link>
        </div>
      </aside>

      {/* backdrop (คงไว้เสมอ, สลับแค่ opacity/pointer-events) */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={cn(
          "fixed inset-0 bg-black/40 z-[55] transition-opacity duration-300 md:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      />
    </header>
  );
}

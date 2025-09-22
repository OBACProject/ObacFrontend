"use client";
import HeaderHomePageMenu from "@/components/common/Header/Header";
import React from "react";
import SciFiBackgroundNormal from "../../styles/bg-normal";

export default function Form() {
  return (
    <div className="mt-16 sm:mt-[8px]  md:pt-[62px] lg:mt-16">
      <div className="bg-white text-blue-950 font-prompt">
        <HeaderHomePageMenu title="ช่องทางการติดต่อ OBAC" />
      </div>
      <SciFiBackgroundNormal>
        <div className="my-5 animate-fastFade lg:flex gap-2  grid place-items-center lg:justify-center lg:items-center lg:mx-5">
          <div className=" lg:w-[800px] lg:h-[450px]  ">
            <iframe
              className="lg:w-[800px] lg:h-[450px] md:w-[650px] sm:w-[500px] w-[350px] h-[220px]"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%AD%E0%B8%B2%E0%B8%8A%E0%B8%B5%E0%B8%A7%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B9%80%E0%B8%AD%E0%B8%81%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B9%8C%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%20(%E0%B9%82%E0%B8%AD%E0%B9%81%E0%B8%9A%E0%B8%84)&zoom=16&maptype=roadmap"
            ></iframe>
          </div>
          <div className="px-4 font-prompt_Light text-sm lg:px-10 animate-fadeIn">
            <div className="text-xl w-fit line-clamp-2 text-blue-800 font-bold">
              OBAC (Ekawit Business Administration)
            </div>
            <div className="lg:w-[300px] mt-5 text-gray-600 ">
              <b>ที่อยู่</b>&nbsp;5 ซอย ลาดกระบัง 34/1 ถนน ลาดกระบัง Khwaeng Lat
              Krabang, Khet Lat Krabang, Krung Thep Maha Nakhon 10520
            </div>
            <div className="mt-5 text-gray-600 ">
              <b>Main Phone :</b> 02-327-2992-4
            </div>
            <div className="mt-5 text-gray-600 text-lg">
              <b>Email :</b> pr.obac.th@gmail.com
            </div>
            <div className="mt-5 py-5 h-fit px-8 bg-gray-200 rounded-md line-clamp-5 text-gray-600 lg:w-[360px]">
              <b>การเดินทาง รถประจำทางสายที่ผ่าน </b>
              <br />
              1. ปอ.92 , 517 ,550, 549, 553, 151
              <br />
              2. รถสายพระโขนง-ซีคอน-หัวตะเข้ ธรรมดาและปรับอากาศสาย
              1013และรถตู้สุวรรณภูมิ
            </div>
            <div className="lg:mb-0 lg:mt-5 my-5">
              <b>ติดต่อ :</b> 092-401-4466 หรือ 094-914-2942
            </div>
          </div>

        </div>
            <div className=" rounded-xl p-6 pb-4 lg:pb-6 border border-border/20">
              <h4 className="text-xl w-fit line-clamp-2 text-blue-800 pb-5 font-bold">ติดตามเราได้ที่</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://web.facebook.com/OBAC41/?locale=th_TH&_rdc=1&_rdr#"
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>

                <a
                  href="https://www.youtube.com/"
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </a>

                <a
                  href="https://www.instagram.com/pr.obac?igsh=MTVveDlwMTZtZ3V6Nw%3D%3D&utm_source=qr"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>

                <a
                  href="https://www.tiktok.com/@obac55?_t=ZS-8ucf5JQCwUr&_r=1"
                  className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  TikTok
                </a>
              </div>
            </div>
      </SciFiBackgroundNormal>
    </div>
  );
}
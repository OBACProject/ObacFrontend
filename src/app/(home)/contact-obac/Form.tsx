"use client";
import HeaderHomePageMenu from "@/components/common/Header/Header";
import React from "react";
import SciFiBackgroundNormal from "../../styles/bg-normal";

export default function Form() {
  return (
    <div className="mt-16 sm:mt-[8px]  md:pt-[80px] lg:mt-16">
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
          <div className="px-4 lg:px-10 animate-fadeIn">
            <div className="text-xl w-fit line-clamp-2 text-blue-800 font-bold">
              OBAC (Ekkawit Business Administration)
            </div>
            <div className="lg:w-[300px] mt-5 text-gray-600 ">
              <b>ที่อยู่</b>&nbsp;5 ซอย ลาดกระบัง 34/1 ถนน ลาดกระบัง Khwaeng Lat
              Krabang, Khet Lat Krabang, Krung Thep Maha Nakhon 10520
            </div>
            <div className="mt-5 text-gray-600 ">
              <b>Main Phone :</b> 02-327-2992-4
            </div>
            <div className="mt-5 text-gray-600 text-lg">
              <b>Email :</b> obac@gmail.com
            </div>
            <div className="mt-5 py-5 h-fit px-8 bg-gray-200 rounded-md line-clamp-5 text-gray-600 lg:w-[360px]">
              <b>การเดินทาง รถประจำทางสายที่ผ่าน </b>
              <br />
              1. ปอ.92 , 517 ,550, 549, 553, 151
              <br />
              2. รถสายพระโขนง-ซีคอน-หัวตะเข้ ธรรมดาและปรับอากาศสาย
              1013และรถตู้สุวรรณภูมิ
            </div>
            <div className="lg:mb-0 lg:mt-5 my-10">
              <b>ติดต่อ :</b> 092-401-4466 หรือ 094-914-2942
            </div>
          </div>

          <div className="lg:translate-x-14 lg:w-fit w-full grid h-fit gap-4 animate-fadeStep1">
            <a
              href="https://web.facebook.com/OBAC41/?locale=th_TH&_rdc=1&_rdr#"
              className="px-10 w-full lg:w-[250px] text-center bg-[#0066ff] h-fit py-3 text-white font-semibold rounded-sm hover:opacity-80 hover:scale-[103%] duration-300"
            >
              Facebook
            </a>
            <a
              href="https://www.youtube.com/"
              className=" px-10 w-full lg:w-[250px] text-center bg-red-600 h-fit py-3 text-white font-semibold rounded-sm hover:opacity-80 hover:scale-[103%] duration-300"
            >
              Youtube
            </a>
            <a
              href="https://www.instagram.com/pr.obac?igsh=MTVveDlwMTZtZ3V6Nw%3D%3D&utm_source=qr"
              className="px-10 w-full lg:w-[250px] text-center bg-gradient-to-r from-orange-300 via-pink-400 to-purple-500 h-fit py-3 text-white font-semibold rounded-sm hover:opacity-80 hover:scale-[103%] duration-300"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@obac55?_t=ZS-8ucf5JQCwUr&_r=1"
              className="px-10 w-full lg:w-[250px] text-center bg-black h-fit py-3 text-white font-semibold rounded-sm hover:opacity-80 hover:scale-[103%] duration-300"
            >
              Tiktok
            </a>
          </div>
        </div>
      </SciFiBackgroundNormal>
    </div>
  );
}

{
}

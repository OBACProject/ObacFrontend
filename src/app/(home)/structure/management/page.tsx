"use client"
import SciFiBackgroundNormal from "@/app/styles/bg-normal";
import HeaderHomePageMenu from "@/components/common/Header/Header";
import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div className="pt-[70px] sm:pt-[70px] md:pt-[140px]">
      <HeaderHomePageMenu title="โครงสร้างการบริหารวิทยาลัย" />
      <SciFiBackgroundNormal>
        <div className="grid place-items-center pb-5 ">
          <div className="">
            <Image
              alt="obac"
              className="lg:w-[1000px] w-full h-full rounded-lg"
              src="/homepage/common/structure.jpg"
              width={800}
              height={1000}
            />
          </div>
        </div>
      </SciFiBackgroundNormal>
    </div>
  );
}
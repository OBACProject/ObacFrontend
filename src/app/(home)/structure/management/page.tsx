import SciFiBackgroundNormal from "@/app/styles/bg-normal";
import HeaderHomePageMenu from "@/components/common/Header/Header";
import React from "react";

export default function page() {
  return (
    <div className="pt-[70px] sm:pt-[70px] md:pt-[140px]">
      <HeaderHomePageMenu title="โครงสร้างการบริหารวิทยาลัย" />
      <SciFiBackgroundNormal>
        <div className="grid place-items-center pb-20 pt-10">
          <div className="">
            <img
              alt="obac"
              src="/static/management-01.jpg"
              width={800}
              height={1000}
            />
          </div>
        </div>
      </SciFiBackgroundNormal>
    </div>
  );
}

import React from "react";
import "@app/styles/globals.css";
import HeaderHomePageMenu from "@/components/common/Header/Header";
import SciFiBackgroundNormal from "@/app/styles/bg-normal";

export default function page() {
  return (
    <div className="pt-[70px] lg:pt-[140px] sm:pt-[70px] md:pt-[140px]">
      <HeaderHomePageMenu title="คณะผู้บริหารวิทยาลัย" />
      <SciFiBackgroundNormal>
        <div className="grid place-items-center pb-20 pt-10">
          <div className="">
            <img
              alt="obac-structure"
              src="/static/static-01.jpg"
              width={800}
              height="full"
            />
          </div>
        </div>
      </SciFiBackgroundNormal>
    </div>
  );
}

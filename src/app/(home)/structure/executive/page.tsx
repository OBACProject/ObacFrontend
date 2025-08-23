import React from "react";
import "@app/styles/globals.css";
import Header from "@/components/common/Header/Header";

export default function page() {
  return (

    <div className="pt-[70px] sm:pt-[70px] md:pt-[140px]">
      {/* <div className="grid place-items-center py-12  text-2xl  bg-gradient-to-r from-blue-950 via-sky-500 to-slate-500  text-white">
        <p className="text-5xl ">คณะผู้บริหารวิทยาลัย</p>
      </div> */}
        <Header
                                  title="คณะผู้บริหารวิทยาลัย"
                                />
      <div className="grid place-items-center pb-20 pt-10">
        <div className="">
          <img alt="obac-structure" src="/static/static-01.jpg" width={800} height="full" />
        </div>
      </div>
    </div>
  );
}

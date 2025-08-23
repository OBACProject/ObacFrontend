import Header from "@/components/common/Header/Header";
import React from "react";

export default function page() {
  return (
    <div className="pt-[70px] sm:pt-[70px] md:pt-[140px]">
      {/* <div className="grid place-items-center py-10  text-2xl  bg-gradient-to-r from-blue-950 via-sky-500 to-slate-500  text-white ">
        <p className="text-5xl ">โครงสร้างการบริหารวิทยาลัย</p>
      </div> */}
        <Header
                                          title="โครงสร้างการบริหารวิทยาลัย"
                                        />
      <div className="grid place-items-center pb-20 pt-10">
        <div className="">
          <img alt="obac" src="/static/management-01.jpg" width={800} height={1000} />
        </div>
      </div>
    </div>
  );
}

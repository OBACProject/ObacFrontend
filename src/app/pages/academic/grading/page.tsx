
import React from "react";
import { Main } from "./main";
import { FileSliders } from "lucide-react";

export default function page() {
  return (
    <header className="mx-4 sm:px-5 lg:px-10 p-4  ">
      <div>
       <div className="w-full justify-center flex">
        <div className="w-fit px-10 text-xl flex gap-2 items-center  py-2 bg-gradient-to-tr from-emerald-600/90 to-sky-400 text-white rounded-3xl " style={{ userSelect: "none" }}>
          <FileSliders className="w-8 h-8"/>
          ออกเกรดรายวิชา</div>
       </div>
        <Main />
      </div>
    </header>
  );
}

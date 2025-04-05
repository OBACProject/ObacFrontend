import React from "react";
import { GradingModeComponent } from "./components/GradingModeComponent";
import { ScrollText } from "lucide-react";
import { Subject } from "./subject/subject";

export default function page() {
  return (
    <header className="mx-4 sm:px-5 lg:px-10 p-4  ">
      <div>
        <div className="w-full justify-start  flex">
          <div
            className="w-fit px-10 text-xl flex gap-2 items-center border border-gray-100 shadow-md  py-2 text-blue-700  rounded-3xl "
            style={{ userSelect: "none" }}
          >
            <ScrollText className="w-8 h-8" />
            ออกเกรดรายวิชา
          </div>
        </div>
        <div className="flex justify-end items-end mt-2">
          <GradingModeComponent />
        </div>
        <div>
          <Subject />
        </div>
      </div>
    </header>
  );
}

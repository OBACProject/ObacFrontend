import React from "react";
import { GradingModeComponent } from "./components/GradingModeComponent";
import { ScrollText } from "lucide-react";
import { Subject } from "./subject/subject";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";

export default function page() {
  return (
    <header className="mx-4 h-screen sm:px-5 lg:px-10 p-4  ">
      <div>
        <div className="w-full justify-start  flex">
         <HeaderLabel title="ออกเกรดแต่ละรายวิชา" Icon={<ScrollText className="w-8 h-8"/>} />
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

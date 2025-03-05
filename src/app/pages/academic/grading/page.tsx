import { Badge } from "@/components/ui/badge";
import React from "react";
import { Main } from "./main";

export default function page() {
  return (
    <header className="mx-4 sm:px-5 lg:px-10 p-4  ">
      <div>
       <div>
        <div className="w-fit px-10 py-1 bg-gray-600 text-white rounded-3xl text-lg">ออกเกรดรายวิชา</div>
       </div>

        <Main />
      </div>
    </header>
  );
}

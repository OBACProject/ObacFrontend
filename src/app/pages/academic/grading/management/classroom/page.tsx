"use client";
import Link from "next/link";
import React from "react";
import { Main } from "./main";
import { ArrowUpDown, Boxes, CircleX } from "lucide-react";

export default function Page() {
  return (
    <header className="mx-4 sm:mx-10 lg:mx-10 p-4  ">
      <div>
        <div className="w-full flex justify-center">
          <div className="px-10 rounded-3xl flex gap-2 items-center bg-orange-600 py-2 text-white text-xl w-fit">
            <Boxes className="h-8 w-8"/>
            จัดการคะแนน (ห้องเรียน)
          </div>
        </div>

        <Main />
      </div>
    </header>
  );
}

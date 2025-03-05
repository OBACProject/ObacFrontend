"use client";
import Link from "next/link";
import React from "react";
import { Main } from "./main";
import { ArrowUpDown, CircleX } from "lucide-react";

export default function Page() {
  return (
    <header className="mx-4 sm:mx-10 lg:mx-10 p-4 mt-10 ">
      <div>
        <div className="w-full flex justify-between">
          <div className="px-10 rounded-3xl bg-gray-600 py-1 text-white text-lg w-fit">
            จัดการคะแนน (ห้องเรียน)
          </div>
          <div className="px-5 flex gap-4">
            <Link
              href="/pages/academic/grading/upLevel"
              className="px-10 bg-blue-400 flex items-center justify-center py-1 text-white rounded-md hover:bg-blue-600 gap-2"
            >
              <ArrowUpDown className="w-5 h-5" />
              ปรับเลื่อนชั้น
            </Link>
            <Link
              href="/pages/academic/FailedStudent"
              className="px-10 bg-gradient-to-tr from-pink-500 to-red-500 hover:from-red-600 hover:to-red-600 flex items-center justify-center py-1 text-white rounded-md  gap-2"
            >
              <CircleX className="w-5 h-5 " />
              นักเรียนที่ไม่ผ่านเกณฑ์
            </Link>
          </div>
        </div>

        <Main />
      </div>
    </header>
  );
}

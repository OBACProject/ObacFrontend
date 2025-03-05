"use client";
import Link from "next/link";
import React from "react";
import { Main } from "./main";
import { ArrowUpDown, CircleX } from "lucide-react";

export default function page() {
  return (
    <header className="mx-4 sm:mx-10 lg:mx-10 p-4 ">
      <div>
      <div className="w-full flex justify-between">
          <div className="px-10 rounded-3xl bg-gray-600 py-1 text-white text-lg w-fit">
            จัดการคะแนน (รายบุคคล)
          </div>
          <div className="px-5 flex gap-4">
            <Link href="/pages/academic/grading/upLevel" className="px-10 bg-blue-500 py-1  flex items-center justify-center  text-white gap-2 rounded-md hover:bg-blue-600">
            <ArrowUpDown className="w-5 h-5"/>
            ปรับเลื่อนชั้น
            </Link>
            <Link
              href="/pages/academic/FailedStudent"
              className="px-10 bg-white border-2  border-red-500 hover:bg-red-400 hover:text-white flex items-center justify-center py-1 text-red-500 rounded-md  gap-2"
            >
              <CircleX className="w-5 h-5 "/>
              นักเรียนที่ไม่ผ่านเกณฑ์
            </Link>
          </div>
        </div>

        <Main />
      </div>
    </header>
  );
}

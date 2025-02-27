"use client";
import Link from "next/link";
import React from "react";
import { Main } from "./main";

export default function page() {
  return (
    <header className="mx-4 sm:mx-10 lg:mx-10 p-4 mt-10 ">
      <div>
        <div className="w-full flex justify-between">
          <div className="px-10 rounded-3xl bg-gray-600 py-1 text-white text-lg w-fit">
            จัดการคะแนน (ห้องเรียน)
          </div>
          <div className="px-5 flex">
            <Link
              href="/pages/academic/grading/upLevel"
              className="px-10 bg-blue-500 py-1 text-white rounded-md hover:bg-blue-600"
            >
              ปรับเลื่อนชั้น
            </Link>
          </div>
        </div>

        <Main />
      </div>
    </header>
  );
}

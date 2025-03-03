"use client";
import React, { useState } from "react";;

export default function Main() {
  const [students, setStudent] = useState<string[]>([]);

  return (


      <div className="py-5">
        <div className="w-full justify-center flex">
          <div className="px-10 rounded-3xl text-lg bg-gray-600 text-white py-1 text-center w-fit">
            นักเรียนที่ไม่ผ่านเกณฑ์
          </div>
        </div>

        <div className="w-full py-4 ">
          <div className="py-20">
            <label className="hover:bg-blue-500 bg-gray-500 px-10 py-2 text-white">
              สายชั้น
            </label>
          </div>
          <div className="py-20">
            <label className="hover:bg-blue-500 bg-gray-500 px-10 py-2 text-white">
              สายชั้น
            </label>
          </div>
          <div className="py-20">
            <label className="hover:bg-blue-500 bg-gray-500 px-10 py-2 text-white">
              สายชั้น
            </label>
          </div>
          <div className="py-20">
            <label className="hover:bg-blue-500 bg-gray-500 px-10 py-2 text-white">
              สายชั้น
            </label>
          </div>
        </div>
      </div>
  );
}

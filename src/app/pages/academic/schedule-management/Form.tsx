"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

export default function Form() {
  return (
    <div className="w-full">
      <div className="flex items-center py-5 justify-between">
        <div></div>
        <h1 className="px-10 py-1 rounded-3xl translate-x-16 text-lg w-fit bg-gray-600 text-white">
          ระบบจัดการตารางเรียน-ตารางสอน
        </h1>
        <div className="px-5 flex gap-2">
          <button className="px-10 py-1 flex gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl">
            <PlusCircle className="w-5 h-5 text-white  " />
            เพิ่มตารางเรียน
          </button>
        </div>
      </div>


    <div>
        Toggle
    </div>
      <div>
        Table
      </div>
    </div>
  );
}

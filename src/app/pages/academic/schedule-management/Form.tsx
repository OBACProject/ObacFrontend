'use client';
import React from "react";
import MenuBar from "./MenuBar";
import { useRouter } from "next/navigation";

export default function Form() {
    const router =  useRouter();
    const id = 'test'
    const handleSearch = ()=>{
        router.push(`/pages/academic/schedule-management/${id}`)
    }
  return (
    <div>
      <MenuBar />
      <div className="py-5 border-b-[1px] border-gray-100 shadow-md shadow-gray-100 ">
        <div className="my-5 text-center text-black text-3xl ">
          จัดการวิชาสอน
        </div>
        <div className="flex my-10 justify-center">
          <input
            type="text"
            placeholder="ชื่ออาจารย์"
            className="px-5  border-r-none focus:outline-blue-400 focus:outline-r-white border-gray-200 py-1 rounded-l-md border "
          />
          <button className="px-5 text-white py-1 bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-r-md"
          onClick={handleSearch}>
            ค้นหา
          </button>
        </div>
      </div>
    </div>
  );
}

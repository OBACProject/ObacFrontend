"use client"
import React, { useState } from "react";
import { StudentListPage } from "./studentList";
import { UserRound } from "lucide-react";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";

export default function Main() {

  return (
    <div className="py-2 bg-gray-50 w-full">
       <div className="w-full justify-start flex">
        <HeaderLabel Icon={<UserRound className="h-7 w-7 text-white"/>} bg_icon="bg-blue-500" title="รายชื่อนักเรียนทั้งหมด" className="text-blue-600"/>
      </div>
        <StudentListPage/>


    </div>
  );
}

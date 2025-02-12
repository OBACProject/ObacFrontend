"use client";

import GradPerTerms from "@/app/components/PDF/GradPerTerm";
import React from "react";
import HC2_Transcript from "@/app/components/PDF/HC2_Transcript";

import "./styles.css";
import TotalScoreInGroup from "@/app/components/PDF/TotalScoreInGroup";

export default function page() {
  return (
    <div className="w-full grid px-10 py-10">
      <div className="w-full py-10 grid place-items-center gap-5">
        <button className="px-0 py-1.5 text-white bg-blue-500 hover:bg-blue-600 rounded-sm w-[250px]" onClick={()=>{
          TotalScoreInGroup()
        }}>
          ดาวโหลดใบรวมเกรดของห้อง
        </button>
        <button className="px-0 py-1.5 text-white bg-blue-500 hover:bg-blue-600 rounded-sm w-[250px]">
          ดาวโหลดใบคะแนน
        </button>
        <button className="px-0 py-1.5 text-white bg-blue-500 hover:bg-blue-600 rounded-sm w-[250px]">
          ดาวโหลดTranscript
        </button>
        <button className="px-0 py-1.5 text-white bg-blue-500 hover:bg-blue-600 rounded-sm w-[250px]">
          ดาวโหลดใบเกรดต่อเทอม
        </button>
        <button className="px-0 py-1.5 text-white bg-blue-500 hover:bg-blue-600 rounded-sm w-[250px]" >
          ดาวโหลดใบรายชื่อ
        </button>
      </div>
    </div>
  );
}

"use client";

import { GetTeacherDetails } from "@/api/teacher/route";
import { TeacherDetails } from "@/dto/teacherDto";
import React from "react";
import { useState, useEffect } from "react";

export default function ProfileForm() {
  const [teachers, setTeacher] = useState<TeacherDetails>();

  useEffect(() => {
    GetTeacherDetails().then((d) => {
      if (d) {
        setTeacher(d);
      }
    });
  }, []);

  return (
    <div
      className="text-xl pb-[300px] bg-gray-200 w-full h-full flex justify-center "
      style={{
        // backgroundColor: "#ffffff",
        backgroundImage: `
      /* เส้นตั้ง */
      repeating-linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0px,
        rgba(255, 255, 255, 1) 1px,
        transparent 1px,
        transparent 20px
      ),
      /* เส้นนอน */
      repeating-linear-gradient(
        to bottom,
        rgba(255, 255, 255, 1) 0px,
        rgba(255, 255, 255, 1) 1px,
        transparent 1px,
        transparent 20px
      )
    `,
        backgroundSize: "20px 20px",
      }}
    >
      <div className="mt-20 w-fit lg:px-20 px-8 py-5 flex justify-center border-[2px] border-blue-400 rounded-xl shadow-md bg-white   items-center">
        <div className="grid place-items-center gap-8">
          <div className="font-prompt text-2xl text-blue-800">
            ข้อมูลอาจารย์
          </div>
          <div className="font-prompt w-full text-center pb-4 flex gap-4 items-center ">
            ชื่อ
            <p className="text-gray-600">
              {teachers?.name} {teachers?.lastName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

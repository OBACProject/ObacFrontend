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
        console.log(d);
        setTeacher(d);
      }
    });
  }, []);

  return (
    <div className="text-xl z-10  w-full h-fit flex justify-center ">
      <div className="w-fit lg:px-20 px-8 py-5 flex justify-center border-[2px] border-blue-400 rounded-xl shadow-md bg-white   items-center">
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

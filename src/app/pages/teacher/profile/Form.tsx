'use client';

import React from "react";
import ProfileCard from "./profileCard";
import DetailCard from "./detailCard";
import { useState,useEffect } from "react";
import { fetchGetTeacherByTeacherIdAsync } from "@/api/teacher/teacherAPI";
import { GetTeacherByTeacherId } from "@/dto/teacherDto";

const getTeachData = async (id:number) => {
  try {
    const teacher = await fetchGetTeacherByTeacherIdAsync(id);
    console.log(teacher);
    return teacher
  } catch (err) {
    console.error("Failed to fetch teacher by ID:", err);
  }
};


export default function ProfileForm() {

  const [teachers  , setTeacher] = useState<GetTeacherByTeacherId>();
  useEffect(()=>{
    getTeachData(2).then((items)=>{
      setTeacher(items)
    })
  },[])

  console.log(teachers)
  return (
    <div className="text-xl pl-20 ">
      <div className="grid place-items-center  text-center py-2 bg-gray-100">
        ข้อมูลอาจารย์
      </div>
      <div className="text-xl border-2  border-gray-200 py-5 px-5">
        <div className="lg:grid lg:gap:0 lg:grid-cols-2 lg:px-34  sm:grid sm:grid-rows-4 sm:gap-4">
          <ProfileCard isLoading={true}  imgPath={null} teachers={teachers}  />
          <DetailCard isLoading={true} teachers={teachers}   />
        </div>
      </div>
    </div>
  );
}

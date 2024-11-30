'use client'
import CardSubject from "@/app/components/card/card-subject";
import React, { useState } from "react";

type SubjectCard = {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  currentRoom: string;
  subjectStatus: number;
  total_student: number;
};

interface Props {
  slug: string;
}

export default function Center({ slug }: Props) {
  const [subjectCards, setCard] = useState<SubjectCard[]>([
    {
      subjectId: "/pages/teacher/subject/" + "111111",
      subjectName: "Mathematics",
      subjectCode: "111111",
      currentRoom: "101",
      subjectStatus: 1,
      total_student: 30,
    },
    {
      subjectId: "/pages/teacher/subject/" + "222222",
      subjectName: "Science",
      subjectCode: "222222",
      currentRoom: "102",
      subjectStatus: 1,
      total_student: 25,
    },
    {
      subjectId: "/pages/teacher/subject/" + "333333",
      subjectName: "History",
      subjectCode: "333333",
      currentRoom: "103",
      subjectStatus: 2,
      total_student: 28,
    },
    {
      subjectId: "/pages/teacher/subject/" + "444444",
      subjectName: "English",
      subjectCode: "444444",
      currentRoom: "104",
      subjectStatus: 1,
      total_student: 32,
    },
  ]);
  return (
    <div>
      <div className="shadow-md ">
        <div className="my-5 text-center text-2xl font-semibold">
          ข้อมูลอาจารย์
        </div>
        <div className="grid place-items-center py-10 px-10 border-[1px]">
          detail
        </div>
      </div>
      <div className="py-5 px-10 flex justify-end">
        <button className="text-white text-md bg-blue-600 px-10 py-2 hover:opacity-75 rounded-md d">เพิ่มวิชาสอน</button>
      </div>
      <div className=" grid place-items-center mb-20">
        {subjectCards.length > 0 ? (
            <div className=" lg:w-9/12 sm:w-full md:w-full">
            <CardSubject cardSubjectData={subjectCards} />
          </div>
          ):(
            <div className="grid text-gray-500 text-3xl font-semibold place-items-center py-10">
              ไม่มีวิชาที่สอน
            </div>
          )}
      </div>
      
    </div>
  );
}

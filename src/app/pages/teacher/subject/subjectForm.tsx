"use client";

import CardSubject from "@/app/components/card/card-subject";
import React, { useEffect, useState } from "react";

type SubjectCard = {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  currentRoom: string;
  subjectStatus: number;
  total_student: number;
};
interface Props {
  subjectCard: SubjectCard[];
}
type CardData =  {
  teacherId: 1,
  firstName: string | null,
  lastName:string | null,
  thaiName: string,
  thaiLastName: string,
  gender: string,
  rank: string,
  qualification: string,
  thaiId:string| null,
  email:string,
  phoneNumber: string,
  address: string | null,
  nationality:string,
  religion: string,
  userId: string,
  isActive: boolean,
  hiredDate: string,
  programId: number,
  programName: string,
  facultyId: number,
  facultyName:string,
  birthDate: string | null
}

const getData = async (): Promise<CardData[]> => {
  try {
    const res = await fetch("http://139.59.253.55:5111/api/Teacher/GetAllTeacher/");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const text = await res.text();

    const json = JSON.parse(text);
    const data = json.data;
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export default function SubjectForm() {
  const [datas ,  setData] = useState<CardData | null>(null)
  useEffect(() => {
   getData().then((d:any)=>{
    setData(d)
   })
  }, []);

  console.log("==============> :", datas);
  
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
    <>
      <div className="text-xl px-10 py-5">
        test
      {
          Array.isArray(datas) && datas.map((item) => (
            <div key={item.teacherId} className="text-black my-10">
              <p>Thai Name: {item.thaiName} {item.thaiLastName}</p>
              <p>Email: {item.email}</p>
              <p>Gender: {item.gender}</p>
              <p>Faculty: {item.facultyName}</p>
              <p>Program: {item.programName}</p>
              <p>Rank: {item.rank}</p>
              <p>Religion: {item.religion}</p>
            </div>
          ))
        }
        <div className="border-2 py-2 px-5 grid place-items-center border-gray-200 border-dashed">
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
    </>
  );
}

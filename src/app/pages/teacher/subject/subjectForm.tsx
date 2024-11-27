"use client";

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
  subjectCard: SubjectCard[];
}

export default function SubjectForm() {
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
      <div className="text-xl border-2  border-gray-200 py-2 px-5">
        <div className=" lg:w-3/5 sm:w-full md:w-full">
          <CardSubject cardSubjectData={subjectCards} />
        </div>
      </div>
    </>
  );
}

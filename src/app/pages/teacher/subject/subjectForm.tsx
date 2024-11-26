"use client";

import CardSubject from "@/app/components/card/card-subject";
import React, { useState } from "react";

type SubjectCard = {
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
        subjectName: "ThisIsSubject",
        subjectCode: "111111",
        currentRoom: "101",
        subjectStatus: 1,
        total_student: 30,
    },
    {
        subjectName: "ThisIsSubject",
        subjectCode: "222222",
        currentRoom: "102",
        subjectStatus: 1,
        total_student: 30,
    },
    {
        subjectName: "ThisIsSubject",
        subjectCode: "33333",
        currentRoom: "101",
        subjectStatus: 2,
        total_student: 30,
    },
    {
        subjectName: "ThisIsSubject",
        subjectCode: "4444",
        currentRoom: "101",
        subjectStatus: 1,
        total_student: 30,
    },
    {
        subjectName: "ThisIsSubject",
        subjectCode: "55555",
        currentRoom: "101",
        subjectStatus: 1,
        total_student: 30,
    },
  ]);

  return (
    <div className="text-xl pl-20 ">
      <div className="w-full py-4 bg-blue-500 px-5">
        <div className="text-white">filter</div>
      </div>
      <div className="text-xl border-2  border-gray-200 py-5 px-5">
        <div className="w-3/5">
            <CardSubject
            cardSubjectData={subjectCards}
            />
        </div>
      </div>
    </div>
  );
}

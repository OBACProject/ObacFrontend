"use client";
import React, { useState } from "react";

import { GradStudentInSubject } from "@/dto/gradDto";
import { mockGradStudentInSubject } from "@/resource/teachers/mockData";
import { Pencil } from "lucide-react";
import SubjectTableForm from "./SubjectScoreTable";
interface Props {
  scheduleID: string;
}

export default function Form({ scheduleID }: Props) {
  const [grads, setGrads] = useState<GradStudentInSubject[]>(
    mockGradStudentInSubject
  );
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <div className="">
      <div className="flex justify-end  my-2">
        {edit ? (
          <div className="flex items-center gap-2 justify-center">
            <button className="py-1.5 bg-red-500 text-white px-10 flex items-center gap-2 rounded-md shadow-md hover:bg-red-400-400 " onClick={() => setEdit(!edit)}>ยกเลิก</button>
            <button className="py-1.5 bg-green-500 text-white px-10 flex items-center gap-2 rounded-md shadow-md hover:bg-green-400 " >บันทึก</button>
          </div>
        ) : (
          <button
            className="py-1.5 bg-blue-500 text-white px-10 flex items-center gap-2 rounded-md shadow-md hover:bg-blue-400 "
            onClick={() => setEdit(!edit)}
          >
            <Pencil className="h-5 w-5" />
            แก้ไข
          </button>
        )}
      </div>
      {grads && <SubjectTableForm grads={grads} onEdit={edit} />}
    </div>
  );
}

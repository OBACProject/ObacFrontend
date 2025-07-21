"use client";
import React, { useEffect, useState } from "react";

import { StudentGroupGradeResponse } from "@/dto/gradDto";
import { Pencil } from "lucide-react";
import SubjectTableForm from "./SubjectScoreTable";
import { mockStudentGroupGradeResponse } from "@/resource/teachers/mockData";
import { GetStudentGroupGradeByScheduleSubjectId } from "@/api/grad/route";
interface Props {
  scheduleID: string;
}

export default function Form({ scheduleID }: Props) {
  const [grads, setGrads] = useState<StudentGroupGradeResponse>(
    mockStudentGroupGradeResponse
  );
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    GetStudentGroupGradeByScheduleSubjectId(Number(scheduleID)).then((d) => {
      if (d) {
        setGrads(d);
      } else {
        console.log("การดึงข้อมูลคะแนนเรียนมีปัญหา โปรดเช็ค api ");
      }
    });
  }, []);
  return (
    <div className="">
      <div className="flex justify-end  my-2">
        {edit ? (
          <div className="flex items-center gap-2 justify-center">
            <button
              className="py-1.5 bg-red-500 text-white px-10 flex items-center gap-2 rounded-md shadow-md hover:bg-red-400-400 "
              onClick={() => setEdit(!edit)}
            >
              ยกเลิก
            </button>
            <button className="py-1.5 bg-green-500 text-white px-10 flex items-center gap-2 rounded-md shadow-md hover:bg-green-400 ">
              บันทึก
            </button>
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
      {grads && <SubjectTableForm grads={grads.subjectGrades} onEdit={edit} />}
    </div>
  );
}

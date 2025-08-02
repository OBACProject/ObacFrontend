"use client";
import React, { useEffect, useState } from "react";
import { StudentGroupGradeResponse } from "@/dto/gradDto";
import SubjectTableForm from "./SubjectScoreTable";
import { GetStudentGroupGradeByScheduleSubjectId } from "@/api/grad/route";
interface Props {
  scheduleID: string;
}

export default function Form({ scheduleID }: Props) {
  const [grads, setGrads] = useState<StudentGroupGradeResponse>();
  

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
    <div className=" w-full">
      {grads && <SubjectTableForm scheduleID={Number(scheduleID)} grads={grads.subjectGrades} />}
    </div>
  );
}

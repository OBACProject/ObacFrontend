"use client";
import React, { useEffect, useState } from "react";
import { StudentGroupGradeResponse, SubjectGradeItem } from "@/dto/gradDto";
import SubjectTableForm from "./SubjectScoreTable";
import { GetStudentGroupGradeByScheduleSubjectId } from "@/api/grad/route";
import { GraduationCap } from "lucide-react";
import DocumentSection from "./DocumentSection";
interface Props {
  scheduleID: string;
  groupName: string;
  subjectCode: string;
  subjectName: string;
}

export default function Form({
  scheduleID,
  groupName,
  subjectCode,
  subjectName,
}: Props) {
  const [grads, setGrads] = useState<StudentGroupGradeResponse>();

  const byStudentCodeDesc = (a: SubjectGradeItem, b: SubjectGradeItem) => {
    const an = /^\d+$/.test(a.studentCode) ? Number(a.studentCode) : NaN;
    const bn = /^\d+$/.test(b.studentCode) ? Number(b.studentCode) : NaN;
    if (!Number.isNaN(an) && !Number.isNaN(bn)) return bn - an;
    return b.studentCode.localeCompare(a.studentCode, "th");
  };

  useEffect(() => {
    GetStudentGroupGradeByScheduleSubjectId(Number(scheduleID)).then((d) => {
      if (d) {
        const sorted = {
          ...d,
          subjectGrades: [...(d.subjectGrades ?? [])].sort(byStudentCodeDesc),
        };
        setGrads(sorted);
      } else {
        console.log("การดึงข้อมูลคะแนนเรียนมีปัญหา โปรดเช็ค api ");
      }
    });
  }, []);
  return (
    <div className=" w-full min-h-[calc(80dvh-2rem)]  ">
      <div className="w-full flex justify-between mt-4 rounded-lg bg-blue-500">
        <div className="grid gap-2 px-5 py-4">
          <div className="flex gap-2 items-center">
            <GraduationCap className="text-white h-6 w-6" />
            <h1 className="text-2xl text-white font-prompt">
              ระบบจัดการคะแนนสำหรับอาจารย์
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center text-white">
              <p>รหัสวิชา </p>
              <p className="text-sm px-4 bg-blue-400 py-0.5 rounded-full">
                {subjectCode}
              </p>
            </div>
            <div className="flex gap-1 items-center text-white">
              <p>กลุ่มเรียน </p>
              <p className="text-sm px-4 bg-blue-400 py-0.5 rounded-full">
                {grads?.class}.{grads?.groupName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-white text-lg">วิชา</p>
            <h1 className="text-lg bg-blue-400 px-5 py-1 rounded-full w-fit text-white font-prompt_Light">
              {subjectName}
            </h1>
          </div>
        </div>
        {grads && (
          <DocumentSection
            groupID={grads?.groupId}
            year={grads?.year}
            scheduleSubjectID={Number(scheduleID)}
          />
        )}
      </div>
      {grads && (
        <SubjectTableForm
          scheduleID={Number(scheduleID)}
          grads={grads.subjectGrades}
        />
      )}
    </div>
  );
}

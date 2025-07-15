"use client";
import CardSubject from "@/components/common/Card/card-subject";
import { CardSubjectResponse } from "@/dto/teacherDto";
import { getCurrentThaiTermYear } from "@/lib/utils";
import { mockCardSubjectResponse } from "@/resource/teachers/mockData";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Form() {
  const [subjects, setSubject] = useState<CardSubjectResponse[]>(
    mockCardSubjectResponse
  );

  useEffect(() => {
    // fetch Data
  }, []);
  const currentTime = getCurrentThaiTermYear();

  return (
    <div className="w-full ">
      <div className="w-full grid place-items-center">
        {subjects.length > 0 ? (
          <div className="px-10 w-[70%] grid gap-4 ">
            {subjects.map((items) => (
              <Link
                key={items.subjectId}
                href={
                  "/teacher/subject/" +
                  items.scheduleSubjectId +
                  "/" +
                  items.subjectName +
                  "/" +
                  items.subjectCode
                  +"/"
                  +items.class+"."+items.studentGroupName
                }
              >
                <CardSubject
                  data={items}
                  term={currentTime.defaultTerm}
                  year={currentTime.currentYear}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-2 grid place-items-center border-dashed border-gray-400 py-10 rounded-lg">
            <h1 className="text-3xl font-prompt text-gray-500">
              ไม่มีวิชาที่สอน
            </h1>
            <p className="text-gray-500">ติดต่อฝ่ายทะเบียนเพื่อเพิ่มวิชาสอน</p>
          </div>
        )}
      </div>
    </div>
  );
}

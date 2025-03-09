"use client";

import CardSubject from "@/app/components/card/card-subject";
import React, { useEffect, useState } from "react";
import { TeacherEnrollment } from "@/dto/teacherDto";
import {
  fetchGetTeacherEnrollmentsByTeacherId,
  fetchTeacherUser,
} from "@/api/teacher/teacherAPI";
import Link from "next/link";

type Props = {
  teacherId: number;
};

const getSubjectData = async (
  teacherId: number,
  term: string,
  year: number
) => {
  try {
    const data = fetchGetTeacherEnrollmentsByTeacherId(teacherId, term, year);
    return data;
  } catch (err) {
    console.error("Failed to fetch teacher enroll :", err);
  }
};

export default function Form({ teacherId }: Props) {
  const currentYear = new Date().getFullYear() + 542;
  const [subjectCards, setCard] = useState<TeacherEnrollment[]>();
  const [year, setYear] = useState<number>(2567);
  const [term, setTerm] = useState<string>("1");
  useEffect(() => {
    getSubjectData(teacherId, term, year).then((item) => {
      setCard(item);
    });
  }, []);

  useEffect(() => {
    getSubjectData(teacherId, term, year).then((item) => {
      setCard(item);
    });
  }, []);

  return (
    <>
      <div className="text-xl px-10 ">
        <div>
          <div className="flex gap-5  px-5 py-1 ">
            <div className="flex items-center gap-2">
              {/* {teacherId} */}
              <p>เทอม</p>
              <select
                className="px-4 py-1 border border-gray-300 rounded-sm focus:outline-blue-400"
                onChange={(e) => setTerm(e.target.value)}
                value={term}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div className="flex items-center gap-2 ">
              <p>ปีการศึกษา</p>
              <select
                className="px-4 py-1 border border-gray-300 rounded-sm focus:outline-blue-400"
                onChange={(e) => setYear(Number(e.target.value))}
                value={year}
              >
                <option value={2567}>2567</option>
                <option value={2566}>2566</option>
                <option value={2565}>2565</option>
              </select>
            </div>
          </div>
        </div>
        <div className="border-2 py-2 px-5 grid place-items-center border-gray-200 border-dashed">
          {subjectCards && subjectCards.length > 0 ? (
            <div className="lg:w-9/12 sm:w-full md:w-full">
              {subjectCards.map((items) => (
                <Link
                  key={items.id}
                  href={`/pages/teacher/subject/subjectScore?subject=${items.subjectId}&schedule=${items.scheduleSubjectId}&iscomplete=${items.isComplete}`}
                >
                  <CardSubject cardSubjectData={items} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid text-gray-500 text-3xl font-semibold place-items-center py-10">
              ไม่มีวิชาที่สอน
            </div>
          )}
        </div>
      </div>
    </>
  );
}

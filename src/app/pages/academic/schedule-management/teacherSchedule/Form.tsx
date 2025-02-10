"use client";
import { fetchGetScheduleOfTeacherByUserID } from "@/api/schedule/scheduleAPI";
import { TeacherScheduleSubject } from "@/dto/schedule";
import React from "react";
import { useEffect, useState } from "react";
type Props = {
  term: string;
  year: string;
  userId: string;
};

const getData = async (userId: string, term: number, year: number) => {
  try {
    const data = await fetchGetScheduleOfTeacherByUserID(userId, term, year);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default function Form({ term, year, userId }: Props) {
    const [schedules ,setSchedules ] = useState<TeacherScheduleSubject[]>([])
  useEffect(() => {
    getData(userId, Number(term) ,Number(year)).then((d) => {
    });
  }, []);
  return (
    <div className="w-full  px-10 ">
      <div className="py-5 flex justify-center ">
        <h1 className="px-10 text-lg py-1 bg-gray-700 text-white rounded-3xl">
          ตารางสอนอาจารย์
        </h1>
      </div>
      <div className="flex justify-start gap-5">
        <div className="flex gap-2">
          <div>อาจารย์ : </div>
        </div>
      </div>

      {schedules.map((item ,index)=>(
            <div className="px-10 text-black" key={index}>
                    {item.scheduleSubjects[index].room}
            </div>
      ))}
    </div>
  );
}

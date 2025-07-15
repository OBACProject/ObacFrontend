"use client";
import { CardSubjectResponse } from "@/dto/teacherDto";
import { Calendar, Check, Clock, MapPin, Users } from "lucide-react";
import React from "react";

interface CardSubjectProps {
  data: CardSubjectResponse;
  term: string;
  year: number;
}

export default function CardSubject({ data, year, term }: CardSubjectProps) {
  return (
    <div className=" bg-white border border-gray-100 shadow-lg flex justify-between rounded-lg duration-300 overflow-hidden hover:bg-gray-100 hover:shadow-gray-300">
      <div className="grid gap-2 px-5 py-5">
        <h1 className="text-gl font-semibold font-prompt">
          {data.subjectName}
        </h1>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <p>รหัสวิชา : {data.subjectCode}</p>
          </div>

          <div className="flex gap-1 justify-center items-center">
            <Users className="w-4 h-4 text-gray-500" />
            <p className="text-gray-500">จำนวนนักเรียน </p>
            <p className="text-base  text-gray-700">{data.studentAmount} คน</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="px-2 py-1 rounded-lg bg-gray-200 text-gray-800 flex items-center gap-2 justify-center">
            <MapPin className="w-4 h-4" />
            {data.class}.{data.studentGroupName}
          </div>
          <div className="px-2 py-1 rounded-lg bg-blue-500 text-white flex items-center gap-2 hover:scale-105 duration-300 justify-center">
            <Calendar className="w-4 h-4" />
            {data.day}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-10 grid place-items-center">
        <h1>สถานะคะแนน</h1>
        <div
          className={`flex gap-2 items-center justify-center ${
            data.isComplete
              ? "text-green-500 bg-green-100"
              : "text-orange-500 bg-yellow-100"
          }   rounded-full px-4 py-1`}
        >
          {data.isComplete ? (
            <Check className="w-4 h-4 " />
          ) : (
            <Clock className="w-4 h-4 " />
          )}
          {data.isComplete ? "ตรวจสอบแล้ว" : "ยังไม่ตรวจสอบ"}
        </div>
        <hr className="border-b-1 border-gray-400 w-full" />
        <h1 className="text-lg text-gray-600 font-prompt">
          ปีการศึกษา {term}/{year}
        </h1>
      </div>
    </div>
  );
}

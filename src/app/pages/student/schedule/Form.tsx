import React from "react";
import { CardSchedule } from "@/app/components/card/card-schedule";
import { Badge } from "@/components/ui/badge";
import { StudentCardSubjectData } from "@/resource/students/studentCardSubjectData";
export default function Form() {
  const unitCredit = StudentCardSubjectData.reduce(
    (acc, curr) => acc + curr.subject_credit,
    0
  );
  return (
    <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-44 px-16 lg:px-4 py-8">
      <div className="mx-10 w-full items-center text-center text-lg sm:text-xl flex justify-between">
        <Badge className=" lg:text-xl md:text-xl text-md border-[1px] border-gray-300  text-center w-fit md:px-10 lg:px-10 py-1 rounded-md text-white bg-blue-950">
          ตารางเรียน
        </Badge>
        <Badge className="text-sm bg-white font-normal shadow-md shadow-gray-200 hover:bg-gray-100 border border-gray-200  sm:text-base text-gray-500 flex gap-2 mt-2 px-5 sm:mt-0">
          <span className="text-gray-600">{unitCredit}</span>
          หน่วยกิต
        </Badge>
      </div>

      <div className="mx-10 grid gap-2 mt-5 w-full">
        {StudentCardSubjectData.map((cardData, index) => (
          <CardSchedule key={index} {...cardData} />
        ))}
      </div>

      {/* count number of subject in StudentCardSubjectData */}
      <div className="flex items-end justify-end mt-6 text-sm sm:text-base w-full mx-10">
        <Badge className="text-sm bg-white font-normal shadow-md shadow-gray-200 hover:bg-gray-100 border border-gray-200  sm:text-base text-gray-700 flex  mt-2 px-5 sm:mt-0">
          จำนวนวิชา : &nbsp;{StudentCardSubjectData.length}
        </Badge>
      </div>
    </div>
  );
}

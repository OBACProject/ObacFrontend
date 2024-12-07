import React from "react";
import { GetTeacherByTeacherId } from "@/dto/teacherDto";

interface Props {
  isLoading: boolean;
  teachers: GetTeacherByTeacherId | undefined;
}

export default function DetailCard({ isLoading , teachers }: Props) {
  return (
    <div className="w-full sm:place-items-center lg:place-items-start ">
      <div className="px-10 py-5 rounded-md bg-[#caebff] w-4/5 my-0 ">
        <div className="my-2 font-semibold ">
          <span className="text-xl ">รศ.ดร. </span>{teachers?.thaiName}{teachers?.thaiLastName}
        </div>
        <div className="my-2 font-semibold">
          <span className="text-xl ">Assoc.Prof.Dr. </span> Patarajarin Napakarn
        </div>
        <div className="my-4 text-gray-500">
          <span className="text-lg text-black font-semibold ">
            รหัสประจำตัว : 
          </span>
          {teachers?.teacherId}
        </div>
        <div className="my-4 text-gray-500">
          <span className="text-lg text-black font-semibold  ">
            วุฒิการศึกษา :{" "}
          </span>
          ปริญญาตรี
        </div>
        <div className="my-4 text-gray-500">
          <span className="text-lg text-black  font-semibold ">
            ประเภทหลักสูตรที่สอน :{" "}
          </span>
          {teachers?.teacherFaculty}
        </div>
        <div className="my-4 text-blue-500 ">
          <span className="text-lg text-black font-semibold ">
            หมวดการสอน :{" "}
          </span>
          {teachers?.teacherProgram}
        </div>
      </div>
    </div>
  );
}

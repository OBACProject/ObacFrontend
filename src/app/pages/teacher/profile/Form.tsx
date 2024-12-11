"use client";

import React from "react";
import { useState, useEffect } from "react";
import { fetchGetTeacherByTeacherIdAsync } from "@/api/teacher/teacherAPI";
import { GetTeacherByTeacherId } from "@/dto/teacherDto";

const getTeachData = async (id: number) => {
  try {
    const teacher = await fetchGetTeacherByTeacherIdAsync(id);
    console.log(teacher);
    return teacher;
  } catch (err) {
    console.error("Failed to fetch teacher by ID:", err);
  }
};

export default function ProfileForm() {
  const [teachers, setTeacher] = useState<GetTeacherByTeacherId>();
  useEffect(() => {
    getTeachData(2).then((items) => {
      setTeacher(items);
    });
  }, []);

  console.log(teachers);
  return (
    <div className="text-xl  font-sans">
      <div className="px-5">
        <div className="text-3xl px-5 bg-blue-900 shadow-sm shadow-gray-500 text-white w-full my-2 py-2 rounded-sm font-semibold ">
          Profile
        </div>
        <div className="border-[1px] duration-1000 shadow-md w-fit shadow-gray-200 border-gray-200 px-5 py-5 rounded-sm hover:bg-[#e4f1f8]">
          <div className="flex ">
            <div className="relative overflow-hidden">
                <img
              className="hover:scale-125 duration-700 justify-start border-[1px] border-gray-400 rounded-md"
              src={teachers?.teacherProfilePicture || "/asset/user.jpg"}
              width="150"
            />
            </div>
          
            <div className="px-5">
              <div className="flex px-4 rounded-md py-1 w-fit bg-[#e4f1f8]">
                <div className="text-xl font-semibold">เลขประจำตัว</div>
                <div className="ml-2">{teachers?.teacherCode}</div>
              </div>
              <div className=" flex my-2">
                <div className="text-xl pl-4 font-semibold ">
                  {/* {teachers?.teacherGender || "คุณ"} */}
                  นาย
                </div>
                <div className="mx-4 text-gray-700">{teachers?.thaiName}</div>
                <div className="mx-4 text-gray-700">
                  {teachers?.thaiLastName}
                </div>
              </div>
              <div className="flex pl-4  my-2">
                <div className="text-xl  font-semibold font-sans">
                  {teachers?.teacherRank}
                </div>
                <div className="mx-4 text-gray-700">
                  {teachers?.teacherEngFirstName}
                </div>
                <div className="mx-2 text-gray-700">
                  {teachers?.teacherEngLastName}
                </div>
              </div>
              <div className="flex  my-2">
                <div className="text-xl pl-4  font-semibold">หมวดการสอน</div>
                <div className="mx-4 text-blue-600 font-bold">
                  {teachers?.teacherFaculty}
                </div>
                <div className="border-l-2 pl-4 text-xl font-semibold">
                  สอนหลักสูตร
                </div>
                <div className="mx-4 text-blue-600 font-bold">
                  {teachers?.teacherProgram}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[1px] duration-1000 hover:bg-[#e4f1f8] shadow-md w-fit shadow-gray-200 border-gray-200 px-5 my-4 py-5 rounded-sm">
          <div className="flex">
            <div className="text-xl font-semibold">Email :</div>
            <div className="mx-4 text-gray-700">{teachers?.teacherEmail}</div>
            <div className="border-l-2 pl-4 font-semibold">เบอร์ติดต่อ : </div>
            <div className="mx-4 text-gray-700">{teachers?.teacherPhone}</div>
          </div>
        </div>

        <div className="border-[1px] duration-1000 hover:bg-[#e4f1f8] shadow-md w-fit shadow-gray-200 border-gray-200 px-5 my-4 py-5 rounded-sm">
          <div className="flex">
            <div className="text-xl font-semibold">Gender : </div>
            <div className="mx-4 text-gray-700">{teachers?.teacherGender}</div>
            <div className="border-l-2 pl-4 text-xl font-semibold">
              ศาสนา :{" "}
            </div>
            <div className="mx-4 text-gray-700">
              {teachers?.teacherReligion}
            </div>
            <div className="border-l-2 pl-4 text-xl font-semibold">
              สัญชาติ :{" "}
            </div>
            <div className="mx-4 text-gray-700">
              {teachers?.teacherNationality}
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="border-[1px]  duration-1000 hover:bg-[#e4f1f8] shadow-md w-fit shadow-gray-200 border-gray-200 px-5 py-5 rounded-sm">
            <div className="flex">
              <div className="text-xl font-semibold">เข้าร่วมเมื่อ </div>
              <div className="mx-4 font-bole text-blue-700">
                {teachers?.teacherDateOfJoining ? "-" : "-"}
              </div>
            </div>
          </div>
          <div className="border-[1px] mx-5 duration-1000 hover:bg-[#e4f1f8] shadow-md w-fit shadow-gray-200 border-gray-200 px-5  py-5 rounded-sm">
            <div className="flex">
              <div className="text-xl font-semibold">คุณสมบัติ : </div>
              <div className="mx-4 font-semibold text-purple-700">
                {teachers?.teacherQualification}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


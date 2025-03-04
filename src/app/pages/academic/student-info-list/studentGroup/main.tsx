"use client";
import { fetchStudentListInGroup } from "@/api/student/studentApi";
import { StudentListInGroup } from "@/dto/studentDto";
import { UsersRound } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  groupId: number;
};

const getStudentDataList = async (groupId: number) => {
  try {
    const response = await fetchStudentListInGroup(groupId);
    return response;
  } catch (err) {
    return [];
  }
};

export default function Main({ groupId }: Props) {
  const [studentList, setStudentList] = useState<StudentListInGroup[]>([]);
  useEffect(() => {
    getStudentDataList(groupId).then((item) => {
      setStudentList(item);
    });
  }, []);
  return (
    <div className="py-2 w-full ">
      <div className="flex px-5 justify-center py-3 items-center">
        <h1 className="px-10 w-fit text-white flex gap-2 items-center bg-blue-800 rounded-3xl py-2 text-xl">
          <UsersRound className="h-8 w-8" />
          รายชื่อนักเรียนในห้องเรียน
        </h1>
      </div>
      <div className="flex justify-end py-2 px-5">
        {" "}
        <div className="flex gap-2">
          <button className="px-4 bg-sky-100 hover:bg-gray-100 py-2 rounded-md text-gray-600">
            เอกสารใบตรวจเกรด PDF
          </button>
          <button className="px-4 bg-sky-100 hover:bg-gray-100 py-2 rounded-md text-gray-600">
            เอกสารใบตรวจเกรด Excel
          </button>
        </div>
      </div>
      <div className="w-full px-5 ">
        <div className="w-full  grid grid-cols-[5%_10%_25%_60%] bg-[#cfe4ff] text-blue-950 border-2 border-gray-400 text-lg  rounded-t-md">
          <div className="text-center py-2 border-r border-gray-400">
            ลำดับ
          </div>
          <div className="text-center py-2 border-r border-gray-400">
            รหัสนักเรียน
          </div>
          <div className="text-center py-2 border-r border-gray-400">
            ชื่อ - นามสกุล
          </div>
        </div>{" "}
        {studentList.length > 0 ? (
          <div className="w-full px-5">
            {studentList?.map((item: StudentListInGroup, index) => (
              <Link
                href={`/pages/academic/student-details/${item.studentId}`}
                key={index}
                className={` ${
                  index % 2 == 0 ? "bg-white" : "bg-gray-100"
                } grid grid-cols-[5%_10%_10%_15%]  border text-[16px] hover:bg-blue-100 border-gray-400 text-gray-700  border-t-0`}
              >
                <div className="text-center flex items-center w-full justify-center text-gray-700 border-r py-1  border-gray-400">
                  {index + 1}
                </div>
                <p className="text-start flex items-center px-4 border-r border-gray-400   py-1 line-clamp-1">
                  {item.studentCode}
                </p>
                <p className="text-start flex items-center  px-4  py-1 line-clamp-1">
                  {item.studentName}
                </p>
                <p className="text-start flex items-center  px-4 border-r border-gray-400  py-1 line-clamp-1">
                  {item.studentSurname}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid place-items-center border-2 border-dashed border-t-0 text-[24px] border-gray-400  text-gray-700 py-10 text-center">
            ไม่พบข้อมูล
          </div>
        )}
      </div>
    </div>
  );
}

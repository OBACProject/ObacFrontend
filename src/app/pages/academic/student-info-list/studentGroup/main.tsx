"use client";
import { GetStudentListByGroupID } from "@/api/student/studentApi";
import StudentNameListPDF from "@/app/components/PDF/StudentNameList";
import { GetStudentListByGroupIDDto, StudentDto, StudentListByGroupIDDto } from "@/dto/studentDto";
import { Loader2, UsersRound } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  groupId: number;
};

const getStudentDataList = async (groupId: number) => {
  try {
    const response = await GetStudentListByGroupID(groupId);
    return response;
  } catch (err) {
    return [];
  }
};

export default function Main({ groupId }: Props) {
  const [studentInGroup, setStudentInGroup] = useState<GetStudentListByGroupIDDto | null>();
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  useEffect(() => {
    setIsLoadingPage(false)
    getStudentDataList(groupId).then((item: GetStudentListByGroupIDDto | never[] | null) => {
      if (item && !Array.isArray(item)) {
        setStudentInGroup(item);
        setIsLoadingPage(true)
      } else {
        setStudentInGroup(null);
        setIsLoadingPage(true)
      }
    });
  }, [groupId]);
  const onGetStudentNameListPDF =  ()=>{
    if (studentInGroup){
      const studentClass = studentInGroup?.class + "." + studentInGroup?.groupName
      StudentNameListPDF({studentGroup: studentClass , student: studentInGroup.students })
    }
  }
  return (
    <div className="py-2 w-full px-10">
      <div className="flex px-5 justify-center py-3 items-center">
        <h1 className="px-10 w-fit text-white flex gap-2 items-center bg-gradient-to-tr from-blue-600 to-gray-400 rounded-3xl py-2 text-xl">
          <UsersRound className="h-8 w-8" />
          รายชื่อนักเรียนในห้องเรียน
        </h1>
      </div>
      <div className="flex justify-between items-center py-2 px-5">
        <div className=" flex gap-3 items-center">
          <div className="border border-gray-400 rounded-sm px-2 py-1">
           ห้อง {studentInGroup?.class}.{studentInGroup?.groupName} 
          </div>
          <div className="border border-gray-400 rounded-sm px-2 py-1">
            หลักสูตร {studentInGroup?.facultyName}
          </div>
          
        </div>
        <div className="flex gap-2">
          <button className="px-4 bg-sky-100 hover:bg-gray-100 py-2 rounded-md text-gray-600"
          onClick={onGetStudentNameListPDF}
          >
            ใบรายชื่อนักเรียน.pdf
          </button>
         
        </div>
      </div>
      {isLoadingPage ? (
        <div className="w-full px-5 pb-10">
        <div className="w-full  grid grid-cols-[5%_10%_25%_60%] bg-[#cfe4ff] text-blue-950 border-2 border-gray-400 text-lg  ">
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
        {studentInGroup ? (
          <div className="w-full ">
            {studentInGroup.students?.map((item: StudentListByGroupIDDto, index) => (
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
                  {item.firstName}
                </p>
                <p className="text-start flex items-center  px-4 border-r border-gray-400  py-1 line-clamp-1">
                  {item.lastName}
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
      ):(
        <div className="mt-2 border-2 border-dashed rounded-md border-gray-400 grid place-items-center py-20 text-3xl text-blue-400 font-semibold items-center">
          <p className="flex gap-2">
            <Loader2 className="h-10 w-10 animate-spin" />
            Loading...
          </p>
        </div>
      )}
      
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { StudentGroup } from "@/dto/studentDto";
import { fetchGetAllStudentGroup } from "@/api/student/studentApi";
import { GetAllTeacher } from "@/dto/teacherDto";
import { fetchGetAllTeacherAsync } from "@/api/teacher/teacherAPI";
import Link from "next/link";
import AddSchedulePopUp from "./AddSchedulePopUp";

const getStudentGroup = async () => {
  try {
    const response = await fetchGetAllStudentGroup();
    return response;
  } catch (err) {
    return [];
  }
};

const getAllTeacher = async () => {
  try {
    const response = await fetchGetAllTeacherAsync();
    return response;
  } catch (err) {
    return [];
  }
};

export default function Form() {
  const [toggleMode, setToggleMode] = useState<boolean>(false);
  const [popUpAddSubject, setpopUpAddSubject] = useState<boolean>(false);
  const [term, setTerm] = useState<string>("1");
  const [year, setYear] = useState<string>("2024");

  const [studentGroup, setStudentGroup] = useState<StudentGroup[]>();
  const [teachers, setTeacher] = useState<GetAllTeacher[]>();

  useEffect(() => {
    getStudentGroup().then((d) => {
      setStudentGroup(d);
    });
    getAllTeacher().then((d) => {
      setTeacher(d);
    });
  }, []);

  const getDataAddSchedulePopUp = (
    subjectID: number,
    teacherID: number,
    studentGroupID: number,
    room: string,
    period: string,
    day: string
  ) => {
    alert(
      `1-${studentGroupID} , 2-${teacherID} , 3-${subjectID} , 4-${room} 5-${period} 6-${day}`
    );
  };
  return (
    <div className="w-full">
      <div className="flex items-center py-5 justify-between">
        <div></div>
        <h1 className="px-10 py-2 rounded-3xl translate-x-16 text-xl w-fit bg-gray-600 text-white">
          ระบบจัดการตารางเรียน - ตารางสอน
        </h1>
        <div className="px-5 flex gap-2">
          <button
            className="px-10 py-1.5 flex gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
            onClick={() => setpopUpAddSubject(true)}
          >
            <PlusCircle className="w-5 h-5 text-white  " />
            เพิ่มตารางเรียน
          </button>
        </div>
      </div>
      <div className="w-full items-center justify-end px-5 flex gap-2">
        <div className="flex gap-5  px-5 ">
          <div className="flex items-center gap-2">
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
              onChange={(e) => setYear(e.target.value)}
              value={year}
            >
              <option value="2024">2568</option>
              <option value="2567">2567</option>
              <option value="2566">2566</option>
              <option value="2565">2565</option>
            </select>
          </div>
        </div>
        <button
          className={`px-10 py-1 ${
            !toggleMode
              ? "bg-blue-500 text-white"
              : "bg-white border-gray-300  shadow-md  border  text-blue-800 hover:bg-gray-200"
          } duration-500 flex items-center  rounded-md`}
          onClick={() => {
            setToggleMode(false);
          }}
        >
          Student
        </button>
        <button
          className={`px-10 py-1 duration-500 ${
            !toggleMode
              ? "bg-white border-gray-300  shadow-md shadow-gray-200  border  text-blue-800 hover:bg-gray-200"
              : "bg-blue-500  text-white"
          }   rounded-md`}
          onClick={() => setToggleMode(true)}
        >
          Teacher
        </button>
      </div>
      {toggleMode ? (
        <div className="w-full rounded-sm py-5 px-10">
          <div className="w-full grid grid-cols-[5%_20%_20%_20%_20%_15%] bg-[#cfe4ff] text-lg text-gray-800 border border-gray-400 py-2 rounded-t-md">
            <div className="text-center">ลำดับ</div>
            <div className="text-center">รหัสอาจารย์</div>
            <div className="text-center">ชื่อ</div>
            <div className="text-center">นามสกุล</div>
            <div className="text-center">หมวดวิชา</div>
            <div className="text-center">เบอร์ติดต่อ</div>
          </div>
          {teachers?.map((item: GetAllTeacher, index) => (
            <Link
              href={`/pages/academic/schedule-management/teacherSchedule?param1=${term}&param2=${year}&param3=${item.teacherId}`}
              key={item.teacherId}
              className={` ${
                index % 2 == 0 ? "bg-white" : "bg-gray-100"
              } grid grid-cols-[5%_20%_20%_20%_20%_15%]  hover:bg-blue-50 border border-gray-400  border-t-0`}
            >
              <div className="text-center flex items-center w-full justify-center text-gray-700 border-r py-1   border-gray-400">
                {index + 1}
              </div>
              <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r border-gray-300">
                <p className="line-clamp-1">T10221501</p>
              </div>
              <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r border-gray-300 ">
                <p className="line-clamp-1">{item.thaiName}</p>
              </div>
              <div className="text-center flex items-center w-full text-gray-700 justify-start px-4 py-1 border-r border-gray-300">
                <p className="line-clamp-1">{item.thaiLastName}</p>
              </div>
              <div className=" flex items-center text-gray-700 justify-center gap-2 border-r py-1 border-gray-300">
                <p className="line-clamp-1">{item.facultyName}</p>
              </div>
              <div className=" flex items-center text-gray-700 justify-center gap-2 py-1">
                091-874-1224
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full rounded-sm py-5 px-10">
          <div className="w-full grid grid-cols-[5%_10%_25%_25%_25%_10%] bg-[#cfe4ff] text-gray-800 border text-lg border-gray-400 py-2 rounded-t-md">
            <div className="text-center">ลำดับ</div>
            <div className="text-center">ระดับชั้น</div>
            <div className="text-center">ประเภทวิชา/สายอาชีพ</div>
            <div className="text-center">กลุ่มอาชีพ</div>
            <div className="text-center">สาขาวิชา</div>
            <div className="text-center">จำนวนนักเรียน</div>
          </div>
          {studentGroup?.map((item: StudentGroup, index) => (
            <Link
              href={`/pages/academic/schedule-management/groupSchedule?param1=${term}&param2=${year}&param3=${item.studentGroupId}`}
              key={item.studentGroupId}
              className={` ${
                index % 2 == 0 ? "bg-white" : "bg-gray-100"
              } grid grid-cols-[5%_10%_25%_25%_25%_10%] text-gray-700 hover:bg-blue-100 border border-gray-400  border-t-0`}
            >
              <div className="text-center flex items-center w-full justify-center text-gray-700 border-r py-1  border-gray-400">
                {index + 1}
              </div>
              <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r border-gray-300">
                <p className="line-clamp-1">
                  {item.class}.{item.studentGroupName}
                </p>
              </div>
              <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r border-gray-300">
                <p className="line-clamp-1">{item.program}</p>
              </div>
              <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r border-gray-300">
                <p className="line-clamp-1">{item.program}</p>
              </div>
              <div className="text-center flex items-center w-full justify-start px-4 py-1 border-r border-gray-300">
                <p className="line-clamp-1">{item.program}</p>
              </div>
              <div className=" flex items-center justify-center gap-2 py-1">
                {item.studentCount}
              </div>
            </Link>
          ))}
        </div>
      )}
      {popUpAddSubject == true && (
        <AddSchedulePopUp
          onClosePopUp={setpopUpAddSubject}
          term={term}
          year={year}
        />
      )}
    </div>
  );
}

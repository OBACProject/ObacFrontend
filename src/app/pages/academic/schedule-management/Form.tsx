"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { StudentGroup } from "@/dto/studentDto";
import { fetchGetAllStudentGroup } from "@/api/student/studentApi";
import { GetAllTeacher } from "@/dto/teacherDto";
import { fetchGetAllTeacherAsync } from "@/api/teacher/teacherAPI";
import Link from "next/link";

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
  const [term , setTerm] = useState<string>('1')
  const [year , setYear] = useState<string>('2024')
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
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

  return (
    <div className="w-full">
      <div className="flex items-center py-5 justify-between">
        <div></div>
        <h1 className="px-10 py-1 rounded-3xl translate-x-16 text-lg w-fit bg-gray-600 text-white">
          ระบบจัดการตารางเรียน-ตารางสอน
        </h1>
        <div className="px-5 flex gap-2">
          <button
            className="px-10 py-1 flex gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
            onClick={() => setpopUpAddSubject(true)}
          >
            <PlusCircle className="w-5 h-5 text-white  " />
            เพิ่มตารางเรียน
          </button>
        </div>
      </div>
      <div className="w-full items-center justify-end px-5 flex gap-2">
        {!toggleMode && (
          <div className="flex gap-5  px-5 ">
            <div className="flex items-center gap-2">
              <p>เทอม</p>
              <select className="px-4 py-1 border border-gray-300 rounded-sm focus:outline-blue-400"
              onChange={(e)=>setTerm(e.target.value)} value={term}>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div className="flex items-center gap-2 ">
              <p>ปีการศึกษา</p>
              <select className="px-4 py-1 border border-gray-300 rounded-sm focus:outline-blue-400"
              onChange={(e)=>setYear(e.target.value)} value={year}>
                <option value="2568">2568</option>
                <option value="2567">2567</option>
                <option value="2566">2566</option>
                <option value="2565">2565</option>
              </select>
            </div>
          </div>
        )}
        <button
          className={`px-10 py-1 ${
            !toggleMode
              ? "bg-blue-500 text-white"
              : "bg-white border-gray-300  shadow-md  border  text-blue-800 hover:bg-gray-200"
          } duration-500  rounded-md`}
          onClick={() => {
            setToggleMode(false);
          }}
        >
          {" "}
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
          <div className="w-full grid grid-cols-[5%_20%_20%_20%_20%_15%] bg-[#cfe4ff] text-gray-800 border border-gray-400 py-2 rounded-t-md">
            <div className="text-center">ลำดับ</div>
            <div className="text-center">รหัสอาจารย์</div>
            <div className="text-center">ชื่อ</div>
            <div className="text-center">นามสกุล</div>
            <div className="text-center">หมวดวิชา</div>
            <div className="text-center">เบอร์ติดต่อ</div>
          </div>
          {teachers?.map((item: GetAllTeacher, index) => (
            <Link
              href={`/pages/academic/schedule-management/teacherSchedule?param1=cf37ddc0-e0af-4c88-8752-15e166efd133&param2=${year}&param3=${item.teacherId}`}
              key={index}
              className={` ${
                index % 2 == 0 ? "bg-white" : "bg-gray-100"
              } grid grid-cols-[5%_20%_20%_20%_20%_15%]  hover:bg-blue-100 border border-gray-400  border-t-0`}
            >
              <div className="text-center flex items-center w-full justify-center text-gray-700 border-r py-1  border-gray-400">
                {index + 1}
              </div>
              <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r ">
                <p className="line-clamp-1">T10221501</p>
              </div>
              <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r ">
                <p className="line-clamp-1">{item.firstName}</p>
              </div>
              <div className="text-center flex items-center w-full justify-center py-1 border-r ">
                <p className="line-clamp-1">{item.lastName}</p>
              </div>
              <div className=" flex items-center justify-center gap-2 py-1">
                {item.facultyName}
              </div>
              <div className=" flex items-center justify-center gap-2 py-1">
                091-874-1224
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full rounded-sm py-5 px-10">
          <div className="w-full grid grid-cols-[5%_20%_30%_20%_25%] bg-[#cfe4ff] text-gray-800 border border-gray-400 py-2 rounded-t-md">
            <div className="text-center">ลำดับ</div>
            <div className="text-center">ระดับชั้น</div>
            <div className="text-center">สาขาวิชา</div>
            <div className="text-center">สาขางาน</div>
            <div className="text-center">จำนวนนักเรียน</div>
          </div>
          {studentGroup?.map((item: StudentGroup, index) => (
            <div
              key={index}
              className={` ${
                index % 2 == 0 ? "bg-white" : "bg-gray-100"
              } grid grid-cols-[5%_20%_30%_20%_25%]  hover:bg-blue-100 border border-gray-400  border-t-0`}
            >
              <div className="text-center flex items-center w-full justify-center text-gray-700 border-r py-1  border-gray-400">
                {index + 1}
              </div>
              <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r ">
                <p className="line-clamp-1">{item.class}</p>
              </div>
              <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r ">
                <p className="line-clamp-1">{item.program}</p>
              </div>
              <div className="text-center flex items-center w-full justify-start px-4 py-1 border-r ">
                <p className="line-clamp-1">{item.program}</p>
              </div>
              <div className=" flex items-center justify-center gap-2 py-1">
                {item.studentCount}
              </div>
            </div>
          ))}
        </div>
      )}

      {popUpAddSubject == true && (
        <div
          className="fixed duration-1000 animate-appearance-in inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
          onClick={() => setpopUpAddSubject(!popUpAddSubject)}
        >
          <div
            className=" bg-white shadow-lg shadow-gray-400   rounded-lg w-4/12 z-100 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-2 text-center text-xl text-gray-900 rounded-t-lg bg-white w-full">
              เพิ่มวิชาสอน
            </div>
            <div className="px-5 py-5">
              <div className="grid my-3 grid-cols-2">
                <span className="flex gap-2 justify-center">
                  <label className="py-1 px-2 ">วัน</label>
                  <select className="px-5 py-1 rounded-md bg-gray-50 border border-gray-300 focus:outline-blue-500 ">
                    <option selected>- เลือก -</option>
                    {days.map((items) => (
                      <option value={items}>{items}</option>
                    ))}
                  </select>
                </span>
                <span className="flex gap-2 justify-center">
                  <label className="py-1 px-2">คาบเรียน</label>
                  <select className="rounded-md px-5 py-1 bg-gray-50 border border-gray-300 focus:outline-blue-500 ">
                    <option selected>- เลือก -</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                  </select>
                </span>
              </div>
              <div className=" my-3 ">
                <span className=" gap-0 grid grid-cols-[30%_70%] ">
                  <label className="py-1 pl-10 ">รหัสวิชา </label>
                  <input
                    type="text"
                    className="px-4 w-2/3 focus:outline-blue-400 border-[1px] rounded-md border-gray-300 py-1"
                    placeholder="code"
                  />
                </span>
              </div>
              <div className="my-3">
                <span className="grid grid-cols-[30%_70%] gap-0 ">
                  <label className="py-1 pl-10  ">ชื่อวิชา</label>
                  <input
                    type="text"
                    className="w-2/3 border-[1px] focus:outline-blue-400 rounded-md border-gray-300 px-4 py-1"
                    placeholder="subject"
                  />
                </span>
              </div>
              <div className=" my-3 ">
                <span className=" gap-0 grid grid-cols-[30%_70%] ">
                  <label className="py-1 pl-10 ">รหัสอาจารย์</label>
                  <input
                    type="text"
                    className="px-4 w-2/3 focus:outline-blue-400 border-[1px] rounded-md border-gray-300 py-1"
                    placeholder="code"
                  />
                </span>
              </div>
              <div className="my-3">
                <span className="grid grid-cols-[30%_70%] gap-0 ">
                  <label className="py-1 pl-10  ">ชื่ออาจารย์</label>
                  <input
                    type="text"
                    className="w-2/3 border-[1px] focus:outline-blue-400 rounded-md border-gray-300 px-4 py-1"
                    placeholder="subject"
                  />
                </span>
              </div>
              <div className="my-4">
                <span className="grid grid-cols-[50%_50%] gap-0 ">
                  <div className="flex gap-2">
                    <label className="py-1 pl-10  ">ห้องเรียน</label>
                    <input
                      type="text"
                      className="w-1/3 focus:outline-blue-400 border-[1px] rounded-md border-gray-300 px-4 py-1"
                      placeholder="room"
                    />
                  </div>
                  <div className="flex gap-2">
                    <label className="py-1 pl-0  ">กลุ่มเรียน</label>
                    <input
                      type="text"
                      className="w-5/12 focus:outline-blue-400 border-[1px] rounded-md border-gray-300 px-4 py-1"
                      placeholder="ปวส. ปวช."
                    />
                  </div>
                </span>
              </div>

              <div className="mt-4 mb-6">
                <span className="flex gap-2 ">
                  <label className="py-1 pl-10  ">ปีการศึกษา</label>
                  <select className="rounded-md border-[1px] px-5 border-gray-200">
                    <option selected>- เลือกปี -</option>
                    <option value="1/2567">1/2567</option>
                    <option value="2/2567">2/2567</option>
                  </select>
                </span>
              </div>
              <div className="flex justify-between gap-5 px-28 ">
                <button className="px-8 text-white py-1 bg-blue-500 rounded-sm hover:bg-blue-600">
                  ตกลง
                </button>
                <button
                  className="px-8 text-white py-1 hover:bg-gray-300 hover:text-black bg-gray-400 rounded-sm"
                  onClick={() => setpopUpAddSubject(!popUpAddSubject)}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

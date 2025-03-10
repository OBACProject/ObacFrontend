"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { BookText, PlusCircle } from "lucide-react";
import { GetStudentGroupsByTermYearDto, StudentGroup } from "@/dto/studentDto";
import { fetchGetStudentGroupsByTermYear } from "@/api/student/studentApi";
import { GetAllTeacher } from "@/dto/teacherDto";
import { fetchGetAllTeacherAsync } from "@/api/teacher/teacherAPI";
import Link from "next/link";
import AddSchedulePopUp from "./AddSchedulePopUp";

const getStudentGroup = async (term: string, year: number) => {
  try {
    const response = await fetchGetStudentGroupsByTermYear(term, year);
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
  const [term, setTerm] = useState<string>("2");
  const [year, setYear] = useState<string>("2567");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [studentGroup, setStudentGroup] = useState<
    GetStudentGroupsByTermYearDto[]
  >([]);
  const [teachers, setTeacher] = useState<GetAllTeacher[]>();
  // const fetchData = async () => {
  //   try {
  //     const [studentGroups, teachers] = await Promise.all([
  //       getStudentGroup(term , Number(year)),
  //       getAllTeacher(),
  //     ]);
  //     setStudentGroup(studentGroups);
  //     setTeacher(teachers);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  useEffect(() => {
    getStudentGroup(term, Number(year)).then(
      (d: GetStudentGroupsByTermYearDto[]) => {
        setStudentGroup(d);
      }
    );
    getAllTeacher().then((d) => {
      setTeacher(d);
    });
    setLoading(true);
  }, []);

  useEffect(() => {
    getStudentGroup(term, Number(year)).then(
      (d: GetStudentGroupsByTermYearDto[]) => {
        setStudentGroup(d);
      }
    );
  }, [term, year]);

  return (
    <div className="w-full">
      <div className="flex items-center py-5 justify-center">
        <div></div>
        <h1 className="px-10 py-2 rounded-3xl  text-xl w-fit bg-gradient-to-tr from-purple-500 via-pink-400 to-orange-300 text-white flex gap-2 items-center">
          <BookText className="w-8 h-8" />
          ระบบจัดการตารางเรียน - ตารางสอน
        </h1>
      </div>
      <div className="w-full items-center justify-between px-5 flex gap-2">
        <div className="flex gap-2 items-center">
          <button
            className={`px-10 py-1 ${
              !toggleMode
                ? "bg-blue-500  text-white"
                : "bg-white border-blue-500  border  text-blue-800 hover:bg-gray-200"
            } duration-300 flex items-center  rounded-md`}
            onClick={() => {
              setToggleMode(false);
            }}
          >
            นักเรียน
          </button>
          <button
            className={`px-10 py-1 duration-500 ${
              !toggleMode
                ? "bg-white border-blue-500  border   text-blue-800 hover:bg-gray-200"
                : "bg-blue-500  text-white"
            } duration-300 flex items-cente  rounded-md`}
            onClick={() => setToggleMode(true)}
          >
            อาจารย์
          </button>
        </div>
        <button
          className="px-10 py-1.5 flex gap-2 h-fit items-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
          onClick={() => setpopUpAddSubject(true)}
        >
          <PlusCircle className="w-5 h-5 text-white " />
          เพิ่มตารางเรียน
        </button>
      </div>
      {isLoading ? (
        <div>
          {toggleMode ? (
            <div className="w-full rounded-sm py-5 px-10">
              <div className="w-full grid grid-cols-[5%_20%_20%_20%_20%_15%] bg-[#cfe4ff] text-lg text-gray-800 border-2 border-gray-400  rounded-t-md">
                <div className="text-center py-2 border-r-2 border-gray-400">
                  ลำดับ
                </div>
                <div className="text-center py-2 border-r-2 border-gray-400">
                  รหัสอาจารย์
                </div>
                <div className="text-center py-2 border-r-2 border-gray-400">
                  ชื่อ
                </div>
                <div className="text-center py-2 border-r-2 border-gray-400">
                  นามสกุล
                </div>
                <div className="text-center py-2 border-r-2 border-gray-400">
                  หมวดวิชา
                </div>
                <div className="text-center py-2 border-r-2 border-gray-400">
                  เบอร์ติดต่อ
                </div>
              </div>
              {teachers && teachers?.length > 0 ? (
                <div>
                  {" "}
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
                      <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r border-gray-400">
                        <p className="line-clamp-1">{item.teacherCode}</p>
                      </div>
                      <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r border-gray-400 ">
                        <p className="line-clamp-1">{item.thaiName}</p>
                      </div>
                      <div className="text-center flex items-center w-full text-gray-700 justify-start px-4 py-1 border-r border-gray-400">
                        <p className="line-clamp-1">{item.thaiLastName}</p>
                      </div>
                      <div className=" flex items-center text-gray-700 justify-center gap-2 border-r py-1 border-gray-400">
                        <p className="line-clamp-1">{item.facultyName}</p>
                      </div>
                      <div className=" flex items-center text-gray-700 justify-center gap-2 py-1">
                        091-874-1224
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="border-2 py-10 border-dashed grid place-items-center border-t-0  text-2xl text-gray-500 border-gray-400">
                  ไม่มีข้อมูลอาจารย์
                </div>
              )}
            </div>
          ) : (
            <div className="w-full rounded-sm py-5 px-10">
              <div className="w-full grid grid-cols-[5%_15%_30%_40%_10%] bg-[#cfe4ff] text-gray-800 border-2  text-lg border-gray-400  rounded-t-md">
                <div className="text-center border-r-2 py-2 border-gray-400">
                  ลำดับ
                </div>
                <div className="text-center py-2 border-r-2 border-gray-400">
                  ระดับชั้น
                </div>
                <div className="text-center py-2 border-r-2 border-gray-400">
                  หลักสูตร
                </div>
                <div className="text-center py-2 border-r-2 border-gray-400">
                  รหัสห้อง
                </div>
                {/* <div className="text-center">สาขาวิชา</div> */}
                <div className="text-center py-2">จำนวนนักเรียน</div>
              </div>
              {studentGroup && studentGroup.length > 0 ? (
                <div>
                  {studentGroup?.map(
                    (item: GetStudentGroupsByTermYearDto, index) => (
                      <Link
                        href={`/pages/academic/schedule-management/groupSchedule?param1=${term}&param2=${year}&param3=${item.groupId}`}
                        key={item.groupId}
                        className={` ${
                          index % 2 == 0 ? "bg-white" : "bg-gray-100"
                        } grid grid-cols-[5%_15%_30%_40%_10%] text-gray-700 hover:bg-blue-100 border border-gray-400  border-t-0`}
                      >
                        <div className="text-center flex items-center w-full justify-center text-gray-700 border-r py-1  border-gray-400">
                          {index + 1}
                        </div>
                        <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r border-gray-400">
                          <p className="line-clamp-1">
                            {item.class}.{item.groupName}
                          </p>
                        </div>
                        <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r border-gray-400">
                          <p className="line-clamp-1">{item.facultyName}</p>
                        </div>
                        <div className="text-center flex items-center text-gray-700 py-1 px-4 border-r border-gray-400">
                          <p className="line-clamp-1">{item.groupCode}</p>
                        </div>
                        <div className=" flex items-center justify-center gap-2 py-1">
                          {/* {item.studentCount} */}-
                        </div>
                      </Link>
                    )
                  )}
                </div>
              ) : (
                <div className="border-2 py-10 border-dashed grid place-items-center border-t-0  text-2xl text-gray-500 border-gray-400">
                  ไม่มีข้อมูลชั้นเรียน
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="py-5 px-5">
          <div className="border-2 rounded-md border-dashed border-gray-400 grid place-items-center py-10 ">
            <div className="text-4xl text-gray-500 font-semibold animate-pulse">
              Loading...
            </div>
          </div>
        </div>
      )}

      {popUpAddSubject == true && (
        <AddSchedulePopUp onClosePopUp={setpopUpAddSubject} year={year} />
      )}
    </div>
  );
}

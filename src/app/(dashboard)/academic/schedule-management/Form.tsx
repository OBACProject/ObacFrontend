"use client";
import React, { useEffect, useState } from "react";
import { BookText, GraduationCap, PlusCircle, University } from "lucide-react";
import { GetAllTeacherResponse } from "@/dto/teacherDto";
// import AddSchedulePopUp from "./AddSchedulePopUp";
import { getCurrentThaiTermYear } from "@/lib/utils";
import SelectTermAndYear from "@/components/Academic/SelectTermYear";
import { StudentGroupItem } from "@/dto/studentGroupItem";
import { GetAllStudentGroupByTermYear } from "@/api/studentGroup/route";
import { GetAllTeachers } from "@/api/teacher/route";
import NameListScheduleTable, {
  ColumnConfig,
} from "@/components/Academic/table/NameListScheduleTable";

export default function Form() {
  const { defaultTerm, currentYear } = getCurrentThaiTermYear();
  const [toggleMode, setToggleMode] = useState<boolean>(false);
  const [popUpAddSubject, setpopUpAddSubject] = useState<boolean>(false);
  const [term, setTerm] = useState<string>(defaultTerm);
  const [year, setYear] = useState<number>(currentYear);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [studentGroup, setStudentGroup] = useState<StudentGroupItem[]>([]);
  const [teachers, setTeacher] = useState<GetAllTeacherResponse[]>();
  const [searchStudent, setSearchStudent] = useState<string>("");
  const [searchTeacher, setSearchTeacher] = useState<string>("");

  useEffect(() => {
    GetAllStudentGroupByTermYear(term, year).then((d: StudentGroupItem[]) => {
      if (d) {
        setStudentGroup(d);
      }
    });
    GetAllTeachers().then((d: GetAllTeacherResponse[]) => {
      setTeacher(d);
    });
    setLoading(true);
  }, []);

  useEffect(() => {
    setStudentGroup([]);
    setLoading(false);
    GetAllStudentGroupByTermYear(term, year).then((d: StudentGroupItem[]) => {
      if (d) {
        setStudentGroup(d);
      }
    });
    setLoading(true);
  }, [term, year]);

  const filteredTeachers = teachers?.filter(
    (item) =>
      (item.teacherCode?.toLowerCase() || "").includes(
        searchTeacher.toLowerCase()
      ) ||
      (item.firstName?.toLowerCase() || "").includes(
        searchTeacher.toLowerCase()
      ) ||
      (item.lastName?.toLowerCase() || "").includes(
        searchTeacher.toLowerCase()
      ) ||
      (item.facultyName?.toLowerCase() || "").includes(
        searchTeacher.toLowerCase()
      )
  );
  const filteredStudent = studentGroup?.filter(
    (item) =>
      `${item.class}.${item.groupName}`
        .toLowerCase()
        .includes(searchStudent.toLowerCase()) ||
      (item.facultyName?.toLowerCase() || "").includes(
        searchStudent.toLowerCase()
      )
  );

  const teacherColumns: ColumnConfig<GetAllTeacherResponse>[] = [
    { label: "No.", width: "5%", render: (_, i) => i + 1 },
    {
      label: "ชื่อ",
      width: "20%",
      render: (item) => `${item.prefix} ${item.firstName} `,
      className: "text-start lg:pl-6",
    },
    {
      label: "นามสกุล",
      width: "20%",
      render: (item) => `${item.lastName} `,
      className: "text-start lg:pl-6",
    },
    { label: "หมวดวิชา", width: "20%", render: (item) => item.facultyName },
    {
      label: "เบอร์ติดต่อ",
      width: "15%",
      render: (item) => item.phoneNumber ?? "-",
    },
  ];

  const studentColumns: ColumnConfig<StudentGroupItem>[] = [
    { label: "No.", width: "5%", render: (_, i) => i + 1 },
    {
      label: "ระดับชั้น",
      width: "15%",
      render: (item) => `${item.class}.${item.groupName}`,
    },
    { label: "หลักสูตร", width: "30%", render: (item) => item.facultyName },
    { label: "สาขา", width: "20%", render: (item) => item.programName },
    { label: "รหัสห้อง", width: "20%", render: (item) => item.groupCode },
    { label: "จำนวนนักเรียน", width: "10%", render: (_) => "-" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center py-5 justify-start px-10">
        <div></div>
        <h1 className="px-10 py-2 rounded-3xl  text-xl w-fit border border-gray-100 shadow-md   text-blue-700 flex gap-2 items-center">
          <BookText className="w-8 h-8" />
          ระบบจัดการตารางเรียน - ตารางสอน
        </h1>
      </div>
      <div className="w-full items-center justify-between px-10 flex gap-2">
        <div className="flex gap-2 items-center">
          <button
            className={`px-10 py-1 ${
              toggleMode
                ? "bg-blue-600  text-white"
                : "bg-white border-blue-500  border  text-blue-800 hover:bg-blue-500 hover:text-white"
            } duration-300 flex items-center  rounded-md`}
            onClick={() => {
              setToggleMode(true);
            }}
          >
            นักเรียน
          </button>
          <button
            className={`px-10 py-1 duration-300 ${
              toggleMode
                ? "bg-white border-blue-500  border   text-blue-800 hover:bg-blue-500 hover:text-white"
                : "bg-blue-600  text-white"
            } duration-300 flex items-cente  rounded-md`}
            onClick={() => setToggleMode(false)}
          >
            อาจารย์
          </button>
          <div className="px-5 flex items-center">
            {toggleMode ? (
              <div>
                <input
                  type="text"
                  placeholder="ค้นหาอาจารย์..."
                  value={searchTeacher}
                  onChange={(e) => setSearchTeacher(e.target.value)}
                  className="border border-gray-400 px-4 py-1 rounded-md  w-full"
                />
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="ค้นหาห้องเรียน..."
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  className="border border-gray-400 px-4 py-1 rounded-md  w-full"
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-5 justify-center">
            <SelectTermAndYear
              term={term}
              year={year}
              currentYear={currentYear}
              onChangeTerm={setTerm}
              onChangeYear={setYear}
            />
          </div>
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
        toggleMode == false ? (
          <NameListScheduleTable
            data={filteredTeachers || []}
            columns={teacherColumns}
            icon={<GraduationCap className="h-6 w-6 text-white" />}
            title={`รายชื่ออาจารย์ เทอม ${term} ปีการศึกษา ${year}`}
            rowHref={(item) =>
              `/academic/schedule-management/teacher-schedule/${term}/${year}/${item.teacherId}`
            }
            emptyText="ไม่มีข้อมูลอาจารย์"
          />
        ) : (
          <NameListScheduleTable
            data={filteredStudent || []}
            icon={<University className="h-6 w-6 text-white" />}
            title={`รายชื่อห้องเรียนของ เทอม ${term} ปีการศึกษา ${year}`}
            columns={studentColumns}
            rowHref={(item) =>
              `/academic/schedule-management/group-schedule/${term}/${year}/${item.id}`
            }
            emptyText="ไม่มีข้อมูลชั้นเรียน"
          />
        )
      ) : (
        <div className="py-5 px-5">
          <div className="border-2 rounded-md border-dashed border-gray-400 grid place-items-center py-10">
            <div className="text-4xl text-gray-500 font-semibold animate-pulse">
              Loading...
            </div>
          </div>
        </div>
      )}

      {popUpAddSubject == true && (
        // <AddSchedulePopUp
        //   onClosePopUp={setpopUpAddSubject}
        //   year={year.toString()}
        // />
        <div></div>
      )}
    </div>
  );
}

"use client";

import { Combobox } from "@/app/components/combobox/combobox";
import { makeColumns } from "@/app/components/table/makeColumns";
import { DataTable } from "@/app/components/table/tableComponent";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  StudentFailColumnData,
  StudentFailDataColumn,
} from "@/resource/academics/studentInfoList/studentFailData";
import { useEffect, useState } from "react";
import { StudentFailPopUp } from "./popup/studentFailPopUp";

export function StudentFailed() {
  const [searchFailStudent, setSearchFailStudent] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const [searchFailStudentFilter, setSearchFailStudentFilter] = useState<
    StudentFailDataColumn[]
  >([]);

  const [popUpStudentFail, setPopUpStudentFail] = useState<boolean>(false);
  const [selectedStudentFailId, setSelectedStudentFailId] = useState<number>(0);
  const handleClickPopUp = (studentId: number) => {
    setPopUpStudentFail(!popUpStudentFail);
    setSelectedStudentFailId(studentId);
  };

  const onClose = () => {
    setPopUpStudentFail(false);
  };

  const facultyNames = ["พาณิชยกรรม", "การท่องเที่ยว"];
  const programNames = [
    "การบัญชี",
    "การตลาด",
    "คอมพิวเตอร์ธุรกิจ",
    "คอมพิวกราฟฟิค",
    "การจัดการสำนักงาน",
    "การท่องเที่ยว",
  ];
  const classes = ["ปวช.", "ปวส."];
  const columns = makeColumns<StudentFailDataColumn>(
    {
      runningNumber: 0,
      thaiName: "",
      thaiLastName: "",
      gender: "",
      class: "",
      facultyName: "",
      programName: "",
    },
    "runningNumber",
    {
      runningNumber: "ลำดับ",
      thaiName: "ชื่อ",
      thaiLastName: "นามสกุล",
      gender: "เพศ",
      class: "ระดับการศึกษา",
      facultyName: "หลักสูตรการศึกษา",
      programName: "สาขา",
    },
    [
      {
        label: "ดูรายละเอียด",
        onClick: (id) => handleClickPopUp(Number(id)),
        className: "hover:bg-blue-600 bg-blue-500",
      },
      {
        label: "ไม่ผ่าน",
        onClick: (id) => console.log("Delete", id),
        className: "hover:bg-red-600 bg-red-500",
      },
    ]
  );

  useEffect(() => {
    if (popUpStudentFail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = ""; // Clean up on component unmount
    };
  }, [popUpStudentFail]);

  useEffect(() => {
    const searchMatch = StudentFailColumnData.filter((student) => {
      const matchesSearch =
        searchFailStudent &&
        (student.runningNumber.toString().includes(searchFailStudent) ||
          student.thaiName
            .toLowerCase()
            .includes(searchFailStudent.toLowerCase()) ||
          student.thaiLastName
            .toLowerCase()
            .includes(searchFailStudent.toLowerCase()) ||
          student.gender
            .toLowerCase()
            .includes(searchFailStudent.toLowerCase()) ||
          student.class
            .toLowerCase()
            .includes(searchFailStudent.toLowerCase()) ||
          student.facultyName
            .toLowerCase()
            .includes(searchFailStudent.toLowerCase()) ||
          student.programName
            .toLowerCase()
            .includes(searchFailStudent.toLowerCase()));

      const matchesClass = selectedClass
        ? student.class === selectedClass
        : true;

      const matchesFaculty = selectedFaculty
        ? student.facultyName === selectedFaculty
        : true;

      const matchesProgram = selectedProgram
        ? student.programName === selectedProgram
        : true;

      return (
        (matchesSearch || !searchFailStudent) &&
        matchesClass &&
        matchesFaculty &&
        matchesProgram
      );
    });
    setSearchFailStudentFilter(searchMatch);
  }, [searchFailStudent, selectedClass, selectedFaculty, selectedProgram]);
  return (
    <header className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 ">
      <div
        className="flex justify-between p-4 h-20
      "
      >
        <Badge className="text-sm sm:text-base" variant="outline">
          รายชื่อนักเรียนสอบตก
        </Badge>
      </div>
      <div className="flex gap-12 mt-6">
        <Combobox
          options={classes.map((classData) => ({
            value: classData,
            label: classData,
          }))}
          buttonLabel="ระดับการศึกษา"
          onSelect={(selectedClass) => setSelectedClass(selectedClass)}
        />

        <Combobox
          options={facultyNames.map((faculty) => ({
            value: faculty,
            label: faculty,
          }))}
          buttonLabel="หลักสูตรศึกษา"
          onSelect={(selectedFaculty) => setSelectedFaculty(selectedFaculty)}
        />

        <Combobox
          options={programNames.map((program) => ({
            value: program,
            label: program,
          }))}
          buttonLabel="สาขา"
          onSelect={(selectedProgram) => setSelectedProgram(selectedProgram)}
        />

        <Input
          type="text"
          placeholder="Search..."
          onChange={(event) => setSearchFailStudent(event.target.value)}
        />
      </div>
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={searchFailStudentFilter}
          selectedValue="runningNumber"
          columnWidths={{
            runningNumber: "w-1/12",
            thaiName: "w-1/4",
            thaiLastName: "w-1/4",
            gender: "w-1/6",
            class: "w-1/6",
            facultyName: "w-1/2",
            programName: "w-1/2",
          }}
        />
      </div>
      {popUpStudentFail && (
        <StudentFailPopUp studentId={selectedStudentFailId} onClose={onClose} />
      )}
    </header>
  );
}

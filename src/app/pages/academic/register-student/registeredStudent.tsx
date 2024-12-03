"use client";

import { Combobox } from "@/app/components/combobox/combobox";
import { makeColumns } from "@/app/components/table/makeColumns";
import { DataTable } from "@/app/components/table/tableComponent";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  StudentRegisterColumn,
  StudentRegisterDataColumn,
} from "@/resource/academics/studentInfoList/studentRegisterData";
import React, { useEffect, useState } from "react";

export function AcademicRegisterStudent() {
  const [searchStudent, setSearchStudent] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  console.log(selectedClass, selectedFaculty, selectedProgram);

  const [searchStudentFilter, setSearchStudentFilter] = useState<
    StudentRegisterDataColumn[]
  >([]);

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

  // console.log(StudentRegisterColumn);

  const columns = makeColumns<StudentRegisterDataColumn>(
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
      facultyName: "คณะ",
      programName: "สาขา",
    },
    [
      {
        label: "ดูข้อมูล",
        onClick: (id) => console.log("View", id),
        className: "hover:bg-blue-600 bg-blue-500",
      },
      {
        label: "ปฏิเสธ",
        onClick: (id) => console.log("Delete", id),
        className: "hover:bg-red-600 bg-red-500",
      },
    ]
  );
  useEffect(() => {
    const searchMatch = StudentRegisterColumn.filter((student) => {
      const matchesSearch =
        searchStudent &&
        (student.runningNumber.toString().includes(searchStudent) ||
          student.thaiName
            .toLowerCase()
            .includes(searchStudent.toLowerCase()) ||
          student.thaiLastName
            .toLowerCase()
            .includes(searchStudent.toLowerCase()) ||
          student.gender.toLowerCase().includes(searchStudent.toLowerCase()));

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
        (matchesSearch || !searchStudent) &&
        matchesClass &&
        matchesFaculty &&
        matchesProgram
      );
    });
    setSearchStudentFilter(searchMatch);
  }, [searchStudent, selectedClass, selectedFaculty, selectedProgram]);
  return (
    <div className="mx-4 sm:mx-10 lg:mx-44 p-4 mt-10 flex-col">
      <div className="w-1/6">
        <Badge className="text-sm sm:text-lg" variant="outline">
          รายชื่อผู้สมัครเข้าศึกษา
        </Badge>
      </div>
      <div className="flex gap-12 mt-6">
        <Input
          type="text"
          placeholder="Search..."
          onChange={(event) => setSearchStudent(event.target.value)}
        />

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
      </div>
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={searchStudentFilter}
          selectedValue="id"
        />
      </div>
    </div>
  );
}

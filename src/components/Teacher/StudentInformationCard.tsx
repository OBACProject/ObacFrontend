"use client";
import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";

interface StudentInformationCardProps {
  StudentCode: string;
  StudentFirstName: string;
  StudentLastName: string;
  Class: string;
  Prefix:string;
  Faculty: string;
  Program:string;
  edit: boolean;
  onChangeStudentData?: (updated: {
    prefix:string
    studentCode: string;
    studentFirstName: string;
    studentLastName: string;
    className: string;
    faculty: string;
    program:string
  }) => void;
}

export default function StudentInformationCard({
  StudentCode,
  StudentFirstName,
  StudentLastName,
  Class,
  Faculty,
  Prefix,
  edit,
  Program,
  onChangeStudentData,
}: StudentInformationCardProps) {
  const [studentCode, setStudentCode] = useState<string>("");
  const [studentFirstName, setStudentFirstName] = useState<string>("");
  const [studentLastName, setStudentLastName] = useState<string>("");
  const [className, setClassName] = useState<string>("");
  const [faculty, setFaculty] = useState<string>("");
  const [prefix, setPrefix] = useState<string>("");
  const [program , setProgram] = useState<string>("")

  useEffect(() => {
    setStudentCode(StudentCode);
    setClassName(Class);
    setFaculty(Faculty);
    setStudentFirstName(StudentFirstName);
    setStudentLastName(StudentLastName);
    setPrefix(Prefix)
    setProgram(Program)
  }, []);

  useEffect(() => {
    if (onChangeStudentData) {
      onChangeStudentData({
        prefix,
        studentCode,
        studentFirstName,
        studentLastName,
        className,
        faculty,
        program
      });
    }
  }, [studentCode, studentFirstName, studentLastName, className, faculty,prefix]);

  return (
    <div className="w-fit py-5 px-14 border-gray-200 border rounded-lg shadow-sm">
      <div className="flex items-center gap-5 mb-4">
        <InputBox
          label="รหัสนักเรียน"
          name="studentCode"
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
          placeholder="รหัสนักเรียน"
          inputWidth="w-[150px]"
          inputSize="text-lg"
          labelSize="text-xl"
          disable={!edit}
        />
        <select
          className="border border-gray-300 rounded-md py-1.5 px-2"
          onChange={(e) => setPrefix(e.target.value)}
          value={prefix}
          disabled={!edit}
        >
          <option value="นาย">นาย</option>
          <option value="นางสาว">นางสาว</option>
          <option value="นาง">นาง</option>
        </select>
        <InputBox
          label="ชื่อจริง"
          name="studentFirstName"
          value={studentFirstName}
          onChange={(e) => setStudentFirstName(e.target.value)}
          placeholder="ชื่อจริง"
          inputWidth="w-[180px]"
          inputSize="text-lg"
          labelSize="text-xl"
          disable={!edit}
        />
        <InputBox
          label="นามสกุล"
          name="studentLastName"
          value={studentLastName}
          onChange={(e) => setStudentLastName(e.target.value)}
          placeholder="นามสกุล"
          inputWidth="w-[180px]"
          inputSize="text-lg"
          labelSize="text-xl"
          disable={!edit}
        />
      </div>
      <div className="flex items-center gap-8">
        <InputBox
          label="ชั้นเรียน"
          name="studentLastName"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="ชั้นเรียน"
          inputWidth="w-[100px]"
          inputSize="text-lg"
          labelSize="text-xl"
          disable={true}
        />
        <InputBox
          label="หลักสูตร"
          name="studentLastName"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          placeholder="หลักสูตร"
          inputWidth="w-[230px]"
          inputSize="text-lg"
          labelSize="text-xl"
          disable={!edit}
        />
        <InputBox
          label="สาขาวิชา"
          name="studentLastName"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          placeholder="สาขาวิชา"
          inputWidth="w-[230px]"
          inputSize="text-lg"
          labelSize="text-xl"
          disable={!edit}
        />
      </div>
    </div>
  );
}

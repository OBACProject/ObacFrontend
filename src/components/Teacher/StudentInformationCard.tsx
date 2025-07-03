"use client";
import React, { useEffect, useState } from "react";
import InputBox from "./InputBox";

interface StudentInformationCardProps {
  StudentCode: string;
  StudentFirstName: string;
  StudentLastName: string;
  Class: string;
  Faculty: string;
  edit: boolean;
}

export default function StudentInformationCard({
  StudentCode,
  StudentFirstName,
  StudentLastName,
  Class,
  Faculty,
  edit
}: StudentInformationCardProps) {
  const [studentCode, setStudentCode] = useState<string>("");
  const [studentFirstName, setStudentFirstName] = useState<string>("");
  const [studentLastName, setStudentLastName] = useState<string>("");
  const [className, setClassName] = useState<string>("");
  const [faculty, setFaculty] = useState<string>("");

  useEffect(() => {
    setStudentCode(StudentCode);
    setClassName(Class);
    setFaculty(Faculty);
    setStudentFirstName(StudentFirstName)
    setStudentLastName(StudentLastName)
  }, []);
  return (
    <div className="w-fit py-5 px-14 border-gray-200 border rounded-lg shadow-sm">
      <div className="flex items-center gap-8 mb-4">
        <InputBox
          label="รหัสนักเรียน :"
          name="studentCode"
          value={studentCode || "00000000"}
          onChange={(e) => setStudentCode(e.target.value)}
          placeholder="รหัสนักเรียน"
          inputWidth="w-[150px]"
          inputSize="text-lg"
          labelSize="text-xl"
          disable={!edit}
        />
        <InputBox
          label="ชื่อจริง :"
          name="studentFirstName"
          value={studentFirstName || "00000000"}
          onChange={(e) => setStudentFirstName(e.target.value)}
          placeholder="ชื่อจริง"
          inputWidth="w-[180px]"
          inputSize="text-lg"
          labelSize="text-xl"
          disable={!edit}
        />
        <InputBox
          label="นามสกุล :"
          name="studentLastName"
          value={studentLastName || "00000000"}
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
          label="ชั้นเรียน :"
          name="studentLastName"
          value={className || "00000000"}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="ชั้นเรียน"
          inputWidth="w-[100px]"
          inputSize="text-lg"
          labelSize="text-xl"
          disable={!edit}
        />
        <InputBox
          label="สาขาวิชา :"
          name="studentLastName"
          value={faculty || "00000000"}
          onChange={(e) => setFaculty(e.target.value)}
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

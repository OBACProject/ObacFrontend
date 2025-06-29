"use client";
import ScoreInputForm from "@/components/Teacher/TableImportScore";
import StudentInformationCard from "@/components/Teacher/StudentInformationCard";
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import CreateScoreTablePopup from "@/components/Teacher/CreateScoreTablePopup";
interface FormProps {
  id: string;
}

interface ScoreImportProps {
  term: string;
  year: number;
  subjectName: string;
  subjectCode: string;
  unit: number;
  credite: number;
  summaryCredit: number;
  remark: string;
}

const scoreImportData: ScoreImportProps[][] = [
  [
    {
      term: "2",
      year: 2567,
      subjectName: "ภาษาไทยเพื่ออาชีพ",
      subjectCode: "20000-1102",
      unit: 1,
      credite: 1,
      summaryCredit: 1,
      remark: "",
    },
    {
      term: "2",
      year: 2567,
      subjectName: "การฟังและการพูดภาษาอังกฤษ",
      subjectCode: "20000-1203",
      unit: 1,
      credite: 1,
      summaryCredit: 1,
      remark: "",
    },
  ],
  [
    {
      term: "2",
      year: 2567,
      subjectName: "ทักษะการดำรงชีวิตเพื่อพัฒนาสุขภาวะ",
      subjectCode: "20000-1601",
      unit: 2,
      credite: 2,
      summaryCredit: 4,
      remark: "",
    },
    {
      term: "2",
      year: 2567,
      subjectName: "สุขภาพความปลอดภัยและสิ่งแวดล้อม",
      subjectCode: "20001-1001",
      unit: 2,
      credite: 1.5,
      summaryCredit: 3,
      remark: "",
    },
  ],
];

interface StudentNameList {
  studentCode: string;
  studentFirstName: string;
  studentLastName: string;
  className: string;
}

const studentNameList: StudentNameList[] = [
  {
    studentCode: "6401123",
    studentFirstName: "สมชาย",
    studentLastName: "พาเพลิน",
    className: "1/2",
  },
  {
    studentCode: "6401124",
    studentFirstName: "สมหญิง",
    studentLastName: "สดใส",
    className: "1/4",
  },
  {
    studentCode: "6401125",
    studentFirstName: "อนันต์",
    studentLastName: "ใจดี",
    className: "2/2",
  },
  {
    studentCode: "6401126",
    studentFirstName: "วิภา",
    studentLastName: "ว่องไว",
    className: "3/2",
  },
  {
    studentCode: "6401127",
    studentFirstName: "มานพ",
    studentLastName: "ขยันขันแข็ง",
    className: "2/2",
  },
  {
    studentCode: "6401128",
    studentFirstName: "ปวีณา",
    studentLastName: "สวยงาม",
    className: "1/2",
  },
  {
    studentCode: "6401129",
    studentFirstName: "ธนา",
    studentLastName: "สุขสบาย",
    className: "3/2",
  },
  {
    studentCode: "6401130",
    studentFirstName: "อรวี",
    studentLastName: "สดชื่น",
    className: "1/3",
  },
  {
    studentCode: "6401131",
    studentFirstName: "ภาคิน",
    studentLastName: "ใจเย็น",
    className: "1/8",
  },
  {
    studentCode: "6401132",
    studentFirstName: "ชลธิชา",
    studentLastName: "ร่าเริง",
    className: "1/5",
  },
];

export default function Form({ id }: FormProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [scoreImports, setScoreImport] =
    useState<ScoreImportProps[][]>(scoreImportData);
  
  const [creatTableButton, setCreateTableButton] = useState<boolean>(false);
  const student = studentNameList.find((s) => s.studentCode === id);
  
  return (
    <div>
      <div className="py-6"></div>
      <div className="flex justify-end items-center gap-4 py-1">
        <button
          className={`px-10 py-1.5 text-white rounded-sm ${
            edit ? "bg-red-500" : "bg-blue-500"
          }`}
          onClick={() => setEdit(!edit)}
        >
          {edit ? <p>ยกเลิก</p> : <p>แก้ไข</p>}
        </button>

        <button className="px-10 py-1.5 bg-green-400 text-white rounded-sm">
          บันทึก
        </button>
      </div>
      <div className="py-4">
        <StudentInformationCard
          StudentCode={id}
          StudentFirstName={student?.studentFirstName ||"-"}
          StudentLastName={student?.studentLastName ||"-"}
          Class={student?.className || "-"}
          Faculty="บริการและการจัดการ"
          edit={edit}
        />
      </div>
      <div className="w-full flex gap-10 items-center pt-4">
        <button
          className="enabled:bg-blue-500 bg-blue-400 px-10 py-1.5 rounded-md flex items-center gap-2 text-center text-white disabled:cursor-not-allowed enabled:hover:bg-blue-700"
          disabled={!edit}
          onClick={() => setCreateTableButton(true)}
        >
          <PlusCircle className="w-6 h-6" />
          สร้างตารางคะแนน
        </button>
        <p className="pl-20 text-red-500">
          *** โปรดตรวจสอบข้อมูลให้ถูกต้องทุกครั้งเมื่อทำการเพิ่มหรือแก้ไข ***
        </p>
      </div>
      <div>
        {scoreImports.map((group, index) => (
          <div className="my-6">
            <ScoreInputForm
              key={index}
              scores={group}
              edit={edit}
              onChange={(updated) => {
                const updatedAll = [...scoreImports];
                updatedAll[index] = updated;
                setScoreImport(updatedAll);
              }}
              term={group[0]?.term || "1"}
              year={group[0]?.year || 2567}
            />
          </div>
        ))}
      </div>
      {creatTableButton && (
        <CreateScoreTablePopup
          onClickPopUp={setCreateTableButton}
          onConfirm={(year, term) => {
            const newScoreGroup: ScoreImportProps[] = [
              {
                term,
                year,
                subjectName: "",
                subjectCode: "",
                unit: 0,
                credite: 0,
                summaryCredit: 0,
                remark: "",
              },
            ];

            setScoreImport((prev) => [...prev, newScoreGroup]);
            setCreateTableButton(false); // ปิด popup หลังจากกดสร้าง
          }}
        />
      )}
    </div>
  );
}

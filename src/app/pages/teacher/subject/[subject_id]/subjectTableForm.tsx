"use client";
import React, { useState } from "react";

type SubjectData = {
  studentId: string;
  studentName: string;
  Score1: number;
  Score2: number;
  Score3: number;
};

interface Props {
  slug: string;
  studentData?: SubjectData[];
}

export default function SubjectTableForm({ slug, studentData = [] }: Props) {
  const [studentDatas, setStudentData] = useState<SubjectData[]>([
    {
      studentId: "100001",
      studentName: "สมชาย ใจดี",
      Score1: 33,
      Score2: 12,
      Score3: 30,
    },
    {
      studentId: "100002",
      studentName: "สมศรี สวยงาม",
      Score1: 35,
      Score2: 15,
      Score3: 20,
    },
    {
      studentId: "100003",
      studentName: "อาทิตย์ แสงจันทร์",
      Score1: 27,
      Score2: 8,
      Score3: 22,
    },
    {
      studentId: "100004",
      studentName: "วันเพ็ญ นวลตา",
      Score1: 41,
      Score2: 5,
      Score3: 25,
    },
    {
      studentId: "100005",
      studentName: "นพดล เพชรนิล",
      Score1: 45,
      Score2: 13,
      Score3: 11,
    },
    {
      studentId: "100006",
      studentName: "วิภาวดี ทองคำ",
      Score1: 38,
      Score2: 18,
      Score3: 15,
    },
    {
      studentId: "100007",
      studentName: "ประยุทธ์ ขยันยิ่ง",
      Score1: 40,
      Score2: 11,
      Score3: 20,
    },
    {
      studentId: "100008",
      studentName: "พิมพ์ใจ จิตใจงาม",
      Score1: 42,
      Score2: 15,
      Score3: 25,
    },
    {
      studentId: "100009",
      studentName: "นฤมล ใจเย็น",
      Score1: 34,
      Score2: 17,
      Score3: 10,
    },
    {
      studentId: "100010",
      studentName: "เจษฎา ศักดิ์ใหญ่",
      Score1: 25,
      Score2: 15,
      Score3: 28,
    },
    {
      studentId: "100101",
      studentName: "สมชาย ใจดี",
      Score1: 33,
      Score2: 12,
      Score3: 30,
    },
    {
      studentId: "100102",
      studentName: "สมศรี สวยงาม",
      Score1: 35,
      Score2: 15,
      Score3: 20,
    },
    {
      studentId: "100103",
      studentName: "อาทิตย์ แสงจันทร์",
      Score1: 27,
      Score2: 8,
      Score3: 22,
    },
    {
      studentId: "100104",
      studentName: "วันเพ็ญ นวลตา",
      Score1: 41,
      Score2: 5,
      Score3: 25,
    },
    {
      studentId: "100105",
      studentName: "นพดล เพชรนิล",
      Score1: 45,
      Score2: 13,
      Score3: 11,
    },
    {
      studentId: "100106",
      studentName: "วิภาวดี ทองคำ",
      Score1: 38,
      Score2: 18,
      Score3: 15,
    },
    {
      studentId: "100107",
      studentName: "ประยุทธ์ ขยันยิ่ง",
      Score1: 40,
      Score2: 11,
      Score3: 20,
    },
    {
      studentId: "100108",
      studentName: "พิมพ์ใจ จิตใจงาม",
      Score1: 42,
      Score2: 15,
      Score3: 25,
    },
    {
      studentId: "100109",
      studentName: "นฤมล ใจเย็น",
      Score1: 34,
      Score2: 17,
      Score3: 10,
    },
    {
      studentId: "100110",
      studentName: "เจษฎา ศักดิ์ใหญ่",
      Score1: 25,
      Score2: 15,
      Score3: 28,
    },
  ]);

  const handleInputChange = (
    index: number,
    field: keyof SubjectData,
    value: string
  ) => {
    const updatedStudents = [...studentDatas];
    updatedStudents[index][field] = (parseFloat(value) as number) || 0;
    setStudentData(updatedStudents);
  };
  return (
    <div className="w-full ">
      <div className="  bg-[#cfe4ff] grid grid-cols-[5%_10%_25%_10%_10%_10%_10%_10%_10%] border-2 border-blue-700">
        <span className="grid place-items-center text-xl py-2">No.</span>
        <span className="grid place-items-center text-xl  py-2">รหัสนักเรียน</span>
        <span className="grid place-items-center text-xl  py-2">ชื่อ - นามสกุล</span>
        <span className="text-center   pt-2 pb-1">
          <div className="text-xl">คะแนนเก็บ</div>
          <div className="text-md text-gray-600">50 คะแนน</div>
        </span>
        <span className="text-center  pt-2 pb-1">
          <div className="text-xl">คะแนนจิตพิสัย</div>
          <div className="text-md text-gray-600">20 คะแนน</div>
        </span>
        <span className="text-center  pt-2 pb-1">
          <div className="text-xl">คะแนนสอบ</div>
          <div className="text-md text-gray-600">30 คะแนน</div>
        </span>
        <span className="grid place-items-center text-xl  py-2">คะแนนรวม</span>
        <span className="grid place-items-center  text-xl py-2">เกรด</span>
        <span className="grid place-items-center text-xl  py-2">หมายเหตุ</span>
      </div>
      {studentDatas?.map((item, index) => (
        <div
          className=" text-lg border-b-2  grid group hover:bg-[#e8f3ff]   grid-cols-[5%_10%_25%_10%_10%_10%_10%_10%_10%]"
          key={item.studentId}
        >
          <span className="text-center font-semibold border-l-2 border-r-2 py-2">
            {index + 1}.
          </span>
          <span className="text-center border-r-2 py-2">{item.studentId}</span>
          <span className="text-start pl-5 border-r-2 py-2">
            {item.studentName}
          </span>
          <input
            type="number"
            value={item.Score1}
            min={0}
            max={50}
            className={` text-center focus:outline-blue-300 py-2 group-hover:bg-[#e8f3ff] ${
              item.Score1 > 50 || item.Score1 < 0
                ? "outline-red-500 border-red-500 rounded-md border-[3px]"
                : "border-gray-300 border-r-2"
            }`}
            onChange={(e) => handleInputChange(index, "Score1", e.target.value)}
          />
          <input
            type="number"
            value={item.Score2}
            min={0}
            max={20}
            className={`text-center focus:outline-blue-300  py-2 group-hover:bg-[#e8f3ff] ${
              item.Score2 > 20 || item.Score2 < 0
                ? "border-red-500 outline-red-500 rounded-md border-[3px]"
                : "border-gray-300 border-r-2"
            }`}
            onChange={(e) => handleInputChange(index, "Score2", e.target.value)}
          />
          <input
            type="number"
            value={item.Score3}
            min={0}
            max={30}
            className={`text-center focus:outline-blue-300  py-2 group-hover:bg-[#e8f3ff] ${
              item.Score3 > 30 || item.Score3 < 0
                ? "rounded-md outline-red-500 border-red-500  border-[3px]"
                : "border-gray-300 border-r-2"
            }`}
            onChange={(e) => handleInputChange(index, "Score3", e.target.value)}
          />
          <span className="text-center border-r-2 py-2">
            {item.Score1 + item.Score2 + item.Score3}
          </span>
          <span className="text-center bg-gray-100 group-hover:bg-[#cae2fa] font-semibold text-lg border-r-2 py-2">
            {50 <= item.Score1 + item.Score2 + item.Score3 &&
            item.Score1 + item.Score2 + item.Score3 < 55 ? (
              <div>1</div>
            ) : 55 <= item.Score1 + item.Score2 + item.Score3 &&
              item.Score1 + item.Score2 + item.Score3 < 60 ? (
              <div>1.5</div>
            ) : 60 <= item.Score1 + item.Score2 + item.Score3 &&
              item.Score1 + item.Score2 + item.Score3 < 65 ? (
              <div>2</div>
            ) : 65 <= item.Score1 + item.Score2 + item.Score3 &&
              item.Score1 + item.Score2 + item.Score3 < 70 ? (
              <div>2.5</div>
            ) : 70 <= item.Score1 + item.Score2 + item.Score3 &&
              item.Score1 + item.Score2 + item.Score3 < 75 ? (
              <div>3</div>
            ) : 75 <= item.Score1 + item.Score2 + item.Score3 &&
              item.Score1 + item.Score2 + item.Score3 < 80 ? (
              <div>3.5</div>
            ) : item.Score1 + item.Score2 + item.Score3 >= 80 ? (
              <div>4</div>
            ) : (
              <div>0</div>
            )}
          </span>
          <input type="text" placeholder={'-'} className="text-center border-r-2 py-2 group-hover:bg-[#e8f3ff]"/>
        </div>
      ))}
    </div>
  );
}

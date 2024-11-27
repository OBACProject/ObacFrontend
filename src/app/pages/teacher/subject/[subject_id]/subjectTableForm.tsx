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
      Score1: 10,
      Score2: 20,
      Score3: 30,
    },
    {
      studentId: "100002",
      studentName: "สมศรี สวยงาม",
      Score1: 15,
      Score2: 25,
      Score3: 35,
    },
    {
      studentId: "100003",
      studentName: "อาทิตย์ แสงจันทร์",
      Score1: 20,
      Score2: 15,
      Score3: 40,
    },
    {
      studentId: "100004",
      studentName: "วันเพ็ญ นวลตา",
      Score1: 30,
      Score2: 10,
      Score3: 25,
    },
    {
      studentId: "100005",
      studentName: "นพดล เพชรนิล",
      Score1: 25,
      Score2: 30,
      Score3: 20,
    },
    {
      studentId: "100006",
      studentName: "วิภาวดี ทองคำ",
      Score1: 35,
      Score2: 20,
      Score3: 15,
    },
    {
      studentId: "100007",
      studentName: "ประยุทธ์ ขยันยิ่ง",
      Score1: 40,
      Score2: 10,
      Score3: 20,
    },
    {
      studentId: "100008",
      studentName: "พิมพ์ใจ จิตใจงาม",
      Score1: 15,
      Score2: 35,
      Score3: 25,
    },
    {
      studentId: "100009",
      studentName: "นฤมล ใจเย็น",
      Score1: 20,
      Score2: 30,
      Score3: 10,
    },
    {
      studentId: "100010",
      studentName: "เจษฎา ศักดิ์ใหญ่",
      Score1: 25,
      Score2: 15,
      Score3: 35,
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
    <div className="w-full border-b-2">
      <div className="text-lg font-semibold bg-[#cfe4ff] grid grid-cols-[5%_10%_25%_10%_10%_10%_10%_10%_10%] border-2 border-gray-400">
        <span className="text-center py-2">No.</span>
        <span className="text-center  py-2">รหัสนักเรียน</span>
        <span className="text-center  py-2">ชื่อ - นามสกุล</span>
        <span className="text-center  py-2">คะแนนเก็บ</span>
        <span className="text-center  py-2">คะแนนจิตพิสัย</span>
        <span className="text-center  py-2">คะแนนสอบ</span>
        <span className="text-center  py-2">คะแนนรวม</span>
        <span className="text-center  py-2">เกรด</span>
        <span className="text-center  py-2">หมายเหตุ</span>
      </div>
      {studentDatas?.map((item, index) => (
        <div
          className="text-lg  grid group hover:bg-[#e8f3ff]  grid-cols-[5%_10%_25%_10%_10%_10%_10%_10%_10%]"
          key={item.studentId}
        >
          <span className="text-center font-semibold border-l-2 border-r-2 py-2">{index + 1}.</span>
          <span className="text-center border-r-2 py-2">{item.studentId}</span>
          <span className="text-start pl-5 border-r-2 py-2">
            {item.studentName}
          </span>
          <input
            type="number"
            value={item.Score1}
            className="text-center  border-r-2 py-2 group-hover:bg-[#e8f3ff]"
            onChange={(e) => handleInputChange(index, "Score1", e.target.value)}
          />
          <input
            type="number"
            value={item.Score2}
            className="text-center border-r-2 py-2 group-hover:bg-[#e8f3ff]"
            onChange={(e) => handleInputChange(index, "Score2", e.target.value)}
          />
          <input
            type="number"
            value={item.Score3}
            className="text-center border-r-2 py-2 group-hover:bg-[#e8f3ff]"
            onChange={(e) => handleInputChange(index, "Score3", e.target.value)}
          />
          <span className="text-center border-r-2 py-2">
            {item.Score1 + item.Score2 + item.Score3}
          </span>
          <span className="text-center border-r-2 py-2">
            { 50<= (item.Score1 + item.Score2 + item.Score3) && (item.Score1 + item.Score2 + item.Score3) < 55 ?(
                <div>1</div>
            ): 55 <= (item.Score1 + item.Score2 + item.Score3) &&(item.Score1 + item.Score2 + item.Score3) < 60  ?(
                <div>1.5</div>
            ): 60 <= (item.Score1 + item.Score2 + item.Score3) &&(item.Score1 + item.Score2 + item.Score3) < 65  ?(
                <div>2</div>
            ): 65 <= (item.Score1 + item.Score2 + item.Score3) &&(item.Score1 + item.Score2 + item.Score3) < 70  ? (
                <div>2.5</div>
            ): 70 <= (item.Score1 + item.Score2 + item.Score3) &&(item.Score1 + item.Score2 + item.Score3) < 75  ?(
                <div>3</div>
            ): 75 <= (item.Score1 + item.Score2 + item.Score3) &&(item.Score1 + item.Score2 + item.Score3) < 80  ?(
                <div>3.5</div>
            ): (item.Score1 + item.Score2 + item.Score3) >= 80  ?(
                <div>4</div>
            ):(
                <div>0</div>
            )}
          </span>
          <span className="text-center border-r-2 py-2">
            -
          </span>
          
        </div>
      ))}
    </div>
  );
}

"use client";

import DynamicTable from "@/components/common/table/DynamicTable";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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

export default function Form() {
  const router = useRouter();
  const [studentData] = useState<StudentNameList[]>(studentNameList);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StudentNameList[]>([]);

  const handleSearch = () => {
    if (query != "") {
      const trimmed = query.trim().toLowerCase();
      const filtered = studentData.filter(
        (s) =>
          s.studentCode.includes(trimmed) ||
          s.studentFirstName.toLowerCase().includes(trimmed) ||
          s.studentLastName.toLowerCase().includes(trimmed)
      );
      setResults(filtered);
    }
  };

  return (
    <div className="w-full">
      <div className="my-5 border shadow-sm border-gray-200 w-full px-5 py-5 rounded-lg">
        <div className="flex gap-5 -translate-x-20 items-center justify-center">
          <i className="text-gray-600">
            กรอกรหัส / ชื่อนักเรียนเพื่อทำการค้นหา
          </i>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="border-gray-200 rounded-sm border px-4 py-1"
            placeholder="Search..."
          />
          <button
            className="bg-blue-500 py-1 text-white px-10 rounded-sm"
            onClick={handleSearch}
          >
            ค้นหา
          </button>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="py-4">
          <DynamicTable
            data={results}
            columns={[
              { header: "รหัสนักเรียน", field: "studentCode", width: "30%" },
              {
                header: "ชื่อจริง",
                field: "studentFirstName",
                width: "20%",
                align: "left",
                padding: "pl-10",
              },
              {
                header: "นามสกุล",
                field: "studentLastName",
                width: "20%",
                align: "left",
                padding: "pl-10",
              },
              { header: "ห้อง", field: "className", width: "30%" },
            ]}
            onRowClick={(row) => {
              router.push("/teacher/import-score/" + row.studentCode);
            }}
          />
          <div className="py-20"></div>
        </div>
      ) : (
        <div className="py-10 grid place-items-center">
          <div className="text-center border-[2px] rounded-md py-10 w-fit px-20">
            <div className="text-lg mb-3">
              ใส่ผลลัพธ์เพื่อค้นหารายชื่อนักเรียนที่ต้องการแก้ไขคะแนน
            </div>
            <div className="text-red-500">
              โปรดตรวจสอบทุกครั้งให้แน่ใจก่อนและหลังแก้ไขข้อมูล
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { fetchGetGradPerTermByStudentId } from "@/api/grad/gradAPI";
import GenTranscript from "@/app/components/PDF/genTranscript";
import GradPerTerms from "@/app/components/PDF/GradPerTerm";
import { GetGradPerTermByStudentIdDto } from "@/dto/gradDto";
import { CircleX, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";

const fetchStudentGrad = async (
  studentId: number,
  term: number,
  year: number
) => {
  try {
    const data = await fetchGetGradPerTermByStudentId(studentId, term, year);
    return data;
  } catch (err) {
    console.error("Failed to fetch data.");
    return [];
  }
};

export default function Form() {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [grads, setGrad] = useState<GetGradPerTermByStudentIdDto[]>([
    {
      studentId: 1,
      studentCode: "S001002",
      firstName: "Somchai",
      lastName: "Sukjai",
      facultyName: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ",
      programName: "ธุรกิจการจัดการ",
      class: "ปวช.1/6",
      groupName: "กลุ่ม A",
      isActive: true,
      term: 1,
      year: 2567,
      gpa: 3.50,
      gpax: 3.60,
      totalCredit: 12,
      subject: [
        {
          subjectName: "คณิตศาสตร์พื้นฐาน",
          subjectCode: "MATH101",
          grade: "A",
          credit: 3,
        },
        {
          subjectName: "พื้นฐานวิทยาการคอมพิวเตอร์",
          subjectCode: "CS101",
          grade: "B+",
          credit: 3,
        },
        {
          subjectName: "ภาษาอังกฤษ",
          subjectCode: "ENG101",
          grade: "B",
          credit: 3,
        },
        {
          subjectName: "การจัดการธุรกิจ",
          subjectCode: "BUS101",
          grade: "A",
          credit: 3,
        },
      ],
    },
    {
      studentId: 1,
      studentCode: "S001003",
      firstName: "jjjjj",
      lastName: "Sukjai",
      facultyName: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ",
      programName: "ธุรกิจการจัดการ",
      class: "ปวช.1/6",
      groupName: "กลุ่ม A",
      isActive: true,
      term: 1,
      year: 2567,
      gpa: 3.50,
      gpax: 3.60,
      totalCredit: 12,
      subject: [
        {
          subjectName: "คณิตศาสตร์พื้นฐาน",
          subjectCode: "MATH101",
          grade: "A",
          credit: 3,
        },
        {
          subjectName: "พื้นฐานวิทยาการคอมพิวเตอร์",
          subjectCode: "CS101",
          grade: "B+",
          credit: 3,
        },
        {
          subjectName: "ภาษาอังกฤษ",
          subjectCode: "ENG101",
          grade: "B",
          credit: 3,
        },
        {
          subjectName: "การจัดการธุรกิจ",
          subjectCode: "BUS101",
          grade: "A",
          credit: 3,
        },
      ],
    },
    {
      studentId: 1,
      studentCode: "S001004",
      firstName: "Somffffchai",
      lastName: "Sufffkjai",
      facultyName: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ",
      programName: "ธุรกิจการจัดการ",
      class: "ปวช.1/6",
      groupName: "กลุ่ม A",
      isActive: true,
      term: 1,
      year: 2567,
      gpa: 3.50,
      gpax: 3.60,
      totalCredit: 12,
      subject: [
        {
          subjectName: "คณิตศาสตร์พื้นฐาน",
          subjectCode: "MATH101",
          grade: "A",
          credit: 3,
        },
        {
          subjectName: "พื้นฐานวิทยาการคอมพิวเตอร์",
          subjectCode: "CS101",
          grade: "B+",
          credit: 3,
        },
        {
          subjectName: "ภาษาอังกฤษ",
          subjectCode: "ENG101",
          grade: "B",
          credit: 3,
        },
        {
          subjectName: "การจัดการธุรกิจ",
          subjectCode: "BUS101",
          grade: "A",
          credit: 3,
        },
      ],
    },
    {
      studentId: 2,
      studentCode: "S001005",
      firstName: "fgfsegf",
      lastName: "Sukjai",
      facultyName: "วิทยาลัยอาชีวศึกษาเอกวิทย์บริหารธุรกิจ",
      programName: "ธุรกิจการจัดการ",
      class: "ปวช.1/6",
      groupName: "กลุ่ม A",
      isActive: true,
      term: 1,
      year: 2567,
      gpa: 3.50,
      gpax: 3.60,
      totalCredit: 12,
      subject: [
        {
          subjectName: "คณิตศาสตร์พื้นฐาน",
          subjectCode: "MATH101",
          grade: "A",
          credit: 3,
        },
        {
          subjectName: "พื้นฐานวิทยาการคอมพิวเตอร์",
          subjectCode: "CS101",
          grade: "B+",
          credit: 3,
        },
        {
          subjectName: "ภาษาอังกฤษ",
          subjectCode: "ENG101",
          grade: "B",
          credit: 3,
        },
        {
          subjectName: "การจัดการธุรกิจ",
          subjectCode: "BUS101",
          grade: "A",
          credit: 3,
        },
      ],
    },
  ]);
  useEffect(() => {
    // fetchStudentGrad(1, 1, 2024).then((d) => {
    //   if (d) {
    //     setGrad(d);
    //   }
    // });
  }, []);
  console.log("Grads:", grads.length);

  const handleEditChange = () => {
    setOnEdit((onEdit) => !onEdit);
  };
  return (
    <div className="px-40">
      <div className="flex justify-between my-5">
        <div className="border-[1px] rounded-md text-white bg-gray-700  border-slate-300 text-lg w-fit px-5 py-2 ">
          รายละเอียดนักเรียน
        </div>
        <div className="flex gap-4">
          {grads.length >= 1 ? (
            <button
              className="text-md bg-[#e4f1f8] text-gray-700 hover:bg-gray-200 rounded-md px-5 py-2 h-fit"
              onClick={() => {
                for (let i = 0 ; i <= 3 ; i++ ){
                  GradPerTerms(grads[i]);
                }
              }}
            >
              ดาวโหลดน์ผลการเรียนล่าสุด
            </button>
          ) : (
            <div className="text-md bg-[#e4f1f8] text-gray-700 rounded-md px-5 py-2 h-fit">
              รอทราบผลเกรด
            </div>
          )}

          <button
            className="text-md bg-[#e4f1f8] text-gray-700 hover:bg-gray-200 rounded-md px-5 py-2 shadow-sm shadow-slate-300 h-fit"
            onClick={() => GenTranscript({ score: 10 })}
          >
            ดาวน์โหลดทรานสคริป
          </button>
        </div>
      </div>

      <div className="w-full flex justify-end my-2">
        {onEdit ? (
          <button
            className="w-[120px] bg-red-500 rounded-md text-center hover:opacity-75 pl-2 gap-2 flex justify-center py-1 text-white "
            onClick={handleEditChange}
          >
            ยกเลิก
            <CircleX
              style={{ width: "1.0rem", height: "1.5rem" }}
              className="text-white pt-0.5"
            />
          </button>
        ) : (
          <button
            className="w-[120px] bg-blue-400 rounded-md text-center hover:opacity-75 pl-2 gap-2 flex justify-center py-1 text-white "
            onClick={handleEditChange}
          >
            แก้ไข
            <Pencil
              style={{ width: "1.0rem", height: "1.5rem" }}
              className="text-white"
            />
          </button>
        )}
      </div>

      <div className=" flex justify-between gap-2 rounded-md bg-slate-200 px-10 py-5">
        <div className="">
          <div className="flex">
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0  bg-white py-1 pl-4 pr-1">
              ชื่อ :{" "}
            </div>
            <input
              type="text"
              disabled={!onEdit}
              className=" text-md enabled:text-gray-600 border-2 focus:outline-blue-300 border-gray-300 text-gray-700 bg-white enabled:bg-blue-50 border-l-0 w-[200px] mr-5 px-4 py-1  rounded-r-md"
              placeholder="ชื่อ"
              defaultValue={"นาย ภัทรจาริน"}
            />

            <div className="rounded-l-md text-gray-700 border-2 border-gray-300 border-r-0 bg-white py-1 pl-4 pr-1">
              นามสกุล :{" "}
            </div>
            <input
              disabled={!onEdit}
              type="text"
              className="text-md focus:outline-blue-300 border-2 mr-5 text-gray-700 border-gray-300 enabled:text-gray-600 bg-white enabled:bg-blue-50 border-l-0 w-[200px]  px-4 py-1  rounded-r-md"
              placeholder="นามสกุล"
              defaultValue={"นภากาญจน์"}
            />
          </div>
          <div className="mt-5 flex">
            <div className="rounded-l-md border-2 text-gray-700 border-gray-300 border-r-0 bg-white  py-1 pl-4 pr-1">
              ระดับการศึกษา{" "}
            </div>
            <input
              disabled={!onEdit}
              type="text"
              className="text-md enabled:text-gray-600  focus:outline-blue-300 border-2 text-gray-700 border-gray-300 bg-white enabled:bg-blue-50 mr-4 border-l-0 w-[100px]  px-4 py-1  rounded-r-md"
              placeholder="ชื่อจริง"
              defaultValue={"ปวช.2"}
            />
            <div className="rounded-l-md  text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              หลักสูตร :{" "}
            </div>
            <input
              disabled={!onEdit}
              type="text"
              className=" text-md border-2 enabled:text-gray-600 border-gray-300 text-gray-700 border-l-0 w-[150px] mr-5 px-4 py-1 bg-white enabled:bg-blue-50 focus:outline-blue-300  rounded-r-md"
              placeholder="หลักสูตร"
              defaultValue={"พาณิชยกรรม"}
            />
            <div className="rounded-l-md   text-gray-700 border-2 border-gray-300 border-r-0 w-fit bg-white py-1 pl-4 pr-1">
              สาขา :{" "}
            </div>
            <input
              disabled={!onEdit}
              type="text"
              className=" text-md enabled:text-gray-600 bg-white enabled:bg-blue-50 border-2 border-gray-300 text-gray-700 border-l-0 w-[100px] mr-5 px-4 py-1 focus:outline-blue-300 rounded-r-md"
              placeholder="สาขา"
              defaultValue={"การบัญชี"}
            />
          </div>
        </div>
        <div className="">
          <img
            width={100}
            className="rounded-md shadow-md shadow-gray-400"
            src="/asset/user.jpg"
          />
        </div>
      </div>
      <div className="mt-10 ">
        <div className="border-2 rounded-lg border-dashed grid place-items-center border-gray-500 py-10 ">
          ข้อมูลส่วนอื่นๆ
        </div>
      </div>
      <div className="my-3">
        <div className="border-2 rounded-lg border-dashed grid place-items-center border-gray-500 py-10 ">
          ข้อมูลส่วนอื่นๆ
        </div>
      </div>
      <div className="my-3">
        <div className="border-2 rounded-lg border-dashed grid place-items-center border-gray-500 py-10 ">
          ข้อมูลส่วนอื่นๆ
        </div>
      </div>
      <div className="my-3">
        <div className="border-2 rounded-lg border-dashed grid place-items-center border-gray-500 py-10 ">
          ข้อมูลส่วนอื่นๆ
        </div>
      </div>
      <div className="my-3">
        <div className="border-2 rounded-lg border-dashed grid place-items-center border-gray-500 py-10 ">
          ข้อมูลส่วนอื่นๆ
        </div>
      </div>
      <div className="my-3">
        <div className="border-2 rounded-lg border-dashed grid place-items-center border-gray-500 py-10 ">
          ข้อมูลส่วนอื่นๆ
        </div>
      </div>
      <div className="my-3">
        <div className="border-2 rounded-lg border-dashed grid place-items-center border-gray-500 py-10 ">
          ข้อมูลส่วนอื่นๆ
        </div>
      </div>
      <div className="my-3">
        <div className="border-2 rounded-lg border-dashed grid place-items-center border-gray-500 py-10 ">
          ข้อมูลส่วนอื่นๆ
        </div>
      </div>
      <div className="my-3">
        <div className="border-2 rounded-lg border-dashed grid place-items-center border-gray-500 py-10 ">
          ข้อมูลส่วนอื่นๆ
        </div>
      </div>
    </div>
  );
}

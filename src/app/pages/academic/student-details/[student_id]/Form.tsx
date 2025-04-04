"use client";
import {
  fetchGetStudentGradeByTermYear,
  fetchGetStudentGradeDetail,
} from "@/api/grad/gradAPI";
import { fetchGetStudentByStudentId } from "@/api/student/studentApi";
import GradPerTerms from "@/app/components/PDF/GradPerTerm";
import SummaryGradPDF from "@/app/components/PDF/SummaryGrade";
import ChangeStudentGroup from "@/app/components/popup/changeStudentGroup";
import ConfirmChangeStudentsStatus from "@/app/components/popup/confirmChangeStudentsStatus";
import { GetStudentByStudentId } from "@/dto/studentDto";
import { educationOptions } from "@/resource/academics/options/studentOption";
import { CircleX, Download, Pencil, Save, UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  studentId: number;
};

const fetchStudentGrad = async (
  studentId: number,
  term: string,
  year: number
) => {
  try {
    const data = await fetchGetStudentGradeByTermYear(studentId, term, year);
    return data;
  } catch (err) {
    console.error("Failed to fetch data.");
    return null;
  }
};

const fetchStudentData = async (studentId: number) => {
  try {
    const data = await fetchGetStudentByStudentId(studentId);
    return data;
  } catch (err) {
    return null;
  }
};

export default function Form({ studentId }: Props) {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [students, setStudent] = useState<GetStudentByStudentId>();
  const [educateStatus, setEducateStatus] = useState(
    students?.studentStatus || ""
  );

  const [term, setTerm] = useState<string>("2");
  const [year, setYear] = useState<number>(2567);
  const [submitStudentStatus, setSubmitStudentStatus] =
    useState<boolean>(false);
  const [changeGroupPopUp, setChangeGroupPopUp] = useState<boolean>(false);
  useEffect(() => {
    fetchStudentData(studentId).then((d: any) => {
      setStudent(d);
    });
  }, []);

  const handleEditChange = () => {
    setOnEdit((onEdit) => !onEdit);
  };
  useEffect(() => {
    if (students?.studentStatus) {
      setEducateStatus(students.studentStatus);
    }
  }, [students]);

  return (
    <div className="px-10">
      <div className="flex justify-between my-5">
        <div className="rounded-3xl t flex gap-2 items-center  border border-gray-100 shadow-md  py-2 text-blue-700 text-xl w-fit px-5  ">
          <UserRound className="w-8 h-8" />
          รายละเอียดนักเรียน
        </div>
        <div className="flex gap-1">
          <button
            className="text-sm items-center flex justify-center gap-2  bg-[#e4f1f8] text-gray-700 hover:bg-gray-200 shadow-slate-300 shadow-sm rounded-full px-5 py-1 h-fit "
            onClick={async () => {
              const data = await fetchStudentGrad(studentId, term, year);
              if (data) {
                GradPerTerms(data);
              }
            }}
          >
            <Download className="w-4 h-4" />
            ผลการเรียนล่าสุด PDF
          </button>

          <button
            className="text-sm items-center flex justify-center gap-2 bg-[#e4f1f8] text-gray-700 hover:bg-gray-200 rounded-full px-5 py-1 shadow-sm shadow-slate-300 h-fit"
            onClick={async () => {
              const data2 = await fetchGetStudentGradeDetail(studentId);
              if (data2) {
                SummaryGradPDF(data2);
              }
            }}
          >
            <Download className="w-4 h-4" />
            ผลการเรียนรวม PDF
          </button>
          <button className="text-sm items-center flex justify-center gap-2  bg-[#e4f1f8] text-gray-700 hover:bg-gray-200 rounded-full px-5 py-1 shadow-sm shadow-slate-300 h-fit cursor-not-allowed">
            <Download className="w-4 h-4" />
            ประวัติส่วนตัว PDF
          </button>
        </div>
      </div>

      <div className="w-full flex justify-end my-2">
        {onEdit ? (
          <div className="flex gap-2">
            <button
              className="w-[120px] h-fit bg-green-500 rounded-md items-center hover:opacity-75 pl-2 gap-2 flex justify-center py-1 text-white "
              // onClick={handleEditChange}
            >
              {" "}
              <Save className="w-5 h-5" />
              บันทึก
            </button>{" "}
            <button
              className="w-[120px] h-fit bg-red-500 rounded-md hover:opacity-75 pl-2 gap-2 flex justify-center items-center py-1 text-white "
              onClick={handleEditChange}
            >
              <CircleX className="w-5 h-5" />
              ยกเลิก
            </button>{" "}
          </div>
        ) : (
          <button
            className="w-[120px] h-fit bg-blue-400 rounded-md items-centerhover:opacity-75 pl-2 gap-2 flex justify-center py-1 items-center text-white "
            onClick={handleEditChange}
          >
            {" "}
            <Pencil className="w-5 h-5" />
            แก้ไข
          </button>
        )}
      </div>
      <div className="w-full flex justify-start gap-5 items-center">
        <div className="gap-8 flex justify-start items-center  w-fit">
          <div className="w-fit items-center flex gap-3">
            <div className="w-[100px]">สถานะนักเรียน</div>
            <select
              className="border border-gray-300 rounded-sm px-4 py-1"
              onChange={(e) => setEducateStatus(e.target.value)}
              value={educateStatus}
            >
              <option value={educateStatus}>{educateStatus}</option>
              {educationOptions
                .filter((option) => option !== educateStatus)
                .map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
            <button
              className="px-5 text-white enabled:bg-slate-500 enabled:hover:bg-slate-600  bg-gray-300 rounded-md py-1 "
              disabled={!educateStatus}
              onClick={() => {
                setSubmitStudentStatus(!submitStudentStatus);
              }}
            >
              ปรับสถานะ
            </button>
          </div>
        </div>
        <button
          className="w-fit py-1 px-4 rounded-md bg-slate-500 text-white hover:bg-slate-600 "
          onClick={() => setChangeGroupPopUp(!changeGroupPopUp)}
        >
          ย้ายห้องเรียน
        </button>
      </div>
      <div className="pt-4 w-full">
        <div className="relative rounded-md border-t shadow-gray-300 w-fit shadow-md  bg-white ">
          <div className="grid gap-4 px-10 py-10">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <p className="w-[100px]">รหัสนักเรียน</p>
                <input
                  type="text"
                  className="px-4 w-[150px] focus:outline-blue-400 py-1.5 rounded-sm border border-gray-300"
                  defaultValue={students?.studentCode}
                />
              </div>
              <div className="flex items-center gap-2">
                <p className="">ชั้นปี</p>
                <div className="px-4 border-gray-300 border bg-white py-1.5 rounded-sm">
                  {students?.class}.{students?.currentRoom}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="w-[100px]">ชื่อ - นามสกุล</p>
              <input
                type="text"
                className="px-4 w-[150px] focus:outline-blue-400 py-1.5 rounded-sm border border-gray-300"
                defaultValue={students?.thaiName}
              />
              <input
                type="text"
                className="px-4 focus:outline-blue-400 w-[150px]  py-1.5 rounded-sm border border-gray-300"
                defaultValue={students?.thaiLastName}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 ">
        <div className="grid w-full border px-4 py-4"></div>
      </div>
      {submitStudentStatus && students?.studentId && (
        <ConfirmChangeStudentsStatus
          onClickPopUp={(value) => setSubmitStudentStatus(value)}
          status={educateStatus}
          studentId={students.studentId}
        />
      )}
      {changeGroupPopUp && students?.studentId && (
        <ChangeStudentGroup
          onClickPopUp={(value) => setChangeGroupPopUp(value)}
          studentId={students?.studentId}
        />
      )}
    </div>
  );
}

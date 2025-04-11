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
import {
  ArrowRightLeft,
  CircleX,
  Dock,
  Download,
  FileChartColumn,
  Pencil,
  Save,
  Settings2,
  UserRoundPen,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  studentId: number;
};

type StudentFormData = {
  studentId: number;
  firstName: string;
  lastName: string;
  thaiName: string;
  thaiLastName: string;
  gender: string;
  studentGroupId: number;
  studentCode: string;
  thaiId: string;
  email: string;
  phoneNumber: string;
  address: string;
  nationality: string;
  religion: string;
  class: string;
  enrollYear: number;
  currentYear: number;
  graduateYear: number;
  programId: number;
  facultyId: number;
  birthDate: string;
  isActive: boolean;
  isAgree: boolean;
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

  const [formData, setFormData] = useState<StudentFormData>({
    studentId: 0,
    firstName: "",
    lastName: "",
    thaiName: "",
    thaiLastName: "",
    gender: "",
    studentGroupId: 0,
    studentCode: "",
    thaiId: "",
    email: "",
    phoneNumber: "",
    address: "",
    nationality: "",
    religion: "",
    class: "",
    enrollYear: 0,
    currentYear: 0,
    graduateYear: 0,
    programId: 0,
    facultyId: 0,
    birthDate: "",
    isActive: true,
    isAgree: true,
  });

  const handleEditChange = () => {
    setOnEdit((onEdit) => !onEdit);
  };
  useEffect(() => {
    if (students?.studentStatus) {
      setEducateStatus(students.studentStatus);
    }
    if (students) {
      setFormData({
        studentId: students.studentId || 0,
        firstName: students.firstName || "ไม่ทราบ",
        lastName: students.lastName || "ไม่ทราบ",
        thaiName: students.thaiName || "ไม่ทราบ",
        thaiLastName: students.thaiLastName || "ไม่ทราบ",
        gender: students.gender || "ไม่ทราบ",
        studentGroupId: students.studentGroupId || 0,
        studentCode: students.studentCode || "ยังไม่มี",
        thaiId: students.thaiId || "ยังไม่มี",
        email: students.email || "ยังไม่มี",
        phoneNumber: students.phoneNumber || "ยังไม่มี",
        address: students.address || "ยังไม่มี",
        nationality: students.nationality || "ยังไม่มี",
        religion: students.religion || "ยังไม่มี",
        class: students.class || "ยังไม่มี",
        enrollYear: students.enrollYear || 0,
        currentYear: students.currentYear || 0,
        graduateYear: students.graduateYear || 0,
        programId: students.programId || 0,
        facultyId: students.facultyId || 0,
        birthDate: students.birthDate || "",
        isActive: students.isActive ?? true,
        isAgree: false,
      });
    }
  }, [students]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="px-10">
      <div className="flex justify-between my-5">
        <div className="rounded-3xl t flex gap-2 items-center  border border-gray-100 shadow-md  py-2 text-blue-700 text-xl w-fit px-5  font-prompt_Light">
          <UserRoundPen className="w-8 h-8" />
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

      <div className="w-full flex justify-between py-2 items-center ">
        <div className="flex gap-5 items-center justify-start">
          <div className="gap-8 flex justify-start items-center  w-fit">
            <div className="w-fit items-center flex gap-2">
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
                className="px-5 ml-1 text-white enabled:bg-blue-500 enabled:hover:bg-blue-600  bg-gray-300 rounded-md py-1 flex gap-2 items-center"
                disabled={!educateStatus}
                onClick={() => {
                  setSubmitStudentStatus(!submitStudentStatus);
                }}
              >
                <Settings2 className="h-5 w-5" />
                ปรับสถานะ
              </button>
            </div>
          </div>
          <button
            className="w-fit flex gap-2 items-center py-1 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 "
            onClick={() => setChangeGroupPopUp(!changeGroupPopUp)}
          >
            <ArrowRightLeft className="h-5 w-5" />
            ย้ายห้องเรียน
          </button>
          <Link
            href={`/pages/academic/score/management/individual/${students?.studentId}`}
            className="flex gap-2 items-center px-5 py-1 rounded-full bg-slate-200 hover:bg-slate-300"
          >
            <FileChartColumn className="h-5 w-5" />
            ดูคะแนน
          </Link>
        </div>
        <div className="flex items-center ">
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
              </button>
            </div>
          ) : (
            <button
              className="w-[120px] h-fit bg-blue-400 hover:bg-blue-600 rounded-md items-centerhover:opacity-75 pl-2 gap-2 flex justify-center py-1 items-center text-white "
              onClick={handleEditChange}
            >
              <Pencil className="w-5 h-5" />
              แก้ไข
            </button>
          )}
        </div>
      </div>
      <div className="pt-4 w-full flex gap-5">
        <div className="relative rounded-md border-t shadow-gray-300 w-fit shadow-md  bg-white ">
          <div className="grid gap-4 px-10 py-5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <p className="w-[100px]">รหัสนักเรียน</p>
                <input
                  name="studentCode"
                  type="text"
                  className="px-4 w-[150px] focus:outline-blue-400 py-1.5 rounded-sm border border-gray-300 text-gray-500 focus:text-black enabled:border-blue-400"
                  value={formData.studentCode}
                  onChange={handleChange}
                  disabled={!onEdit}
                />
              </div>
              <p className="w-[100px]">ชื่อ - นามสกุล</p>
              {students?.gender == "Male" ? (
                <label>นาย</label>
              ) : (
                <label>นางสาว</label>
              )}

              <input
                name="thaiName"
                type="text"
                className="px-4 w-[150px] focus:outline-blue-400 py-1.5 rounded-sm border border-gray-300 text-gray-500 focus:text-black enabled:border-blue-400"
                value={formData.thaiName}
                onChange={handleChange}
                disabled={!onEdit}
              />
              <input
                name="thaiLastName"
                type="text"
                className="px-4 focus:outline-blue-400 w-[150px]  py-1.5 rounded-sm border border-gray-300 text-gray-500 focus:text-black enabled:border-blue-400"
                value={formData.thaiLastName}
                onChange={handleChange}
                disabled={!onEdit}
              />
            </div>
            <div className="flex items-center gap-4">
              {" "}
              <div className="flex items-center gap-2">
                <p className="">ชั้นปี</p>
                <div className="px-4 border-gray-300 border bg-white py-1.5 rounded-sm">
                  {students?.class}.{students?.currentRoom}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="">หลักสูตร</p>
                <input
                  name="facultyName"
                  type="text"
                  className="px-4 w-fit text-gray-500 enabled:border-blue-400 focus:text-black focus:outline-blue-400 py-1.5 rounded-sm border border-gray-300"
                  value={students?.facultyName}
                  onChange={handleChange}
                  disabled={!onEdit}
                />
              </div>
              <div className="flex items-center gap-2">
                <p className="">สาขา</p>
                <input
                  type="text"
                  name="programName"
                  className="px-4 w-fit text-gray-500 focus:text-black focus:outline-blue-400 py-1.5 rounded-sm border border-gray-300 enabled:border-blue-400"
                  value={students?.programName}
                  onChange={handleChange}
                  disabled={!onEdit}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-md relative overflow-hidden hover:scale-[102%] duration-500">
          <img src="/asset/student-image.jpg" className="w-36 h-36" />
        </div>
      </div>

      <div className="pt-8 w-full">
        <div className="rounded-3xl t flex gap-2 items-center  border border-gray-100 shadow-md  py-2 text-blue-700 text-xl w-fit px-5 font-prompt_Light ">
          <Dock className="w-8 h-8" />
          ประวัติส่วนตัวนักเรียน
        </div>
      </div>
      <div className="py-5 ">
        <div className="grid w-full rounded-md border px-4 py-4">
          <div className="flex gap-5 items-center">
            <div className="flex gap-2 items-center">
              <p>เบอร์ติดต่อ</p>
              <input
                name="phoneNumber"
                type="text"
                className="px-4 w-[150px] text-gray-500 focus:text-black focus:outline-blue-400 py-1.5 rounded-sm border border-gray-300 enabled:border-blue-400"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={!onEdit}
              />
            </div>
            <div className="flex gap-2 items-center">
              <p>อีเมลล์</p>
              <input
                name="email"
                type="text"
                className="px-4 w-[150px] text-gray-500 focus:text-black focus:outline-blue-400 py-1.5 rounded-sm border border-gray-300 enabled:border-blue-400"
                value={formData.email}
                onChange={handleChange}
                disabled={!onEdit}
              />
            </div>
          </div>
        </div>
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

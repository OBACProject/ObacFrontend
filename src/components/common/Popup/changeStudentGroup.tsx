"use client";

import {
  GetAllStudentGroupByTermYear,
  UpdateStudentGroupByStudentGroupId,
} from "@/api/studentGroup/route";
import {
  StudentGroupItem,
  UpdateStudentGroupBody,
} from "@/dto/studentGroupItem";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

interface Props {
  onClickPopUp: (value: boolean) => void;
  studentId: number;
}

export default function ChangeStudentGroup({ onClickPopUp, studentId }: Props) {
  const currentYear = new Date().getFullYear() + 543;

  const [term, setTerm] = useState<string>("1");
  const [year, setYear] = useState<number>(currentYear);
  const [studentGroupCode, setStudentGroupCode] = useState<string>("");
  const [onSubmitCheck, setOnSubmitCheck] = useState<boolean>(false);
  const [studentGroup, setStudentGroup] = useState<StudentGroupItem[]>([]);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (term && year) {
      GetAllStudentGroupByTermYear(term, year)
        .then((data: StudentGroupItem[] | undefined) => {
          if (data) {
            setStudentGroup(data);
          } else {
            setStudentGroup([]);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch student groups:", err);
          setStudentGroup([]);
        });
    }
  }, [term, year]);
  const groupOptions = studentGroup.map((item) => ({
    value: item.groupCode,
    label: `${item.class}.${item.groupName}`,
  }));

  const onChangeStudentGroup = async () => {
    if (onSubmitCheck) return;
    setOnSubmitCheck(true);
    try {
      const body: UpdateStudentGroupBody = {
        studentId: [studentId],
        studentGroup: {
          groupName: "",
          class: "",
          groupCode: studentGroupCode,
          level: 0,
          programId: 0,
          isPublish: false,
          isComplete: false,
          isActive: true,
          year: year,
          term: term,
        },
        action: "move",
      };
      const ok = await UpdateStudentGroupByStudentGroupId(body);
      if (ok) {
        toast.success?.("ย้ายห้องสำเร็จ");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error?.("อัปเดตไม่สำเร็จ");
      }
      onClickPopUp(false);
    } catch (err) {
      console.error("onPromoteStudentGroup error:", err);
      toast.error?.("เกิดข้อผิดพลาดในการเลื่อนชั้น");
    }
  };
  return (
    <div
      className=" fixed duration-1000 animate-appearance inset-0 items-center flex justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClickPopUp(false)}
    >
      <div
        className="shadow-lg bg-white  shadow-gray-400 rounded-lg w-fit duration-500 z-50 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" py-2 text-center text-xl">ย้ายห้องเรียน</div>
        <div className="grid gap-4 py-4 px-10">
          <div className="flex items-center gap-5 justify-center ">
            <div className="flex items-center gap-2">
              <label>ภาคเรียน</label>
              <select
                className="py-1 px-2 rounded-sm  border focus:outline-blue-400 focus:outline-1"
                onChange={(e) => setTerm(e.target.value)}
                value={term}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label>ปีการศึกษา</label>
              <select
                className="py-1 px-2 rounded-sm border focus:outline-blue-400 focus:outline-1"
                onChange={(e) => setYear(Number(e.target.value))}
                value={year}
              >
                <option value={currentYear}>{currentYear}</option>
                <option value={currentYear - 1}>{currentYear - 1}</option>
                <option value={currentYear - 2}>{currentYear - 2}</option>
                <option value={currentYear - 3}>{currentYear - 3}</option>
                <option value={currentYear - 4}>{currentYear - 4}</option>
              </select>
            </div>
          </div>
          <div className="w-fit flex justify-start  gap-4 items-center">
            <p>เลือกห้องเรียน</p>
            <Select
              options={groupOptions.map((item) => ({
                value: item.value,
                label: `${item.label} `,
              }))}
              value={
                studentGroupCode
                  ? groupOptions.find(
                      (item) => item.value === studentGroupCode
                    ) || null
                  : null
              }
              onChange={(selectedOption) =>
                setStudentGroupCode(selectedOption?.value || "")
              }
              placeholder=" เลือกห้องเรียน "
            />
          </div>
          <div className="text-red-600 text-sm text-center">
            <p>
              โปรดตรวจสอบให้แน่ใจว่าข้อมูลย้ายห้องถูกต้อง
              <br /> หากผิดพลาดไม่สามารถแก้ไขกลับได้
            </p>
          </div>

          <div className="flex gap-4 justify-center items-center ">
            <input
              type="checkbox"
              className="w-5 h-5 bg-green-500"
              checked={isConfirm}
              onChange={(e) => setIsConfirm(e.target.checked)}
            />
            <p>ตรวจสอบความถูกต้องของข้อมูล</p>
          </div>

          <div className="flex justify-center gap-5 items-center py-2">
            <button
              className="px-5 duration-500 text-center w-fit h-fit py-1 hover:bg-gray-500 rounded-md text-white bg-gray-400 "
              onClick={() => onClickPopUp(false)}
            >
              ยกเลิก
            </button>
            <button
              className={`px-5 duration-500 text-center w-fit py-1 h-fit rounded-md text-white ${
                isConfirm
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={isConfirm ? onChangeStudentGroup : undefined}
              disabled={!isConfirm}
            >
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

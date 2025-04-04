"use client";
import React, { useState } from "react";

interface Props {
  onClickPopUp: (value: boolean) => void;
  studentId: number;
}

export default function ChangeStudentGroup({ onClickPopUp, studentId }: Props) {
  const currentYear = new Date().getFullYear() + 543;

  const [term, setTerm] = useState<string>("1");
  const [year, setYear] = useState<number>(currentYear);

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
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-5 justify-center px-10 ">
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

          <div className="flex justify-center gap-5 items-center py-2">
            <button className="px-5 duration-500 text-center w-fit h-fit py-1 hover:bg-gray-500 rounded-md text-white bg-gray-400 "
             onClick={() => onClickPopUp(false)}>
              ยกเลิก
            </button>
            <button className="px-5 duration-500 text-center w-fit py-1 h-fit  rounded-md text-white bg-blue-500 hover:bg-blue-600">
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import SelectTermAndYear from "../Academic/SelectTermYear";
import { getCurrentThaiTermYear } from "@/lib/utils";

interface PopUpProps {
  onConfirm: (year: number, term: string) => void;
  onClickPopUp: (value: boolean) => void;
}

export default function CreateScoreTablePopup({
  onConfirm,
  onClickPopUp,
}: PopUpProps) {
  const { defaultTerm, currentYear } = getCurrentThaiTermYear();
  const [terms, setTerm] = useState<string>(defaultTerm);
  const [years, setYear] = useState<number>(currentYear);
  const handleConfirm = () => {
    onConfirm(years, terms);
    onClickPopUp(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => onClickPopUp(false)}
    >
      <div
        className="bg-white grid place-items-center  rounded-lg shadow-lg py-6 px-14 "
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl text-center mb-5">เลือกปีการศึกษาและภาคเรียน</h1>
        <div className="w-full flex gap-5 justify-center items-center">
         <SelectTermAndYear
          term={terms}
          year={years}
          currentYear={currentYear}
          onChangeTerm={setTerm}
          onChangeYear={setYear}
        />   
        </div>
        <div className="text-center pt-4 text-red-500">
            *** โปรดตรวจสอบภาคเรียนให้ถูกต้องทุกครั้ง ***
        </div>
        
        <div className="flex justify-end mt-6 gap-3">
          <button
            className="px-4 py-1.5 rounded bg-gray-300 hover:bg-gray-400 text-black"
            onClick={() => onClickPopUp(false)}
          >
            ยกเลิก
          </button>
          <button
            className="px-4 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleConfirm}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}

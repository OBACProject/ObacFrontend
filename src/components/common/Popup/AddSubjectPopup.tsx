"use client";
import { fetchGetAllProgram } from "@/api/oldApi/program/programAPI";
import { GetAllProgram } from "@/dto/programDto";
import { useEffect, useState } from "react";
import Select from "react-select";

type AddPopUpProps = {
  onClosePopUp: (value: boolean) => void;
  onSave: (
    name: string,
    id: string,
    term: string,
    programID: number,
    credits: number,
    isActive: boolean
  ) => void;
};

export const AddSubjectPopUp = ({ onClosePopUp, onSave }: AddPopUpProps) => {
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectCode, setSubjectCode] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const [programID, setProgramID] = useState<number | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [isActive, setActive] = useState<boolean>(false);
  const [programs, setPrograms] = useState<GetAllProgram[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetchGetAllProgram().then((item: GetAllProgram[]) => {
      setPrograms(item);
    });
  }, []);
  const Save = () => {
    if (subjectName && subjectCode && programID) {
      onSave(subjectName, subjectCode, term, programID, credits, isActive);
      onClosePopUp(false);
    }
  };

  const programOptions = programs.map((item) => ({
    value: item.programId,
    label: `${item.facultyName}`,
  }));
  const handleProgramChange = (
    selectedOption: { value: number; label: string } | null
  ) => {
    setProgramID(selectedOption ? selectedOption.value : null);
    setChecked(false);
  };
  return (
    <div
      className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-white rounded-md   lg:w-[500px]  z-100 shadow-lg shadow-gray-500 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-center rounded-t-md text-center text-xl  bg-white">
          <p className="py-2 text-xl font-semibold text-gray-800">
            เพิ่มวิชาเรียน
          </p>
        </div>
        <div className="w-full px-10 py-5 grid place-items-start gap-4">
          <div className="flex items-center gap-2">
            <label>รหัสวิชา : </label>
            <input
              placeholder="กรอกรหัสวิชา"
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
              onChange={(e) => setSubjectCode(e.target.value)}
              value={subjectCode}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>ชื่อวิชา : </label>
            <input
              placeholder="กรอกชื่อวิชา"
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
              onChange={(e) => setSubjectName(e.target.value)}
              value={subjectName}
            />
          </div>
        </div>
        <div className="flex items-center justify-start px-10 gap-3">
          <div className="flex items-center gap-2 ">
            <label>หน่วยกิต :</label>
            <input
              type="number"
              className="w-[50px] border rounded-sm px-2"
              onChange={(e) => setCredits(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>ภาคเรียน :</label>
            <select
              className=" px-2 py-1 border border-gray-300 rounded-sm"
              onChange={(e) => setTerm(e.target.value)}
              value={term}
            >
              <option value="">เลือก</option>
              <option value="1">ปี 1 เทอม 1</option>
              <option value="2">ปี 1 เทอม 2</option>
              <option value="3">ปี 2 เทอม 1</option>
              <option value="4">ปี 2 เทอม 2</option>
              <option value="5">ปี 3 เทอม 1</option>
              <option value="6">ปี 3 เทอม 2</option>
            </select>
          </div>
        </div>
        <div className="w-full px-10 py-5 grid place-items-start gap-8">
          <div className="flex items-center gap-2">
            <label>สถานะใช้งาน :</label>
            <button
              onClick={() => setActive(!isActive)}
              className={`relative w-[46px] h-6 flex items-center rounded-full py-1 px-1transition-all duration-300 ${
                isActive ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                  isActive ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
        <div className="w-full px-10 py-2 flex justify-start items-center gap-8">
          <Select
            options={programOptions}
            value={
              programOptions.find((option) => option.value === programID) ||
              null
            }
            onChange={handleProgramChange}
            isSearchable
            className="w-full"
            placeholder="หลักสูตร"
          />
          <div className="flex items-center w-full gap-2">
            <input
              type="checkbox"
              id="checkbox"
              checked={checked}
              onChange={() => {
                setProgramID(99);
                setChecked(!checked);
              }}
              className="w-5 h-5 accent-blue-500"
            />
            <label>ทุกหลักสูตร</label>
          </div>
        </div>
        <div className="py-5 w-full flex gap-5 justify-center">
          <button
            className="px-5 w-[90px] bg-gray-300 text-black py-1 rounded-sm  hover:bg-gray-500"
            onClick={() => onClosePopUp(false)}
          >
            ยกเลิก
          </button>{" "}
          <button
            className="px-5 w-[90px] bg-blue-500 text-white py-1 rounded-sm  hover:bg-blue-700"
            onClick={() => Save()}
          >
            เพิ่ม
          </button>
        </div>
      </div>
    </div>
  );
};

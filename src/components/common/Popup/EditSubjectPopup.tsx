"use client";
import { useState } from "react";

type EditPopUpProps = {
  onClosePopUp: (value: boolean) => void;
  onSave: (
    id: number,
    name: string,
    code: string,
    credits: number,
    isActive: boolean
  ) => void;
  onDelete: (Id: number) => void;
  ID: number;
  SubjectName: string;
  SubjectCode: string;
  SubjectCredits: number;
  isActive: boolean;
};

export const EditSubjectPopUp = ({
  onClosePopUp,
  onSave,
  onDelete,
  ID,
  SubjectName,
  SubjectCode,
  SubjectCredits,
  isActive,
}: EditPopUpProps) => {
  const [subjectName, setSubjectName] = useState<string>(SubjectName);
  const [subjectCode, setSubjectCode] = useState<string>(SubjectCode);
  const [subjectCredits, setSubjectCredits] = useState<number>(SubjectCredits);
  const [editIsActive, setIsActive] = useState<boolean>(isActive);
  const [deleteTrigger, setDeleteTrigger] = useState<boolean>(false);

  const Save = () => {
    if (subjectName && subjectCode) {
      onSave(ID, subjectName, subjectCode, subjectCredits, editIsActive);
      onClosePopUp(false);
    }
  };
  const Delete = () => {
    setDeleteTrigger(true);
  };
  const deleteHandler = () => {
    onDelete(ID);
    setDeleteTrigger(false);
    onClosePopUp(false);
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
        <div className="w-full flex justify-center rounded-t-md text-center text-xl  ">
          <p className="py-4  text-gray-800">แก้ไขวิชาเรียน</p>
        </div>
        <div className="w-full px-10 py-5 grid place-items-center gap-4">
          <div className="flex items-center gap-2">
            <label>รหัสวิชา : </label>
            <input
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
              onChange={(e) => setSubjectCode(e.target.value)}
              value={subjectCode}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>ชื่อวิชา : </label>
            <input
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
              onChange={(e) => setSubjectName(e.target.value)}
              value={subjectName}
            />
          </div>
          <div className="flex w-full justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <label>หน่วยกิต : </label>
              <input
                type="number"
                className="w-[60px] px-5 py-1 border border-gray-200 rounded-sm"
                onChange={(e) => setSubjectCredits(Number(e.target.value))}
                value={subjectCredits}
              />
            </div>
            <div className="flex items-center gap-2">
              <label>สถานะ</label>
              <button
                onClick={() => setIsActive(!editIsActive)}
                className={`relative w-[46px] h-6 flex items-center rounded-full py-1 px-1transition-all duration-300 ${
                  editIsActive ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                    editIsActive ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="py-5 w-full flex gap-5 justify-center">
          {" "}
          <button
            className="px-5 w-[80px] bg-gray-300 text-black py-1 rounded-sm hover:bg-gray-500"
            onClick={() => onClosePopUp(false)}
          >
            ยกเลิก
          </button>
          <button
            className="px-5 w-[80px] bg-red-400 text-white py-1 rounded-sm  hover:bg-red-600"
            onClick={() => Delete()}
          >
            ลบ
          </button>
          <button
            className="px-5 w-[80px] bg-blue-400 text-white py-1 rounded-sm  hover:bg-blue-600"
            onClick={() => Save()}
          >
            บันทึก
          </button>
        </div>
      </div>
      {deleteTrigger && (
        <div
          className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
          onClick={() => setDeleteTrigger(false)}
        >
          <div
            className="bg-white rounded-md   lg:w-[300px]  z-100 shadow-lg shadow-gray-500 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="">
              <h1 className="py-5 w-full text-center text-xl">ยืนยันการลบ</h1>
              <div className="flex justify-center gap-5 py-5 w-full">
                <button
                  className="px-4 bg-gray-300 rounded-md hover:bg-gray-400 py-1 text-black"
                  onClick={() => setDeleteTrigger(false)}
                >
                  ยกเลิก
                </button>
                <button
                  className="px-4 bg-red-500 rounded-md text-white hover:bg-red-600 py-1 "
                  onClick={deleteHandler}
                >
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

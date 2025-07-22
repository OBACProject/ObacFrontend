"use client";
import { CreateSubject } from "@/api/subject/route";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type AddPopUpProps = {
  onClosePopUp: (value: boolean) => void;
};

export const AddSubjectPopUp = ({ onClosePopUp }: AddPopUpProps) => {
  const [classType, setClassType] = useState("ปวช");
  const [classLevel, setClassLevel] = useState("1");
  const levelOptions = classType === "ปวช" ? ["1", "2", "3"] : ["1", "2"];
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectCode, setSubjectCode] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const [credit, setCredit] = useState<number>();
  const [curriculumYear, setCurriumYear] = useState<number>();
  const [description, setDescription] = useState<string>("");

  const onSave = async () => {
    if (!subjectName || !subjectCode || !term || !credit || !curriculumYear) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const payload = {
      name: subjectName,
      code: subjectCode,
      credits: credit,
      term,
      level: Number(classLevel),
      class: classType,
      curriculumYear: Number(curriculumYear),
      description,
    };

    try {
      console.log("paylode... : ", payload);
      await CreateSubject(payload);
      toast.success("เพิ่มวิชาสำเร็จ");
      onClosePopUp(false);
    } catch (err) {
      console.error("Error saving subject:", err);
      toast.error("บันทึกวิชาไม่สำเร็จ");
    }
  };

  return (
    <div
      className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-white rounded-md    z-100 shadow-lg shadow-gray-500 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-center rounded-t-md text-center text-xl  bg-white">
          <p className="py-2 text-xl font-semibold text-gray-800">
            เพิ่มวิชาเรียน
          </p>
        </div>
        <div className=" px-2 lg:px-16 w-full grid gap-4">
          <div className="flex items-center gap-2">
            <label>รหัสวิชา </label>
            <input
              placeholder="กรอกรหัสวิชา"
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
              onChange={(e) => setSubjectCode(e.target.value)}
              value={subjectCode}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>ชื่อวิชา </label>
            <input
              placeholder="กรอกชื่อวิชา"
              className="w-[200px] px-5 py-1 border border-gray-200 rounded-sm"
              onChange={(e) => setSubjectName(e.target.value)}
              value={subjectName}
            />
          </div>
          <div className="flex items-center justify-start gap-3">
            <div className="flex items-center gap-2 ">
              <label>หน่วยกิต</label>
              <input
                type="number"
                placeholder="?"
                className="w-[50px] border rounded-sm px-2"
                onChange={(e) => setCredit(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-2">
              <label>ภาคเรียน </label>
              <select
                className=" px-2 py-1 border border-gray-300 rounded-sm"
                onChange={(e) => setTerm(e.target.value)}
                value={term}
              >
                <option value="">เลือก</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="s1">ฤดูร้อน1</option>
                <option value="s2">ฤดูร้อน2</option>
              </select>
            </div>
          </div>
          <div className=" flex gap-3 items-center">
            <p>ปีหลักสูตร</p>
            <input
              className="border-[1px] lg:w-[120px]  pl-2 py-0.5"
              type="text"
              placeholder="พ.ศ."
              onChange={(e) => setCurriumYear(Number(e.target.value))}
              value={curriculumYear}
            />
          </div>
          <div className="flex gap-3 items-center">
            <p>สายชั้น</p>
            <select
              className="border-[1px] border-gray-300 px-4 py-0.5 rounded-md"
              value={classType}
              onChange={(e) => {
                const selected = e.target.value;
                setClassType(selected);
                if (selected === "ปวช" && classLevel === "3") return;
                setClassLevel("1");
              }}
            >
              <option value="ปวช">ปวช.</option>
              <option value="ปวส">ปวส.</option>
            </select>

            <p className="ml-3">ปี</p>
            <select
              className="border-[1px] border-gray-300 px-4 py-0.5 rounded-md"
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
            >
              {levelOptions.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <p>คำอธิบาย</p>
            <textarea
              rows={2}
              className="w-full border-[1px] border-gray-300"
              onChange={(e) => setDescription(e.target.value)}
            />
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
            onClick={() => onSave()}
          >
            เพิ่ม
          </button>
        </div>
      </div>
    </div>
  );
};

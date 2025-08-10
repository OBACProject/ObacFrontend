"use client";

import { GetStudentListByClass } from "@/api/studentGroup/route";
import BulkStudentNameListInLevelPDF from "@/lib/PDF/name-list/BulkStudentNameList";
import { getCurrentThaiTermYear } from "@/lib/utils";
import { Download, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface PropsDelete {
  onClosePopUp: (value: boolean) => void;
}

export default function DownloadStudentListPopup({
  onClosePopUp,
}: PropsDelete) {
  // const [level, setLevel] = useState<number>(0);
  // const [classGroup, setClassGroup] = useState<string>("");

  const [selectValue, setSelectValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDowLoad = async (value: string) => {
    setIsLoading(true);
    if (!value) {
      toast.error("กรุณาเลือกสายชั้นก่อนดาวน์โหลด");
      return;
    }

    const match = value.match(/^([^\d]+)\.(\d+)$/);
    if (!match) {
      console.error("รูปแบบ value ไม่ถูกต้อง:", value);
      return;
    }

    const classGroup = match[1];
    const level = Number(match[2]);
    const { currentYear } = getCurrentThaiTermYear();

    const studentNameList = await GetStudentListByClass(classGroup, level);
    console.log(studentNameList);
    try {
      BulkStudentNameListInLevelPDF({
        data: studentNameList,
        year: currentYear,
        classGroup: classGroup,
        level: level,
      });
      setIsLoading(false);
      toast.success("ดาวน์โหลดเอกสารสำเร็จ");
    } catch (err) {
      toast.error("การดาวน์โหลดผิดพลาด");
      setIsLoading(false);
    }
  };
  return (
    <div
      className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-white shadow-lg shadow-gray-400 rounded-lg w-fit z-100 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" text-black text-center px-5 py-5 lg:py-8 lg:px-10 grid gap-5">
          <h1 className="text-gray-500">
            เลือกสายชั้นเพื่อดาวน์โหลดรายชื่อนักเรียนทุกห้องของสายชั้น
          </h1>
          <div className="flex gap-4 items-center justify-center ">
            <p className="text-base text-gray-800">เลือกสายชั้น</p>

            <select
              className="py-1 px-3 border-[1px] border-gray-300 rounded-md"
              onChange={(e) => setSelectValue(e.target.value)}
              value={selectValue}
            >
              <option value="">เลือก</option>
              <option value="ปวช.1">ปวช.1</option>
              <option value="ปวช.2">ปวช.2</option>
              <option value="ปวช.3">ปวช.3</option>
              <option value="ปวส.1">ปวส.1</option>
              <option value="ปวส.2">ปวส.2</option>
            </select>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              onClick={() => onDowLoad(selectValue)}
              disabled={!selectValue}
              className={`px-8 py-1.5 h-fit w-fit rounded-md text-white flex items-center gap-4 justify-center
              ${
                selectValue
                  ? "bg-blue-500 hover:bg-blue-400"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <LoaderCircle className="w-5 h-5 text-white animate-spin duration-500" />
              ) : (
                <Download className="w-5 h-5 text-white" />
              )}
              ดาวน์โหลดรายชื่อ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

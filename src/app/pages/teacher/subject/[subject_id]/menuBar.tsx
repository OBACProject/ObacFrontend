"use client";
import GenStudentNameList from "@/app/components/PDF/genStudentNameList";
import GenSubjectScore from "@/app/components/PDF/genSubjectScore";
import GenTranscript from "@/app/components/PDF/genTranscript";
import { GetGradBySubjectId } from "@/dto/gradDto";
import { useEffect, useState } from "react";
interface Props {
  slug: string;
  grads?: GetGradBySubjectId[];
  subjectName: string;
  onEditReturn: (data: boolean) => void;
}

export default function MenuBar({
  slug,
  subjectName,
  grads,
  onEditReturn,
}: Props) {
  const [gradData, setGradData] = useState<GetGradBySubjectId[]>([]);
  useEffect(() => {
    setGradData(grads ?? []);
  }, grads);
  const handleEditChange = () => {
    onEditReturn(true);
  };

  return (
    <div className="bg-white border-[1px] border-gray-200 px-5 py-2">
      <div className="grid grid-cols-[70%_30%]">
        <div className="grid grid-cols-[40%_60%]">
          <div className="">
            <div className=" text-xl px-5 py-1 ">รหัสวิชา : {slug}</div>
            <div className="px-5   font-semibold text-2xl rounded-md py-2">
              วิชา : บริหารธุรกิจและการตลาด
            </div>
          </div>
          <div className="text-2xl  font-semibold text-center">
            *** ประกาศ ***
          </div>
        </div>
        <div className="grid row-2 gap-2">
          <div className="flex justify-end gap-3">
            <button
              className="text-md bg-[#e4f1f8] text-gray-600 hover:bg-gray-200 rounded-md px-5 py-2"
              onClick={() => {
                GenSubjectScore({ grads: grads });
              }}
            >
              ดาวน์โหลดใบคะแนน
            </button>
            <button
              className=" text-md text-gray-600 hover:bg-gray-200 bg-[#e4f1f8] rounded-md px-5 py-2"
              onClick={() => {
                GenStudentNameList({ grads: grads });
              }}
            >
              ดาวน์โหลดรายชื่อนักเรียน
            </button>
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="duration-300  text-md px-10 border-gray-200 border-[1px] hover:text-gray-700 rounded-md hover:bg-blue-200 py-2 hover:rounded-sm"
              onClick={handleEditChange}
            >
              แก้ไข
            </button>
            <button
              className="duration-300  text-md rounded-md  px-10 border-gray-200 border-[1px] hover:text-gray-700 hover:rounded-sm hover:bg-blue-200"
              onClick={() => {
                GenTranscript({ score: 50 });
              }}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
      <div className="place-items-end"></div>
    </div>
  );
}

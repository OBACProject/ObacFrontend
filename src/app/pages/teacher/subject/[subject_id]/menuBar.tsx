
"use client"
import GenStudentNameList from "@/app/components/PDF/genStudentNameList";
import GenTranscript from "@/app/components/PDF/genTranscript";
import { useState } from "react";
interface Props {
  slug: string;
  subjectName: string;
  onEditReturn: (data:boolean)=> void;
}

export default function MenuBar({ slug, subjectName, onEditReturn }: Props) {
  const [FirstName, setFName] = useState<string>("Patarajarin")
  const [LastName , setLName] = useState<string>("Napakarn")
  const handleEditChange = ()=>{
    onEditReturn(true)
  }

  return (
    <div className="bg-blue-500 px-5 py-2">
      <div className="grid grid-cols-[80%_20%]">
        <div className="grid grid-cols-[40%_60%]">
          <div className="">
            <div className="text-white text-xl px-5 py-1 ">
              รหัสวิชา : {slug}
            </div>
            <div className="px-5  text-white font-semibold text-2xl rounded-md py-2">
              วิชา : บริหารธุรกิจและการตลาด
            </div>
          </div>
          <div className="text-2xl text-white font-semibold text-center">
            *** ประกาศ ***
          </div>
        </div>
        <div className="grid row-2 gap-2">
          <button className=" text-md text-gray-600 hover:bg-gray-200 bg-white rounded-md px-6 py-2" onClick={()=>{GenStudentNameList({FirstName:FirstName,LastName:LastName})}}>
            ดาวน์โหลดเอกสาร
          </button>
          <div className="grid grid-cols-2">
            <button className="duration-300 text-white text-md px-6 border-r-[1px] hover:text-gray-700 hover:bg-blue-200 py-2 hover:rounded-sm" 
            onClick={handleEditChange}>
              แก้ไข
            </button>
            <button className="duration-300 text-white text-md  px-6 border-l-[1px] hover:text-gray-700 hover:rounded-sm hover:bg-blue-200" onClick={()=>{
              GenTranscript({score:50})
            }}>
              บันทึก
            </button>
          </div>
        </div>
      </div>
      <div className="place-items-end"></div>
    </div>
  );
}

'use client';
import { useState } from "react";
import React from "react";
interface Props {
  slug: string;
  StudenData? : StudenData[]
}
type StudenData = {
    studentId: string;
    studentName: string;
    more:string | null ; //  null
  };

export default function Form({ slug }: Props) {
    const [studenDatas, setStudenData] = useState<StudenData[]>([
        {
            studentId: "100001",
            studentName: "สมชาย ใจดี",
            more:null
          },
          {
            studentId: "100002",
            studentName: "สมศรี สวยงาม",
            more:null
          },
          {
            studentId: "100003",
            studentName: "อาทิตย์ แสงจันทร์",
            more:null
          },
          {
            studentId: "100004",
            studentName: "วันเพ็ญ นวลตา",
            more:null
          },
          {
            studentId: "100005",
            studentName: "นพดล เพชรนิล",
            more:null
          },
          {
            studentId: "100006",
            studentName: "วิภาวดี ทองคำ",
            more:null
          },
          {
            studentId: "100007",
            studentName: "ประยุทธ์ ขยันยิ่ง",
            more:null
          },
          {
            studentId: "100008",
            studentName: "พิมพ์ใจ จิตใจงาม",
            more:null
          },
          {
            studentId: "100009",
            studentName: "นฤมล ใจเย็น",
            more:null
          },
          {
            studentId: "100010",
            studentName: "เจษฎา ศักดิ์ใหญ่",
            more:null
          },
          {
            studentId: "100101",
            studentName: "สมชาย ใจดี",
            more:null
          },
          {
            studentId: "100102",
            studentName: "สมศรี สวยงาม",
            more:null
          },
          {
            studentId: "100103",
            studentName: "อาทิตย์ แสงจันทร์",
            more:null
          },
          {
            studentId: "100104",
            studentName: "วันเพ็ญ นวลตา",
            more:null
          },
          {
            studentId: "100105",
            studentName: "นพดล เพชรนิล",
            more:null
            
            
          },
          {
            studentId: "100106",
            studentName: "วิภาวดี ทองคำ",
            more:null
            
            
          },
          {
            studentId: "100107",
            studentName: "ประยุทธ์ ขยันยิ่ง",
            more:null
          },
          {
            studentId: "100108",
            studentName: "พิมพ์ใจ จิตใจงาม",
            more:null
 
          },
          {
            studentId: "100109",
            studentName: "นฤมล ใจเย็น",

            more:null
          },
          {
            studentId: "100110",
            studentName: "เจษฎา ศักดิ์ใหญ่",
            more:null

          },
    ])
  return (
    <div className="px-5 py-5">
      <div className="w-full ">
        <div className="  bg-[#cfe4ff] grid grid-cols-[5%_10%_25%_10%_10%_10%_10%_10%_10%] border-2 border-gray-400">
          <span className="grid place-items-center text-xl py-2">No.</span>
          <span className="grid place-items-center text-xl  py-2">
            รหัสนักเรียน
          </span>
          <span className="grid place-items-center text-xl  py-2">
            ชื่อ - นามสกุล
          </span>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <span className="grid place-items-center text-xl  py-2">
            หมายเหตุ
          </span>
        </div>
        {studenDatas?.map((item,index)=>(
            <div
            className=" text-lg border-b-2  grid group hover:bg-[#e8f3ff]   grid-cols-[5%_10%_25%_50%_10%]"
            key={item.studentId}
          >
            <span className="text-center font-semibold border-l-2 border-r-2 py-2">
              {index + 1}.
            </span>
            <span className="text-center border-r-2 py-2">{item.studentId}</span>
            <span className="text-start pl-5 border-r-2 py-2">
              {item.studentName}
            </span>
            <div></div>
            
            
            <input type="text" placeholder={'-'} className="text-center border-x-2 py-2 group-hover:bg-[#e8f3ff]"/>
          </div>
        ))}
      </div>
    </div>
  );
}

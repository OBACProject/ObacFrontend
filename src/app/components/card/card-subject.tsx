"use client";
import React from "react";

interface CardSubjectProp {
  subjectName: string;
  subjectCode: string;
  currentRoom: string;
  subjectStatus: number;
  total_student: number;
}

interface CardSubjectProps {
  cardSubjectData: CardSubjectProp[];
}

export default function CardSubject({ cardSubjectData }: CardSubjectProps) {
  return (
    <>
      {Array.isArray(cardSubjectData) &&
        cardSubjectData.map((data, index) => (
          <div
            className=" border-[1px] hover:border-black border-[#A4B7E0] rounded-md my-2 bg-card text-card-foreground w-full hover:bg-[hsl(200,38%,92%)] bg-white grid grid-cols-[40%_21%_3%_36%]"
            key={index}
          >
            <div className="ml-5 py-4 ">
              <div className="flex ">
                <div className="text-gray-600">วิชา: &nbsp;<span className="font-semibold text-blue-600">{data.subjectName}</span> </div>
              </div>
              <div className="text-gray-600">รหัสวิชา :&nbsp;<span className="font-semibold text-gray-800">{data.subjectCode}</span></div>

              <div className="text-gray-600">จำนวนนักเรียน :&nbsp;<span className="font-semibold text-gray-800">{data.total_student}</span>&nbsp; คน</div>
            </div>

            <div className="py-3 w-11/12">
              <p className="text-center text-gray-600 font-semibold py-1 px-2 bg-[#D6E9E9] rounded-md">ห้องสอน : {data.currentRoom}</p>
            </div>
            <div className={`${data.subjectStatus==2?'bg-[#D2F9E0]':'bg-[#DBEFFA] h-full w-full'}`}>

            </div>
            <div className={`${data.subjectStatus==2?'bg-[#9AFFBF]':'bg-[#A0DDFD] h-full w-full'} rounded-r-md`}>
                <div className="text-center pt-1 text-lg text-white font-semibold">
                    สถานะคะแนน
                </div>
                <div className=" text-center text-gray-700 text-xl font-semibold py-3">
                    {data.subjectStatus == 1 ? (<p>ยังไม่กรอกคะแนน
                        </p>):data.subjectStatus == 2 ? (
                            <p>กรอกคะแนนเสร็จสิ้น</p>
                        ) :(<p>เสร็จสิ้น</p>)}
                </div>
                <div className="text-center text-black font-semibold">
                    ปีการศึกษา 1/2567
                </div>
            </div>
          </div>
        ))}
    </>
  );
}

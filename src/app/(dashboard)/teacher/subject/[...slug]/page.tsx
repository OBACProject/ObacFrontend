import { ChevronRight, GraduationCap } from "lucide-react";
import React from "react";
import Form from "./Form";

type PageParams = Promise<{ slug: string[] }>;

export default async function page({ params }: { params: PageParams }) {
  const { slug: paramArray } = await params;
  const [scheduleID, ecsubjectName, ecsubjectCode, engroupName] = paramArray;
  const subjectName = decodeURIComponent(ecsubjectName || "");
  const subjectCode = decodeURIComponent(ecsubjectCode || "");
  const groupName = decodeURIComponent(engroupName || "");
  return (
    <div className="w-full px-5 ">
      <div className="w-full flex justify-between mt-4 rounded-lg bg-blue-500">
        <div className="grid gap-2 px-5 py-4">
          <div className="flex gap-2 items-center">
            <GraduationCap className="text-white h-6 w-6" />
            <h1 className="text-2xl text-white font-prompt">
              ระบบจัดการคะแนนสำหรับอาจารย์
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center text-white">
              <p>รหัสวิชา : </p>
              <p className="text-sm px-4 bg-blue-400 py-0.5 rounded-full">
                {subjectCode}
              </p>
            </div>
            <div className="flex gap-1 items-center text-white">
              <p>กลุ่มเรียน : </p>
              <p className="text-sm px-4 bg-blue-400 py-0.5 rounded-full">
                {groupName}
              </p>
            </div>
          </div>
          <h1 className="text-lg bg-blue-400 px-5 py-1 rounded-full w-fit text-white font-prompt_Light">
            {subjectName}
          </h1>
        </div>
        <div className="px-5 py-5 grid ">
          <button className="px-5 rounded-md flex items-center gap-2 justify-center h-fit py-1.5 bg-white text-blue-600 group">
            ดาวโหลดน์เอกสาร
            <ChevronRight className="text-blue-600 h-6 w-6 group-hover:rotate-90 duration-300" />
          </button>
        </div>
      </div>
      <div>
        <Form scheduleID={scheduleID} />
      </div>
    </div>
  );
}

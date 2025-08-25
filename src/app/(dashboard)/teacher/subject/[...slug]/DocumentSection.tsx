"use client";
import { ExcelStudentNamelistInGroupButton } from "@/components/Excel/ExcelButton";
import {
  PDFStudentNamelistInGroupButton,
  PDFStudentScoreInSubjectPDF,
} from "@/components/PDF/PDFButton";
import { ChevronRight } from "lucide-react";
import React from "react";

interface Props {
  groupID: number;
  year: number;
  scheduleSubjectID: number;
}

export default function DocumentSection({
  groupID,
  year,
  scheduleSubjectID,
}: Props) {
  return (
    <div className="px-5 py-5 grid ">
      <div className="relative group inline-block">
        <button className="px-5 lg:w-[250px] rounded-md flex items-center gap-2 justify-center h-fit py-1.5 bg-white text-blue-600 group-hover:bg-gray-100 duration-300">
          ดาวโหลดน์เอกสาร
          <ChevronRight className="text-blue-600 h-6 w-6 group-hover:rotate-90 duration-300" />
        </button>

        <div className="absolute top-fit mt-2 left-0 hidden group-hover:flex flex-col gap-1 z-10">
          <div className="w-full">
            <PDFStudentNamelistInGroupButton groupID={groupID} year={year} />
          </div>

          <PDFStudentScoreInSubjectPDF scheduleSubjectID={scheduleSubjectID} />
          <ExcelStudentNamelistInGroupButton groupID={String(groupID)} />
        </div>
      </div>
    </div>
  );
}

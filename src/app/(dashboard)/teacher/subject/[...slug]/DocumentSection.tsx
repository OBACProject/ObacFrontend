"use client";
import {
  ExcelGradStudentGroup,
  ExcelSubjectStudentNamelistInGroupButton,
} from "@/components/Excel/ExcelButton";
import {
  PDFStudentNamelistInGroupButton,
  PDFStudentScoreInSubjectPDF,
} from "@/components/PDF/PDFButton";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

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
  // Desktop keeps opening this on hover (group-hover:flex, untouched below).
  // Touch devices have no hover, so `open` lets a tap do the same thing -
  // the two triggers just both control the same panel independently.
  const [open, setOpen] = useState(false);

  return (
    <div className="px-5 py-5 grid ">
      <div className="relative group inline-block">
        <button
          onClick={() => setOpen((v) => !v)}
          className="px-5 lg:w-[250px] rounded-md flex items-center gap-2 justify-center h-fit py-1.5 bg-white text-blue-600 group-hover:bg-gray-100 duration-300"
        >
          ดาวโหลดน์เอกสาร
          <ChevronRight className="text-blue-600 h-6 w-6 group-hover:rotate-90 duration-300" />
        </button>

        <div
          className={`absolute top-fit mt-2 left-0 ${
            open ? "flex" : "hidden"
          } group-hover:flex flex-col gap-2 z-10`}
        >
            <PDFStudentNamelistInGroupButton groupID={groupID} year={year} />
            <PDFStudentScoreInSubjectPDF
              scheduleSubjectID={scheduleSubjectID}
            />
            <ExcelSubjectStudentNamelistInGroupButton scheduleSubjectID={scheduleSubjectID} />
            <ExcelGradStudentGroup scheduleSubjectId={scheduleSubjectID} />
        </div>
      </div>
    </div>
  );
}

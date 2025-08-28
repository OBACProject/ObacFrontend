// === components/grad/ExportFile.tsx ===
"use client";
import React from "react";
import {
  ConvertClassroomToExcelWithSubject,
  ConvertScoreToExcel,
} from "@/lib/Excel/generateExcelFile";
import { GetGradBySubjectId, StudentGroupGradeResponse } from "@/dto/gradDto";
import { GetSubjectBySubjectId } from "@/dto/subjectDto";
import { Button } from "@/components/ui/button";
import {
  PDFStudentNamelistInGroupButton,
  PDFStudentScoreInSubjectPDF,
} from "@/components/PDF/PDFButton";
import { getCurrentThaiTermYear } from "@/lib/utils";
import { Download } from "lucide-react";

interface ExportFileProps {
  grads: GetGradBySubjectId[];
  subject: GetSubjectBySubjectId;
  roomName: string;
  term: string;
  year: string;
  scheduleSubjectID: number;
  groupID: number;
}

export default function ExportFile({
  grads,
  subject,
  roomName,
  term,
  year,
  scheduleSubjectID,
  groupID,
}: ExportFileProps) {
  const convertGrad = grads.map((item) => {
    const prefix = item.gender === "Male" ? "นาย" : "นางสาว";
    return {
      studentCode: item.studentCode,
      name: `${prefix} ${item.firstName} ${item.lastName}`,
      assignmentscore: item.assignmentscore,
      collectScore: item.collectScore,
      affectiveScore: item.affectiveScore,
      midtermScore: item.midtermScore,
      finaltermScore: item.finaltermScore,
      totalScore:
        item.affectiveScore +
        item.assignmentscore +
        item.collectScore +
        item.midtermScore +
        item.finaltermScore,
      finalGrade: item.finalGrade,
      remarks: item.remarks,
      status: String(item.status),
    };
  });

  const convertStudentExcel = grads.map((item) => {
    const prefix = item.gender === "Male" ? "นาย" : "นางสาว";
    return {
      studentCode: item.studentCode,
      name: `${prefix} ${item.firstName} ${item.lastName}`,
    };
  });

  const { currentYear } = getCurrentThaiTermYear();


  return (
    <div className="flex flex-row w-[250px] flex-wrap gap-2">
      <PDFStudentScoreInSubjectPDF scheduleSubjectID={scheduleSubjectID} />
      <PDFStudentNamelistInGroupButton groupID={groupID} year={currentYear} />
      <Button
        className="flex h-fit px-8 border-[1px] border-gray-300 text-blue-500 font-prompt_Light bg-white py-1.5
       hover:bg-blue-50 duration-300 text-sm rounded-md items-center justify-center gap-3"
        onClick={() =>
          ConvertScoreToExcel(
            convertGrad.filter(item => item.status !== "คัดชื่อออก" && item.status !== "ลาออก"),
            term,
            year,
            subject?.subjectCode ?? "",
            subject?.subjectName ?? "",
            roomName ?? ""
          )
        }
      >
        <Download className="text-blue-500 w-5 h-5" />
        ดาวน์โหลดใบคะแนน Excel
      </Button>
      <Button
        className="flex h-fit px-8 border-[1px] border-gray-300 text-blue-500 font-prompt_Light bg-white py-1.5
       hover:bg-blue-50 duration-300 text-sm rounded-md items-center justify-center gap-3"
        onClick={() =>
          ConvertClassroomToExcelWithSubject(
            convertStudentExcel,
            subject?.subjectCode ?? "",
            subject?.subjectName ?? "",
            roomName ?? ""
          )
        }
      >
        <Download className="text-blue-500 w-5 h-5" />
        ดาวน์โหลดใบรายชื่อ Excel
      </Button>
    </div>
  );
}

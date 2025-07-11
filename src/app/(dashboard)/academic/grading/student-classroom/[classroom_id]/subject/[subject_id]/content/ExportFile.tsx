// === components/grad/ExportFile.tsx ===
"use client";
import React from "react";
// import { GetGradBySubjectId, GetSubjectBySubjectId } from "@/dto";
import StudentScoreInSubjectPDF from "@/lib/PDF/score/StudentScoreInSubject";
import StudentNameInSubject from "@/lib/PDF/name-list/StudentNameInSubject";
import {
  ConvertClassroomToExcelWithSubject,
  ConvertScoreToExcel,
} from "@/lib/Excel/convertToExcel";
import { GetGradBySubjectId } from "@/dto/gradDto";
import { GetSubjectBySubjectId } from "@/dto/subjectDto";
import { Button } from "@/components/ui/button";
import { mockStudentNameListInSubject, mockStudentScorenSubject } from "@/resource/PDF/mockData";

interface ExportFileProps {
  grads: GetGradBySubjectId[];
  subject: GetSubjectBySubjectId;
  roomName: string;
  term: string;
  year: string;
}

export default function ExportFile({
  grads,
  subject,
  roomName,
  term,
  year,
}: ExportFileProps) {
  const convertGrad = grads.map((item) => {
    const prefix = item.gender === "Male" ? "นาย" : "นางสาว";
    return {
      studentCode: item.studentCode,
      name: `${prefix} ${item.firstName} ${item.lastName}`,
      collectScore: item.collectScore,
      testScore: item.testScore,
      affectiveScore: item.affectiveScore,
      totalScore: item.collectScore + item.testScore + item.affectiveScore,
    };
  });

  const convertStudentExcel = grads.map((item) => {
    const prefix = item.gender === "Male" ? "นาย" : "นางสาว";
    return {
      studentCode: item.studentCode,
      name: `${prefix} ${item.firstName} ${item.lastName}`,
    };
  });

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <Button
        className="text-sm bg-[#e4f1f8] text-gray-600 hover:bg-gray-200 rounded-md px-4 py-2"
        onClick={() =>
          StudentScoreInSubjectPDF({
           data: mockStudentScorenSubject
          })
        }
      >
        ดาวน์โหลดใบคะแนน PDF
      </Button>
      <Button
        className="text-sm bg-[#e4f1f8] text-gray-600 hover:bg-gray-200 rounded-md px-4 py-2"
        onClick={() =>
          StudentNameInSubject({
            data:mockStudentNameListInSubject
          })
        }
      >
        ดาวน์โหลดรายชื่อ PDF
      </Button>
      <Button
        className="text-sm bg-[#e4f1f8] text-gray-600 hover:bg-gray-200 rounded-md px-4 py-2"
        onClick={() =>
          ConvertScoreToExcel(
            convertGrad,
            term,
            year,
            subject?.subjectCode ?? "",
            subject?.subjectName ?? "",
            roomName ?? ""
          )
        }
      >
        ดาวน์โหลดใบคะแนน Excel
      </Button>
      <Button
        className="text-sm bg-[#e4f1f8] text-gray-600 hover:bg-gray-200 rounded-md px-4 py-2"
        onClick={() =>
          ConvertClassroomToExcelWithSubject(
            convertStudentExcel,
            subject?.subjectCode ?? "",
            subject?.subjectName ?? "",
            roomName ?? ""
          )
        }
      >
        ดาวน์โหลดใบรายชื่อ Excel
      </Button>
    </div>
  );
}

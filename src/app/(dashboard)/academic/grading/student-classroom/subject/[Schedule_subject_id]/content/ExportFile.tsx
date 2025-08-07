// === components/grad/ExportFile.tsx ===
"use client";
import React from "react";
import StudentScoreInSubjectPDF from "@/lib/PDF/score/StudentScoreInSubject";
import StudentNameInSubject from "@/lib/PDF/name-list/StudentNameInSubject";
import {
  ConvertClassroomToExcelWithSubject,
} from "@/lib/Excel/generateExcelFile";
import { GetGradBySubjectId, StudentGroupGradeResponse, SubjectGradeItem } from "@/dto/gradDto";
import { GetSubjectBySubjectId } from "@/dto/subjectDto";
import { Button } from "@/components/ui/button";
import { StudentNameListInSubject } from "@/dto/pdfDto";

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
      assignmentscore: item.assignmentscore,
      collectScore: item.collectScore,
      affectiveScore: item.affectiveScore,
      midtermScore: item.midtermScore,
      finaltermScore: item.finaltermScore,
      totalScore:  item.affectiveScore + item.assignmentscore + item.collectScore + item.midtermScore + item.finaltermScore,
    };
  });

  const convertStudentExcel = grads.map((item) => {
    const prefix = item.gender === "Male" ? "นาย" : "นางสาว";
    return {
      studentCode: item.studentCode,
      name: `${prefix} ${item.firstName} ${item.lastName}`,
    };
  });

  const convertToStudentGroupGradeResponse = (): StudentGroupGradeResponse => {
    return {
      subjectName: subject?.subjectName || "",
      subjectCode: subject?.subjectCode || "",
      credit: subject?.credits || 0,
      hour: 0, 
      subjectTeacher: "", 
      subjectId: subject?.id || 0,
      groupId: 0,
      groupName: roomName,
      groupCode: "",
      class: roomName,
      level: 0,
      isPublish: false,
      isComplete: false,
      term: term,
      year: parseInt(year),
      subjectGrades: grads.map((item) => ({
        studentId: item.studentId,
        studentCode: item.studentCode,
        prefix: item.prefix || (item.gender === "Male" ? "นาย" : "นางสาว"),
        firstName: item.firstName,
        lastName: item.lastName,
        assignmentScore: item.assignmentscore || 0,
        collectScore: item.collectScore || 0,
        midtermScore: item.midtermScore || 0,
        finaltermScore: item.finaltermScore || 0,
        affectiveScore: item.affectiveScore || 0,
        totalScore: item.totalScore || 0,
        finalGrade: parseFloat(item.grade) || 0,
        remarks: item.remark || "",
      }))
    };
  };

  // Convert grads data to StudentNameListInSubject format for PDF
  const convertToStudentNameList = (): StudentNameListInSubject => {
    return {
      subjectID: subject?.id || 0,
      subjectCode: subject?.subjectCode || "",
      subjectName: subject?.subjectName || "",
      groupName: roomName,
      students: grads.map((item) => ({
        studentID: item.studentId,
        studentCode: item.studentCode,
        prefix: item.prefix || (item.gender === "Male" ? "นาย" : "นางสาว"),
        studentFirstName: item.firstName,
        studentLastName: item.lastName,
      }))
    };
  };

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <Button
        className="text-sm bg-[#e4f1f8] text-gray-600 hover:bg-gray-200 rounded-md px-4 py-2"
        onClick={() =>
          StudentScoreInSubjectPDF({
           data: convertToStudentGroupGradeResponse()
          })
        }
      >
        ดาวน์โหลดใบคะแนน PDF
      </Button>
      <Button
        className="text-sm bg-[#e4f1f8] text-gray-600 hover:bg-gray-200 rounded-md px-4 py-2"
        onClick={() =>
          StudentNameInSubject({
            data: convertToStudentNameList()
          })
        }
      >
        ดาวน์โหลดรายชื่อ PDF
      </Button>
      {/* <Button
        className="text-sm bg-[#e4f1f8] text-gray-600 hover:bg-gray-200 rounded-md px-4 py-2"
        // onClick={() =>
        //   ConvertScoreToExcel(
        //     convertGrad,
        //     term,
        //     year,
        //     subject?.subjectCode ?? "",
        //     subject?.subjectName ?? "",
        //     roomName ?? ""
        //   )
        // }
      >
        ดาวน์โหลดใบคะแนน Excel
      </Button> */}
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

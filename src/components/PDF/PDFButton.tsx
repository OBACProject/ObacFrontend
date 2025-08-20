"use client";

import {
  genBulkPDFStudentTranscriptPDF,
  genPDFStudentNamelistInGroup,
  genPDFStudentScoreInSubjectPDF,
  genPDFStudentTranscriptPDF,
} from "@/lib/PDFGenarate/createPDFFile";
import { Download } from "lucide-react";

export const PDFStudentNamelistInGroupButton = ({
  groupID,
  year,
}: {
  groupID: number;
  year: number;
}) => {
  const handleClick = () => {
    genPDFStudentNamelistInGroup(groupID, year);
  };

  return (
    <button
      className="flex h-fit px-8 border-[1px] border-gray-300 text-blue-500 font-prompt_Light bg-white py-1.5
       hover:bg-blue-50 duration-300 text-sm rounded-md items-center justify-center gap-3"
      onClick={handleClick}
    >
      <Download className="text-blue-500 w-5 h-5" />
      รายชื่อนักเรียน PDF
    </button>
  );
};

export const PDFStudentScoreInSubjectPDF = ({
  scheduleSubjectID,
}: {
  scheduleSubjectID: number;
}) => {
  const handleClick = () => {
    genPDFStudentScoreInSubjectPDF(scheduleSubjectID);
  };

  return (
    <button
      className="flex h-fit px-8 border-[1px] border-gray-300 text-blue-500 font-prompt_Light bg-white py-1.5
       hover:scale-[101%] duration-300 text-sm rounded-md items-center justify-center gap-3"
      onClick={handleClick}
    >
      <Download className="text-blue-500 w-5 h-5" />
      คะแนนนักเรียน PDF
    </button>
  );
};

export const PDFStudentTransScriptButton = ({
  studentID,
}: {
  studentID: number;
}) => {
  const handleDownLoadPDF = (studentID: number) => {
    genPDFStudentTranscriptPDF(studentID);
  };
  return (
    <button
      className="flex h-fit px-8 border-[1px] border-gray-300 text-blue-500 font-prompt_Light bg-white py-1.5
       hover:scale-[101%] duration-300 text-sm rounded-md items-center justify-center gap-3"
      onClick={() => {
        handleDownLoadPDF(studentID);
      }}
    >
      <Download className="text-blue-500 w-5 h-5" />
      ดาวโหลดผลการเรียน
    </button>
  );
};

export const BulkPDFStudentTranscriptPDF = ({
  groupID,
}: {
  groupID: number;
}) => {
  const handleClick = () => {
    genBulkPDFStudentTranscriptPDF(groupID);
  };

  return (
    <button
      className="flex h-fit px-8 border-[1px] border-gray-300 text-blue-500 font-prompt_Light bg-white py-1.5
       hover:bg-blue-50 duration-300 text-sm rounded-md items-center justify-center gap-3"
      onClick={handleClick}
    >
      <Download className="text-blue-500 w-5 h-5" />
      ดาวโหลดผลการเรียนทั้งห้องเรียน
    </button>
  );
};

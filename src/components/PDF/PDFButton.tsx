"use client";

import {
  genBulkPDFStudentTranscriptPDF,
  genPDFFailedStudentNamelist,
  genPDFStudentNamelistInGroup,
  genPDFStudentScoreInSubjectPDF,
  genPDFStudentTranscriptPDF,
} from "@/lib/PDFGenarate/createPDFFile";
import { Download, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

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
      hover:bg-blue-50 duration-300 text-sm rounded-md items-center justify-center gap-3"
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
       hover:bg-blue-50 duration-300 text-sm rounded-md items-center justify-center gap-3"
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const ok = await genBulkPDFStudentTranscriptPDF(groupID);
      if (ok) {
        toast.success("ดาวน์โหลดสำเร็จ");
      } else {
        toast.error("ผิดพลาด");
      }
    } catch (err) {
      console.error(err);
      toast.error("ผิดพลาด");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="flex h-fit px-8 border-[1px] border-gray-300 text-blue-500 font-prompt_Light bg-white py-1.5
       hover:bg-blue-50 duration-300 text-sm rounded-md items-center justify-center gap-3 disabled:opacity-60"
      onClick={handleClick}
      disabled={isLoading}
      type="button"
    >
      {isLoading ? (
        <LoaderCircle className="text-blue-500 w-5 h-5 animate-spin" />
      ) : (
        <Download className="text-blue-500 w-5 h-5" />
      )}
      ดาวโหลดผลการเรียนทั้งห้องเรียน
    </button>
  );
};

export const PDFFailedStudentNamelistButton = ({
  className,
  currentYear,
  grade,
  year,
}: {
  className: string;
  currentYear: number;
  grade: number;
  year: number;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = async () => {
    try {
      const ok = await genPDFFailedStudentNamelist(
        className,
        currentYear,
        grade,
        year
      );
      if (ok) {
        toast.success("ดาวน์โหลดสำเร็จ");
      } else {
        toast.error("ผิดพลาด");
      }
    } catch (err) {
      console.error(err);
      toast.error("ผิดพลาด");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="flex h-fit px-8 border-[1px] border-gray-300 text-blue-500 font-prompt_Light bg-white py-1.5
       hover:bg-blue-50 duration-300 text-sm rounded-md items-center justify-center gap-3"
      onClick={handleClick}
    >
      {isLoading ? (
        <LoaderCircle className="text-blue-500 w-5 h-5 animate-spin" />
      ) : (
        <Download className="text-blue-500 w-5 h-5" />
      )}
      รายชื่อนักเรียนไม่ผ่านเกณฑ์
    </button>
  );
};

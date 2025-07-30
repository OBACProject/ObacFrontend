"use client";

import { genPDFStudentNamelistInGroup } from "@/lib/PDFGenarate/createPDFFile";
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
      className="flex px-8 border-[1px] border-gray-300 text-gray-700 font-prompt bg-white py-1.5
       hover:scale-[101%] duration-300 rounded-md items-center justify-center gap-3"
      onClick={handleClick}
    >
      <Download className="text-gray-700 w-5 h-5" />
      รายชื่อนักเรียน PDF
    </button>
  );
};

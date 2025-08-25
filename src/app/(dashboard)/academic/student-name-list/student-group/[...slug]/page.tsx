import React from "react";
import Form from "./Form";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { Users } from "lucide-react";
import {
  BulkPDFStudentTranscriptPDF,
  PDFStudentNamelistInGroupButton,
} from "@/components/PDF/PDFButton";
import { ExcelStudentNamelistInGroupButton } from "@/components/Excel/ExcelButton";
import EducateSuccessPopUp from "@/components/common/Popup/EducateSuccessPopUp";

type PageParams = Promise<{ slug: number[] }>;

export default async function Page({ params }: { params: PageParams }) {
  const { slug: ParamsArray } = await params;
  const [studentGroupID, year] = ParamsArray;

  return (
    <div className="pl-12 bg-gray-100">
      <div className="py-4 w-full px-5 flex justify-between items-center">
        <HeaderLabel
          Icon={<Users className="h-6 w-6" />}
          title="รายชื่อนักเรียนในห้อง"
        />
        <div>
          <div className="flex items-center gap-2 justify-end">
            <PDFStudentNamelistInGroupButton
              groupID={studentGroupID}
              year={year}
            />
            <ExcelStudentNamelistInGroupButton
              groupID={String(studentGroupID)}
            />
            <BulkPDFStudentTranscriptPDF groupID={studentGroupID} />
           
          </div>
        </div>
      </div>
      <div className="px-5 pb-5">
        <Form GroupID={studentGroupID} />
      </div>
    </div>
  );
}

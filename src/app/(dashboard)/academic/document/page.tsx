import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import PDFButtonTemplate from "@/components/PDF/PDFButtonTemplate";
import {
  genGradSummaryForStudent,
  genGroupSummaryGrad,
} from "@/lib/PDFGenarate/generateFile";
import { BookCheck, FileText, GraduationCap } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="pl-10 py-5 h-full">
      <div className="w-full px-5">
        <div className="py-5 w-full">
          <HeaderLabel
            title="ตัวอย่างเอกสาร"
            Icon={<FileText className="text-white h-7 w-7 " />}
          />
        </div>
        <div className=" rounded-md w-full py-5 grid grid-cols-4 gap-5 px-5">
          <PDFButtonTemplate
            title={"ใบสรุปผลการเรียน"}
            description="สรุปผลการเรียนทุกเทอมของนักเรียน (ต่อคน)"
            icon={<GraduationCap className="w-5 h-5 text-white" />}
            icon_bg="bg-blue-500"
            doc_type="pdf"
            onClick={genGradSummaryForStudent}
          />
          <PDFButtonTemplate
            title={"ใบตรวจเกรด"}
            description="เอกสารตรวจเกรดนักเรียนทั้งห้อง"
            icon={<BookCheck className="w-5 h-5 text-white" />}
            icon_bg="bg-blue-500"
            doc_type="pdf"
            onClick={genGroupSummaryGrad}
          />
        </div>
      </div>
    </div>
  );
}

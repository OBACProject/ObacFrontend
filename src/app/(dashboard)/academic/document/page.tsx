import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import PDFButtonTemplate from "@/components/PDF/PDFButtonTemplate";
import {
  genGradSummaryForStudent,
  genGroupSummaryGrad,
  genStudentNameInSubject,
  genStudentNamelistInGroup,
  genStudentNotPassList,
  genStudentScoreInSubject,
} from "@/lib/PDFGenarate/generateFile";
import {
  Bolt,
  BookCheck,
  BookOpenCheck,
  FileText,
  GraduationCap,
  Users,
  X,
} from "lucide-react";
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
            icon_bg="bg-gradient-to-r from-red-600 to-orange-400"
            doc_type="pdf"
            onClick={genGradSummaryForStudent}
          />
          <PDFButtonTemplate
            title={"ใบตรวจเกรด"}
            description="เอกสารตรวจเกรดนักเรียนทั้งห้อง"
            icon={<BookCheck className="w-5 h-5 text-white" />}
            icon_bg="bg-gradient-to-r from-red-600 to-orange-400"
            doc_type="pdf"
            onClick={genGroupSummaryGrad}
          />{" "}
          <PDFButtonTemplate
            title={"ใบตรวจเกรด"}
            description="เอกสารตรวจเกรดนักเรียนทั้งห้อง"
            icon={<BookCheck className="w-5 h-5 text-white" />}
            icon_bg="bg-gradient-to-r from-teal-500 to-blue-500"
            doc_type="excel"
            onClick={genGroupSummaryGrad}
          />
          <PDFButtonTemplate
            title={"ใบรายชื่อนักเรียนในห้อง"}
            description="รายชื่อนักเรียนในหนึ่งห้องเรียน"
            icon={<Users className="w-5 h-5 text-white" />}
            icon_bg="bg-gradient-to-r from-red-600 to-orange-400"
            doc_type="pdf"
            onClick={genStudentNamelistInGroup}
          />
          <PDFButtonTemplate
            title={"ใบรายชื่อนักเรียนในวิชา"}
            description="รายชื่อนักเรียนในวิชานั้นๆ"
            icon={<Users className="w-5 h-5 text-white" />}
            icon_bg="bg-gradient-to-r from-red-600 to-orange-400"
            doc_type="pdf"
            onClick={genStudentNameInSubject}
          />
          <PDFButtonTemplate
            title={"ใบคะแนนนักเรียนในวิชา"}
            description="รายชื่อนักเรียนและคะแนนในวิชานั้นๆ"
            icon={<Bolt className="w-5 h-5 text-white" />}
            icon_bg="bg-gradient-to-r from-red-600 to-orange-400"
            doc_type="pdf"
            onClick={genStudentScoreInSubject}
          />
          <PDFButtonTemplate
            title={"ใบรายชื่อนักเรียนที่ไม่ผ่านเกณฑ์"}
            description="ชื่อนักเรียนที่ไม่ผ่านเกณ์ในสายชั้น"
            icon={<X className="w-5 h-5 text-white" />}
            icon_bg="bg-gradient-to-r from-red-600 to-orange-400"
            doc_type="pdf"
            onClick={genStudentNotPassList}
          />
        </div>
        <div className="border-t border-gray-300">
          <div className="py-5 w-full">
            <HeaderLabel
              title="เอกสาร รวบ3ป. "
              Icon={<BookOpenCheck className="text-white h-7 w-7 " />}
            />
          </div>
          <div className="px-10">
            <p className="w-full border-dashed border-2 border-gray-500 text-2xl text-gray-700 font-prompt py-10  text-center rounded-lg">
            กำลังพัฒนา...
          </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

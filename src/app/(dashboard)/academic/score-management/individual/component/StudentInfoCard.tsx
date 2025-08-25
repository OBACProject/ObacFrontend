"use client";
import { User, BookOpen, GraduationCap, Building } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { GetStudentGradeDetailDto } from "@/dto/gradDto";
import type { StudentTranscriptData } from "@/dto/studentDto";
import { PDFStudentTransScriptButton } from "@/components/PDF/PDFButton";

interface Props {
  student: StudentTranscriptData;
  scoreFileData: GetStudentGradeDetailDto | null;
  onDownloadPDF?: () => void;
}

export const StudentInfoCard = ({
  student,
  scoreFileData,
  onDownloadPDF,
}: Props) => {
  return (
    <Card className="shadow-lg border-0 px-10 bg-gradient-to-r from-white to-blue-50 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          <Link
            href={`/academic/student-details/${student.studentId}`}
            className="flex-1 p-6 hover:bg-white/50 transition-colors duration-200 rounded-l-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
              
                <Badge
                  variant="outline"
                  className="text-blue-700 text-lg border-blue-200"
                >
                  <GraduationCap className="w-6 h-6 mr-2" />
                  {student.class}.{student.groupName}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-600 mb-1">
                      ชื่อ-นามสกุล
                    </span>
                    <span className="text-lg font-semibold text-slate-800">
                      {student.prefix} {student.thaiName} {student.thaiLastName}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-600 mb-1">
                      หลักสูตร
                    </span>
                    <span className="text-base text-slate-700">
                      {student.programName}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-600 mb-1">
                      รหัสนักเรียน
                    </span>
                    <span className="text-lg font-mono font-semibold text-blue-600">
                      {student.studentCode}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-600 mb-1">
                      สาขาวิชา
                    </span>
                    <span className="text-base text-slate-700">
                      {student.subProgramName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Faculty Information */}
              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Building className="w-5  h-5 text-slate-500" />
                  <span className="text-base text-slate-600">
                    สายการเรียน :
                  </span>
                  <span className="text-base text-slate-700">
                    {student.facultyName}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Download Actions Section */}
          <div className="p-6 border-l border-slate-200 bg-slate-50/50">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                ดาวน์โหลดเอกสาร
              </h3>
              {/* 
              {scoreFileData && (
                <Button
                  onClick={onDownloadPDF}
                  variant="default"
                  size="sm"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md"
                >
                  <Download className="w-4 h-4 mr-2" />
                  ผลการเรียน PDF
                </Button>
              )} */}

              <PDFStudentTransScriptButton studentID={student.studentId} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

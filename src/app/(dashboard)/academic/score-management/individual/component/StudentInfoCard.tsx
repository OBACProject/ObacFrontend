"use client"
import { Download, User, BookOpen, GraduationCap } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { GetStudentGradeDetailDto } from "@/dto/gradDto"
import type { StudentTranscriptData } from "@/dto/studentDto"

interface Props {
  student: StudentTranscriptData
  scoreFileData: GetStudentGradeDetailDto | null
  onDownloadPDF?: () => void
}

export const StudentInfoCard = ({ student, scoreFileData, onDownloadPDF }: Props) => {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-r from-white to-blue-50 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          <Link
            href={`/academic/student-details/${student.studentId}`}
            className="flex-1 p-6 hover:bg-white/50 transition-colors duration-200 rounded-l-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-medium"
                >
                  <User className="w-4 h-4 mr-2" />
                  ข้อมูลนักเรียน
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-200">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {student.class}.{student.groupName}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-600 mb-1">ชื่อ-นามสกุล</span>
                    <span className="text-lg font-semibold text-slate-800">
                      {student.thaiName} {student.thaiLastName}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-600 mb-1">หลักสูตร</span>
                    <span className="text-base text-slate-700">{student.programName}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-600 mb-1">รหัสนักเรียน</span>
                    <span className="text-lg font-mono font-semibold text-blue-600">{student.studentCode}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-600 mb-1">สาขาวิชา</span>
                    <span className="text-base text-slate-700">{student.subProgramName}</span>
                  </div>
                </div>
              </div>

              {/* Faculty Information */}
              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-600">คณะ:</span>
                  <span className="text-sm text-slate-700">{student.facultyName}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Download Actions Section */}
          <div className="p-6 border-l border-slate-200 bg-slate-50/50">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">ดาวน์โหลดเอกสาร</h3>

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
              )}

              <Button
                variant="outline"
                size="sm"
                disabled
                className="w-full border-slate-300 text-slate-500 cursor-not-allowed bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Transcript
                <span className="ml-2 text-xs">(เร็วๆ นี้)</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

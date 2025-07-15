"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTableStudentInfo } from "@/components/common/MainTable/table_style_studentInfo"
import { StudentPopup, type SubjectData } from "../component/studentPopup"
import type { TermQuery, YearData } from "@/dto/studentDto"
import { BookOpen, TrendingUp, Award, AlertTriangle } from "lucide-react"

interface Props {
  termData: YearData[]
  studentData: {
    name: string
    studentCode: string
  }
}

export const StudentTermTable = ({ termData, studentData }: Props) => {
  const [isOpenPopUp, setIsOpenPopUp] = useState(false)
  const [subjectDataByRowClick, setSubjectDataByRowClick] = useState<SubjectData | null>(null)

  const handleRowClick = (subjectName: string) => {
    const subject = termData.flatMap((year) => year.termQuery.filter((term) => term.subject_name === subjectName))[0]

    if (subject) {
      setSubjectDataByRowClick(subject)
      setIsOpenPopUp(true)
    }
  }

  const columns = [
    {
      label: "รายวิชา",
      key: "subject_name",
      className: "w-5/12 px-4 py-3 text-left font-medium",
    },
    {
      label: "รหัสวิชา",
      key: "subject_code",
      className: "w-2/12 px-4 py-3 text-center font-medium",
    },
    {
      label: "หน่วยกิต",
      key: "credit",
      className: "w-2/12 px-4 py-3 text-center font-medium",
    },
    {
      label: "เกรด",
      key: "finalGrade",
      className: "w-3/12 px-4 py-3 text-center font-medium",
      render: (row: any) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${row.isFailed ? "text-red-800" : "text-green-800"}`}>
          {row.finalGrade}
        </span>
        // <Badge
        //   variant={row.isFailed ? "destructive" : "default"}
        //   className={`px-3 py-1 font-semibold ${
        //     row.isFailed ? " text-red-800 border-red-200" : " text-green-800 border-green-200"
        //   }`}
        // >
        //   {row.finalGrade}
        // </Badge>
      ),
    },
  ]

  const calculateGpa = (termQuery: TermQuery[], totalCredit: number) => {
    let totalGradePoints = 0

    termQuery.forEach((term) => {
      const grade = Number.parseFloat(term.finalGrade)
      const credit = Number.parseFloat(term.credit)

      if (!isNaN(grade) && !isNaN(credit)) {
        totalGradePoints += grade * credit
      }
    })

    if (totalCredit <= 0) return "0.00"

    const gpa = totalGradePoints / totalCredit
    return gpa.toFixed(2)
  }

  const getGpaColor = (gpa: string) => {
    const gpaValue = Number.parseFloat(gpa)
    if (gpaValue >= 3.5) return "text-green-600 bg-green-50 border-green-200"
    if (gpaValue >= 3.0) return "text-blue-600 bg-blue-50 border-blue-200"
    if (gpaValue >= 2.5) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const getFailedSubjectsCount = (termQuery: TermQuery[]) => {
    return termQuery.filter(
      (term) => (term.remark !== "ผ." && term.remark !== null && term.remark !== "") || term.finalGrade === "0",
    ).length
  }

  return (
    <div className="space-y-6">
      {termData.map((year, index) => {
        const transformedData = year.termQuery.map((term) => ({
          subject_name: term.subject_name,
          subject_code: term.subject_code,
          credit: term.credit,
          finalGrade: term.remark === null || term.remark === "" ? term.finalGrade : term.remark,
          isFailed: (term.remark !== "ผ." && term.remark !== null && term.remark !== "") || term.finalGrade === "0",
        }))

        const gpa = calculateGpa(year.termQuery, year.totalCredit)
        const failedCount = getFailedSubjectsCount(year.termQuery)

        return (
          <Card key={index} className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg text-white">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">
                      ปีการศึกษา {year.year} เทอม {year.term.slice(0, 1)}
                    </CardTitle>
                    <p className="text-sm text-slate-600 mt-1">
                      {year.termQuery.length} รายวิชา • {year.totalCredit} หน่วยกิต
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Badge variant="outline" className={`px-4 py-2 font-semibold ${getGpaColor(gpa)}`}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    GPA: {gpa}
                  </Badge>

                  {failedCount > 0 && (
                    <Badge variant="destructive" className="px-4 py-2">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      ไม่ผ่าน: {failedCount} วิชา
                    </Badge>
                  )}

                  {failedCount === 0 && (
                    <Badge className="px-4 py-2 bg-green-600 hover:bg-green-700">
                      <Award className="w-4 h-4 mr-2" />
                      ผ่านทุกวิชา
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <DataTableStudentInfo
                columns={columns}
                data={transformedData}
                pagination={year.termQuery.length}
                onRowClick={(item: any) => handleRowClick(item.subject_name)}
              />
            </CardContent>
          </Card>
        )
      })}

      <StudentPopup
        isOpen={isOpenPopUp}
        onClose={() => setIsOpenPopUp(false)}
        student={studentData}
        subjects={subjectDataByRowClick}
      />
    </div>
  )
}

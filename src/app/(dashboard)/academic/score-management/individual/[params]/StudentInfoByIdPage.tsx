"use client"
import { useEffect, useState } from "react"
import { GraduationCap, AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import type { GetStudentGradeDetailDto } from "@/dto/gradDto"
import type { StudentTranscriptData, YearData } from "@/dto/studentDto"
import { StudentInfoCard } from "./../component/StudentInfoCard"
import { mockStudentTranscriptList } from "./mockData"
import { StudentTermTable } from "./../component/StudentTermTable"

const getStudentDataByIdMock = (id: number): Promise<StudentTranscriptData | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const student = mockStudentTranscriptList.find((s) => s.studentId === id) || null
      resolve(student)
    }, 600)
  })
}
// it should be replaced with actual API call in 

const StudentInfoByIdPage = ({ params }: { params: { params: string } }) => {
  const studentId = Number(params.params)
  const [studentTranscriptDataById, setStudentTranscriptDataById] = useState<StudentTranscriptData | null>(null)
  const [termData, setTermData] = useState<YearData[]>([])
  const [scoreFileData, setScoreFileData] = useState<GetStudentGradeDetailDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getStudentDataByIdMock(studentId)
      if (!data) {
        throw new Error("ไม่พบข้อมูลนักเรียน")
      }

      setStudentTranscriptDataById(data)
      setTermData(data.year)
    } catch (error) {
      console.error("Error fetching student data:", error)
      setError(error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [studentId])

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-blue-600">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
            <span className="text-xl font-medium">กำลังโหลดข้อมูลนักเรียน...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={fetchData} className="ml-4 bg-transparent">
              <RefreshCw className="h-4 w-4 mr-2" />
              ลองใหม่
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!studentTranscriptDataById) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <Alert className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>ไม่พบข้อมูลนักเรียน</AlertDescription>
        </Alert>
      </div>
    )
  }

  function SummaryGradPDF(scoreFileData: GetStudentGradeDetailDto) {
    throw new Error("Function not implemented.")
  }

  return (
    <section className="min-h-screen  bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container max-w-9xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white shadow-lg">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">จัดการคะแนนรายบุคคล</h1>
            <p className="text-slate-600 mt-1">ระบบจัดการและติดตามผลการเรียนของนักเรียน</p>
          </div>
        </div>

        <StudentInfoCard
          student={studentTranscriptDataById}
          scoreFileData={scoreFileData}
          onDownloadPDF={() => {
            if (scoreFileData) SummaryGradPDF(scoreFileData)
          }}
        />

        <StudentTermTable
          termData={termData}
          studentData={{
            name: `${studentTranscriptDataById.thaiName} ${studentTranscriptDataById.thaiLastName}`,
            studentCode: studentTranscriptDataById.studentCode,
          }}
        />
      </div>
    </section>
  )
}

export default StudentInfoByIdPage

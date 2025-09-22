"use client"
import { GetGroupSummaryGradeRequest } from "@/lib/api/models/grade/grade.request"
import { ClassroomGradeClient } from "../classroomClient"
import { useGetGroupSummaryGradeQuery } from "@/lib/api/hooks/queries/grade.queries"
import { ClassroomGradeManagementSkeleton } from "./classroomGradeManagementSkeleton"

interface Props {
  groupId: number
  term: string
  year: number
}

export function ClassroomGradeManagement({ groupId, term, year }: Props) {
  try {
    const params: GetGroupSummaryGradeRequest = { groupId, term, year }
    
    const {data , isLoading , isError} = useGetGroupSummaryGradeQuery(params)
    if (isLoading) {
        return <ClassroomGradeManagementSkeleton />
        }
    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                <h2 className="text-xl font-semibold text-red-600 mb-2">เกิดข้อผิดพลาด</h2>
                <p className="text-gray-600">ไม่สามารถโหลดข้อมูลห้องเรียนได้</p>
                </div>
            </div>
            )
        }
    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-600 mb-2">ไม่มีข้อมูล</h2>
                <p className="text-gray-600">ไม่พบข้อมูลห้องเรียนที่ระบุ</p>
                </div>
            </div>
        )
    }
    
    return <ClassroomGradeClient initialData={data} />
  } catch (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">เกิดข้อผิดพลาด</h2>
          <p className="text-gray-600">ไม่สามารถโหลดข้อมูลห้องเรียนได้</p>
        </div>
      </div>
    )
  }
}
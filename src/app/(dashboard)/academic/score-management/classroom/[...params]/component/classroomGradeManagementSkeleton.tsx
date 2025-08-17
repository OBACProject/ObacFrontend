import { TableSkeleton } from "@/components/common/TableSkeleton/tableSkeleton"
import { Users } from "lucide-react"
import HeaderLabel from "@/components/common/labelText/HeaderLabel"

export function ClassroomGradeManagementSkeleton() {
  return (
    <>
      <div className="w-full flex justify-start">
        <HeaderLabel Icon={<Users className="h-7 w-7" />} title={"จัดการคะแนน ห้องเรียน"}/>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded w-80 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-9 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-9 bg-gray-200 rounded w-40 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <TableSkeleton rows={10} columns={8} />
      </div>
    </>
  )
}
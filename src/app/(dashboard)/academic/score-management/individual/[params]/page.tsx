import { Suspense } from "react"
import StudentInfoByIdPage from "./StudentInfoByIdPage"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TableSkeleton } from "@/components/common/TableSkeleton/tableSkeleton"

const LoadingSkeleton = () => {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="h-8 w-64" />
      </div>

      <Card className="shadow-sm border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-4">
                <Skeleton className="w-24 h-8 rounded-md" />
                <Skeleton className="w-32 h-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="w-40 h-10 rounded-full" />
              <Skeleton className="w-36 h-10 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        < TableSkeleton />
      </Card>

      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3 text-blue-600">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-lg font-medium">กำลังโหลดข้อมูลนักเรียน...</span>
        </div>
      </div>
    </div>
  )
}

const StudentPageWrapper = ({ params }: { params: { params: string } }) => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <StudentInfoByIdPage params={params} />
    </Suspense>
  )
}

export default StudentPageWrapper

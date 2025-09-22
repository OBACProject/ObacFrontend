// app/academic/score-management/classroom/[...params]/page.tsx
import { Suspense } from "react"
import { ClassroomGradeManagement } from "./component/ClassroomGradeManagement"
import { ClassroomGradeManagementSkeleton } from "./component/classroomGradeManagementSkeleton"

interface PageProps {
  params: { params: string[] } 
}

export default function ClassroomGradeManagementPage({ params }: PageProps) {
  const [groupId, term, year] = params.params

  return (
    <div className="mx-4 sm:mx-10 lg:mx-10 p-4 space-y-6">
      <Suspense fallback={<ClassroomGradeManagementSkeleton />}>
        <ClassroomGradeManagement
          groupId={parseInt(groupId)}
          term={term}
          year={parseInt(year)}
        />
      </Suspense>
    </div>
  )
}

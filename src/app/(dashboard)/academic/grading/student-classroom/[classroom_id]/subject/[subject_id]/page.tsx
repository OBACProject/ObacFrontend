import { Suspense } from "react";
import dynamic from "next/dynamic";

// const ExportFile = dynamic(() => import("./content/ExportFile"), { ssr: false });
const EditableGradePage = dynamic(() => import("./content/FilterTable"), {
  ssr: false,
});
// const GradeClassroomInfoFilter = dynamic(() => import("./content/"), { ssr: false });

export default function Page({
  params,
}: {
  params: { classroom_id: string; subject_id: string };
}) {
  console.log("Student Classroom ID:", params.classroom_id);
  console.log("Subject ID:", params.subject_id);
  return (
    <div className="h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="mx-4 sm:mx-10 lg:mx-10 p-4">
          <h1 className="text-2xl font-bold text-gray-900">
            ระบบจัดการคะแนนรายวิชา
          </h1>
          <p className="text-gray-600 mt-1">Grading System</p>
        </div>
      </header>
      <main className="mx-4 sm:mx-10 lg:mx-10 p-4">


        <Suspense fallback={<div>Loading table...</div>}>
          <EditableGradePage
            subjectId={params.subject_id}
            classroom={params.classroom_id}
          />
        </Suspense>
      </main>
    </div>
  );
}

import React, { Suspense } from "react";
import Loading from "./../component/loading";
import StudentClassroomContent from "./content/studentClassroomContent";
export default function page() {
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
        <Suspense fallback={<Loading />}>
          <StudentClassroomContent />
        </Suspense>
      </main>
    </div>
  );
}

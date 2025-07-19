import React, { Suspense } from "react";
import Loading from "./../component/loading";
import StudentClassroomContent from "./content/studentClassroomContent";
export default function page() {
  return (
    <div className="h-screen bg-gray-50">

      <main className="mx-4 sm:mx-10 lg:mx-10 p-4">
        <Suspense fallback={<Loading />}>
          <StudentClassroomContent />
        </Suspense>
      </main>
    </div>
  );
}

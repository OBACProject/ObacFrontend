"use client";
import { Suspense } from "react"; // Import Suspense for loading state handling
import Main from "./Main";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subject");
  const scheduleId = searchParams.get("schedule");
  const isComplete = searchParams.get("iscomplete");

  return (
    <Suspense
      fallback={
        <div className="border-2 px-5 grid place-items-center border-gray-200 text-gray-500 text-3xl font-semibold  py-20  border-dashed">
          Loading...
        </div>
      }
    >
      {/* Only render Main component after subjectId, scheduleId, and isComplete are available */}
      {subjectId && scheduleId && isComplete ? (
        <Main
          subjectId={Number(subjectId)}
          scheduleId={Number(scheduleId)}
          isComplete={isComplete} // Ensure isComplete is converted to boolean
        />
      ) : (
        <div className="border-2 px-5 grid place-items-center border-gray-200 text-gray-500 text-3xl font-semibold  py-20  border-dashed">
          Isloading...
        </div>
      )}
    </Suspense>
  );
}

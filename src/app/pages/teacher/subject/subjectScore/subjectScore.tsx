"use client";
import Main from "./Main";
import { useSearchParams } from "next/navigation";

export default function OtherPage() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subject");
  const scheduleId = searchParams.get("schedule");
  const isComplete = searchParams.get("iscomplete");

  // Render a loading state if params are not available
  if (!subjectId || !scheduleId || !isComplete) {
    return (
      <div className="border-2 px-5 grid place-items-center border-gray-200 text-gray-500 text-3xl font-semibold py-20 border-dashed">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Main
        subjectId={Number(subjectId)}
        scheduleId={Number(scheduleId)}
        isComplete={isComplete}
      />
    </div>
  );
}

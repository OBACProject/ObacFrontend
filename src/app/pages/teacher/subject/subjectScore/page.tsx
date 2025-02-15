"use client";
import Main from "./Main";
import { useSearchParams } from "next/navigation";
export default function Page() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subject");
  const shceduleId = searchParams.get("schedule");
  const iscomplete = searchParams.get("iscomplete");
  return (
    <div>
      {subjectId && subjectId && iscomplete ? (
        <Main
          subjectId={Number(subjectId)}
          scheduleId={Number(shceduleId)}
          isComplete={Boolean(iscomplete)}
        />
      ) : (
        <div className="border-2 px-5 grid place-items-center border-gray-200 text-gray-500 text-3xl font-semibold  py-20  border-dashed">
          Isloading...
        </div>
      )}
    </div>
  );
}

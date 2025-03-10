"use client";
import Main from "./Main";
import { useSearchParams } from "next/navigation";

export default function OtherPage() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subject");
  const groupId = searchParams.get("group");
  const isComplete = searchParams.get("iscomplete");
  const term = searchParams.get("term")
  const year = searchParams.get("year")

  if (!subjectId || !groupId || !isComplete || !term || !year) {
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
        groupId={Number(groupId)}
        isComplete={isComplete}
        term={term}
        year={Number(year)}
      />
    </div>
  );
}

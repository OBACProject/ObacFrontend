"use client";
import Main from "./Main";
import { useSearchParams } from "next/navigation";

export default function OtherPage() {
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subject");
  const groupId = searchParams.get("group");
  const isComplete = ""
  const term = "1"
  const year = 2440
  const className = "00000"


  return (
    <div>
      <Main
        subjectId={Number(subjectId)}
        groupId={Number(groupId)}
        isComplete={isComplete}
        term={term}
        year={Number(year)}
        className={className}
      />
    </div>
  );
}

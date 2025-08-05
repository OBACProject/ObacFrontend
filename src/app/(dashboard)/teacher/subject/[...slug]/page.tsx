import React from "react";
import Form from "./Form";

type PageParams = Promise<{ slug: string[] }>;

export default async function page({ params }: { params: PageParams }) {
  const { slug: paramArray } = await params;
  const [scheduleID, ecsubjectName, ecsubjectCode, engroupName] = paramArray;
  const subjectName = decodeURIComponent(ecsubjectName || "");
  const subjectCode = decodeURIComponent(ecsubjectCode || "");
  const groupName = decodeURIComponent(engroupName || "");
  return (
    <div className="w-full px-4 ">
      <div>
        <Form
          scheduleID={scheduleID}
          subjectCode={subjectCode}
          subjectName={subjectName}
          groupName={groupName}
        />
      </div>
    </div>
  );
}

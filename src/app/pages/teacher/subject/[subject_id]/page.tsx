import React from "react";
import SubjectTableForm from "./subjectTableForm";
import MenuBar from "./menuBar";

const getSubjectData = async () => {
  const res = await fetch(`Path`);
  await res.json();
  return res;
};

export default async function Page({
  params,
}: {
  params: Promise<{ subject_id: string }>;
}) {
  const slug = (await params).subject_id;

  return (
    <div className="pl-20">
        <MenuBar slug={slug} />
        <div className="px-5 py-5">
          <SubjectTableForm slug={slug} studentData={[]} />  
        </div>
      
    </div>
  );
}

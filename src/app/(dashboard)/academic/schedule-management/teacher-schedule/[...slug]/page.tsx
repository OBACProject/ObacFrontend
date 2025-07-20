import React from "react";
import Form from "./Form";
export const dynamic = "force-dynamic";

type PageParams = Promise<{ slug: string[] }>;

export default async function Page({ params }: { params: PageParams }) {
  const { slug: paramArray } = await params;
  const [term, year, teacherID] = paramArray;

  return (
    <div className="px-10">
      <div className="lg:flex justify-center pb-20">
        <Form term={term} year={year} teacherID={teacherID} />
      </div>
    </div>
  );
}

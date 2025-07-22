import React from "react";
import Form from "./Form";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { GraduationCap } from "lucide-react";
export const dynamic = "force-dynamic";

type PageParams = Promise<{ slug: string[] }>;

export default async function Page({ params }: { params: PageParams }) {
  const { slug: paramArray } = await params;
  const [term, year, teacherID] = paramArray;

  return (
    <div className="px-10">
       <div className="py-5 px-10 flex justify-start">
        <HeaderLabel
          Icon={<GraduationCap className="h-5 w-5 text-white" />}
          title={"ตารางสอนของอาจารย์"}
        />
      </div>
      <div className="lg:flex justify-center pb-20">
        <Form term={term} year={year} teacherID={teacherID} />
      </div>
    </div>
  );
}

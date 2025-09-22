import React from "react";
import Form from "./Form";
import { Table } from "lucide-react";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
export const dynamic = "force-dynamic";

type PageParams = Promise<{ slug: string[] }>;

export default async function Page({ params }: { params: PageParams }) {
  const { slug: paramArray } = await params;
  const [term, year, groupID] = paramArray;

  return (
    <div className="px-10">
      <div className="py-5 px-10 flex justify-start">
        <HeaderLabel
          Icon={<Table className="h-5 w-5 text-white" />}
          title={"ตารางเรียนห้องเรียน"}
        />
      </div>
      <div className="lg:flex justify-center ">
        <Form term={term} year={year} groupId={Number(groupID)} />
      </div>
    </div>
  );
}

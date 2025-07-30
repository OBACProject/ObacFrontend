import React from "react";
import Form from "./Form";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { Users } from "lucide-react";

type PageParams = Promise<{ id: number }>;

export default async function Page({ params }: { params: PageParams }) {
  const { id: Params } = await params;
  const studentGroupID = Params;

  return (
    <div className="pl-12">
      <div className="py-4 w-full px-5">
        <HeaderLabel
          Icon={<Users className="h-6 w-6" />}
          title="รายชื่อนักเรียนในห้อง"
        />
      </div>
      <div className="px-5 pb-5">
        <Form GroupID={studentGroupID} />
      </div>
    </div>
  );
}

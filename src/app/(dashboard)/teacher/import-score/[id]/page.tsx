import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { ScrollText } from "lucide-react";
import React from "react";
import Form from "./Form";

interface StudentScoreProps {
  params: {
    id: string;
  };
}

export default function StudentScore({ params }: StudentScoreProps) {
  return (
    <div className="py-4 px-10">
      <div className="fixed ">
        <HeaderLabel
          Icon={<ScrollText className="w-7 h-7" />}
          title={"ฟอร์มกรอกคะแนน รหัสนักเรียน : " + params.id}
        />
      </div>
      <Form id={params.id}/>
    </div>
  );
}

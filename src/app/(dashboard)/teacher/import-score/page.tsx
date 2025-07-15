import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { ScrollText } from "lucide-react";
import React from "react";
import Form from "./Form";

export default function StudentScore() {
  return (
    <div className="py-4 px-10">
      <div className="fixed ">
        <HeaderLabel
          Icon={<ScrollText className="h-7 w-7 text-white" />}
          title={"Import Score (Student)"}
        />
      </div>
      <Form />
    </div>
  );
}

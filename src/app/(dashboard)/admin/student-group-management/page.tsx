import React from "react";
import Form from "./form";
import { University } from "lucide-react";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";

export default function page() {
  return (
    <div className="pl-16 pb-5">
      <div className="flex py-3 px-10 justify-start">
      <HeaderLabel title="ระบบจัดการห้องเรียน" Icon={<University className="h-6 w-6 text-white"/>}/>
      </div>
      <Form />
    </div>
  );
}

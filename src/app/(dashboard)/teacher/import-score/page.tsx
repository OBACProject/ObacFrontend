import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { ArchiveRestore } from "lucide-react";
import React from "react";
import Form from "./Form";

export default function ImportScorePage() {
  return (
    <div className="py-4 px-10">
      <HeaderLabel
        Icon={<ArchiveRestore className="w-7 h-7" />}
        title="นำเข้าคะแนนนักเรียน"
      />
      <Form />
    </div>
  );
}

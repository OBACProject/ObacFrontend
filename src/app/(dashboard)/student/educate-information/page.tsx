import SciFiBackgroundNormal from "@/app/styles/bg-normal";
import { HeadTitle } from "@/components/common/Card/card-student-profile";
import { BookOpen } from "lucide-react";
import React from "react";
import Form from "./form";

export default function page() {
  return (
    <SciFiBackgroundNormal>
      <div className="min-h-screen h-full">
        <HeadTitle
          icon={<BookOpen className="w-6 h-6 text-white" />}
          title={"ผลการเรียน"}
        />
        <div className="py-2">
          <Form />
        </div>
        
      </div>
    </SciFiBackgroundNormal>
  );
}

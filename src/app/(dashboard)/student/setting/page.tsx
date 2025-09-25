import SciFiBackgroundNormal from "@/app/styles/bg-normal";
import { HeadTitle } from "@/components/common/Card/card-student-profile";
import { Settings } from "lucide-react";
import React from "react";
import Form from "./Form";

export default function page() {
  return (
    <SciFiBackgroundNormal>
      <div className="min-h-screen h-full">
        <div className="py-2">
          <HeadTitle
            icon={<Settings className="w-6 h-6 text-white" />}
            title={"ตั้งค่าผู้ใช้งาน"}
          />
        </div>
        <Form />
      </div>
    </SciFiBackgroundNormal>
  );
}

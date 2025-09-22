import SciFiBackgroundNormal from "@/app/styles/bg-normal";
import { HeadTitle } from "@/components/common/Card/card-student-profile";
import { Calendar } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen h-full">
      <div className="py-2">
        <HeadTitle
          icon={<Calendar className="w-6 h-6 text-white" />}
          title={"ตั้งค่าผู้ใช้งาน"}
        />
      </div>
    </div>
  );
}

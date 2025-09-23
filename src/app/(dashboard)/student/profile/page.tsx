"use client";
import SciFiBackgroundNormal from "@/app/styles/bg-normal";
import {
  HeadTitle,
} from "@/components/common/Card/card-student-profile";
import { UserRound } from "lucide-react";
import React from "react";
import Form from "./form";

export default function StudentProfilePage() {
  return (
    <SciFiBackgroundNormal>
      <div className="min-h-screen ">
        <HeadTitle
          icon={<UserRound className="w-6 h-6 text-white" />}
          title={"ประวัติส่วนตัว"}
        />
        <Form/>
      </div>
    </SciFiBackgroundNormal>
  );
}

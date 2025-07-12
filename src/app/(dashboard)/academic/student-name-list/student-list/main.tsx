"use client"
import React, { useState } from "react";
import { StudentListPage } from "./studentList";
import { UserRound } from "lucide-react";
import HeaderLabel from "@/components/common/labelText/HeaderLabel";

interface individualStudentInfoData {
  studentId: number;
  studentName: string;
}

export default function Main() {
  const [activeTab, setActiveTab] = useState<string>("individual");

  const [individualStudent, setIndividualStudentInfoData] =
    useState<individualStudentInfoData>();
  const handleTab = (tab: string) => {
    if (activeTab === tab) return;
    setActiveTab(tab);
    if (activeTab === "individualStudentInfo") {
      setIndividualStudentInfoData(undefined);
    }
  };

  const handleSelectedStudentData = (data: individualStudentInfoData) => {
    setIndividualStudentInfoData(data);
    setActiveTab("individualStudentInfo");
  };
  return (
    <div className="py-2 w-full">
       <div className="w-full justify-start px-10 flex">
        <HeaderLabel Icon={<UserRound className="h-7 w-7 text-white"/>} bg_icon="bg-blue-500" title="รายชื่อนักเรียนทั้งหมด" className="text-blue-600"/>
      </div>
      {activeTab === "individual" && (
        <StudentListPage
          handleTab={handleTab}
          handleData={handleSelectedStudentData}
        />
      )}

    </div>
  );
}

"use client"
import React, { useState } from "react";
import { StudentListPage } from "./studentList";
import { UserRound } from "lucide-react";

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
      <div className="flex justify-start pt-3 items-center">
        <h1 className="px-10 py-2 rounded-3xl  text-xl w-fit border border-gray-100 shadow-md   text-blue-700 flex gap-2 items-center">
          <UserRound className="h-8 w-8"/>
          รายชื่อนักเรียนทั้งหมด
        </h1>
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

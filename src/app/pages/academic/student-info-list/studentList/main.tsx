"use client"
import React, { useState } from "react";
import { StudentListPage } from "./studentList";

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
    <div className="py-5 w-full">
      <div className="flex justify-center py-5 items-center">
        <h1 className="px-10 w-fit text-white bg-gray-700 rounded-3xl py-1 text-lg">
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

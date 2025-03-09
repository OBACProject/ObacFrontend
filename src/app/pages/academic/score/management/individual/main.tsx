"use client";

import {  ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { StudentListPage } from "./studentList";
import { StudentInfoByIdPage } from "./studentInfo";
import { usePathname } from "next/navigation";

interface IndividualStudentInfoData {
  studentId: number;
  studentName: string;
}

export function Main() {
  const [activeTab, setActiveTab] = useState<string>("individual");
  const [individualStudent, setIndividualStudentInfoData] = useState<
    IndividualStudentInfoData | undefined
  >();

  const pathname = usePathname();

  // Load tab state from localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTabStudent");
    const savedStudentData = localStorage.getItem("selectedStudentData");


    if (savedTab) {
      setActiveTab(savedTab);
      if (savedTab === "individualStudentInfo" && savedStudentData) {
        setIndividualStudentInfoData(JSON.parse(savedStudentData));
      }
    }
  }, []);

  // Remove stored data when leaving the page
  useEffect(() => {
    if (pathname === "/pages/academic/score/management/individual") {
      localStorage.removeItem("activeTabClassroom");
      localStorage.removeItem("selectedClassroomData");
    }
  }, []);

  const handleTab = (tab: string) => {
    if (activeTab === tab) return;

    setActiveTab(tab);
    localStorage.setItem("activeTabStudent", tab);

    if (tab === "individual") {
      setIndividualStudentInfoData(undefined);
      localStorage.removeItem("selectedStudentData");
    }
  };

  const handleSelectedStudentData = (data: IndividualStudentInfoData) => {
    setIndividualStudentInfoData(data);
    setActiveTab("individualStudentInfo");

    localStorage.setItem("selectedStudentData", JSON.stringify(data));
    localStorage.setItem("activeTabStudent", "individualStudentInfo");
  };

  return (
    <header className="flex flex-col">
      <div className="w-full flex gap-2  items-center transition-all duration-500 ease-in-out justify-between">
        {/* Breadcrumb */}
        <div className="mt-2 w-auto flex py-1 bg-slate-100 rounded-tr-full overflow-hidden rounded-br-full relative">
          <div className="flex items-center">
            <button
              className="min-w-32 w-auto mx-10 hover:bg-slate-50  rounded-md"
              onClick={() => handleTab("individual")}
            >
              <span className="text-black text-sm font-bold">
                รายชื่อนักเรียนทั้งหมด
              </span>
            </button>
            <ChevronRight />
          </div>
          {individualStudent && (
            <div className="flex items-center">
              <button
                className="min-w-32 w-auto mx-10 hover:bg-slate-50  rounded-md"
                onClick={() => handleTab("individualStudentInfo")}
              >
                <span className="text-black text-sm font-bold">
                  {individualStudent.studentName}
                </span>
              </button>
              <ChevronRight />
            </div>
          )}
        </div>
      </div>

      {/* Active tab content */}
      {activeTab === "individual" && (
        <StudentListPage
          handleTab={handleTab}
          handleData={handleSelectedStudentData}
        />
      )}
      {activeTab === "individualStudentInfo" && individualStudent && (
        <StudentInfoByIdPage studentId={individualStudent.studentId} />
      )}
    </header>
  );
}

"use client";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { StudentListPage } from "./studentList";
import { StudentInfoByIdPage } from "./studentInfo";

interface individualStudentInfoData {
  studentId: number;
  studentName: string;
}

export function Main() {
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
  console.log(individualStudent);
  return (
    <header className="flex flex-col">
      <div className="w-full flex gap-2 transition-all duration-500 ease-in-out justify-between">
        {/* Breadcrumb */}
        <div className="mt-4 w-auto flex p-2 bg-slate-100 rounded-tr-full overflow-hidden rounded-br-full relative">
          <div className="flex items-center">
            <button
              className="min-w-32 w-auto mx-10 hover:bg-slate-50 p-1 rounded-md"
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
                className="min-w-32 w-auto mx-10 hover:bg-slate-50 p-1 rounded-md"
                onClick={() => handleTab("individual")}
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

      {/* active tab */}
      {activeTab === "individual" && (
        <StudentListPage
          handleTab={handleTab}
          handleData={handleSelectedStudentData}
        />
      )}
      {activeTab === "individualStudentInfo" && individualStudent && (
        <StudentInfoByIdPage studentId={individualStudent.studentId} />
      )}
      {/* Tables */}
    </header>
  );
}

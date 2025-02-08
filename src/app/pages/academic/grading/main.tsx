"use client";
import { useState } from "react";
import { Subject } from "./subject/subject";
import { ClassSubjectPage } from "./classSubject/classSubject";
import { ChevronRight } from "lucide-react";
import { AcademicStudentInfo } from "./studentInfo/AcademicStudentClassInfo";

export interface ClassSubject {
  id: number;
  year: number;
  term: number;
  subjectName: string | undefined;
}

export function Main() {
  // State for classSubjectPage, subject tabs, and other selections
  const [classSubjectData, setClassSubjectData] = useState<{
    id: number;
    year: number;
    term: number;
    subjectName: string;
  } | null>(null);

  const [classInfoData, setClassInfoData] = useState<{
    subjectId: number;
    scheduleSubjectId: number;
    room: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<string>("subject");

  const handleTab = (tab: string) => {
    if (activeTab === tab) {
      return; // Exit early if the tab is already set
    }
    setActiveTab(tab);

    // case select subject tab
    if (classSubjectData && tab === "subject") {
      setClassSubjectData(null); // Reset classSubjectPage when switching to subject
    }
    // case select class tab
    if (classSubjectData && classInfoData && tab === "class") {
      setClassInfoData(null); // Reset infoClass when switching to class
    }
  };

  const handleSelectedSubjectData = (data: {
    id: number;
    year: number;
    term: number;
    subjectName: string;
  }) => {
    setClassSubjectData(data);
  };

  const handleSelectedClassInfo = (data: {
    subjectId: number;
    scheduleSubjectId: number;
    room: string;
  }) => {
    setClassInfoData(data);
  };

  return (
    <>
      {/* Breadcrumb and navigation */}
      <div className="w-full flex gap-2 transition-all duration-500 ease-in-out">
        <div className="mt-4 w-auto flex p-2 bg-slate-100 rounded-tr-full overflow-hidden rounded-br-full relative">
          {/* Subject Tab */}
          <div className="flex items-center">
            <button
              className="min-w-32 w-auto mx-10 hover:bg-slate-50 p-1 rounded-md whitespace-nowrap"
              onClick={() => handleTab("subject")}
            >
              <span className="text-black text-sm font-bold">
                {classSubjectData?.subjectName ?? "Subject"}
              </span>
            </button>
            <ChevronRight />
          </div>

          {/* Class Tab */}
          {classSubjectData && (
            <div className="w-full flex items-center justify-center">
              <button
                className="min-w-32 w-auto mx-10 hover:bg-slate-50 p-1 rounded-md whitespace-nowrap"
                onClick={() => handleTab("class")}
              >
                <span className="text-black text-sm font-bold">
                  {classInfoData?.room ?? "Class"}
                </span>
              </button>
              <ChevronRight />
            </div>
          )}
          {classSubjectData && classInfoData && (
            <div className="w-full flex items-center justify-center">
              <button
                className="min-w-32 w-auto mx-10 hover:bg-slate-50 p-1 rounded-md whitespace-nowrap"
                onClick={() => handleTab("infoClass")}
              >
                <span className="text-black text-sm font-bold">Info Class</span>
              </button>
              <ChevronRight />
            </div>
          )}
        </div>
      </div>

      {/* Conditional Rendering for Active Tab */}
      {activeTab === "subject" && (
        <div className="opacity-100 transition-opacity duration-500 ease-in-out">
          <Subject
            handleTab={handleTab}
            handleSelectedData={handleSelectedSubjectData}
          />
        </div>
      )}

      {activeTab === "class" && classSubjectData && (
        <div className="opacity-100 transition-opacity duration-500 ease-in-out">
          <ClassSubjectPage
            classSubjecPassingData={classSubjectData}
            handleTab={handleTab}
            handleSelectedData={handleSelectedClassInfo}
          />
        </div>
      )}

      {activeTab === "infoClass" && classSubjectData && classInfoData && (
        <>
          <AcademicStudentInfo
            subjectId={classInfoData.subjectId}
            scheduleSubjectId={classInfoData.scheduleSubjectId}
            room={classInfoData.room}
          />
        </>
      )}
    </>
  );
}

"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { ClassroomGrading } from "./classroom";
import { ClassroomByGroupId } from "./classroomByGroupId";

export interface ClassroomByGroupIdProps {
  groupId: number;
  term: string;
  year: string;
  classroom: string;
}

export function Main() {
  const [activeTab, setActiveTab] = useState<string>("classroom");
  const handleTab = (tab: string) => {
    if (activeTab === tab) return;
    setActiveTab(tab);
    if (activeTab === "classroomByGroupId") {
      setSelectedClassroomData(undefined);
    }
  };
  const [selectedClassroomData, setSelectedClassroomData] =
    useState<ClassroomByGroupIdProps>();

  const handleSelectedClassRoomDataByGroupId = (
    data: ClassroomByGroupIdProps
  ) => {
    setSelectedClassroomData(data);
    setActiveTab("classroomByGroupId");
  };

  return (
    <header className="flex flex-col">
      <div className="w-full flex gap-2 transition-all duration-500 ease-in-out justify-between">
        {/* Breadcrumb */}
        <div className="mt-4 w-auto flex p-2 bg-slate-100 rounded-tr-full overflow-hidden rounded-br-full relative">
          <div className="flex items-center">
            <button
              className="min-w-32 w-auto mx-10 hover:bg-slate-50 p-1 rounded-md"
              onClick={() => handleTab("classroom")}
            >
              <span className="text-black text-sm font-bold">
                รายชื่อห้องทั้งหมด
              </span>
            </button>
            <ChevronRight />
          </div>
          {selectedClassroomData && (
            <div className="w-full flex items-center justify-center">
              <button
                className="min-w-32 w-auto  hover:bg-slate-50 p-1 rounded-md"
                onClick={() => handleTab("classroomByGroupId")}
              >
                <span className="text-black text-sm font-bold">
                  {selectedClassroomData.classroom}
                </span>
              </button>
              <ChevronRight />
            </div>
          )}
        </div>
      </div>

      {/* active Tab */}
      {activeTab === "classroom" && (
        <ClassroomGrading
          handleTab={handleTab}
          handleSelectedData={handleSelectedClassRoomDataByGroupId}
        />
      )}
      {activeTab === "classroomByGroupId" && selectedClassroomData && (
        <ClassroomByGroupId
          groupId={selectedClassroomData.groupId}
          classroom={selectedClassroomData.classroom}
          term={selectedClassroomData.term}
          year={selectedClassroomData.year}
        />
      )}
    </header>
  );
}

"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ClassroomGrading } from "./classroom";
import { ClassroomByGroupId } from "./classroomByGroupId";
import { usePathname } from "next/navigation";

export interface ClassroomByGroupIdProps {
  groupId: number;
  term: string;
  year: string;
  classroom: string;
}

export function Main() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Get from localStorage on initial load
    return localStorage.getItem("activeTab") || "classroom";
  });

  const pathname = usePathname();

  const [selectedClassroomData, setSelectedClassroomData] = useState<
    ClassroomByGroupIdProps | undefined
  >(() => {
    const storedData = localStorage.getItem("selectedClassroomData");
    return storedData ? JSON.parse(storedData) : undefined;
  });

  const handleTab = (tab: string) => {
    if (activeTab === tab) return;

    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);

    if (tab !== "classroomByGroupId") {
      setSelectedClassroomData(undefined);
      localStorage.removeItem("selectedClassroomData");
    }
  };

  const handleSelectedClassRoomDataByGroupId = (
    data: ClassroomByGroupIdProps
  ) => {
    setSelectedClassroomData(data);
    localStorage.setItem("selectedClassroomData", JSON.stringify(data));
    setActiveTab("classroomByGroupId");
    localStorage.setItem("activeTab", "classroomByGroupId");
  };

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("activeTab");
        localStorage.removeItem("selectedClassroomData");
      }
    };

    return () => {
      if (pathname !== "/academic/grading/management/classroom") {
        handleRouteChange();
      }
    };
  }, [pathname]);

  return (
    <header className="flex flex-col">
      <div className="w-full flex gap-2 transition-all duration-500 ease-in-out justify-between">
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
                className="min-w-32 w-auto hover:bg-slate-50 p-1 rounded-md"
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

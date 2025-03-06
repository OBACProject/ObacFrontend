"use client";

import { ArrowUpDown, ChevronRight, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { ClassroomGrading } from "./classroom";
import { ClassroomByGroupId } from "./classroomByGroupId";
import { usePathname } from "next/navigation";
import Link from "next/link";

export interface ClassroomByGroupIdProps {
  groupId: number;
  term: string;
  year: string;
  classroom: string;
}

export function Main() {
  const [activeTab, setActiveTab] = useState<string>("classroom");
  const [selectedClassroomData, setSelectedClassroomData] = useState<
    ClassroomByGroupIdProps | undefined
  >(undefined);

  const pathname = usePathname();
  console.log(pathname);
  // Load state from localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTabClassroom");
    const savedData = localStorage.getItem("selectedClassroomData");

    if (savedTab) {
      setActiveTab(savedTab);
      if (savedTab === "classroomByGroupId" && savedData) {
        setSelectedClassroomData(JSON.parse(savedData));
      }
    }
  }, []);

  useEffect(() => {
    if (pathname === "/pages/academic/grading/management/classroom") {
      localStorage.removeItem("activeTabClassroom");
      localStorage.removeItem("selectedClassroomData");
    }
  }, []);

  const handleTab = (tab: string) => {
    if (activeTab === tab) return;

    setActiveTab(tab);
    localStorage.setItem("activeTabClassroom", tab);

    if (tab === "classroom") {
      setSelectedClassroomData(undefined);
      localStorage.removeItem("selectedClassroomData");
    }
  };

  const handleSelectedClassRoomDataByGroupId = (
    data: ClassroomByGroupIdProps
  ) => {
    setSelectedClassroomData(data);
    setActiveTab("classroomByGroupId");

    localStorage.setItem("selectedClassroomData", JSON.stringify(data));
    localStorage.setItem("activeTabClassroom", "classroomByGroupId");
  };

  return (
    <header className="flex flex-col">
      <div className="w-full items-center flex gap-2 transition-all duration-500 ease-in-out justify-between">
        <div className="mt-4 w-auto flex p-2 bg-slate-100 items-center rounded-tr-full overflow-hidden rounded-br-full relative">
          <div className="flex items-center">
            <button
              className="min-w-32 max-w-48 w-auto mx-10 hover:bg-slate-50 p-1 rounded-md"
              onClick={() => handleTab("classroom")}
            >
              <span className="text-black text-sm font-bold truncate">
                รายชื่อห้องทั้งหมด
              </span>
            </button>
            <ChevronRight />
          </div>
          {selectedClassroomData && (
            <div className="w-full flex items-center justify-center">
              <button
                className="min-w-32 max-w-48 w-auto mx-10 hover:bg-slate-50 p-1 rounded-md"
                onClick={() => handleTab("classroomByGroupId")}
              >
                <span className="text-black text-sm font-bold truncate">
                  {selectedClassroomData.classroom}
                </span>
              </button>
              <ChevronRight />
            </div>
          )}
        </div>
        <div className="px-5 flex gap-4">
          <Link
            href="/pages/academic/grading/upLevel"
            className="px-10 bg-blue-400 flex h-fit items-center justify-center py-1.5 text-white rounded-md hover:bg-blue-600 gap-2"
          >
            <ArrowUpDown className="w-5 h-5" />
            ปรับเลื่อนชั้น
          </Link>
          <Link
            href="/pages/academic/FailedStudent"
            className="px-10 bg-white border-2 h-fit  border-red-500 hover:bg-red-400 hover:text-white flex items-center justify-center py-1 text-red-500 rounded-md  gap-2"
          >
            <CircleX className="w-5 h-5 " />
            นักเรียนที่ไม่ผ่านเกณฑ์
          </Link>
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

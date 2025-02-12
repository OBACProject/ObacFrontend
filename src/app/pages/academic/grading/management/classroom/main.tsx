"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ClassroomGrading } from "./classroom";

export function Main() {
  const [activeTab, setActiveTab] = useState<string>("classroom");
  const handleTab = (tab: string) => {
    if (activeTab === tab) return;
    setActiveTab(tab);
  };
  const handleSelectedData = (data: { groupId: number; room: string }) => {
    console.log(data);
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
        </div>
      </div>
      {/* active Tab */}
      {activeTab === "classroom" && (
        <ClassroomGrading
          handleTab={handleTab}
          handleSelectedData={handleSelectedData}
        />
      )}
    </header>
  );
}

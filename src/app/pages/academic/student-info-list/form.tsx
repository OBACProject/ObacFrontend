"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ClassroomGrading } from "./classroomGrading";
import { ClassroomByGroupId } from "../grading/management/classroom/classroomByGroupId";

export interface ClassroomByGroupIdProps {
  groupId: number;
  term: string;
  year: string;
  classroom: string;
}

export default function Form() {
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
    <div className="py-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="px-10 py-2 rounded-3xl translate-x-16 text-xl w-fit bg-gray-600 text-white">
          รายชื่อและข้อมูลนักเรียน
        </h1>
        <div className=" flex items-center gap-4  px-10">
          <div className="flex items-center">
            <label className="bg-blue-500 py-1 text-white rounded-l-md px-4">
              รหัสนักเรียน
            </label>
            <input
              type="text"
              className="py-1 px-4 border "
              placeholder="หาด้วยชื่อนักเรียน"
            />
          </div>
          <div>
            <button className="text-sm px-10 py-1 bg-blue-500 rounded-sm text-white hover:bg-blue-600">รายชื่อนักเรียนทั้งหมด</button>
          </div>
        </div>
      </div>
      <div>
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
      </div>
    </div>
  );
}

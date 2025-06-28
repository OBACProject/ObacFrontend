"use client";
import { useState, Suspense } from "react";
import { ClassroomGrading } from "./../../classroom";
import { StudentListPage } from "./../../studentList";
import { Boxes, Users } from "lucide-react";
import { ContentSkeleton } from "./../skeletons/ContentSkeleton";

function StaticHeader({ isToggle, setIsToggle }: { 
  isToggle: boolean; 
  setIsToggle: (value: boolean) => void;
}) {
  return (
    <div className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
      <div className="px-6 py-3 rounded-2xl flex gap-3 items-center border border-gray-200 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
        {isToggle ? (
          <Users className="h-6 w-6 text-blue-600" />
        ) : (
          <Boxes className="h-6 w-6 text-blue-600" />
        )}
        <span className="text-blue-800 font-medium">
          {isToggle ? "จัดการคะแนน (รายบุคคล)" : "จัดการคะแนน (ห้องเรียน)"}
        </span>
      </div>

      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
        <button
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            !isToggle
              ? "bg-blue-500 text-white shadow-sm"
              : "text-blue-600 hover:bg-blue-50"
          }`}
          onClick={() => setIsToggle(false)}
        >
          ห้องเรียน
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            isToggle
              ? "bg-blue-500 text-white shadow-sm"
              : "text-blue-600 hover:bg-blue-50"
          }`}
          onClick={() => setIsToggle(true)}
        >
          รายบุคคล
        </button>
      </div>
    </div>
  );
}

export default function SwitchMenu() {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full space-y-6">
      <StaticHeader isToggle={isToggle} setIsToggle={setIsToggle} />

      <div className="transition-all duration-300 ease-in-out">
        <Suspense fallback={<ContentSkeleton />}>
          {isToggle ? <StudentListPage /> : <ClassroomGrading />}
        </Suspense>
      </div>
    </div>
  );
}
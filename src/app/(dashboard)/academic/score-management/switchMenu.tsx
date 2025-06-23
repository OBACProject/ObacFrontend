"use client";
import { useState } from "react";
import { ClassroomGrading } from "./classroom";
import { StudentListPage } from "./studentList";
import { Boxes, Users } from "lucide-react";

export default function SwitchMenu() {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  return (
    <header className="flex flex-col w-full">
      <div className="w-full flex flex-col gap-4 transition-all duration-500 ease-in-out">
        <div className="w-full flex items-center justify-between">
          <div className="px-10 rounded-3xl flex gap-2 items-center border border-gray-100 shadow-md py-2 text-blue-700 text-xl w-fit">
            {isToggle ? (
              <Users className="h-8 w-8" />
            ) : (
              <Boxes className="h-8 w-8" />
            )}
            {isToggle ? "จัดการคะแนน (รายบุคคล)" : "จัดการคะแนน (ห้องเรียน)"}
          </div>

          <div className="flex gap-2">
            <button
              className={`px-6 py-2 ${
                !isToggle
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-blue-500 text-blue-800 hover:bg-gray-100"
              } duration-300 flex items-center rounded-md shadow`}
              onClick={() => setIsToggle(false)}
            >
              ห้องเรียน
            </button>
            <button
              className={`px-6 py-2 ${
                isToggle
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-blue-500 text-blue-800 hover:bg-gray-100"
              } duration-300 flex items-center rounded-md shadow`}
              onClick={() => setIsToggle(true)}
            >
              รายบุคคล
            </button>
          </div>
        </div>

        {/* Content */}
        {isToggle ? <StudentListPage /> : <ClassroomGrading />}
      </div>
    </header>
  );
}

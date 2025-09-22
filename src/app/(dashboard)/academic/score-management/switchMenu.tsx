"use client";
import { useState, Suspense  } from "react";
import Link from "next/link";
import { ClassroomGrading } from "./classroom";
import { Boxes, FolderInput, Users } from "lucide-react";
import { ClassroomGradingFallback } from "./classroom-grading-falling";
import StudentListPage from "./studentList";


function StaticHeader({
  isToggle,
  setIsToggle,
}: {
  isToggle: boolean;
  setIsToggle: (value: boolean) => void;
}) {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="px-10 rounded-3xl flex gap-2 items-center border border-gray-100 shadow-md bg-white py-2 text-blue-700 text-xl w-fit">
        {isToggle ? (
          <Users className="h-8 w-8" />
        ) : (
          <Boxes className="h-8 w-8" />
        )}
        {isToggle ? "จัดการคะแนน (รายบุคคล)" : "จัดการคะแนน (ห้องเรียน)"}
      </div>

      <div className="flex gap-2">
        <Link href={"/academic/import-score"}
          className="text-gray-600 py-1 rounded-md bg-white border-gray-300 border
        shadow px-6 flex items-center justify-center gap-3 hover:bg-gray-400 group  hover:text-white duration-200 cursor-pointer"
        >
          <FolderInput className="text-gray-600 w-6 h-6 group-hover:text-white duration-200" />{" "}
          เพิ่มคะแนนเข้าระบบ
        </Link>
        <button
          className={`px-6 py-1 ${
            !isToggle
              ? "bg-blue-500 text-white"
              : "bg-white border border-blue-500 text-blue-800 hover:bg-gray-100"
          } duration-300 flex items-center rounded-md shadow`}
          onClick={() => setIsToggle(false)}
        >
          ห้องเรียน
        </button>
        <button
          className={`px-6 py-1 ${
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
  );
}

export default function SwitchMenu() {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  return (
    <header className="flex flex-col w-full">
      <div className="w-full flex flex-col gap-4 transition-all duration-500 ease-in-out">
        <StaticHeader isToggle={isToggle} setIsToggle={setIsToggle} />

        <Suspense fallback={<ClassroomGradingFallback />}>
          {isToggle ? <StudentListPage /> : <ClassroomGrading />}
        </Suspense>
      </div>
    </header>
  );
}

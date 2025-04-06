"use client";

import { ClassroomGrading } from "./classroom";

export function Main() {
  return (
    <header className="flex flex-col">
      <div className="w-full items-center flex gap-2 transition-all duration-500 ease-in-out justify-between">
        <ClassroomGrading />
      </div>
    </header>
  );
}

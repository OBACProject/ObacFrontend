"use client";

import { StudentListPage } from "./studentList";

export function Main() {
  return (
    <header className="flex flex-col">
      <div className="w-full flex gap-2  items-center transition-all duration-500 ease-in-out justify-between">
        <StudentListPage />
      </div>
    </header>
  );
}

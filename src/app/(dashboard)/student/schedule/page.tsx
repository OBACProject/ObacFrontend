"use client";
import { useEffect, useState } from "react";



import Form from "./Form";

export default function Page() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [studentId, setStudentID] = useState<string>("");
  useEffect(() => {

  }, []);
  useEffect(() => {
    setLoading(true);
  }, [studentId]);
  return (
    <div>
      {isLoading && studentId ? (
        <Form student_id={Number(studentId)} />
      ) : (
        <div className="px-10  grid place-items-center py-4">
          <div className="w-full h-full bg-white border-[1px] border-blue-400 rounded-xl py-5 lg:py-10 flex gap-5 lg:gap-10 items-center justify-center h-fit">
            <LoaderCircle className="w-12 h-12 text-blue-400 animate-spin" />
            <h1 className="text-xl text-gray-600 font-prompt">กำลังโหลดข้อมูล... </h1>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

const getStudentUser = async () => {
  try {
    const response = await fetchStudentUser();
    return response;
  } catch (err) {
    console.error("Failed to fetch student by ID:", err);
  }
};

import Form from "./Form";
import { fetchStudentUser } from "@/api/student/studentApi";

export default function Page() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [studentId, setStudentID] = useState<string>("");
  useEffect(() => {
    getStudentUser().then((item: any) => {
      setStudentID(item?.studentId);
    });
  }, []);
  useEffect(() => {
      setLoading(true);
    }, [studentId]);
  return (
    <div>
      {isLoading && studentId ? (
        <Form  student_id={Number(studentId)}/>
      ) : (
        <div className="px-10  grid place-items-center py-4">
          <div className="px-10 animate-pulse py-10 grid place-items-center text-4xl font-extrabold text-gray-600   w-full border-2 border-dashed border-gray-400 rounded-md">
            Loading...
          </div>
        </div>
      )}
    </div>
  );
}

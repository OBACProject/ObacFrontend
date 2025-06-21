"use client";
import { useState, useEffect } from "react";
import React from "react";
import Form from "./Form";
import { fetchTeacherUser } from "@/api/oldApi/teacher/teacherAPI";
const getTeachData = async () => {
  try {
    const teacher = await fetchTeacherUser();
    return teacher;
  } catch (err) {
    console.error("Failed to fetch teacher by ID:", err);
  }
};
export default function Page() {
  const [teacherId, setTeacherId] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getTeachData().then((item: any) => {
      setTeacherId(item?.teacherId);
    });
  }, []);
  useEffect(() => {
    setLoading(true);
  }, [teacherId]);
  return (
    <div className="w-full">
      <div className="flex  py-5 justify-center">
        <p className="py-2 bg-gray-700 rounded-3xl w-fit px-10 text-xl text-white ">
          รายวิชาที่สอน
        </p>
      </div>
      {isLoading ? (
        <div>{teacherId && <Form teacherId={Number(teacherId)} />}</div>
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

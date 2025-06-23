"use client";

import { fetchUpdateStudentStatus } from "@/api/oldApi/student/studentApi";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  onClickPopUp: (value: boolean) => void;
  studentId: number;
  status: string;
};

const UpdateStudentStatus = async (
  id: number,
  status: string
): Promise<boolean> => {
  return await fetchUpdateStudentStatus(id, status);
};

export default function ConfirmChangeStudentsStatus({
  studentId,
  status,
  onClickPopUp,
}: Props) {
  const onChangeStudentStatus = async () => {
    try {
      const isUpdated = await UpdateStudentStatus(studentId, status);

      if (isUpdated) {
        onClickPopUp(false);
        toast.success(`เปลี่ยนสถานะสำเร็จ`);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error("ไม่สามารถปรับสถานะได้");
      }
    } catch (err) {
      console.error("Failed to update student status.");
      toast.error("ไม่สามารถปรับสถานะได้");
    }
  };

  return (
    <div
      className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClickPopUp(false)}
    >
      <div
        className=" bg-white shadow-lg shadow-gray-400   rounded-lg w-fit z-100 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="py-2 text-center text-xl "
          style={{ userSelect: "none" }}
        >
          ยืนยัน
        </div>
        <div className="grid gap-2 px-5">
          <p className="text-center text-sm text-gray-600">
            โปรดตรวจสอบข้อมูลสถานะนักเรียนว่าข้อมูลถูกต้อง
          </p>
          <div className="flex gap-2 justify-center items-center w-full">
            <p className=" text-center">เปลี่ยนสถานะเป็น</p>
            <p className="text-blue-600 line-clamp-1">{status}</p>
          </div>
        </div>
        <div className="flex w-full justify-center gap-5 item-center py-5 px-10">
          <button
            className="px-5 duration-500 text-center w-fit h-fit py-1 hover:bg-gray-500 rounded-md text-white bg-gray-400 "
            onClick={() => onClickPopUp(false)}
          >
            ยกเลิก
          </button>
          <button
            className="px-5 duration-500 text-center w-fit py-1 h-fit  rounded-md text-white bg-blue-500 hover:bg-blue-600"
            onClick={onChangeStudentStatus}
            disabled={!status || !studentId}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}

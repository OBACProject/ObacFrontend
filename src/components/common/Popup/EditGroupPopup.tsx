"use client";

import { StudentGroupItem } from "@/dto/studentGroupItem";
import { useEffect, useState } from "react";

//   id: number;
//   groupName: string;
//   class: string;
//   groupCode: string;
//   level: number;
//   programId: number;
//   programName: string;
//   facultyName: string;
//   subProgramName: string;
//   isPublish: boolean;
//   isComplete: boolean;
//   isActive: boolean;
//   year: number;
//   term: string;
//   total: number;
//   completeStatus: string;
//   section:string;
type EditGroupPopupProps = {
  onClosePopUp: (value: boolean) => void;
  payload: StudentGroupItem;
};

export const EditGroupPopup = ({
  onClosePopUp,
  payload,
}: EditGroupPopupProps) => {
  return (
    <div
      className="fixed duration-1000 animate-appearance inset-0 flex items-center justify-center bg-gray-700 bg-opacity-45"
      onClick={() => onClosePopUp(false)}
    >
      <div
        className="bg-white rounded-md z-50 shadow-lg shadow-gray-500 py-5 lg:w-[30%] grid px-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-prompt w-full text-xl flex justify-center items-center">
          แก้ไขข้อมูลห้อง
        </div>

        <div className=" py-4">
          <div className="w-full text-base  flex items-center gap-4">
            <div className="flex items-center gap-3">
              ห้อง{" "}
              <p className="px-3 py-1 rounded-md bg-slate-200">
                {payload.class}.{payload.groupName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              รหัสห้อง
              <p className="px-3 py-1 rounded-md bg-slate-200">
                {payload.groupCode}
              </p>
            </div>
          </div>
          <div className="w-full text-base  flex items-center gap-4"></div>
        </div>
      </div>
    </div>
  );
};

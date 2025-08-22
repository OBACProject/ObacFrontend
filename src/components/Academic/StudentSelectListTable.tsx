"use client";
import { StudentInfo } from "@/dto/gradDto";
import React, { useState, useEffect } from "react";

interface StudentListTableProps {
  students: StudentInfo[];
  onSelectedIdsChange?: (selectedIds: number[]) => void;
}

export default function StudentSelectListTable({
  students,
  onSelectedIdsChange,
}: StudentListTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const allIds = students.map((s) => s.studentId);
    setSelectedIds(allIds);
  }, [students]);

  useEffect(() => {
    onSelectedIdsChange?.(selectedIds);
  }, [selectedIds, onSelectedIdsChange]);

  const toggleSelection = (studentId: number) => {
    setSelectedIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const allSelected =
    students.length > 0 && selectedIds.length === students.length;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < students.length;

  const toggleAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(students.map((s) => s.studentId));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-base text-white bg-blue-500 py-1 px-5 border rounded-md">
          เลือกแล้ว:&nbsp;
          <span className="font-semibold ">{selectedIds.length}</span>{" "}
          &nbsp;/&nbsp;
          {students.length}
        </div>
        <button
          onClick={toggleAll}
          className={`px-3 py-1.5 rounded-md border text-sm ${
            allSelected
              ? "bg-red-400 text-white hover:bg-red-500"
              : "bg-green-400 hover:bg-green-500 text-white"
          } `}
        >
          {allSelected ? "ยกเลิกเลือกทั้งหมด" : "เลือกทั้งหมด"}
        </button>
      </div>

      <div className="grid shadow-lg rounded-t-md grid-cols-[5%_10%_20%_30%_35%] bg-gray-200 text-gray-700 font-prompt text-lg">
        <div className="py-1 text-center">
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={allSelected}
            ref={(el) => {
              if (el) el.indeterminate = someSelected;
            }}
            onChange={toggleAll}
            title="เลือกทั้งหมด"
          />
        </div>
        <div className="py-1 text-center">ลำดับ</div>
        <div className="py-1 text-center">รหัสนักศึกษา</div>
        <div className="py-1 text-center">ชื่อ - นามสกุล</div>
        <div className="py-1 text-center">เกรดเทอมล่าสุด</div>
      </div>

      {students.map((student, index) => {
        const isSelected = selectedIds.includes(student.studentId);
        return (
          <div
            key={student.studentId}
            onClick={() => toggleSelection(student.studentId)}
            className={`cursor-pointer border border-t-0 border-gray-300 grid grid-cols-[5%_10%_20%_30%_35%] shadow-md items-center ${
              isSelected ? "bg-blue-50" : "bg-white"
            }`}
          >
            <div
              className="text-center py-1"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={isSelected}
                onChange={() => toggleSelection(student.studentId)}
              />
            </div>
            <div className="text-center py-1">{index + 1}</div>
            <div className="text-center py-1">{student.studentCode}</div>
            <div className="text-start py-1 pl-4">
              {student.prefix}
              {student.firstName} {student.lastName}
            </div>
            <div className="text-center py-1">
              {typeof student.gpa === "number" ? student.gpa.toFixed(2) : "-"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

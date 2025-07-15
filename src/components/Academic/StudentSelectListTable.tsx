import React, { useState, useEffect } from "react";

interface Student {
  studentCode: string;
  firstName: string;
  lastName: string;
  gpa: number;
}

interface StudentListTableProps {
  students: Student[];
}

export default function StudentSelectListTable({
  students,
}: StudentListTableProps) {
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  useEffect(() => {
    const allCodes = students.map((s) => s.studentCode);
    setSelectedCodes(allCodes);
  }, [students]);

  const toggleSelection = (studentCode: string) => {
    setSelectedCodes((prev) =>
      prev.includes(studentCode)
        ? prev.filter((code) => code !== studentCode)
        : [...prev, studentCode]
    );
  };

  return (
    <div>
      <div className="grid shadow-lg rounded-t-md grid-cols-[5%_10%_20%_30%_35%] bg-gray-200 text-gray-700 font-prompt text-lg">
        <div className="py-1 text-center">เลือก</div>
        <div className="py-1 text-center">ลำดับ</div>
        <div className="py-1 text-center">รหัสนักศึกษา</div>
        <div className="py-1 text-center">ชื่อ - นามสกุล</div>
        <div className="py-1 text-center">เกรดเทอมล่าสุด</div>
      </div>

      {students.map((student, index) => {
        const isSelected = selectedCodes.includes(student.studentCode);

        return (
          <div
            key={student.studentCode}
            onClick={() => toggleSelection(student.studentCode)}
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
                onChange={() => toggleSelection(student.studentCode)}
              />
            </div>
            <div className="text-center py-1">{index + 1}</div>
            <div className="text-center py-1">{student.studentCode}</div>
            <div className="text-start py-1 pl-4">
              {student.firstName} {student.lastName}
            </div>
            <div className="text-center py-1">{student.gpa.toFixed(2)}</div>
          </div>
        );
      })}
    </div>
  );
}

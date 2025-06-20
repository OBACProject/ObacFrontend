import React from "react";

interface Student {
  studentCode: string;
  firstName: string;
  lastName: string;
  gpa: number;
}

interface StudentListTableProps {
  students: Student[];
}

export default function StudentListTable({ students }: StudentListTableProps) {
  return (
    <div>
      <div className="grid shadow-lg grid-cols-[10%_20%_30%_40%] bg-white border-t-2 border-b-2 border-gray-400 text-gray-800 text-lg">
        <div className="py-1 text-lg text-center">ลำดับ</div>
        <div className="py-1 text-lg text-center">รหัสนักศึกษา</div>
        <div className="py-1 text-lg text-center">ชื่อ - นามสกุล</div>
        <div className="py-1 text-lg text-center">เกรดเทอมล่าสุด</div>
      </div>
      {students.map((student, index) => (
        <div
          key={index}
          className="border border-t-0 border-gray-300 bg-white text-black grid grid-cols-[10%_20%_15%_15%_40%] shadow-md"
        >
          <div className="text-center py-1 border-r border-gray-300">
            {index + 1}
          </div>
          <div className="text-center py-1 border-r border-gray-300">
            {student.studentCode}
          </div>
          <div className="text-start py-1 pl-8">{student.firstName}</div>
          <div className="text-start py-1 border-r border-gray-300">
            {student.lastName}
          </div>
          <div className="text-center py-1">{student.gpa.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}

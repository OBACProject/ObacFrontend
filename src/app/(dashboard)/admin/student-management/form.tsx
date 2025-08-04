"use client";
import React, { useEffect, useState } from "react";
import { Box } from "lucide-react";
import NameListScheduleTable, {
  ColumnConfig,
} from "@/components/Academic/table/NameListScheduleTable";
import { GetAllStudents } from "@/api/student/route";
import { GetAllStudent } from "@/dto/studentDto";

export default function StudentAllListPage() {
  const [students, setStudents] = useState<GetAllStudent[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await GetAllStudents();
      if (data) setStudents(data);
      else console.error("ไม่พบข้อมูลนักเรียน");
    };

    fetchStudents();
  }, []);

  const studentColumns: ColumnConfig<GetAllStudent>[] = [
    { label: "No.", width: "5%", render: (_, i) => i + 1 },
    {
      label: "ระดับชั้น",
      width: "5%",
      render: (item) => `${item.class} ${item.groupName}`,
    },
    {
      label: "รหัสห้อง",
      width: "10%",
      render: (item) => item.groupCode,
    },
    {
      label: "รหัสนักเรียน",
      width: "10%",
      render: (item) => item.studentCode,
    },
    {
      label: "ชื่อ",
      width: "15%",
      render: (item) => `${item.prefix} ${item.firstName}`,
      className: "text-start lg:pl-6 line-clamp-1",
    },
    {
      label: "นามสกุล",
      width: "15%",
      render: (item) => item.lastName,
      className: "text-start lg:pl-6 line-clamp-1",
    },
    {
      label: "สถานะ",
      width: "30%",
      render: (item) => item.status || "-",
      className: "flex justify-center",
    },
  ];

  return (
    <div className="py-6 w-full">
      <div className="w-full px-10 mb-4">
        <h1 className="text-2xl font-bold text-blue-700">รายชื่อนักเรียนทั้งหมด</h1>
      </div>
      <div className="px-10">
        <NameListScheduleTable
          data={students}
          icon={<Box className="h-6 w-6 text-white" />}
          title="รายชื่อนักเรียนทั้งหมดในระบบ"
          columns={studentColumns}
          rowHref={(item) => `/academic/student-details/${item.id}`}
          emptyText="ไม่มีข้อมูลนักเรียน"
        />
      </div>
    </div>
  );
}

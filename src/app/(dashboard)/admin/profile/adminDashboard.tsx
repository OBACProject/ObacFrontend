"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Users, GraduationCap, ClipboardList, LibraryBig, UserPen } from "lucide-react";
import ProfileCard from "@/components/Academic/ProfileCard";

// การ์ดสถิติแบบกดได้
function StatCard({
  title,
  value,
  unit = "คน",
  icon: Icon,
  gradient,
  hoverGradient,
  route,
}: {
  title: string;
  value: number | string;
  unit?: string;
  icon: React.ElementType; // Icon component
  gradient: string; // tailwind gradient background
  hoverGradient: string; // hover gradient
  route: string; // route
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(route)}
      className={`
        ${gradient} hover:${hoverGradient}
        transition-all duration-300 ease-in-out
        rounded-2xl shadow-lg text-white
        px-8 py-6 text-left
        focus:outline-none focus:ring-4 focus:ring-black/10
        transform hover:-translate-y-1
        flex flex-col justify-between
      `}
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="bg-white/20 p-3 rounded-full">
          <Icon className="h-8 w-8" />
        </div>
        <div className="text-lg font-medium">{title}</div>
      </div>
      <div className="text-5xl font-extrabold leading-none tracking-tight">
        {value} <span className="text-3xl font-semibold">{unit}</span>
      </div>
    </button>
  );
}

export default function AdminDashboard() {
  // TODO: ถ้ามี API นับจำนวนจริง ให้มาใส่ตรงนี้แทนค่าจำลอง
  const totalStudents = 400;
  const totalTeachers = 50;
  const totalRegistrar = 10;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* แถวบน: การ์ดสถิติ 3 ใบ + โปรไฟล์ */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 px-6 lg:px-10 py-10">
        {/* การ์ดสถิติ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <StatCard
            title="จำนวนนักเรียนในระบบ"
            value={totalStudents}
            icon={UserPen}
            gradient="bg-gradient-to-r from-sky-400 to-sky-600"
            hoverGradient="from-sky-500 to-sky-700"
            route="/admin/student-management"
          />
          <StatCard
            title="จำนวนครูในระบบ"
            value={totalTeachers}
            icon={GraduationCap}
            gradient="bg-gradient-to-r from-orange-400 to-red-500"
            hoverGradient="from-orange-500 to-red-600"
            route="/admin/teacher-management"
          />
          <StatCard
            title="จำนวนฝ่ายทะเบียนในระบบ"
            value={totalRegistrar}
            icon={LibraryBig}
            gradient="bg-gradient-to-r from-violet-500 to-purple-700"
            hoverGradient="from-violet-600 to-purple-800"
            route="/admin/academic-management"
          />
        </div>

        {/* โปรไฟล์ */}
        <div className="w-full lg:w-[360px] shrink-0">
          <ProfileCard username="ภัทรจาริน นภากาญจน์" rolename="ฝ่ายทะเบียน" />
        </div>
      </div>
    </div>
  );
}

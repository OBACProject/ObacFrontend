"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, LibraryBig, UserPen } from "lucide-react";
import ProfileCard from "@/components/Academic/ProfileCard";
import StatCard from "@/components/common/Card/card-stat";
import { GetUserCount } from "@/api/user/userAPI";
import { GetUserCountRespond } from "@/dto/userDto";


export default function AdminDashboard() {
  const [counts, setCounts] = useState<GetUserCountRespond | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await GetUserCount();
        setCounts(data);
      } catch (err) {
        console.error("โหลดข้อมูลผู้ใช้ล้มเหลว:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 px-6 lg:px-10 py-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <StatCard
            title="จำนวนนักเรียนในระบบ"
            value={counts?.totalStudentCount ?? 0}
            icon={UserPen}
            gradient="bg-gradient-to-r from-sky-400 to-sky-600"
            hoverGradient="from-sky-500 to-sky-700"
            route="/admin/student-management"
          />
          <StatCard
            title="จำนวนครูในระบบ"
            value={counts?.totalTeacherCount ?? 0}
            icon={GraduationCap}
            gradient="bg-gradient-to-r from-orange-400 to-red-500"
            hoverGradient="from-orange-500 to-red-600"
            route="/admin/teacher-management"
          />
          <StatCard
            title="จำนวนฝ่ายทะเบียนในระบบ"
            value={counts?.totalAcademicCount ?? 0}
            icon={LibraryBig}
            gradient="bg-gradient-to-r from-violet-500 to-purple-700"
            hoverGradient="from-violet-600 to-purple-800"
            route="/admin/academic-management"
          />
        </div>

   
        <div className="w-full lg:w-[360px] shrink-0">
          <ProfileCard username="ภัทรจาริน นภากาญจน์" rolename="ฝ่ายทะเบียน" />
        </div>
      </div>
    </div>
  );
}

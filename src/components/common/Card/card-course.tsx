'use client';

import { iconMap } from "@/resource/home/sidebarData";
import React from "react";
import Link from "next/link";

interface CourseCardProps {
  iconName: string;
  title: string;
  href: string;
}

export default function CourseCard({ iconName, title, href }: CourseCardProps) {
  const Icon = iconMap[iconName];

  return (
    <Link href={href} className="group">
      <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-6 hover:bg-blue-100 transition-all cursor-pointer">
        {Icon && <Icon className="h-10 w-10 text-blue-600 mb-3 group-hover:text-blue-800 transition-colors" />}
        <h3 className="text-base font-prompt_Light text-blue-900 text-center">{title}</h3>
      </div>
    </Link>
  );
}

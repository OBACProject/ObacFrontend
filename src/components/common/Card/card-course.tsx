'use client';

import React from "react";
import { iconMap } from "@/lib/iconMap";

interface CourseCardProps {
  iconName: string;
  title: string;
}

export default function CourseCard({ iconName, title }: CourseCardProps) {
  const Icon = iconMap[iconName];

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-6 hover:bg-blue-100 transition-all">
      {Icon && <Icon className="h-10 w-10 text-blue-600 mb-3" />}
      <h3 className="text-base font-prompt_Light text-blue-900 text-center">{title}</h3>
    </div>
  );
}
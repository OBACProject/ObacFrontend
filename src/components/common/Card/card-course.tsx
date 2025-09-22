"use client";

import { useId } from "react";
import { iconMap } from "@/resource/home/sidebarData";
import Link from "next/link";

interface CourseCardProps {
  iconName: string;
  title: string;
  href: string;
}

export default function CourseCard({ iconName, title, href }: CourseCardProps) {
  const Icon = iconMap[iconName];
  const gradId = useId();

  return (
    <Link href={href} className="group">
      <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-6 hover:bg-gray-50 transition-all cursor-pointer">
        {Icon && (
          <Icon className="h-10 w-10 mb-3" stroke={`url(#${gradId})`}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </Icon>
        )}
        <p className="text-base line-clamp-1 font-prompt_Light text-gray-900 text-center">
          {title}
        </p>
      </div>
    </Link>
  );
}

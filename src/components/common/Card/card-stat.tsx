"use client";

import React from "react";
import { useRouter } from "next/navigation";

type StatCardProps = {
  title: string;
  value: number | string;
  unit?: string;
  icon: React.ElementType;
  gradient: string;
  hoverGradient: string;
  route: string;
};

export default function StatCard({
  title,
  value,
  unit = "คน",
  icon: Icon,
  gradient,
  hoverGradient,
  route,
}: StatCardProps) {
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

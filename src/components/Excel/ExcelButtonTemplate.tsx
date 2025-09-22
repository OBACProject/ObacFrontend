"use client";
import { Download, FileSpreadsheet } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  icon_bg: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function ExcelButtonTemplate({
  title,
  description,
  icon,
  icon_bg,
  onClick,
  disabled = false,
  loading = false,
}: Props) {
  return (
    <div className="rounded-lg border border-gray-300 p-4">
      <div className="flex justify-between">
        <div className={`p-2 rounded-lg ${icon_bg} shadow-md`}>{icon}</div>
        <div className="flex items-center gap-1 text-green-700 text-[12px] rounded-full px-2 py-0.5 border font-semibold font-prompt border-green-300 bg-green-50 h-fit">
          <FileSpreadsheet className="w-3 h-3" />
          EXCEL
        </div>
      </div>
      <div className="grid gap-2 mt-2">
        <h1 className="text-base font-semibold font-prompt">{title}</h1>
        <p className="text-sm text-gray-500 font-prompt">{description}</p>
        <button
          className={`flex text-white py-1.5 rounded-md items-center justify-center gap-3 font-prompt transition-colors ${
            disabled || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          onClick={() => {
            if (!disabled && !loading) {
              onClick();
            }
          }}
          disabled={disabled || loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              กำลังสร้าง...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              ดาวน์โหลด
            </>
          )}
        </button>
      </div>
    </div>
  );
}
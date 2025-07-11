"use client";

import { Download } from "lucide-react";
import React, { useEffect } from "react";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  icon_bg: string;
  doc_type: "pdf" | "excel";
  onClick:()=>void;
}

export default function PDFButtonTemplate({
  title,
  description,
  icon,
  icon_bg,
  doc_type,
  onClick
}: Props) {
  return (
    <div className="rounded-lg border border-gray-300 p-4">
      <div className="flex justify-between">
        <div className={`p-2 rounded-lg ${icon_bg} `}>{icon}</div>
        <p className="text-black text-[12px] rounded-full px-2 py-0.5 border font-semibold font-prompt border-gray-300 h-fit">
          {doc_type === "pdf" ? "PDF" : "EXCEL"}
        </p>
      </div>
      <div className="grid gap-2 mt-2">
        <h1 className="text-base font-semibold">{title}</h1>
        <p className="text-sm text-gray-500 ">{description}</p>
        <button className="flex text-white bg-black py-1.5 hover:bg-gray-700 rounded-md items-center justify-center gap-3"
        onClick={()=>{onClick()}}>
          <Download /> ดาวน์โหลด
        </button>
      </div>
    </div>
  );
}

import HeaderLabel from "@/components/common/labelText/HeaderLabel";
import { CircleArrowDown, Paperclip } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="pl-10 py-5">
      <div className="w-full px-5">
        <div className="py-5 w-full">
          <HeaderLabel
            title="ตัวอย่างเอกสาร"
            Icon={<Paperclip className="text-blue-600 w-5 h-5" />}
          />
        </div>
        <div className="border border-gray-200 rounded-md w-full py-5 grid grid-cols-4 gap-5 px-5">
          <button className="px-5 py-1 text-gray-700 font-prompt text-lg  bg-slate-200 rounded-md hover:bg-blue-100 flex justify-center gap-2 items-center">
            <CircleArrowDown className="text-black w-5 h-5" />
            ใบตรวจเกรด
          </button>
           <button className="px-5 py-1 text-gray-700 font-prompt text-lg  bg-slate-200 rounded-md hover:bg-blue-100 flex justify-center gap-2 items-center">
            <CircleArrowDown className="text-black w-5 h-5" />
            ใบสรุปผลการเรียน
          </button>
           <button className="px-5 py-1 text-gray-700 font-prompt text-lg  bg-slate-200 rounded-md hover:bg-blue-100 flex justify-center gap-2 items-center">
            <CircleArrowDown className="text-black w-5 h-5" />
            ใบรายชื่อ
          </button>
           <button className="px-5 py-1 text-gray-700 font-prompt text-lg  bg-slate-200 rounded-md hover:bg-blue-100 flex justify-center gap-2 items-center">
            <CircleArrowDown className="text-black w-5 h-5" />
            ใบคะแนนประจำวิชา
          </button>
           <button className="px-5 py-1 text-gray-700 font-prompt text-lg  bg-slate-200 rounded-md hover:bg-blue-100 flex justify-center gap-2 items-center">
            <CircleArrowDown className="text-black w-5 h-5" />
            ใบ รวบ 3 ป
          </button>
           <button className="px-5 py-1 text-gray-700 font-prompt text-lg  bg-slate-200 rounded-md hover:bg-blue-100 flex justify-center gap-2 items-center">
            <CircleArrowDown className="text-black w-5 h-5" />
            ใบตรวจเกรด
          </button>

        </div>
      </div>
    </div>
  );
}

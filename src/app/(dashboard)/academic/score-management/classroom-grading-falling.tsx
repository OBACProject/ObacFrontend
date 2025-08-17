import { Loader2, LoaderCircle } from "lucide-react";

export function ClassroomGradingFallback() {
  return (
    <div className="w-full mt-2 border-2 border-dashed rounded-md border-gray-400 grid place-items-center py-20 text-3xl text-blue-400 font-semibold items-center">
      <div className="w-full h-full bg-white border-[1px] border-blue-400 rounded-xl py-5 lg:py-10 flex gap-5 lg:gap-10 items-center justify-center h-fit">
        <LoaderCircle className="w-12 h-12 text-blue-400 animate-spin" />
        <h1 className="text-xl text-gray-600 font-prompt">กำลังโหลดข้อมูล... </h1>
      </div>
    </div>
  );
}
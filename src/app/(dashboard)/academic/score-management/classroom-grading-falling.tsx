import { Loader2 } from "lucide-react";

export function ClassroomGradingFallback() {
  return (
    <div className="w-full mt-2 border-2 border-dashed rounded-md border-gray-400 grid place-items-center py-20 text-3xl text-blue-400 font-semibold items-center">
      <p className="flex gap-2">
        <Loader2 className="h-10 w-10 animate-spin" />
        Loading...
      </p>
    </div>
  );
}
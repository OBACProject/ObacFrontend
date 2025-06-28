import { Loader2 } from "lucide-react";

export function PageSkeleton() {
  return (
    <div className="w-full space-y-6">
      {/* Header Skeleton */}
      <div className="bg-white p-4 rounded-lg shadow-sm border animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-48 h-6 bg-gray-200 rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-20 h-10 bg-gray-200 rounded-md"></div>
            <div className="w-20 h-10 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="animate-pulse space-y-4">
          {/* Filter Row */}
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-1">
                <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                <div className="w-full h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          
          {/* Table Header */}
          <div className="flex gap-4 pt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-1 h-6 bg-gray-200 rounded"></div>
            ))}
          </div>
          
          {/* Table Rows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="flex-1 h-12 bg-gray-100 rounded"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

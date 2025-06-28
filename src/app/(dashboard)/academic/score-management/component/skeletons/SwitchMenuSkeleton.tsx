

export function SwitchMenuSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-48 h-6 bg-gray-200 rounded"></div>
          </div>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <div className="w-20 h-8 bg-gray-200 rounded-md"></div>
            <div className="w-20 h-8 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
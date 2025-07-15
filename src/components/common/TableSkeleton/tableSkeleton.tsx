

export function TableSkeleton({ rows = 10, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="animate-pulse">
        {/* Table Header */}
        <div className="bg-gray-50 border-b">
          <div className="flex">
            {Array.from({ length: columns }).map((_, i) => (
              <div key={i} className="flex-1 p-4">
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Table Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="border-b border-gray-100">
            <div className="flex">
              {Array.from({ length: columns }).map((_, j) => (
                <div key={j} className="flex-1 p-4">
                  <div className="h-4 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
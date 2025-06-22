// Loading components for each section
export function GeneralInfoSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      <div className="space-y-2">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FatherInfoSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MotherInfoSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EducationInfoSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      <div className="space-y-2">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AddressInfoSkeleton() {
  return (
    <div className="animate-pulse space-y-8 p-4">
      {[...Array(2)].map((_, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
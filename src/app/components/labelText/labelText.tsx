export function LabelText({
  topic,
  data,
}: {
  topic: string;
  data: string | string[];
}) {
  return (
    <div className="w-full my-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
        {/* Topic Section */}
        <h1 className="text-sm font-semibold text-gray-600 w-full sm:w-4/12 flex-shrink-0">
          {topic}
        </h1>
        {/* Data Section */}
        {Array.isArray(data) ? (
          <div className="flex flex-wrap gap-2 w-full sm:w-8/12">
            {data.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-800 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-base text-gray-800 w-full sm:w-8/12">{data}</p>
        )}
      </div>
    </div>
  );
}

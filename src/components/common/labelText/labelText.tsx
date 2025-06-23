export function LabelText({
  topic,
  data,
}: {
  topic: string;
  data: string | string[];
}) {
  return (
    <div className="w-full my-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2  sm:gap-4 rounded-md bg-slate-50 px-4 py-2 shadow-sm ">
        {/* Topic Section */}
        <h1 className="text-base font-semibold text-slate-900 w-full sm:w-4/12 flex-shrink-0">
          {topic}
        </h1>
        {/* Data Section */}
        {Array.isArray(data) ? (
          <div className="flex flex-wrap gap-2 w-full sm:w-8/12">
            {data.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white shadow-gray-300 rounded-md text-base text-slate-900 shadow-sm"
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

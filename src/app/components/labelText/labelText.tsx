export function LabelText({
  topic,
  data,
}: {
  topic: string;
  data: string | string[];
}) {
  return (
    <div className="w-full">
      <div className="relative gap-4 w-full items-center flex">
        <h1 className="w-4/12 text-sm ml-10">{topic}</h1>
        {Array.isArray(data) ? (
          <div className="p-2 w-8/12 text-base flex gap-2">
            {data.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        ) : (
          <label className="p-2 w-8/12 text-base">{data}</label>
        )}
      </div>
    </div>
  );
}

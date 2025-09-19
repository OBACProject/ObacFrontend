"use client";
export function Field({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) {
  return (
    <div className="grid gap-1">
      <span className="text-xs uppercase tracking-wide font-prompt text-gray-500">
        {label}
      </span>
      <span className="text-base text-gray-900 break-words font-prompt_Light">
        {value || <span className="text-gray-400">-</span>}
      </span>
    </div>
  );
}

export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white  rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2
        className="text-lg sm:text-xl font-prompt bg-gradient-to-r from-indigo-600 to-blue-400
        text-white w-fit px-4  rounded-3xl "
      >
        {title}
      </h2>
      <hr className="w-full my-3 border-t-[1px] border-gray-400" />
      <div className="grid gap-4 font-prompt_Light">{children}</div>
    </section>
  );
}
export function HeadTitle({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="w-full justify-center items-center lg:py-1 flex">
      <div
        className="lg:text-2xl flex items-center lg:gap-4 gap-2 text-xl font-prompt text-blue-700 bg-white rounded-full
         px-5 py-1.5  w-fit shadow-md"
      >
        <p className="p-2 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full">
          {icon}
        </p>
        {title}
      </div>
    </div>
  );
}

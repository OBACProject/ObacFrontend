"use client";

type HeaderProps = {
  title: string;
};

export default function SimpleHeader({ title }: HeaderProps) {
  return (
    <div className="relative flex items-center justify-center py-6 sm:py-10 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f2d4d] via-[#143d66] to-[#0f2d4d]" />
      <div className="relative z-10">
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-wide">
          {title}
        </h1>
        <div className="mt-3 h-[3px] w-full mx-auto bg-white rounded-full" />
      </div>
    </div>
  );
}

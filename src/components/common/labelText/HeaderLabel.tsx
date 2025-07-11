import React, { ReactNode } from "react";
import clsx from "clsx";

interface HeaderLabelProps {
  title: string;
  Icon: ReactNode;
  className?: string;
  bg_icon?: string;
}

export default function HeaderLabel({
  title,
  Icon,
  className,
  bg_icon,
}: HeaderLabelProps) {
  return (
    <div
      className={clsx(
        "px-10 rounded-3xl flex gap-3 items-center text-xl border border-gray-100 bg-white shadow-md py-2 text-center w-fit",
        className ?? "text-blue-600"
      )}
    >
      <p className={`rounded-lg p-1 text-white ${bg_icon ?? "bg-blue-500"}`}>
        {Icon}
      </p>

      {title}
    </div>
  );
}

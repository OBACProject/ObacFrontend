import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface HeaderLabelProps {
  title: string;
  Icon: ReactNode;
  className?: string;
}

export default function HeaderLabel({ title, Icon, className }: HeaderLabelProps) {
  return (
    <div
      className={clsx(
        "px-10 rounded-3xl flex gap-2 items-center text-xl border border-gray-100 shadow-md py-2 text-center w-fit",
        className ?? "text-blue-600" 
      )}
    >
      {Icon}
      {title}
    </div>
  );
}

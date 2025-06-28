import React from "react";

interface InputBoxProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputWidth?: string;
  inputSize?: string;
  labelSize?: string;
  disable?: boolean;
}

export default function InputBox({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  inputWidth = "w-full",
  inputSize = "text-base",
  labelSize = "text-base",
  disable = false,
}: InputBoxProps) {
  const isTailwindWidth = inputWidth.startsWith("w-") || inputWidth.startsWith("w[");

  return (
    <div className="flex items-center  gap-3 ">
      <label
        htmlFor={name}
        className={`font-medium text-gray-700 ${labelSize}`}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disable}
        className={`border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-[1px] focus:ring-blue-300 ${inputSize} ${
          isTailwindWidth ? inputWidth : ""
        } ${disable ? "bg-gray-50 text-gray-700 cursor-not-allowed" : ""}`}
        style={!isTailwindWidth ? { width: inputWidth } : undefined}
      />
    </div>
  );
}

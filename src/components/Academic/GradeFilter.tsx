"use client";
import React, { useEffect, useState } from "react";

type GradeFilterProps = {
  grade: number;              
  onChange: (value: number) => void;
  min?: number;              
  max?: number;                 
  step?: number;             
  decimals?: number;           
  label?: string;               
  className?: string;
  inputClassName?: string;
};

export default function GradeFilter({
  grade,
  onChange,
  min = 0,
  max = 4,
  step = 0.25,
  decimals = 2,
  label = "เกรดขั้นต่ำ",
  className,
  inputClassName,
}: GradeFilterProps) {
  const [input, setInput] = useState<string>(
    Number.isFinite(grade) ? (+grade).toFixed(decimals) : ""
  );


  useEffect(() => {
    const next = Number.isFinite(grade) ? (+grade).toFixed(decimals) : "";
    if (next !== input) setInput(next);

  }, [grade, decimals]);

  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const snap = (n: number) => Math.round(n / step) * step;

  return (
    <div className={`flex items-center gap-2`} style={{ userSelect: "none" }}>
      <label className="text-black text-[16px]">{label}</label>
      <input
        type="number"
        inputMode="decimal"
        className={`border py-1 border-gray-200 rounded-sm w-[80px] text-center ${inputClassName ?? ""}`}
        value={input}
        onChange={(e) => {
          const v = e.target.value;
          setInput(v);
          const n = parseFloat(v);
          onChange(Number.isFinite(n) ? n : NaN); 
        }}
        onBlur={() => {
          if (input === "") {
            onChange(NaN);
            return;
          }
          let n = parseFloat(input);
          if (!Number.isFinite(n)) {
            setInput("");
            onChange(NaN);
            return;
          }
          n = snap(clamp(n));
          const formatted = n.toFixed(decimals);
          setInput(formatted);
          onChange(n);
        }}
        step={step}
        min={min}
        max={max}
        onKeyDown={(e) => {
          if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
        }}
      />
    </div>
  );
}

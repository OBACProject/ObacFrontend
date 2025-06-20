import React from "react";

interface GradeFilterProps {
  grade: number;
  onChange: (value: number) => void;
}

export default function GradeFilter({ grade, onChange }: GradeFilterProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onChange(value);
    } else {
      onChange(0.0);
    }
  };

  return (
    <div className="flex items-center gap-2" style={{ userSelect: "none" }}>
      <label className="text-black text-[16px]">เกรดขั้นต่ำ</label>
      <input
        type="number"
        className="border py-1 border-gray-200 rounded-sm w-[80px] text-center"
        value={grade}
        onChange={handleInputChange}
        step={0.25}
        min={0.0}
        max={4.0}
      />
    </div>
  );
}

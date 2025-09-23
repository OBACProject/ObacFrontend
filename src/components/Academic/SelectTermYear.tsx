import React from "react";

interface SelectTermAndYearProps {
  term: string;
  year: number;
  currentYear: number;
  onChangeTerm: (term: string) => void;
  onChangeYear: (year: number) => void;
}

export default function SelectTermAndYear({
  term,
  year,
  currentYear,
  onChangeTerm,
  onChangeYear,
}: SelectTermAndYearProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-2 text-gray-600">
        <div>ภาคเรียน</div>
        <select
          className="border border-gray-200 rounded-sm py-1 px-4"
          value={term}
          onChange={(e) => onChangeTerm(e.target.value)}
        >
          <option value="">-</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="s1">ฤดูร้อน1</option>
          <option value="s2">ถดูร้อน2</option>
          <option value="เทียบโอน1">เทียบโอน 1</option>
          <option value="เทียบโอน2">เทียบโอน 2</option>
        </select>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
        <div>ปีการศึกษา</div>
        <select
          className="border border-gray-200 rounded-sm py-1 px-4"
          value={year === 0 ? "" : year}
          onChange={(e) => {
            const selected = e.target.value;
            onChangeYear(selected === "" ? 0 : Number(selected));
          }}
        >
          <option value="">-</option>
          {Array.from({ length: 6 }, (_, i) => currentYear + 1 - i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

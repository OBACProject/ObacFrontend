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
    <>
      <div className="flex items-center gap-2 text-gray-600">
        <div>ภาคเรียน</div>
        <select
          className="border border-gray-200 rounded-sm py-1 px-4"
          value={term}
          onChange={(e) => onChangeTerm(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
        <div>ปีการศึกษา</div>
        <select
          className="border border-gray-200 rounded-sm py-1 px-4"
          value={year}
          onChange={(e) => onChangeYear(Number(e.target.value))}
        >
          {[0, 1, 2, 3, 4].map((offset) => (
            <option key={offset} value={currentYear - offset}>
              {currentYear - offset}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

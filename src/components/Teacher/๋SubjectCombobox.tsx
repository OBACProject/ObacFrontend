"use client";

import { SubjectItem } from "@/dto/subjectDto";
import Select from "react-select";

interface BasicSubjectComboboxProps {
  subjects: SubjectItem[];
  selectedId: number;
  onSelect: (subject: SubjectItem) => void;
}

export default function BasicSubjectCombobox({
  subjects,
  selectedId,
  onSelect,
}: BasicSubjectComboboxProps) {
  const options = subjects.map((subject) => ({
    value: subject.id, 
    label: `${subject.code}  ${subject.name}  หลักสูตร ${subject.curriculumYear}`,
    fullSubject: subject,
  }));

const selectedOption = options.find(
  (opt) => Number(opt.value) === Number(selectedId)
) || null;

  const handleChange = (
    selected: { value: number; label: string; fullSubject: SubjectItem } | null
  ) => {
    if (selected?.fullSubject) {
      onSelect(selected.fullSubject);
    }
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      placeholder="ค้นหาวิชา / รหัส"
      isClearable
      noOptionsMessage={() => "ไม่พบวิชา"}
      styles={{
        input: (base) => ({ ...base, fontSize: "0.875rem" }),
        menu: (base) => ({ ...base, zIndex: 100 }),
      }}
    />
  );
}

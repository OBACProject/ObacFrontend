import React from "react";
import Select, { SingleValue } from "react-select";

export interface GroupOption {
  value: number;
  label: string;
}

export interface GroupSelectorProps {
  groupOptions: GroupOption[];
  selectedGroupID: number;
  onChange: (groupId: number | null) => void;
}

export default function GroupSelector({
  groupOptions,
  selectedGroupID,
  onChange,
}: GroupSelectorProps): JSX.Element {
  const selectedOption = groupOptions.find((opt) => opt.value === selectedGroupID) || null;

  const handleChange = (option: SingleValue<GroupOption>) => {
    onChange(option ? option.value : null);
  };

  return (
    <Select
      options={groupOptions}
      value={selectedOption}
      onChange={handleChange}
      isSearchable
      placeholder=" เลือกกลุ่มนักเรียน "
    />
  );
}

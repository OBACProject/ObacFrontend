"use client";
import React, { useEffect, useState } from "react";

interface IsActiveToggleProps {
  isActive: boolean;
  disabled?: boolean;
  className?: string;
  onToggle?: (newValue: boolean) => void;
}

const IsActiveToggle: React.FC<IsActiveToggleProps> = ({
  isActive,
  disabled = false,
  className = "",
  onToggle,
}) => {
  const [checked, setChecked] = useState<boolean>(isActive);

  useEffect(() => {
    console.log("value :",isActive )
    setChecked(isActive);
  }, [isActive]);

  const handleChange = () => {
    if (disabled) return;
    const newValue = !checked;
    setChecked(newValue);
    onToggle?.(newValue);
  };

  return (
    <div
      className={`inline-flex items-center gap-2 ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <label className="relative inline-flex items-center w-11 h-6">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        {/* แถบพื้นหลัง */}
        <div
          className="w-11 h-6 bg-red-400 peer-checked:bg-green-500 rounded-full transition-all duration-300"
        />
        {/* วงกลม toggle */}
        <div
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full shadow transform transition-transform duration-300 peer-checked:translate-x-5"
        />
      </label>
    </div>
  );
};

export default IsActiveToggle;

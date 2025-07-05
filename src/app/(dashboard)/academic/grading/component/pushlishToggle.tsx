'use client';
import React, { useEffect, useState } from 'react';

interface GradeToggleButtonProps {
  isOn: boolean;
  disabled?: boolean;
  className?: string;
  onToggle?: (newState: boolean) => void;
}

const GradeToggleButton: React.FC<GradeToggleButtonProps> = ({
  isOn,
  disabled,
  className,
  onToggle,
}) => {
  const [checked, setChecked] = useState(isOn);

  useEffect(() => {
    setChecked(isOn); // sync external state change
  }, [isOn]);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggle?.(newChecked);
  };

  return (
    <label
      className={`inline-flex items-center ${
        disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
      } ${className}`}
      onClick={(e) => e.stopPropagation()} // กัน bubbling อีกชั้น
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        disabled={disabled}
        onChange={handleToggle}
      />
      <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300 relative">
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-all duration-300 ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </div>
    </label>
  );
};

export default GradeToggleButton;

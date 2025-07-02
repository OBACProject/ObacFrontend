'use client';

import React, { useState } from 'react';

interface Props {
  isOn: boolean;
}

interface GradeToggleButtonProps {
  isOn: boolean;
  disabled?: boolean;
  className?: string;
}


const GradeToggleButton: React.FC<GradeToggleButtonProps> = ({ isOn, disabled, className }) => {
  const [checked, setChecked] = useState(isOn);

  return (
    <label
      className={`inline-flex items-center ${
        disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
      } ${className}`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        disabled={disabled}
        onChange={() => setChecked(!checked)}
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

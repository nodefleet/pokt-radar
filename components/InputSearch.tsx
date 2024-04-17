import React, { useState } from "react";

interface InputSearchProps {
  name: string;
  className?: string;
  placeholder?: string;
  classIconName?: string;
  currentValue?: string;
  setCurrentValue?: (newValue: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({
  name,
  className,
  placeholder,
  classIconName,
  currentValue,
  setCurrentValue,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (setCurrentValue) setCurrentValue(newValue);
  };

  return (
    <div className="w-full flex justify-between relative">
      <input
        type="text"
        className={`${className} border outline-none focus:border-black_custom  border-gray-400 placeholder:text-gray-400 text-black_custom rounded-full w-full px-6 py-3`}
        name={name}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
      />
      <i
        className={`fa-solid fa-search ${classIconName} relative right-8 pt-4 group-hover:text-black_custom text-gray-400`}
      ></i>
    </div>
  );
};

export default InputSearch;

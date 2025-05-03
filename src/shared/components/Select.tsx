import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  minWidth?: string;
  placeholder?: string;
};

export function Select({
  options,
  value,
  onChange,
  minWidth = "115px",
  placeholder,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption?.label || placeholder || "Select...";

  return (
    <div className="relative">
      <button
        type="button"
        className="h-[55px] text-[20px] font-semibold rounded-[10px] border border-white flex items-center justify-center gap-2 px-[16px] bg-transparent cursor-pointer"
        style={{ minWidth }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {displayValue}
        <FaChevronDown size={12} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-full max-h-[200px] overflow-y-auto z-10 bg-[#333] border border-white rounded-[10px] mt-1">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-[#444]"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

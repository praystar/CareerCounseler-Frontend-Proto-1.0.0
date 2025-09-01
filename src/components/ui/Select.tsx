import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  placeholder?: string;
  multiple?: boolean;
  selectedValues?: string[];
  onMultiChange?: (values: string[]) => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = 'Select option...',
  multiple = false,
  selectedValues = [],
  onMultiChange
}) => {
  const handleMultiSelect = (optionValue: string) => {
    if (!onMultiChange) return;
    
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];
    
    onMultiChange(newValues);
  };

  if (multiple) {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="space-y-2 max-h-40 overflow-y-auto border-2 border-gray-200 rounded-lg p-3">
          {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleMultiSelect(option.value)}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`
            w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white
            focus:border-emerald-500 focus:outline-none transition-colors duration-200
            appearance-none cursor-pointer
            ${error ? 'border-red-500 focus:border-red-500' : ''}
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select;
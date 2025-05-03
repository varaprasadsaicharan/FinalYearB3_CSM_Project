import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  step?: string;
}

export function FormField({ label, name, type, required, step }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        step={step}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
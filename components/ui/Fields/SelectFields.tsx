import React from 'react';
import clsx from 'clsx';
import { DropdownOption } from '@/lib/types';

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
}

export const SelectField = ({
  label,
  options,
  placeholder = 'Select an option',
  error,
  id,
  ...rest
}: SelectFieldProps) => (
  <div>
    {label && (
      <label htmlFor={id} className="mb-1 block">
        {label}
      </label>
    )}
    <select
      id={id}
      className={clsx('select select-bordered w-full', {
        'border-error': error,
      })}
      defaultValue=""
      {...rest}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-error">{error}</p>}
  </div>
);

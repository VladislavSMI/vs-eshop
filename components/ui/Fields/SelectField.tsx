import React, { ChangeEvent, SelectHTMLAttributes } from 'react';
import clsx from 'clsx';
import { DropdownOption } from '@/lib/types';

type SelectFieldProps = Pick<
  SelectHTMLAttributes<HTMLSelectElement>,
  | 'id'
  | 'name'
  | 'required'
  | 'disabled'
  | 'className'
  | 'value'
  | 'defaultValue'
> & {
  label?: string;
  options: DropdownOption[];
  placeholder: string;
  error?: string;
  onChange?: (value: string) => void;
};

export const SelectField = ({
  label,
  options,
  placeholder,
  error,
  id,
  value,
  defaultValue,
  onChange,
  className,
  ...rest
}: SelectFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block">
          {label}
        </label>
      )}
      <select
        id={id}
        className={clsx('select select-bordered w-full', className, {
          'border-error': !!error,
        })}
        value={value} // Controlled mode
        defaultValue={defaultValue} // Uncontrolled mode
        onChange={handleChange}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};

import React from 'react';
import clsx from 'clsx';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const InputField = ({
  label,
  error,
  id,
  type = 'text',
  ...props
}: InputFieldProps) => (
  <div>
    {label && (
      <label htmlFor={id} className="mb-1 block">
        {label}
      </label>
    )}
    <input
      id={id}
      type={type}
      className={clsx('input input-bordered w-full', { 'border-error': error })}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-error">{error}</p>}
  </div>
);

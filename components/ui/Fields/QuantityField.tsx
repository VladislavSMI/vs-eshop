import React from 'react';
import clsx from 'clsx';

type QuantityFieldProps = {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
};

export const QuantityField: React.FC<QuantityFieldProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  disabled = false,
  className,
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={clsx('flex items-center', className)}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        className={clsx('btn btn-ghost btn-sm', {
          'cursor-not-allowed opacity-50': disabled || value <= min,
        })}
      >
        <span className="text-xl text-primary">-</span>
      </button>

      <span className="mx-2 font-semibold">{value}</span>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        className={clsx('btn btn-ghost btn-sm', {
          'cursor-not-allowed opacity-50': disabled || value >= max,
        })}
      >
        <span className="text-xl text-primary">+</span>
      </button>
    </div>
  );
};

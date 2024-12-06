'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import clsx from 'clsx';

interface DropdownProps {
  icon: ReactNode;
  children: ReactNode;
  position?: 'left' | 'right' | 'center';
  dropdownClassName?: string;
  contentClassName?: string;
  ariaLabel?: string;
}

export function Dropdown({
  icon,
  children,
  position = 'left',
  dropdownClassName = '',
  contentClassName = '',
  ariaLabel = 'dropdown',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        'relative inline-block',
        {
          'text-left': position === 'left',
          'text-center': position === 'center',
          'text-right': position === 'right',
        },
        dropdownClassName,
      )}
    >
      <button
        type="button"
        onClick={toggleDropdown}
        className="btn btn-circle btn-ghost text-primary"
        aria-label={ariaLabel}
      >
        {icon}
      </button>
      {isOpen && (
        <div
          className={clsx(
            'absolute z-10 m-2 rounded-lg border border-base-300 bg-base-100 shadow-xl',
            contentClassName,
            {
              'right-0': position === 'right',
              'left-0': position === 'left',
              'mx-auto': position === 'center',
            },
          )}
        >
          <div className="rounded-box bg-base-100">{children}</div>
        </div>
      )}
    </div>
  );
}

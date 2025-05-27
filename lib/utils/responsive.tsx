import { useEffect, useState } from 'react';
import { useDebouncedCallback } from '@/lib/hooks/useDebouncedCallback';
import { isServer } from './utils';

export const BREAKPOINTS = {
  mobile: 480,
  mobileLandscape: 480,
  tablet: 768,
  lap: 992,
  desktop: 1200,
  wide: 1400,
};

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Tracks the current viewport width with debounce.
 * Returns:
 * - `null` on server
 * - `undefined` before first measurement
 * - `number` after measurement
 */
export function useViewportWidth(wait = 125): number | undefined | null {
  const [width, setWidth] = useState<number | undefined | null>(
    isServer() ? null : undefined,
  );

  const updateWidth = useDebouncedCallback(() => {
    setWidth(window.innerWidth);
  }, wait);

  useEffect(() => {
    if (isServer()) return;

    window.addEventListener('resize', updateWidth);
    updateWidth(); // initial measurement

    return () => window.removeEventListener('resize', updateWidth);
  }, [updateWidth]);

  return width;
}

export const isMaxWidth = (
  breakpoint: Breakpoint,
  viewportWidth?: number,
): boolean | null => {
  if (isServer()) return null;
  const width = viewportWidth ?? window.innerWidth;
  return width <= BREAKPOINTS[breakpoint];
};

export const isMinWidth = (
  breakpoint: Breakpoint,
  viewportWidth?: number,
): boolean | null => {
  if (isServer()) return null;
  const width = viewportWidth ?? window.innerWidth;
  return width >= BREAKPOINTS[breakpoint];
};

export const useIsMaxWidth = (
  breakpoint: Breakpoint,
): boolean | null | undefined => {
  const width = useViewportWidth();
  return typeof width === 'number' ? isMaxWidth(breakpoint, width) : width;
};

export const useIsMinWidth = (
  breakpoint: Breakpoint,
): boolean | null | undefined => {
  const width = useViewportWidth();
  return typeof width === 'number' ? isMinWidth(breakpoint, width) : width;
};

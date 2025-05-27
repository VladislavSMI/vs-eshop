'use client';

import { useEffect, useRef } from 'react';
import { useIsMaxWidth } from '@/lib/utils/responsive';

export const Carousel = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMaxWidth('tablet');
  const containerRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(1);
  const isPausedRef = useRef(false);
  const speed = 0.7;
  const animationFrameRef = useRef<number>();

  // Only run JS scroll animation on desktop
  useEffect(() => {
    if (isMobile) return;

    const el = containerRef.current;
    if (!el) return;

    function tick() {
      if (!el || isPausedRef.current) {
        animationFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      el.scrollLeft += directionRef.current * speed;

      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      const atStart = el.scrollLeft <= 0;

      if (atEnd) directionRef.current = -1;
      if (atStart) directionRef.current = 1;

      animationFrameRef.current = requestAnimationFrame(tick);
    }

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile]);

  // Mobile CSS-based infinite scroll in order to avoid performance issues
  // with JS-based scroll on mobile devices
  if (isMobile) {
    return (
      <div className="w-full overflow-x-auto pb-6 pt-1">
        <ul className="flex animate-carousel gap-4">{children}</ul>
      </div>
    );
  }

  // Desktop: JS-based animated scroll with hover pause
  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
      className="w-full overflow-x-auto scroll-smooth pb-6 pt-1"
    >
      <ul className="flex gap-4 whitespace-nowrap">{children}</ul>
    </div>
  );
};

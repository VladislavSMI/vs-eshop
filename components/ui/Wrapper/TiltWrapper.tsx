'use client';

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { useIsMounted } from '@/lib/hooks/useIsMounted';

interface TiltWrapperProps {
  children: React.ReactNode;
  useTilt?: boolean;
  className?: string;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scale?: number;
  glareEnable?: boolean;
  transitionSpeed?: number;
}

export const TiltWrapper = ({
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  scale = 1.02,
  glareEnable = false,
  transitionSpeed = 800,
  useTilt = true,
  className,
  children,
}: TiltWrapperProps) => {
  /**
   * `isMounted` ensures that the Tilt effect only renders after the component has mounted
   * on the client-side, preventing SSR and hydration errors by skipping
   * the Tilt rendering during server-side rendering.
   */

  const isMounted = useIsMounted();

  if (!useTilt || !isMounted) {
    return children;
  }

  return (
    <Tilt
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      scale={scale}
      glareEnable={glareEnable}
      transitionSpeed={transitionSpeed}
      className={className}
    >
      {children}
    </Tilt>
  );
};

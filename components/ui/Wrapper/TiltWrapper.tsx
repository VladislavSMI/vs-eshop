'use client';

import React, { ReactNode } from 'react';
import Tilt, { TiltProps } from 'react-parallax-tilt';

interface TiltWrapperProps extends Partial<TiltProps> {
  useTilt?: boolean;
  children: ReactNode;
  className?: string;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scale?: number;
  glareEnable?: boolean;
  transitionSpeed?: number;
}

export function TiltWrapper({
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  scale = 1.02,
  glareEnable = false,
  transitionSpeed = 800,
  useTilt = true,
  children,
  className,
}: TiltWrapperProps) {
  if (useTilt) {
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
  }

  return children;
}

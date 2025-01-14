'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { setCursor } from '@/lib/utils/utils';

const Model = () => {
  // TODO: take it from aws s3 bucket
  const { scene } = useGLTF('/models/skate-deck.glb');
  const sceneRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={sceneRef}
      scale={8}
      onPointerDown={() => setCursor('grabbing')}
      onPointerUp={() => setCursor('grab')}
      onPointerOver={() => setCursor('grab')}
      onPointerOut={() => setCursor('default')}
    >
      <primitive
        // eslint-disable-next-line react/no-unknown-property
        object={scene}
      />
    </mesh>
  );
};

export const HeroProduct3dModel = () => (
  <div className="h-full w-full">
    <Canvas camera={{ position: [0, 3, 15], fov: 50 }}>
      <OrbitControls enableRotate enableZoom enablePan={false} />
      <Model />
      <Environment preset="warehouse" />
    </Canvas>
  </div>
);

useGLTF.preload('/models/skate-deck.glb');

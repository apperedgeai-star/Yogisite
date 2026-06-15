"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useR3FDispose } from "@/hooks/useR3FDispose";
import { prefersReducedMotion } from "@/lib/utils";

const GOLD = new THREE.Color("#D4A843");

function DiamondMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => new THREE.OctahedronGeometry(1.4, 0), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: GOLD,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
        toneMapped: false,
        depthWrite: false,
      }),
    []
  );

  useR3FDispose(geometry, material);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    mesh.rotation.x = t * 0.12;
    mesh.rotation.y = t * 0.18;
    mesh.position.y = Math.sin(t * 0.4) * 0.15;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

export function FloatingDiamond() {
  if (prefersReducedMotion()) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <Canvas
        className="!absolute inset-0 h-full w-full"
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          premultipliedAlpha: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ background: "transparent" }}
      >
        <DiamondMesh />
      </Canvas>
    </div>
  );
}

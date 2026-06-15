"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/utils";
import { useCanvasMouse } from "./useCanvasMouse";

type FloatingMeshProps = {
  geometry: THREE.BufferGeometry;
  basePosition: [number, number, number];
  parallaxStrength?: number;
  rotationSpeed: [number, number, number];
  opacity: number;
  floatAmplitude?: number;
  getMouse: () => { x: number; y: number };
};

function FloatingMesh({
  geometry,
  basePosition,
  parallaxStrength = 0.3,
  rotationSpeed,
  opacity: _opacity,
  floatAmplitude = 0,
  getMouse,
}: FloatingMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const base = useMemo(() => new THREE.Vector3(...basePosition), [basePosition]);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#D4A843"),
        wireframe: true,
        transparent: true,
        opacity: 0.15,
        toneMapped: false,
        depthWrite: false,
      }),
    []
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const mouse = getMouse();
    const t = state.clock.elapsedTime;

    mesh.position.x = base.x + mouse.x * parallaxStrength;
    mesh.position.y =
      base.y + mouse.y * parallaxStrength + Math.sin(t * 0.6) * floatAmplitude;
    mesh.position.z = base.z;

    mesh.rotation.x += rotationSpeed[0];
    mesh.rotation.y += rotationSpeed[1];
    mesh.rotation.z += rotationSpeed[2];
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} position={base} />
  );
}

export function FloatingGeometries() {
  const reduced = prefersReducedMotion();
  const { step } = useCanvasMouse(0.02);

  const torusKnot = useMemo(
    () => new THREE.TorusKnotGeometry(1.2, 0.08, 128, 16, 3, 7),
    []
  );
  const octahedron = useMemo(() => new THREE.OctahedronGeometry(0.8, 0), []);
  const icosahedron = useMemo(() => new THREE.IcosahedronGeometry(1.0, 0), []);

  useEffect(() => {
    return () => {
      torusKnot.dispose();
      octahedron.dispose();
      icosahedron.dispose();
    };
  }, [torusKnot, octahedron, icosahedron]);

  if (reduced) return null;

  return (
    <>
      <FloatingMesh
        geometry={torusKnot}
        basePosition={[-3, 1, -4]}
        rotationSpeed={[0.0008, 0.0012, 0.0004]}
        opacity={0.15}
        getMouse={step}
      />
      <FloatingMesh
        geometry={octahedron}
        basePosition={[3.5, -1.5, -3]}
        rotationSpeed={[-0.001, -0.0009, 0.0005]}
        opacity={0.15}
        getMouse={step}
      />
      <FloatingMesh
        geometry={icosahedron}
        basePosition={[0, 2.5, -5]}
        rotationSpeed={[0.0005, 0.001, -0.0006]}
        opacity={0.15}
        floatAmplitude={0.25}
        getMouse={step}
      />
    </>
  );
}

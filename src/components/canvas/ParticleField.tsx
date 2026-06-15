"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSmoothScroll } from "@/providers/LenisProvider";
import { getParticleCount, prefersReducedMotion } from "@/lib/utils";

const VERTEX_SHADER = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
attribute float aScale;
attribute float aRandomness;

void main() {
  vec3 pos = position;

  pos.x += sin(uTime * 0.4 + position.y * 1.2 + aRandomness) * 0.1;
  pos.y += cos(uTime * 0.3 + position.x * 0.8 + aRandomness * 2.0) * 0.12;
  pos.z += sin(uTime * 0.2 + aRandomness * 3.0) * 0.08;

  vec2 mouseWorld = uMouse * 5.0;
  float dist = length(pos.xy - mouseWorld);
  float influence = smoothstep(2.0, 0.0, dist);
  pos.xy += normalize(pos.xy - mouseWorld + 0.001) * influence * 0.3;

  pos.y -= uScroll * 0.002;
  pos.y = mod(pos.y + 4.0, 8.0) - 4.0;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aScale * (100.0 / -mvPos.z) * (1.0 + influence * 0.25);
  gl_Position = projectionMatrix * mvPos;
}
`;

const FRAGMENT_SHADER = /* glsl */ `
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float a = (1.0 - smoothstep(0.2, 0.5, d)) * 0.45;
  gl_FragColor = vec4(0.83, 0.66, 0.26, a);
}
`;

function createParticleAttributes(count: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const randomness = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const r = 4.5 * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.4;

    scales[i] = 1.2 + Math.random() * 3.5;
    randomness[i] = Math.random() * Math.PI * 2;
  }

  return { positions, scales, randomness };
}

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { scrollY } = useSmoothScroll();
  const mouseTarget = useRef(new THREE.Vector2(0, 0));
  const mouseCurrent = useRef(new THREE.Vector2(0, 0));
  const reduced = prefersReducedMotion();

  const [count, setCount] = useState(2500);

  useEffect(() => {
    setCount(reduced ? 0 : Math.min(getParticleCount(), 2500));
  }, [reduced]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const attributes = useMemo(
    () => (count > 0 ? createParticleAttributes(count) : null),
    [count]
  );

  const geometry = useMemo(() => {
    if (!attributes) return null;
    const { positions, scales, randomness } = attributes;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales!, 1));
    geo.setAttribute(
      "aRandomness",
      new THREE.BufferAttribute(randomness!, 1)
    );
    return geo;
  }, [attributes]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
        toneMapped: false,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uScroll: { value: 0 },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
      }),
    []
  );

  useEffect(() => {
    return () => {
      geometry?.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points || !geometry) return;
    const uniforms = (points.material as THREE.ShaderMaterial).uniforms;

    mouseCurrent.current.x = THREE.MathUtils.lerp(
      mouseCurrent.current.x,
      mouseTarget.current.x,
      0.04
    );
    mouseCurrent.current.y = THREE.MathUtils.lerp(
      mouseCurrent.current.y,
      mouseTarget.current.y,
      0.04
    );

    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMouse.value.copy(mouseCurrent.current);
    uniforms.uScroll.value = scrollY.current;
  });

  if (reduced || !geometry || count === 0) return null;

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

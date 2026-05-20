"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { getParticleCount, prefersReducedMotion } from "@/lib/utils";
import { useCanvasMouse } from "./useCanvasMouse";

const VERTEX_SHADER = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
attribute float aScale;
attribute float aRandomness;

void main() {
  vec3 pos = position;

  pos.x += sin(uTime * 0.4 + position.y * 1.2 + aRandomness) * 0.12;
  pos.y += cos(uTime * 0.3 + position.x * 0.8 + aRandomness * 2.0) * 0.15;
  pos.z += sin(uTime * 0.2 + aRandomness * 3.0) * 0.1;

  vec2 mouseWorld = uMouse * 6.0;
  float dist = length(pos.xy - mouseWorld);
  float influence = smoothstep(2.5, 0.0, dist);
  pos.xy += normalize(pos.xy - mouseWorld + 0.001) * influence * 0.4;

  pos.y -= uScroll * 0.002;
  pos.y = mod(pos.y + 4.0, 8.0) - 4.0;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aScale * (280.0 / -mvPos.z) * (1.0 + influence * 0.8);
  gl_Position = projectionMatrix * mvPos;
}
`;

const FRAGMENT_SHADER = /* glsl */ `
uniform float uTime;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float alpha = 1.0 - smoothstep(0.3, 0.5, d);
  alpha *= 0.7;

  float pulse = 0.85 + 0.15 * sin(uTime * 1.5);
  vec3 color = mix(
    vec3(0.78, 0.65, 0.30),
    vec3(0.95, 0.88, 0.65),
    pulse
  );

  gl_FragColor = vec4(color, alpha);
}
`;

function createParticleAttributes(count: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const randomness = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const r = 5 * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.45;

    scales[i] = 1.5 + Math.random() * 4.5;
    randomness[i] = Math.random() * Math.PI * 2;
  }

  return { positions, scales, randomness };
}

export function ParticleUniverse() {
  const pointsRef = useRef<THREE.Points>(null);
  const { scrollY } = useSmoothScroll();
  const { step } = useCanvasMouse(0.08);
  const reduced = prefersReducedMotion();

  const [count, setCount] = useState(4000);

  useEffect(() => {
    setCount(reduced ? 400 : getParticleCount());
  }, [reduced]);

  const { positions, scales, randomness } = useMemo(
    () => createParticleAttributes(count),
    [count]
  );

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("aRandomness", new THREE.BufferAttribute(randomness, 1));
    return geo;
  }, [positions, scales, randomness]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
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
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const mat = pointsRef.current.material as THREE.ShaderMaterial;
    const mouse = step();
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uMouse.value.set(mouse.x, mouse.y);
    mat.uniforms.uScroll.value = scrollY.current;
  });

  if (reduced) return null;

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

"use client";

import { useEffect } from "react";
import type * as THREE from "three";

type Disposable = {
  dispose?: () => void;
};

/** Mandatory R3F teardown for geometry, material, and optional textures. */
export function useR3FDispose(
  geometry: THREE.BufferGeometry | null | undefined,
  material: THREE.Material | THREE.Material[] | null | undefined,
  textures?: (THREE.Texture | null | undefined)[]
) {
  useEffect(() => {
    return () => {
      geometry?.dispose();
      if (Array.isArray(material)) {
        material.forEach((m) => m.dispose());
      } else {
        material?.dispose();
      }
      textures?.forEach((tex) => tex?.dispose());
    };
  }, [geometry, material, textures]);
}

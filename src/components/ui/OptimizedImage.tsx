"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface OptimizedImageProps extends Omit<ImageProps, "placeholder"> {
  fallback?: string;
  blurDataURL?: string;
}

export function OptimizedImage({
  className,
  alt,
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative overflow-hidden bg-card">
      <Image
        alt={alt}
        className={clsx(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        quality={80}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        {...props}
      />
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center text-sm text-t3">
          {alt}
        </div>
      )}
    </div>
  );
}

import Image from "next/image";
import { cn } from "@/lib/utils";

type CoverImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
  filter?: string;
};

/**
 * Canonical image pattern: relative overflow-hidden parent + fill cover child.
 */
export function CoverImage({
  src,
  alt,
  sizes,
  priority = false,
  loading,
  className,
  imageClassName,
  objectPosition = "center center",
  filter,
}: CoverImageProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={loading ?? (priority ? undefined : "lazy")}
        className={cn("object-cover", imageClassName)}
        style={{ objectPosition, filter }}
      />
    </div>
  );
}

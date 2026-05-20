import { CoverImage } from "@/components/ui/CoverImage";

type ServiceImageBlockProps = {
  src: string;
  alt: string;
  overlayLabel?: string;
  objectPosition?: string;
  priority?: boolean;
};

export function ServiceImageBlock({
  src,
  alt,
  overlayLabel,
  objectPosition = "center 30%",
  priority = false,
}: ServiceImageBlockProps) {
  return (
    <div className="service-image-container service-image-block">
      <CoverImage
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        objectPosition={objectPosition}
      />
      <div className="service-image-block__scrim" aria-hidden />
      {overlayLabel ? (
        <p className="service-image-block__label">{overlayLabel}</p>
      ) : null}
    </div>
  );
}

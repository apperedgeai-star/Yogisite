import Image from "next/image";

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
    <div className="service-image-container">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className="object-cover"
        style={{ objectPosition }}
      />
      <div className="service-image-container__scrim" aria-hidden />
      {overlayLabel ? (
        <p className="service-image-container__label">{overlayLabel}</p>
      ) : null}
    </div>
  );
}

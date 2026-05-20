import { CoverImage } from "@/components/ui/CoverImage";

export type ClientCardProps = {
  imageSrc: string;
  clientName: string;
  campaign: string;
  result: string;
  resultLabel: string;
  imageAlt?: string;
};

export function ClientCard({
  imageSrc,
  clientName,
  campaign,
  result,
  resultLabel,
  imageAlt,
}: ClientCardProps) {
  return (
    <article className="client-card">
      <div className="absolute inset-0 overflow-hidden">
        <CoverImage
          src={imageSrc}
          alt={imageAlt ?? clientName}
          sizes="(max-width: 768px) 100vw, 33vw"
          imageClassName="client-card__image"
          filter="brightness(0.7)"
        />
      </div>
      <div className="client-card__scrim" aria-hidden />
      <div className="client-card__content">
        <p className="client-card__client">{clientName}</p>
        <p className="client-card__campaign">{campaign}</p>
        <p className="client-card__result">
          {result}{" "}
          <span className="client-card__result-label">{resultLabel}</span>
        </p>
      </div>
    </article>
  );
}

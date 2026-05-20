import Image from "next/image";

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
      <Image
        src={imageSrc}
        alt={imageAlt ?? clientName}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="client-card__image object-cover"
      />
      <div className="client-card__overlay" aria-hidden />
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

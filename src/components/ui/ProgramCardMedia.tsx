import Image from "next/image";
import { ASSETS } from "@/lib/assets";

type ProgramCardMediaProps = {
  src?: string;
};

/** Atmospheric strip — top of program cards */
export function ProgramCardMedia({
  src = ASSETS.heroAmbient,
}: ProgramCardMediaProps) {
  return (
    <div className="program-card-media">
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={src}
          alt="Program preview"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          className="object-cover object-center"
          style={{ filter: "brightness(0.4)" }}
        />
      </div>
      <div className="program-card-media__scrim" aria-hidden />
    </div>
  );
}

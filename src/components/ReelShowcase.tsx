"use client";

import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/SectionHeader";

const ReelShowcaseDesktop = dynamic(
  () => import("@/components/reels/ReelShowcaseDesktop"),
  { ssr: false }
);

const ReelShowcaseMobile = dynamic(
  () => import("@/components/reels/ReelShowcaseMobile"),
  { ssr: false }
);

export default function ReelShowcase() {
  return (
    <section
      id="reels"
      className="section-block section-block--border section-block--deep relative overflow-hidden !py-0"
    >
      <div className="site-container relative z-20 pb-6 pt-[var(--section-y)] text-center lg:pointer-events-none lg:absolute lg:left-1/2 lg:top-10 lg:-translate-x-1/2 lg:pb-0 lg:pt-0">
        <SectionHeader
          label="The Work"
          title="Reels that built brands."
          description="125M+ views delivered. Real clients. Real results."
          align="center"
        />
      </div>

      <ReelShowcaseDesktop />
      <ReelShowcaseMobile />
    </section>
  );
}

"use client";

import dynamic from "next/dynamic";

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
      className="section-surface section-surface--proof relative z-content overflow-hidden"
    >
      <div className="site-container pb-6 pt-section-y text-center lg:pointer-events-none lg:absolute lg:left-1/2 lg:top-8 lg:z-20 lg:-translate-x-1/2 lg:pb-0 lg:pt-0">
        <p className="type-label">The Work</p>
        <h2 className="type-section mt-3">
          Reels that
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>
          built brands.
        </h2>
        <p className="type-body mx-auto mt-4 max-w-md px-2">
          125M+ views delivered. Real clients. Real results.
        </p>
      </div>

      <ReelShowcaseDesktop />
      <ReelShowcaseMobile />
    </section>
  );
}

const fs = require("fs");

function clean(s) {
  return s
    .split("<motion.div").join("<div")
    .split("</motion.div>").join("</div>");
}

const services = clean(`"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { isMobileViewport } from "@/lib/utils";
gsap.registerPlugin(ScrollTrigger);
const comparison = [
  { label: "Pages Managed", other: "1", recun: "10" },
  { label: "Monthly Price", other: "₹4-6L", recun: "₹2L" },
  { label: "Distribution", other: "None", recun: "9 Platforms" },
  { label: "Guarantee", other: "None", recun: "Views + Followers" },
  { label: "Client Time/Month", other: "Constant", recun: "4-5 Hours Only" },
  { label: "Approach", other: "Content", recun: "Authority System" },
];
export default function Services() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [mobile, setMobile] = useState(false);
  useEffect(() => { setMobile(isMobileViewport()); const r=()=>setMobile(isMobileViewport()); window.addEventListener("resize",r); return ()=>window.removeEventListener("resize",r); }, []);
  useEffect(() => {
    if (mobile || !sectionRef.current || !trackRef.current) return;
    const track = trackRef.current;
    const ctx = gsap.context(() => {
      gsap.to(track, { x: () => -(track.scrollWidth - window.innerWidth), ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: () => \`+=\${track.scrollWidth - window.innerWidth}\`, pin: true, scrub: 1, anticipatePin: 1 } });
    }, sectionRef);
    return () => ctx.revert();
  }, [mobile]);
  const panels = (
    <>
      <article className="services-panel glass-card flex min-h-[70vh] w-[85vw] shrink-0 flex-col justify-between rounded-3xl p-8 md:w-[65vw]">
        <div>
          <span className="mb-4 inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs uppercase tracking-widest text-accent">Most Popular · Only 5 Spots</span>
          <div className="relative mb-6 h-44 overflow-hidden rounded-2xl"><Image src="/dragon.webp" alt="" fill className="object-cover" /></motion.div>
          <h3 className="font-editorial text-4xl text-white">Dragon's Head</h3>
          <p className="mt-2 text-sm text-muted">20 videos/mo · 1 main + 9 distribution pages · ₹2L/mo</p>
          <p className="mt-4 text-accent">50K followers guaranteed or money back</p>
        </motion.div>
        <MagneticButton href="https://topmate.io/techieyogi" className="mt-8">Secure Your Spot →</MagneticButton>
      </article>
      <article className="services-panel glass-card flex min-h-[70vh] w-[85vw] shrink-0 flex-col justify-between rounded-3xl p-8 md:w-[65vw]">
        <div>
          <div className="relative mb-6 h-44 overflow-hidden rounded-2xl"><Image src="/jupiter.webp" alt="" fill className="object-cover" /></motion.div>
          <h3 className="font-editorial text-4xl text-white">Jupiter Node</h3>
          <p className="mt-2 text-sm text-muted">50 pieces · campaigns · 1M views guarantee</p>
        </motion.div>
        <MagneticButton href="https://topmate.io/techieyogi" variant="ghost" className="mt-8">Book Discovery Call →</MagneticButton>
      </article>
      <article className="services-panel glass-card w-[85vw] shrink-0 rounded-3xl p-8 md:w-[55vw]">
        <h3 className="mb-6 font-editorial text-3xl">Compare</h3>
        <motion.div className="grid grid-cols-3 gap-y-3 text-sm">{comparison.flatMap((row) => [<p key={row.label+"a"} className="text-white/70">{row.label}</p>,<p key={row.label+"b"} className="text-muted">{row.other}</p>,<p key={row.label+"c"} className="text-accent">{row.recun}</p>])}</motion.div>
      </article>
    </>
  );
  return (
    <section ref={sectionRef} id="services" className="services-section relative z-content bg-graphite">
      <div className="section-padding pb-0"><p className="text-xs uppercase tracking-widest text-accent">Services</p><h2 className="font-editorial text-5xl text-white">Choose your system</h2></motion.div>
      {mobile ? <div className="flex flex-col gap-6 p-6 md:p-12">{panels}</motion.div> : <div className="overflow-hidden py-12"><div ref={trackRef} className="services-track flex gap-8 px-6 md:px-12">{panels}</motion.div></motion.div>}
    </section>
  );
}
`);

// Apply clean to services - the template still has motion.div typos from my paste. Run clean() again
fs.writeFileSync("components/sections/Services.tsx", clean(services));

const proof = `"use client";
import Image from "next/image";
const clients = [
  { name: "Vision11 × CSK", image: "/vision11.png", desc: "IPL 2025. 50M+ views." },
  { name: "Starbucks India", image: "/starbucks.png", desc: "Premium global-standard content." },
  { name: "Rapido", image: "/rapido.webp", desc: "Humanising India's bike taxi leader." },
  { name: "Nawaz Shaikh", image: null, desc: "1.6M+ followers" },
  { name: "Riya Upreti", image: null, desc: "999K followers" },
  { name: "CA Jay Desai", image: null, desc: "400K followers" },
];
export default function Proof() {
  return (
    <section id="work" className="section-padding relative z-content bg-black">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-widest text-accent">Proof</p>
        <h2 className="mb-12 font-editorial text-5xl text-white">The Work Speaks.</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c) => (
            <article key={c.name} className="glass-card rounded-2xl overflow-hidden transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,169,110,0.12)]">
              {c.image && <div className="relative h-36 bg-charcoal"><Image src={c.image} alt={c.name} fill className="object-contain p-4" /></motion.div>}
              <div className="p-6"><h3 className="text-lg text-white">{c.name}</h3><p className="mt-2 text-sm text-muted">{c.desc}</p></motion.div>
            </article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
`;
fs.writeFileSync("components/sections/Proof.tsx", clean(proof));

const howItWorks = `"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
const steps = [
  { n: "01", title: "Watch the VSL", desc: "WhatsApp video explaining our model.", icon: "▶" },
  { n: "02", title: "Book Discovery Call", desc: "25 min with Yogii Kumar.", icon: "📅" },
  { n: "03", title: "Pay ₹5,000 Token", desc: "Secures your spot among 5 clients.", icon: "🔒" },
  { n: "04", title: "We Build Authority", desc: "Live in Week 2. 4-5 hrs/month from you.", icon: "🚀" },
];
export default function HowItWorks() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".step-item").forEach((el) => gsap.from(el, { opacity: 0, y: 40, scrollTrigger: { trigger: el, start: "top 85%" } }));
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} id="how-it-works" className="section-padding relative z-content bg-off-black">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-accent">Process</p>
        <h2 className="mb-12 font-editorial text-5xl text-white">How it works</h2>
        <ol className="space-y-10 border-l border-accent/30 pl-8">
          {steps.map((s) => (
            <li key={s.n} className="step-item">
              <span className="text-2xl">{s.icon}</span>
              <p className="mt-2 text-xs text-accent">STEP {s.n}</p>
              <h3 className="font-editorial text-2xl text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
`;
fs.writeFileSync("components/sections/HowItWorks.tsx", clean(howItWorks));

const about = `"use client";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
export default function About() {
  return (
    <section id="about" className="section-padding relative z-content bg-black">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent">About Yogii Kumar</p>
          <h2 className="mt-4 font-editorial text-display text-white">Execution over everything.</h2>
          <p className="mt-8 text-body leading-relaxed text-muted">COO & CMO at two startups. ₹2 Cr raised for Festum Evento. UAE entity. $1M+ AI SaaS prototype. Declined 35% scholarship from Master's Union — chose execution over education.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-wider text-accent"><span>₹2 Cr Raised</span><span>UAE Entity</span><span>$1M+ SaaS</span></motion.div>
        </motion.div>
        <ParallaxImage src="/images/yogii-portrait.jpg" alt="Yogii Kumar" height="min-h-[480px]" />
      </motion.div>
    </section>
  );
}
`;
fs.writeFileSync("components/sections/About.tsx", clean(about));

const programs = `"use client";
import { MagneticButton } from "@/components/ui/MagneticButton";
export default function Programs() {
  return (
    <section id="programs" className="section-padding relative z-content bg-graphite">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-widest text-accent">Programs</p>
        <h2 className="mb-12 font-editorial text-5xl text-white">Learn the system</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <article className="glass-card rounded-3xl p-8">
            <p className="text-xs text-accent">June 2026 · Surat · Max 10</p>
            <h3 className="mt-4 font-editorial text-3xl text-white">Recun Content & AI</h3>
            <p className="mt-4 text-sm text-muted">3-month in-office program. ₹59K / ₹80K</p>
            <MagneticButton href="mailto:techie.yogi1@gmail.com" className="mt-6">Apply Now</MagneticButton>
          </article>
          <article className="glass-card rounded-3xl p-8">
            <p className="text-xs text-accent">Coming Soon</p>
            <h3 className="mt-4 font-editorial text-3xl text-white">Content Se Crore</h3>
            <p className="mt-4 text-sm text-muted">4-month premium. ₹99,000</p>
            <MagneticButton href="mailto:techie.yogi1@gmail.com" variant="ghost" className="mt-6">Join Waitlist</MagneticButton>
          </article>
        </motion.div>
      </motion.div>
    </section>
  );
}
`;
fs.writeFileSync("components/sections/Programs.tsx", clean(programs));

const faq = `"use client";
import { AccordionCard } from "@/components/ui/AccordionCard";
const faqs = [
  { q: "What is the Content Distribution Network?", a: "10 pages — 1 main + 9 distribution — targeting different angles simultaneously." },
  { q: "Do you work outside Surat?", a: "Yes. Fully remote. On-location shoots anywhere." },
  { q: "What niches do you work with?", a: "All: real estate, finance, law, tech, food, fashion, and more." },
  { q: "Is the ₹5,000 token refundable?", a: "It adjusts against month 1 and secures your limited spot." },
  { q: "How much time is required?", a: "4-5 hours/month: one shoot batch and one strategy call." },
  { q: "What if the guarantee isn't met?", a: "Refund OR continue free until we hit the number." },
];
export default function FAQ() {
  return (
    <section className="section-padding relative z-content bg-off-black">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-center font-editorial text-5xl text-white">FAQ</h2>
        <div className="space-y-4">{faqs.map((f) => <AccordionCard key={f.q} question={f.q} answer={f.a} />)}</motion.div>
      </motion.div>
    </section>
  );
}
`;
fs.writeFileSync("components/sections/FAQ.tsx", clean(faq));

const footer = `"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
export default function Footer() {
  const btnRef = useRef(null);
  const wrapRef = useRef(null);
  useEffect(() => {
    const wrap = wrapRef.current, btn = btnRef.current;
    if (!wrap || !btn) return;
    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      const dist = Math.hypot(relX, relY);
      if (dist < 150) { const f = (150 - dist) / 150; btn.style.transform = \`translate(\${relX * f * 0.5}px, \${relY * f * 0.5}px)\`; }
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1.2, 0.4)", onComplete: () => { btn.style.transform = ""; } });
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => { wrap.removeEventListener("mousemove", onMove); wrap.removeEventListener("mouseleave", onLeave); };
  }, []);
  return (
    <footer id="contact" className="section-padding relative z-content bg-black pb-[max(6rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div ref={wrapRef} className="flex h-64 w-64 items-center justify-center">
          <a ref={btnRef} href="https://topmate.io/techieyogi" target="_blank" rel="noopener noreferrer" className="magnetic flex h-48 w-48 items-center justify-center rounded-full border-2 border-accent font-editorial text-xl text-white transition hover:bg-accent hover:text-black" data-cursor="link">Let's Build<br />Your Authority</a>
        </motion.div>
        <p className="mt-8 text-muted"><a href="https://topmate.io/techieyogi" className="text-accent">Book discovery call →</a></p>
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/70">
          <a href="tel:+917863033445">+91 7863033445</a>
          <a href="mailto:techie.yogi1@gmail.com">techie.yogi1@gmail.com</a>
          <a href="https://instagram.com/iamthatyogii" target="_blank" rel="noopener noreferrer">@iamthatyogii</a>
        </motion.div>
        <p className="mt-16 text-xs text-muted">Recun Marketing 18 · Surat, Gujarat</p>
        <p className="mt-2 text-xs text-muted/60">© 2025 Yogii Kumar</p>
      </motion.div>
    </footer>
  );
}
`;
fs.writeFileSync("components/sections/Footer.tsx", clean(footer));
console.log("done");

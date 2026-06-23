/** Site copy from Yogii Kumar website spec / docx */

import { ASSETS } from "@/lib/assets";
import { RECUN_AI_VIDEOS } from "@/lib/videos";

export const TICKER_ITEMS = [
  "Personal Branding",
  "Business Branding",
  "PR & Distribution",
  "AI System Deployment",
  "Creator Program",
] as const;

export const MECHANISM_ITEMS = [
  "4 main accounts + 18 Distribution touchpoints",
  "9 fan/niche pages — repurposed content",
  "$2000 / 4 weeks (half the market)",
  "50K followers — guaranteed in 6 months",
  "You appear everywhere. You become the authority.",
] as const;

export const DRAGON_DELIVERABLES = [
  "20 premium videos/month — Real Shoot or AI Clone, scripted + edited",
  "4 main accounts managed — Instagram, YouTube, Facebook & LinkedIn",
  "18 distribution pages — 9 Instagram + 9 YouTube Shorts, posted daily",
  "Monthly strategy session + growth report",
] as const;

export const DRAGON_WHY = `The dragon's head is the most powerful position — it leads, it sets direction, and everything follows. This service is for the founder or business owner who wants to lead their industry online — not follow. Not posting occasionally. Not hope for results. Lead.

You are placed at the centre of a content distribution network — 4 main accounts across Instagram, YouTube, Facebook and LinkedIn, plus 18 fan and niche pages all pointing the audience back to you, from 22 different angles, every month. The algorithm does not see one account. It sees 22 voices — all pointing to the same authority.`;

export const JUPITER_INTRO = `Jupiter is the largest planet — it commands gravity. This service is for brands and businesses that want a complete content campaign that pulls massive attention.`;

export const JUPITER_METRICS = [
  { value: "30", label: "In-Act Reels", detail: "Up to 2 actors in frame. Full shoot — scripted, directed & edited." },
  { value: "10", label: "AI Videos", detail: "Max 15 seconds each. Produced using advanced AI tools." },
  { value: "10", label: "Graphic Content", detail: "Including carousels. Designed for saves and shareability." },
  { value: "50", label: "Total", detail: "Guaranteed 5M views · or we keep going free" },
] as const;

export const JUPITER_INCLUDED = [
  "Social media management throughout the entire campaign",
  "Dedicated account manager — one contact, always available",
  "Daily stories — audience kept warm between main posts",
  "2 PR activities — media coverage about your business or founder story",
  "3 meme page collabs — pages up to 50,000 followers for amplified reach",
  "1 free brand & business strategy consultation with Yogii Kumar",
  "Full content creation — research, scripting, shoot, edit, and post entirely by us",
] as const;

export const JUPITER_IMPORTANT = `Service ends once all 50 pieces are live and 5M views are achieved. Not ongoing. A complete campaign with a clear finish line. Ongoing management after the campaign is discussed separately.`;

export const JUPITER_AD_CREATIVES = `All content is produced to be repurposable as paid ad creatives — ready to run on Meta, YouTube, and Instagram without additional production cost.`;

export const JUPITER_VIEWS_NOTE = `The 5M views guarantee is based on an account starting from scratch or with inconsistent posting history. If your brand already generates 100K+ monthly reach through existing consistent content, the outcome projection will differ — and will be discussed after a full page analysis and narrative review before we commit to a number.`;

export const JUPITER_OPENING =
  "Jupiter is the largest planet — it commands gravity. This service is for brands and businesses that want a complete content campaign that pulls massive attention. 50 pieces, 5 million views, done.";

export const CLIENT_CASES = [
  {
    id: "vision11",
    eyebrow: "VISION11 × CSK",
    title: "IPL 2025 Campaign",
    description:
      "End-to-end social media, ad campaigns and full digital distribution across the IPL 2025 season — from match-day content to paid amplification.",
    stat: "55M+ · Views Delivered",
  },
  {
    id: "starbucks",
    eyebrow: "STARBUCKS INDIA",
    title: "South Gujarat Influencer Campaign",
    description:
      "Managed the 2024 influencer marketing rollout across Surat, Vadodara and Vapi — delivering global brand standards through regional creator partnerships.",
    stat: "Surat · Vadodara · Vapi · 2024",
  },
  {
    id: "rapido",
    eyebrow: "RAPIDO",
    title: "Captain Stories Campaign",
    description:
      "Crafted and produced content for Rapido captains — humanising India's #1 bike taxi platform through the real stories of the people behind every ride.",
    stat: "Documentary content shoot",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "The team showcased exceptional execution during IPL 2025. Handling high-profile assets like Suresh Raina along with multiple Vision 11 creator profiles, they delivered consistent, high-quality content with strong strategic direction. The overall campaign performance was outstanding.",
    author: "Mr. Jay, CMO, Vision 11",
  },
  {
    quote:
      "From content to media planning, Yogi delivered effective ad creatives for Rapido Captains. His work ensured strong visibility, engagement, and measurable results.",
    author: "Mr. Robin, Regional Manager, Rapido",
  },
  {
    quote:
      "Yogi managed our Summer 2024 campaign in South Gujarat with a sharp influencer strategy. His execution drove strong visibility, engagement, and brand impact.",
    author: "Amar Thakur, Regional Manager, Starbucks India",
  },
  {
    quote:
      "From ideation to funding and UAE company setup, Yogi handled tech, operations, and systems single-handedly. A true one-man army delivering complete business execution beyond his CMO role.",
    author: "Prashant Kakadiya, Founder & CEO, Festum Evento Pvt Ltd",
  },
] as const;

export const CONVERSATIONS = [
  { name: "Nawaz Shaikh", stat: "1.6M+", session: "Ghostwriting Session", image: ASSETS.conversations.nawazShaikh },
  { name: "Riya Upreti", stat: "1M", session: "Ghostwriting Session", image: ASSETS.conversations.riyaUpreti },
  { name: "Shubhankar Sen Gupta", stat: "35K+", session: "Strategy Session", image: ASSETS.conversations.subhankarSengupta },
  { name: "Viplav Panghal & Gaurav Rawat", stat: "215K+ & 100K+", session: "Generative AI Sessions and Content Strategy", image: ASSETS.conversations.viplavGaurav },
  { name: "RJ Dheeraj", stat: "70K+", session: "PR Collab Session", image: ASSETS.conversations.rjDheeraj },
  { name: "Karthik Naidu", stat: "—", session: "SAAS & Marketing Sessions", image: ASSETS.conversations.karthikNaidu },
  { name: "Romil Mavani", stat: "—", session: "Mavani Solutions IT Agency · Business Consultancy Session", image: ASSETS.conversations.romilMavani },
  { name: "Kasim Shaikh", stat: "—", session: "Business Consultancy Session", image: ASSETS.conversations.kasimShaikh },
  { name: "Dabhi Manthan", stat: "—", session: "Podcast & Content Session", image: ASSETS.conversations.dabhiManthan },
  { name: "Yogii Kumar", stat: "125M+ Views", session: "Founder · Strategy & Content Sessions", image: ASSETS.conversations.yogiiProfile },
  { name: "Recun Studio", stat: "—", session: "In-Studio Content Production", image: ASSETS.conversations.yogiiStudio },
  { name: "Brand Sessions", stat: "—", session: "Personal Branding Shoots", image: ASSETS.conversations.yogiiYellow },
  { name: "Multi-Session Collab", stat: "—", session: "Creator & Founder Strategy Days", image: ASSETS.conversations.multiSession },
] as const;

export const CREATOR_BADGES = [
  { initials: "NS", name: "Nawaz Shaikh", followers: "1.6M+", handle: "@thenawazshaikh", image: "/images/creators/nawaz-shaikh.png" },
  { initials: "RU", name: "Riya Upreti", followers: "999K", handle: "@riyaelify", image: "/images/creators/riya-upreti.png" },
  { initials: "JD", name: "CA Jay Desai", followers: "400K", handle: "@ca.jaydesai", image: "/images/creators/ca-jay-desai.png" },
  { initials: "VP", name: "Viplav Panghal", followers: "190K / 21K YT Subs", handle: "—", image: "/images/creators/viplav-panghal.png" },
  { initials: "KP", name: "Kaushal Pandey", followers: "105K", handle: "@kaushaltalks", image: "/images/creators/kaushal-pandey.png" },
  { initials: "HK", name: "Harsh K.", followers: "100K", handle: "@harsh.ai", image: "/images/creators/harsh-k.png" },
  { initials: "GR", name: "Gaurav S Rawat", followers: "100K", handle: "@gaurav.shares", image: "/images/creators/gaurav-rawat.png" },
  { initials: "TC", name: "Tanya Chaubey", followers: "70K", handle: "@tanyaonbiz", image: "/images/creators/tanya-chaubey.png" },
] as const;

export const RECUN_AI_CARDS = [
  {
    label: "AI Clone Videos",
    title: "Your Face. Your Voice. Without a Shoot.",
    desc: "AI clone of the founder. Scripted, produced, and posted using your voice and likeness — no camera needed.",
    tags: ["Personal Branding", "Dragon's Head"],
    video: RECUN_AI_VIDEOS.aiClone,
  },
  {
    label: "Generative-AI Brand Videos",
    title: "Ad-Ready. Scroll-Stopping. Produced at Scale.",
    desc: "Generative AI video for product and service brands. Ready to run as organic or paid ads — no traditional shoot.",
    tags: ["Product Brands", "Service Brands"],
    video: RECUN_AI_VIDEOS.generativeBrand,
  },
  {
    label: "AI-Tech Deployment",
    title: "Digital Systems That Work While You Sleep.",
    desc: "Websites, landing pages, and digital tools — fully built and deployed. No technical knowledge needed.",
    tags: ["Websites", "Landing Pages", "Softwares"],
    video: RECUN_AI_VIDEOS.aiWebsite,
  },
] as const;

export const FOUNDER_FACTS = [
  { label: "Experience", short: "9+ Years", full: "Operated across marketing-tech, e-commerce, fundraising, operations, and branding for 9+ years." },
  { label: "Former Roles", short: "COO & CMO", full: "Served as Chief Operating Officer and Chief Marketing Officer across multiple high-growth startups in India." },
  { label: "Fundraising", short: "₹2CR+ Raised", full: "Successfully raised over ₹2 Crore in funding across multiple ventures." },
  { label: "Apnaadz.media", short: "Content Marketing-Tech", full: "Built a content marketing-tech platform helping business/agency owners and MSMEs grow through automated digital systems." },
  { label: "Scalelot", short: "Rose in days", full: "At Scalelot Technologies, rose in days — a leap driven by trust in ability to execute." },
  { label: "Master's Union", short: "35% Scholarship", full: "Selected by Master's Union, cleared all 3 interview rounds, received highest-ever 35% scholarship — declined to go all-in on building." },
  { label: "Festum Evento", short: "UAE Expansion", full: "Led investor relations, created pitch decks, established UAE-based entity, oversaw tech, brand, and operational expansion." },
  { label: "Philosophy", short: "Execution > Education", full: "Believes execution teaches more than education. Journey built on doing, learning, and building things that work." },
] as const;

export const FOUNDER_BIO = [
  `I believe in one simple truth: execution teaches more than education. My journey — from selling first-copy fashion on Instagram during college to leading high-growth startups across India — is built on doing, learning, and building things that work.`,
  `Over the last nine years, I've operated across multiple verticals including marketing-tech, e-commerce, fundraising, operations, and branding. I've served as Chief Operating Officer and Chief Marketing Officer and now founder, and in each of these roles, I didn't just contribute — I executed, built systems, raised funds, hired teams, and turned chaos into clarity.`,
  `At Apnaadz.media, I built a content marketing-tech platform helping business/agency owners and MSMEs grow through automated digital systems.`,
  `At Scalelot Technologies, I rose in days — a leap driven by trust in my ability to get things done.`,
  `At Festum Evento Pvt Ltd, I led investor relations, created pitch decks, established a UAE-based entity, and oversaw tech, brand, and operational expansion.`,
  `In every venture, I've dealt with both success and failure — but the result has been constant growth. These experiences have given me a 360-degree view of what it takes to scale a business in the real world.`,
  `Recently, I was selected by Master's Union, one of India's most elite B-schools — known for its industry-led model, startup ecosystem, and Global Immersion Program. Led by entrepreneur and innovator Pratham Mittal, Master's Union is redefining how business education meets real-world execution. I cleared all three interview rounds and received their highest-ever scholarship offer of 35%. But after deep reflection, I made one of the hardest decisions of my life — I declined the admission.`,
  `Not because I lacked ambition, but because I wanted to go all-in on my next venture and focus on building something truly impactful in India's startup space.`,
  `That decision wasn't about stepping away from education — it was about stepping into action. Today, I bring to the table not just years of experience, but the strategic vision and operational firepower to scale a brand and profile like yours.`,
  `With my track record in scaling startups, building systems from scratch, managing high-stake growth roles, and successfully raising over ₹2CR in funding, I bring not just experience — but clarity, speed, and result-oriented leadership.`,
  `I don't just talk about growth. I engineer it.`,
  `My network and expertise across content & media, writing & PR, narration, AI-Tech, creators, founders, angel investors, and ecosystem enablers gives us a clear edge in preparing for your next career or business strategy.`,
] as const;

export const FAQ_ITEMS = [
  {
    q: "What is the Content Distribution Network?",
    a: "We manage 22 touchpoints in total — 4 main accounts across Instagram, YouTube, Facebook, and LinkedIn that you own completely, plus 18 distribution pages (9 Instagram fan and niche pages + 9 YouTube Shorts pages) that push the same audience toward you from every angle, every single day. Most agencies fight for attention on 1 channel. We give you 22.",
  },
  {
    q: "What happens if 50K followers is not achieved in 24 weeks?",
    a: "You choose — either we return your money or we continue our services at zero additional cost until the goal is reached. This is a real guarantee. We only take clients we are confident we can deliver results for — which is also why we limit ourselves to 5 clients at a time.",
  },
  {
    q: "What is Jupiter Node and how is it different from Dragon's Head?",
    a: "Dragon's Head is for founders and professionals — 4 weeks retainer, 24 weeks contract, personal brand, 18-page distribution, 50K follower goal. Jupiter Node is for brands and businesses — a focused 50-piece content campaign, deliverable-based, not a monthly retainer, ends when 5M views is achieved. Different goals, different structure.",
  },
  {
    q: "How much of my time does Dragon's Head require each month?",
    a: "Minimal. You show up for one batch shoot per week — typically 3 to 4 hours where we shoot all videos. We handle scripting before the shoot, direction during it, and editing and distribution after. Plus one 30-minute monthly strategy call with Yogii. That is roughly 8 to 10 hours per month of your time in total. If we go with AI Avatar then only 3 to 4 hours per month.",
  },
  {
    q: "What niches do you work with?",
    a: "We work across all niches — real estate, finance, law, medicine, manufacturing, food, fashion, coaching, consulting, technology, e-commerce, hospitality, politics and more. Our Proven Content System is built to research and adapt to any niche within 48 hours of onboarding.",
  },
  {
    q: "What is the $100 token and is it refundable?",
    a: "The $100 token is paid after the discovery call to confirm your spot and show mutual seriousness. It is fully adjusted against your first month's payment — so you pay nothing extra. It ensures that only serious clients book spots, which protects everyone's time. Therefore it is not refundable and will count as consulting fees.",
  },
] as const;

export const FOOTER_SERVICES = [
  "Personal Branding",
  "Content Distribution",
  "Business Branding",
  "Tech & AI",
  "Coaching & Consulting",
] as const;

export const PROGRAM_DESCRIPTIONS = {
  recunAI: "Learn AI tools, content creation, social media marketing, and how to build a career in this space — from the inside of a real working agency.",
  contentSeCrore: "A premium 4-month program where followers turn into customers. You will get the complete blueprint to build a sellable product or service — and a one-man-army system to grow and monetise it.",
} as const;

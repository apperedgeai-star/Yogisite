/** Canonical contact + links — do not hardcode elsewhere. */
export const SITE = {
  companyName: "Yogii Kumar",
  companyLegal: "Recun Marketing 18 Pvt Ltd",
  tagline: "Personal - Business Branding & Distribution Agency",
  phone: "+91 7069028412",
  phoneTel: "+917069028412",
  whatsapp: "+91 7069028412",
  /** wa.me slug (no + prefix) */
  whatsappWa: "917069028412",
  email: "yogii@therecunmedia.in",
  emails: {
    company: "company@therecunmedia.in",
    hr: "hr@therecunmedia.in",
    sales: "sales@therecunmedia.in",
    yogii: "yogii@therecunmedia.in",
  },
  booking: "https://tally.so/r/kdr62j",
  seeOurWork: "https://tally.so/r/kdr62j",
  tallyRecunAI: "https://tally.so/r/kdr62j",
  tallyContentSeCrore: "https://tally.so/r/kdr62j",
  instagram: "https://instagram.com/yogiikumar",
  instagramHandle: "@yogiikumar",
  gold: "#C9A84C",
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${SITE.whatsappWa}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
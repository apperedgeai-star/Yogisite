/** Canonical contact + links — do not hardcode elsewhere. */
export const SITE = {
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
  booking: "https://topmate.io/techieyogi/2139181",
  seeOurWork: "https://tally.so/r/kdr62j",
  tallyRecunAI: "https://tally.so/r/J9okeY",
  tallyContentSeCrore: "https://tally.so/r/b5z4Y2",
  instagram: "https://instagram.com/iamthatyogii",
  instagramHandle: "@iamthatyogii",
  gold: "#D4A843",
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${SITE.whatsappWa}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-stats",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://yogi-tawny.vercel.app");

export const metadata: Metadata = {
  title: "Yogii Kumar — We Make Founders Famous | Recun Marketing 18",
  description:
    "Personal Branding & Distribution Agency. 125M+ Views. 50K Followers Guaranteed. Surat, India.",
  keywords: [
    "personal branding",
    "content distribution",
    "Yogii Kumar",
    "Recun Marketing",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Yogii Kumar — We Make Founders Famous",
    description:
      "125M+ Views Delivered. 50K Followers Guaranteed. The authority system for founders.",
    type: "website",
    url: siteUrl,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yogii Kumar — We Make Founders Famous",
    description:
      "125M+ Views Delivered. 50K Followers Guaranteed. The authority system for founders.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}

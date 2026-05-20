import type { Metadata, Viewport } from "next";
import { LenisProvider } from "@/providers/LenisProvider";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://yogi-tawny.vercel.app");

export const metadata: Metadata = {
  title: "Yogii Kumar — We Make Founders Famous | Recun Marketing 18",
  description:
    "Personal Branding & Distribution Agency. 50M+ Views. 50K Followers Guaranteed. Surat, India.",
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
      "50M+ Views Delivered. 50K Followers Guaranteed. The authority system for founders.",
    type: "website",
    url: siteUrl,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yogii Kumar — We Make Founders Famous",
    description:
      "50M+ Views Delivered. 50K Followers Guaranteed. The authority system for founders.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/CormorantGaramond.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Satoshi-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-void font-satoshi text-primary antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

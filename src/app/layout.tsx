import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollInitProvider } from "@/providers/ScrollInitProvider";
import { LenisProvider } from "@/providers/LenisProvider";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://yogi-tawny.vercel.app");

export const metadata: Metadata = {
  title: "Yogii Kumar — We Make Founders Famous",
  description:
    "Personal - Business Branding & Distribution Agency. 125M+ Views. 50K Followers Guaranteed. Surat, India.",
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
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-void font-sans text-primary antialiased">
        <ScrollInitProvider>
          <LenisProvider>{children}</LenisProvider>
        </ScrollInitProvider>
      </body>
    </html>
  );
}
import { Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { NavigationScroll } from "@/components/layout/navigation-scroll";
import { getMetadataBase, siteName } from "@/config/site";
import { getSiteVerification } from "@/lib/seo/verification";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffcf8" },
    { media: "(prefers-color-scheme: dark)", color: "#f0784a" },
  ],
  colorScheme: "light",
};

const verification = getSiteVerification();

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  ...(verification ? { verification } : {}),
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteName(),
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <NavigationScroll />
        {children}
      </body>
    </html>
  );
}

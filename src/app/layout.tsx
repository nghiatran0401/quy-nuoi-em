import { Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { NavigationScroll } from "@/components/layout/navigation-scroll";
import { getMetadataBase } from "@/config/site";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffcf8" },
    { media: "(prefers-color-scheme: dark)", color: "#f0784a" },
  ],
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
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
    title: "Nuôi Em",
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
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <NavigationScroll />
        {children}
      </body>
    </html>
  );
}

import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { defaultLocale } from "@/i18n/config";
import "./globals.css";

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
    <html lang={defaultLocale} suppressHydrationWarning>
      <body className={`${plusJakarta.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}

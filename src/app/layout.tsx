import { Quicksand } from "next/font/google";
import type { ReactNode } from "react";
import { defaultLocale } from "@/i18n/config";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin", "vietnamese"],
  variable: "--font-quicksand",
  display: "swap",
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body className={`${quicksand.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}

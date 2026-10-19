import type { Metadata, Viewport } from "next";
import { event } from "@/config/event";
import { golos, tektur } from "@/lib/fonts";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const title = `Приглашение: ${event.anniversary} лет Военной академии связи`;
const description = `6 ноября 2026 · ${event.city}, ${event.streetShort}. Программа торжественных мероприятий.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  // Приглашение для своих: не индексируем. Уберите, если страница должна находиться в поиске.
  robots: { index: false, follow: false },
  openGraph: { type: "website", locale: "ru_RU", siteName: event.venue, title, description },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#002624",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${tektur.variable} ${golos.variable}`}>
      <body>{children}</body>
    </html>
  );
}

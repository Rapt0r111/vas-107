import localFont from "next/font/local";

/** Шрифты из брендбука ВАС. Файлы — субсеты (кириллица + латиница) в woff2. */
export const tektur = localFont({
  src: [
    { path: "../assets/fonts/Tektur-600.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/Tektur-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-tektur",
  display: "swap",
  fallback: ["Bahnschrift", "Segoe UI", "system-ui", "sans-serif"],
});

export const golos = localFont({
  src: [
    { path: "../assets/fonts/GolosText-500.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/GolosText-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-golos",
  display: "swap",
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

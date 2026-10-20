import localFont from "next/font/local";

/** Шрифты золотого макета ВАС. Файлы — субсеты (кириллица + латиница) в woff2. */
export const playfair = localFont({
  src: [
    { path: "../assets/fonts/Playfair-600.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/Playfair-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const cormorant = localFont({
  src: [
    { path: "../assets/fonts/Cormorant-500.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/Cormorant-600.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/Cormorant-700.woff2", weight: "700", style: "normal" },
    { path: "../assets/fonts/Cormorant-600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

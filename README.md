# ВАС-107 · Приглашение на 107 годовщину Военной академии связи

Сайт-визитка: обратный отсчёт, дата (с добавлением в календарь), место (с картой), программа торжества.
Фирменные цвета, шрифты (Tektur, Golos Text) и герб — по брендбуку ВАС.

**Стек:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript (strict) · CSS без runtime · `next/font/local` · Vitest, Bun.

## Запуск

```bash
bun install
bun run dev        # http://localhost:3000
bun run check      # типы + ESLint + тесты
bun run build && bun run start
```

Менеджер пакетов — [Bun](https://bun.sh) 1.3+ (`bun.lock` в репозитории). Next.js собирается на Node.js 22+, он нужен на машине рядом с Bun.

## Структура

```
src/
  app/            layout (метаданные, шрифты), page, icon.svg, globals.css
  components/     intro · hero (+Countdown) · info · program · effects · ui
  config/         event.ts, program.ts — все тексты, даты и адрес в одном месте
  lib/            calendar (Google, .ics), countdown, format, maps, fonts, css
  styles/         tokens · base · motion · intro · hero · info · program · fit
  assets/fonts/   woff2-субсеты Tektur и Golos Text (кириллица + латиница)
public/brand/     герб и волновой паттерн (SVG)
tests/            тесты календаря, таймера и форматирования
```

Дату, адрес, программу и слоган меняют только в `src/config/`: страница, календарь и карта подхватят изменения сами.

## Как это работает

- **Один экран без прокрутки.** На мониторах (гориз. и верт.) страница вписывается в окно, размеры считаются от высоты (`src/styles/fit.css`). На телефоне и небольших планшетах страница прокручивается, блоки плавно появляются при прокрутке (CSS scroll-driven animations, без JS).
- **Таймер** — клиентский компонент на `useSyncExternalStore`: один интервал на всех, без расхождений при гидратации.
- **Календарь:** одна кнопка. На iPhone и iPad отдаёт `.ics`, встроенный в ссылку (`data:`), с напоминанием за час; на остальных устройствах открывает Google Календарь.
- **Производительность:** анимации только на `transform` и `opacity`; шрифты самохостятся и весят около 60 КБ; уважается `prefers-reduced-motion`.
- **Состояния дня.** До торжества — отсчёт, во время — «идут прямо сейчас» и метка у текущего пункта программы, после 17:00 — «Спасибо, что были с нами»; пройденные пункты затемняются.
- **Индексация отключена** (`robots: noindex`) — это приглашение для своих. Снимается в `src/app/layout.tsx`.

## Деплой на Vercel

1. Импортируйте репозиторий в Vercel (Framework Preset определится сам: Next.js).
2. Переменные окружения не обязательны. `NEXT_PUBLIC_SITE_URL` нужен, если подключён собственный домен (для ссылок в превью): см. `.env.example`.

## Превью и иконки

`src/app/opengraph-image.png` и `twitter-image.png` (1200×630) подключаются автоматически как `og:image` и `twitter:image`. Иконки: `favicon.ico`, `icon.png`, `apple-icon.png` в `src/app/`. Чтобы заменить картинку, подставьте файл с тем же именем.

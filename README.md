# Plonbli — landing page przed premierą

Responsywny landing Plonbli kierujący do listy oczekujących. Strona przedstawia ideę serwisu, sposób działania i korzyści dla osób szukających lokalnej żywności oraz gospodarstw i lokalnych pracowni.

## Najważniejsze elementy

- kierunek wizualny „Natural Premium Storybook”;
- autorska ilustracja hero oraz animowana opowieść o rosnącym plonie podczas przewijania;
- układ dopracowany dla desktopu i urządzeń mobilnych;
- dostępna nawigacja, formularz i obsługa `prefers-reduced-motion`;
- lista oczekujących oparta na Supabase;
- metadane SEO, Open Graph, dane strukturalne, sitemap i robots.txt.

## Uruchomienie lokalne

Wymagany jest Node.js 20+ albo aktualny Bun.

```bash
npm install
npm run dev
```

Alternatywnie:

```bash
bun install
bun run dev
```

## Konfiguracja formularza

Skopiuj `.env.example` do `.env` i uzupełnij publiczne dane projektu Supabase:

```env
VITE_SUPABASE_URL=https://twoj-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=twoj-publiczny-klucz-anon
```

Formularz zapisuje wyłącznie znormalizowany adres e-mail do tabeli `public.subscribers`. Kolumna `email` powinna mieć ograniczenie `UNIQUE`; rola anonimowa powinna móc wykonać tylko `INSERT`, bez dostępu do odczytu listy.

## Kontrola jakości

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Testy E2E wymagają przeglądarek Playwright (`npx playwright install`).

## Wdrożenie

GitHub Actions odpowiada wyłącznie za kontrolę jakości i nie publikuje strony. Hosting konfiguruje się niezależnie w Netlify albo Vercelu, używając polecenia `npm run build` i katalogu wynikowego `dist`.

Zmienne `VITE_SUPABASE_URL` i `VITE_SUPABASE_ANON_KEY` należy dodać w ustawieniach środowiska wybranej platformy hostingowej. Nie należy udostępniać klucza `service_role` aplikacji frontendowej.

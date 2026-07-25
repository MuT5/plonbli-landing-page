# Plonbli — landing page przed premierą

Responsywny landing Plonbli kierujący do listy oczekujących. Strona przedstawia ideę serwisu, sposób działania i korzyści dla osób szukających lokalnej żywności oraz gospodarstw i lokalnych pracowni.

## Najważniejsze elementy

- kierunek wizualny „Natural Premium Storybook”;
- responsywne obrazy AVIF/WebP i lokalnie hostowane fonty;
- dostępna nawigacja, formularz i obsługa `prefers-reduced-motion`;
- lista oczekujących oparta na Supabase;
- jedno źródło metadanych SEO, Open Graph, danych strukturalnych i ikon;
- statyczny prerender pełnej treści strony podczas buildu.

## Wymagania

- Node.js 22.x;
- npm 10 lub nowszy.

Projekt korzysta wyłącznie z npm. Po sklonowaniu repozytorium zainstaluj zależności z lockfile:

```bash
npm ci
npm run dev
```

## Konfiguracja formularza

Skopiuj `.env.example` do `.env` i uzupełnij publiczne dane projektu Supabase:

```env
VITE_SUPABASE_URL=https://twoj-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=twoj-publiczny-klucz-anon
```

Formularz zapisuje wyłącznie znormalizowany adres e-mail do tabeli `public.subscribers`. Kolumna `email` powinna mieć ograniczenie `UNIQUE`; rola anonimowa powinna móc wykonać tylko `INSERT`, bez dostępu do odczytu listy.

## Build i prerender

`npm run build` buduje klienta, renderuje aplikację przez `react-dom/server`, wstrzykuje pełny HTML do `dist/index.html` i automatycznie sprawdza wynik. Tymczasowy bundle SSR jest usuwany po zakończeniu.

```bash
npm run build
npm run verify:dist
```

`verify:dist` sprawdza między innymi metadane, canonical, Open Graph, JSON-LD, H1, formularz, FAQ oraz brak ukrytej treści prerenderowanej.

## Kontrola jakości

```bash
npm run lint -- --max-warnings=0
npm run typecheck
npm test
npm run build
npm run verify:dist
npx playwright install chromium webkit
npm run test:e2e
```

`npm run test:e2e` najpierw odświeża build, więc lokalnie nie testuje nieaktualnego katalogu `dist`. CI korzysta z `npm run test:e2e:run`, ponieważ wykonuje build w osobnym, wcześniejszym kroku.

## Wdrożenie

GitHub Actions odpowiada za kontrolę jakości i nie publikuje strony. Hosting konfiguruje się niezależnie w Netlify albo Vercelu, używając polecenia `npm run build` i katalogu wynikowego `dist`.

Zmienne `VITE_SUPABASE_URL` i `VITE_SUPABASE_ANON_KEY` należy dodać w ustawieniach środowiska wybranej platformy hostingowej. Nie należy udostępniać klucza `service_role` aplikacji frontendowej.

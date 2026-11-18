# Od Swoich | strona przed premierą

Od Swoich pomaga odkrywać miejsca w okolicy i kontaktować się bezpośrednio. Na początek opowiadamy o lokalnym jedzeniu. Strona ma charakter informacyjny i nie zbiera adresów e-mail.

## Najważniejsze elementy

- współczesny atlas z akwarelami polskiego gospodarstwa, pinezką i historią synchronizowaną z przewijaniem;
- responsywne obrazy AVIF/WebP i lokalnie hostowane fonty;
- dostępna nawigacja i obsługa `prefers-reduced-motion`;
- jedno źródło metadanych SEO, Open Graph, danych strukturalnych i ikon;
- statyczny prerender pełnej treści strony podczas buildu.

Aktualny podział treści, ilustracje i listę kontrolną przed publikacją opisuje [instrukcja atlasu](docs/OD_SWOICH_ATLAS.md).

## Wymagania

- Node.js 22.12 lub nowszy z linii 22.x;
- npm 10 lub nowszy.

Projekt korzysta wyłącznie z npm. Po sklonowaniu repozytorium zainstaluj zależności z lockfile:

```bash
npm ci
npm run dev
```

## Dane odwiedzających

Strona nie ma formularza, systemu analityki ani zewnętrznej bazy danych. Do uruchomienia podglądu i zbudowania strony nie są potrzebne klucze ani plik `.env`.

## Build i prerender

`npm run build` buduje klienta, renderuje aplikację przez `react-dom/server`, wstrzykuje pełny HTML do `dist/index.html` i automatycznie sprawdza wynik. Tymczasowy bundle SSR jest usuwany po zakończeniu.

```bash
npm run build
npm run verify:dist
```

`verify:dist` sprawdza między innymi metadane, canonical, Open Graph, JSON-LD, H1, FAQ oraz brak pól zapisu i odnośników do dawnego formularza.

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

GitHub Actions odpowiada za kontrolę jakości. Produkcję buduje Netlify z gałęzi `main`; ustawienia komendy, katalogu wynikowego i wersji Node są zapisane w `netlify.toml`. Bazowy adres strony i metadanych to `https://odswoich.pl`.

---
title: "Plonbli — kontekst projektu dla Codex"
document_type: "project-context / product-and-brand-brief"
language: "pl-PL"
status: "robocze źródło prawdy dla przebudowy landing page"
last_updated: "2026-07-10"
primary_scope: "landing page Plonbli"
---

# Plonbli — pełny kontekst projektu dla Codex

> Przeczytaj cały dokument przed zmianą treści, układu lub komponentów landingu. Najważniejsza zasada: **Plonbli nie jest sklepem, nie przyjmuje zamówień, nie obsługuje płatności i nie jest stroną sprzedaży.** Plonbli pomaga znaleźć lokalnego producenta, sprawdzić jego ofertę, wysłać zapytanie i ustalić szczegóły bezpośrednio z producentem.

## 0. Jak korzystać z tego dokumentu

Ten plik konsoliduje dostępne informacje o projekcie Plonbli: definicję produktu, granice modelu biznesowego, publicznie deklarowane funkcje aplikacji, zasady języka, branding, assety, strukturę rekomendowanego landing page, wymagania wdrożeniowe, analitykę, aspekty prawne oraz wykryte sprzeczności w starszych materiałach.

### 0.1. Znaczenie etykiet

- **[KANON]** — obowiązująca definicja produktu, komunikacji lub marki. Nie zmieniaj bez decyzji właściciela projektu.
- **[LIVE]** — informacja widoczna w publicznej aplikacji, regulaminie, polityce prywatności albo na stronie w dniu 2026-07-10.
- **[HISTORYCZNE]** — starszy materiał. Może być referencją wizualną, ale nie jest źródłem aktualnej treści.
- **[REKOMENDACJA]** — proponowane rozwiązanie dla nowego landingu.
- **[TBD]** — decyzja, której nie da się bezpiecznie wywnioskować; nie zgaduj jej w kodzie.

### 0.2. Hierarchia źródeł w razie konfliktu

Stosuj kolejność od najwyższego priorytetu:

1. **[KANON] Poprawiony przewodnik komunikacji i marki** — `bazowy-styl-kampanii-Plonbli.txt`.
2. **[LIVE] Regulamin i polityka prywatności aplikacji** — określają realne granice usługi i przetwarzania danych.
3. **[LIVE] Publiczna aplikacja testowa** — źródło informacji o obecnie deklarowanych funkcjach, ale nie zawsze poprawnego języka marketingowego.
4. **[KANON DLA SOCIALI] Najnowszy system grafik kampanijnych** — serie promptów z 2026-07-09.
5. **[HISTORYCZNE] Stary landing, ulotki i infografiki** — pokazują wcześniejszy kierunek, który miejscami jest sprzeczny z aktualnym modelem.

Jeżeli treść w repozytorium przeczy punktom 1–2, **nie kopiuj jej bezrefleksyjnie**. Oznacz konflikt i zastosuj niniejszy dokument.

---

# 1. Projekt w jednym akapicie

## 1.1. Kanoniczna definicja

**[KANON]**

> Plonbli pomaga znaleźć lokalnych producentów żywności, sprawdzić ich ofertę i skontaktować się bezpośrednio. Nie jesteśmy sklepem, nie przyjmujemy zamówień i nie obsługujemy płatności. Szczegóły odbioru i rozliczenia użytkownik ustala bezpośrednio z producentem.

## 1.2. Definicja marketingowa

**[KANON]**

> **Plonbli — lokalne produkty bliżej Ciebie.**  
> Znajdź producentów w okolicy, sprawdź ich ofertę i wyślij zapytanie bezpośrednio.

## 1.3. Najkrótszy komunikat

**[KANON]**

> Znajdź lokalnych producentów. Zapytaj bezpośrednio. Umów odbiór.

Dopuszczalne skróty:

- `Znajdź. Zapytaj. Umów odbiór.`
- `Lokalne produkty bliżej Ciebie.`
- `Plon blisko Ciebie.`

## 1.4. Jednozdaniowa kategoria produktu

**[KANON]** Plonbli to **katalog lokalnych producentów żywności i narzędzie bezpośredniego kontaktu**.

Nie opisuj Plonbli jako sklepu, operatora sprzedaży, operatora płatności, usługi dostawczej ani platformy finalizującej transakcje.

---

# 2. Twarde granice produktu

## 2.1. Co Plonbli robi

Plonbli:

- pomaga odkrywać lokalnych producentów i gospodarstwa;
- pokazuje profile, ofertę, dostępność oraz informacje o pochodzeniu produktów;
- pomaga znaleźć producentów w okolicy, również z użyciem lokalizacji i mapy;
- umożliwia wysłanie zapytania lub rozpoczęcie bezpośredniego kontaktu;
- może wspierać rozmowę, uzgodnienie terminu i sposobu odbioru;
- może prezentować opinie, reputację, posty, grupy, wydarzenia i dokumentację upraw — o ile te funkcje są faktycznie dostępne w wdrażanej wersji aplikacji;
- hostuje treści dodawane przez użytkowników, takie jak profile, oferty, posty, opinie i wiadomości.

## 2.2. Czego Plonbli nie robi

**[KANON / LIVE REGULAMIN]** Plonbli:

- nie jest sklepem internetowym;
- nie jest stroną umowy sprzedaży;
- nie przyjmuje ani nie potwierdza zamówień;
- nie prowadzi checkoutu;
- nie przetwarza płatności;
- nie przyjmuje BLIK-a ani kart;
- nie rozlicza stron;
- nie organizuje dostawy jako operator platformy;
- nie gwarantuje dostępności, jakości ani zgodności produktów;
- nie weryfikuje każdej oferty przed publikacją;
- nie pobiera prowizji od transakcji, ponieważ nie pośredniczy w transakcji;
- nie powinno komunikować wartości za pomocą GMV, „sprzedaży przez Plonbli” ani liczby zamówień.

## 2.3. Model interakcji

**[KANON]**

```text
Znajdź producenta
→ Sprawdź ofertę i dostępność
→ Wyślij zapytanie
→ Ustal odbiór i rozliczenie bezpośrednio z producentem
```

Zakazane uproszczenie:

```text
Wybierz produkty
→ Zamów
→ Zapłać
```

## 2.4. Bezpieczna formuła dotycząca odbioru, ceny i rozliczenia

Słowa `cena`, `odbiór`, `dostawa` i `rozliczenie` można stosować tylko wtedy, gdy komunikat jasno mówi, że szczegóły są ustalane **bezpośrednio między użytkownikiem a producentem, poza Plonbli**.

Dobry przykład:

> Zapytaj producenta o dostępność i umów odbiór bezpośrednio.

Zły przykład:

> Zamów produkty z dostawą przez Plonbli.

---

# 3. Użytkownicy i role

## 3.1. Konsument

Osoba, która chce:

- znaleźć produkty i producentów w swojej okolicy;
- sprawdzić aktualną ofertę lub dostępność;
- dowiedzieć się, kto i jak produkuje żywność;
- skontaktować się bezpośrednio z gospodarstwem;
- ustalić termin, miejsce lub warunki odbioru;
- obserwować profile, lokalne aktualności, grupy lub wydarzenia.

### Główna obietnica dla konsumenta

> W jednym miejscu znajdziesz lokalnych producentów, sprawdzisz ich ofertę i zapytasz bezpośrednio o szczegóły.

## 3.2. Producent / rolnik

Osoba lub lokalny podmiot, który chce:

- dać się znaleźć osobom z okolicy;
- prowadzić profil gospodarstwa lub pracowni;
- pokazywać ofertę i dostępność;
- odpowiadać na zapytania bezpośrednio;
- budować zaufanie przez informacje o produkcji, opinie lub aktualności;
- opcjonalnie prowadzić dokumentację upraw, jeżeli funkcja jest dostępna.

### Główna obietnica dla producenta

> Pokaż swoją ofertę osobom z okolicy i odpowiadaj na zapytania bezpośrednio.

## 3.3. Użytkownik łączący role

**[LIVE REGULAMIN]** Aplikacja deklaruje trzy role konta:

- `Rolnik`;
- `Konsument`;
- `Rolnik i Konsument`.

Role można zmieniać w ustawieniach profilu. Landing może posługiwać się szerszym i bardziej inkluzywnym słowem **producent**, ale teksty interfejsu muszą pozostać spójne z aktualnym modelem kont i regulaminem.

## 3.4. Ambasador lokalnego producenta

**[LIVE — DEKLAROWANA FUNKCJA]** Profil-ambasador pozwala użytkownikowi utworzyć wizytówkę lokalnego rolnika, który sam nie korzysta z internetu.

Obecnie publiczna aplikacja deklaruje, że:

- każdy użytkownik może utworzyć do 3 profili-ambasadorów;
- profil zawiera produkty, metody kontaktu i lokalizację;
- inni użytkownicy mogą obserwować profil;
- kontakt ma odbywać się bezpośrednio.

Nie eksponuj limitu `3` jako trwałej obietnicy biznesowej bez sprawdzenia, czy nadal obowiązuje w kodzie i backendzie.

---

# 4. Główne ścieżki użytkownika

## 4.1. Ścieżka konsumenta — landing i produkt

**[KANON]**

1. **Znajdź producenta**  
   Odkryj gospodarstwa i lokalnych twórców żywności w swojej okolicy.
2. **Sprawdź ofertę**  
   Zobacz produkty, dostępność i informacje opublikowane przez producenta.
3. **Wyślij zapytanie**  
   Zapytaj o produkt, termin odbioru lub inne szczegóły.
4. **Umów się bezpośrednio**  
   Odbiór i rozliczenie ustalasz bezpośrednio z producentem.

## 4.2. Ścieżka producenta

**[REKOMENDACJA OPARTA NA LIVE APP]**

1. Załóż konto i wybierz rolę producenta/rolnika.
2. Uzupełnij profil, lokalizację i informacje o gospodarstwie.
3. Dodaj produkty lub aktualną ofertę.
4. Odbieraj zapytania i odpowiadaj użytkownikom bezpośrednio.
5. Aktualizuj dostępność, informacje, posty lub dokumentację — zależnie od rzeczywiście dostępnych modułów.

Nie używaj hasła `Zacznij sprzedawać przez Plonbli`.

## 4.3. Ścieżka ambasadora

1. Załóż konto.
2. Dodaj profil lokalnego producenta, który nie działa online.
3. Uzupełnij produkty, lokalizację i bezpośredni kontakt.
4. Aktualizuj wizytówkę za zgodą producenta.

**[TBD]** Przed mocnym promowaniem tej funkcji na landingu należy potwierdzić zasady zgody producenta, moderacji profilu i odpowiedzialności za aktualność danych.

---

# 5. Publicznie deklarowany zakres aplikacji

Poniższa lista opisuje funkcje widoczne w publicznej aplikacji lub dokumentach prawnych. Nie oznacza automatycznie, że każda funkcja jest kompletna, produkcyjna i przetestowana.

## 5.1. Konto i uwierzytelnianie

**[LIVE]**

- rejestracja z użyciem imienia i nazwiska, e-maila, hasła oraz roli;
- akceptacja regulaminu i polityki prywatności;
- potwierdzenie ukończenia 18 lat;
- logowanie e-mail + hasło;
- publicznie prezentowane logowanie przez Google i Facebook;
- możliwość zmiany motywu kolorystycznego.

## 5.2. Lokalizacja i wyszukiwanie

**[LIVE POLITYKA PRYWATNOŚCI / DEKLARACJE APP]**

- województwo, powiat, gmina, kod pocztowy;
- dane adresowe profilu;
- współrzędne GPS za zgodą użytkownika;
- wyświetlanie producentów na mapie;
- wyszukiwanie najbliższych producentów;
- przeglądanie ofert w okolicy.

## 5.3. Profile, oferty i treści

**[LIVE]**

- profil producenta/rolnika;
- oferty i produkty;
- posty i aktualności;
- opinie oraz reputacja;
- wiadomości;
- członkostwo w grupach;
- profil-ambasador;
- opcjonalna dokumentacja lub dziennik upraw.

## 5.4. Kontakt

**[LIVE / KANON]**

- bezpośredni kontakt z producentem;
- czat lub wiadomości w aplikacji;
- pytania o dostępność i szczegóły;
- ustalenie odbioru między stronami.

W publicznej stronie aplikacji pojawia się tekst `zamów produkty`. Jest on **sprzeczny z kanonicznym modelem komunikacji** i powinien zostać zmieniony na `wyślij zapytanie` albo `ustal szczegóły bezpośrednio`.

## 5.5. Funkcje społecznościowe

**[LIVE — DEKLAROWANE]**

- social feed;
- obserwowanie producentów;
- grupy;
- wydarzenia i lokalne targi;
- aktualności od obserwowanych profili.

Warstwa społecznościowa może być argumentem wspierającym, ale landing powinien najpierw wyjaśnić podstawową wartość: **odkrywanie producentów i bezpośredni kontakt**.

## 5.6. PWA

**[LIVE — DEKLAROWANE]** Aplikacja przedstawia się jako PWA działająca podobnie do aplikacji natywnej na telefonie.

**[TBD]** Przed użyciem odznaki lub mocnego zapewnienia typu `Zainstaluj aplikację` potwierdź:

- poprawny manifest;
- service worker;
- tryb offline lub właściwy fallback;
- ikony i splash screens;
- instalowalność na Androidzie i iOS;
- zachowanie po aktualizacji wersji.

## 5.7. Kolejność treści i promocja

**[LIVE REGULAMIN]** Ogłoszenia są deklarowane jako sortowane od najnowszych. Serwis deklaruje brak:

- płatnego promowania;
- reklam natywnych;
- algorytmów personalizowanych.

Nie dodawaj na landing zapewnień o zaawansowanym dopasowaniu AI lub personalizacji, jeśli produkt tego nie oferuje.

---

# 6. Kanoniczny język produktu

## 6.1. Słowa preferowane

Używaj:

```text
producent
lokalny producent
gospodarstwo
rolnik
sadownik
pszczelarz
serowar
piekarnia lokalna
pasieka
lokalna kuchnia
oferta
produkty
lokalne produkty
dostępność
sprawdź ofertę
sprawdź dostępność
zapytanie
wyślij zapytanie
zapytaj producenta
kontakt bezpośredni
umów odbiór
odbiór bezpośrednio
ustalenia bezpośrednio z producentem
wspieraj lokalnie
poznaj producentów w okolicy
```

## 6.2. Słowa i konstrukcje zakazane w komunikacji produktu

Nie używaj jako opisu funkcji Plonbli:

```text
sklep
marketplace
kup
kupuj
kup teraz
koszyk
checkout
kasa
zamówienie
zamów
zamów z dostawą
sprzedawca
sprzedaż przez Plonbli
transakcja przez Plonbli
płatność w Plonbli
zapłać w Plonbli
BLIK w Plonbli
prowizja od sprzedaży
model sprzedaży
GMV
```

Słowo `marketplace` występuje obecnie na stronie aplikacji, ale jest **treścią do migracji**, nie wzorem dla landingu.

## 6.3. Mapowanie starego UI na poprawne UI

| Nie używać | Używać |
|---|---|
| Koszyk | Wybrane produkty / Lista zapytania |
| Dodaj do koszyka | Dodaj do zapytania |
| Checkout | Formularz zapytania |
| Zamówienie | Zapytanie |
| Moje zamówienia | Moje zapytania |
| Status zamówienia | Status zapytania |
| Kup teraz | Zapytaj o produkt |
| Płatność | Ustalenia z producentem |
| Sprzedawca | Producent |

## 6.4. Ton komunikacji

Tekst powinien być:

- prosty;
- ciepły;
- lokalny;
- wiarygodny;
- spokojny;
- konkretny;
- bez korporacyjnych fraz;
- bez przesadnych superlatyw;
- bez języka e-commerce;
- konsekwentnie oparty na bliskości i bezpośrednim kontakcie.

Nie obiecuj:

- najniższych cen;
- lepszej jakości każdego produktu;
- pełnej weryfikacji producentów;
- bezpieczeństwa każdej transakcji;
- dostępności dostawy;
- działania funkcji, której nie potwierdzono w produkcji.

## 6.5. Dobre hasła

- `Lokalne produkty bliżej Ciebie.`
- `Poznaj producentów w swojej okolicy.`
- `Świeże produkty. Blisko. Bezpośrednio.`
- `Zapytaj producenta u źródła.`
- `Plon blisko Ciebie.`
- `Sprawdź, kto produkuje żywność w Twojej okolicy.`
- `Od gospodarstwa do rozmowy. Bezpośrednio.`
- `Znajdź lokalne produkty i umów odbiór bezpośrednio.`
- `Lokalni producenci. Jedno miejsce kontaktu.`
- `Poznaj ludzi, od których pochodzi jedzenie.`

## 6.6. Hasła do usunięcia

- `Kupuj lokalnie.` — bez dodatkowego kontekstu sugeruje transakcję w platformie.
- `Kupuj lokalnie — odbierz osobiście lub zamów z dostawą.`
- `Wybierz produkty, zamów i zapłać.`
- `Najlepsza aplikacja zakupowa.`
- `Rewolucja zakupów spożywczych.`
- `Innowacyjny marketplace spożywczy.`
- `0% prowizji od sprzedaży.`
- `Zamówienia od lokalnych rolników.`
- `Sprzedawaj bezpośrednio, zarabiaj więcej.`

## 6.7. CTA

### Preferowane CTA

- `Sprawdź producentów w okolicy`
- `Znajdź lokalne produkty`
- `Poznaj gospodarstwa w pobliżu`
- `Wyślij zapytanie`
- `Zapytaj producenta`
- `Umów odbiór bezpośrednio`
- `Dołącz do Plonbli`
- `Dodaj profil producenta`
- `Daj się znaleźć lokalnie`
- `Zaloguj się`

### CTA do unikania

- `Kup teraz`
- `Zamów teraz`
- `Dodaj do koszyka`
- `Przejdź do kasy`
- `Zapłać`
- `Zamów z dostawą`
- `Zacznij sprzedawać przez Plonbli`

## 6.8. Stałe disclaimery

### Krótki — landing / FAQ

> Plonbli nie jest sklepem i nie obsługuje płatności. Pomagamy znaleźć producenta i wysłać zapytanie.

### Dłuższy — materiały informacyjne

> Plonbli umożliwia kontakt z lokalnymi producentami. Szczegóły odbioru i rozliczenia ustalasz bezpośrednio z producentem.

### Wersja przy CTA

> Odbiór i rozliczenie ustalasz bezpośrednio z producentem.

---

# 7. Różne warianty schematu „Jak to działa”

## 7.1. Landing i dłuższe materiały — 4 kroki

**[KANON]**

```text
1. Znajdź producenta
2. Sprawdź ofertę
3. Wyślij zapytanie
4. Umów się bezpośrednio
```

To najlepszy wariant dla nowego landing page, ponieważ wyjaśnia rolę Plonbli i oddziela zapytanie od ustaleń poza platformą.

## 7.2. Krótki materiał — 3 kroki

```text
1. Znajdź producenta
2. Sprawdź ofertę
3. Wyślij zapytanie
```

## 7.3. Szablon grafik social 4:5 — dokładnie 3 kroki

**[KANON DLA ISTNIEJĄCEJ SERII GRAFIK]**

```text
1. Znajdź gospodarstwo w okolicy
2. Sprawdź ofertę
3. Umów odbiór bezpośrednio
```

Wymóg `nie dodawaj czwartego kroku` dotyczy konkretnego szablonu grafik social z czterema kartami. **Nie dotyczy landingu**, gdzie właściwy jest pełniejszy wariant czterokrokowy.

---

# 8. Rekomendowana architektura nowego landing page

## 8.1. Cel strony

Landing ma w ciągu kilku sekund odpowiedzieć na cztery pytania:

1. Czym jest Plonbli?
2. Dla kogo jest?
3. Jak działa bez sklepu i płatności?
4. Gdzie użytkownik ma kliknąć dalej?

Cele drugorzędne:

- zbudować zaufanie;
- przedstawić wartość dla konsumenta i producenta;
- pokazać warstwę społecznościową bez rozmywania głównej obietnicy;
- skorygować stare skojarzenie z marketplace'em;
- skierować użytkownika do aplikacji testowej lub przyszłej domeny produkcyjnej;
- zapewnić spójność z regulaminem i polityką prywatności.

## 8.2. Header

### Elementy

- logo Plonbli;
- link kotwiczący `Jak to działa`;
- link `Dla producentów`;
- opcjonalny link `O Plonbli` lub `FAQ`;
- przycisk tekstowy `Zaloguj się`;
- główne CTA `Dołącz do Plonbli` albo `Sprawdź producentów`.

### Reguły

- Na mobile użyj dostępnego menu, ale nie ukrywaj jedynego CTA bezpośrednio pod ikoną.
- Logo musi mieć tekst alternatywny `Plonbli`.
- Nie stosuj `Kupuj`, `Sklep`, `Marketplace` ani ikon koszyka.

## 8.3. Hero — rekomendowana finalna treść

### Eyebrow

```text
Lokalna żywność • bezpośredni kontakt
```

### H1

```text
Lokalne produkty bliżej Ciebie
```

### Lead

```text
Znajdź producentów w okolicy, sprawdź ich ofertę i wyślij zapytanie bezpośrednio.
```

### Główne CTA

```text
Sprawdź producentów w okolicy
```

### Drugie CTA

```text
Daj się znaleźć jako producent
```

### Microcopy pod CTA

```text
Plonbli nie jest sklepem. Odbiór i rozliczenie ustalasz bezpośrednio z producentem.
```

### Wizual

Preferowana scena:

- polska wieś lub mapa lokalnej okolicy;
- producent przy gospodarstwie, sadzie, pasiece, piekarni albo serowarni;
- konsument odkrywający profil lub rozmawiający z producentem;
- subtelny motyw pszczoły;
- bez koszyka, terminala, kuriera, karty płatniczej i ekranu checkoutu.

## 8.4. Sekcja „Jak to działa”

### Nagłówek

```text
Od odkrycia do rozmowy — prosto i bezpośrednio
```

### Krok 1

**Znajdź producenta**  
Odkryj gospodarstwa i lokalnych twórców żywności w swojej okolicy.

### Krok 2

**Sprawdź ofertę**  
Zobacz produkty, dostępność i informacje opublikowane przez producenta.

### Krok 3

**Wyślij zapytanie**  
Zapytaj o produkt, termin odbioru lub inne szczegóły.

### Krok 4

**Umów się bezpośrednio**  
Odbiór i rozliczenie ustalasz bezpośrednio z producentem.

### Wskazówka komponentowa

Na desktopie można użyć czterech kart w jednym rzędzie lub dwóch rzędach po dwie. Na mobile każdy krok musi pozostać czytelny bez poziomego scrolla.

## 8.5. Sekcja dla konsumentów

### Nagłówek

```text
Poznaj ludzi, od których pochodzi jedzenie
```

### Lead

```text
Plonbli pomaga odkrywać lokalne gospodarstwa, sprawdzać ich ofertę i pytać o szczegóły bezpośrednio u źródła.
```

### Trzy główne korzyści

1. **Producenci z Twojej okolicy**  
   Szukaj gospodarstw i lokalnych twórców żywności blisko siebie.
2. **Więcej informacji o źródle**  
   Zobacz profil, produkty i informacje opublikowane przez producenta.
3. **Bezpośrednia rozmowa**  
   Zapytaj o dostępność, termin i sposób odbioru bez zbędnego pośrednictwa.

Nie używaj jako obietnicy `tańsze`, `najświeższe`, `zweryfikowane` ani `gwarantowana jakość`.

## 8.6. Sekcja dla producentów

### Nagłówek

```text
Daj się znaleźć lokalnie
```

### Lead

```text
Pokaż swoją ofertę osobom z okolicy i odpowiadaj na zapytania bezpośrednio.
```

### Korzyści

- profil gospodarstwa lub lokalnej pracowni;
- prezentacja produktów i aktualnej oferty;
- lokalna widoczność;
- bezpośrednie zapytania od użytkowników;
- możliwość budowania zaufania przez informacje, aktualności i opinie — jeżeli moduły są aktywne.

### CTA

```text
Dodaj profil producenta
```

### Microcopy

```text
Plonbli pomaga w kontakcie. Ustalenia dotyczące odbioru i rozliczenia prowadzisz bezpośrednio z użytkownikiem.
```

## 8.7. Sekcja profilu-ambasadora

Sekcja opcjonalna. Warto ją dodać, jeżeli funkcja jest aktywna i ma jasne zasady.

### Nagłówek

```text
Pomóż lokalnemu producentowi zaistnieć online
```

### Treść

```text
Znasz gospodarstwo, którego nie ma jeszcze w internecie? Utwórz profil-ambasador i pomóż osobom z okolicy znaleźć jego ofertę oraz bezpośredni kontakt.
```

### CTA

```text
Dowiedz się, jak dodać producenta
```

**[TBD]** Nie publikuj limitu trzech profili ani obietnicy pełnej funkcjonalności, dopóki nie zostaną sprawdzone w aktualnym produkcie.

## 8.8. Sekcja funkcji aplikacji

Pokazuj tylko funkcje potwierdzone w aktualnym buildzie. Proponowana kolejność:

1. wyszukiwanie lokalne i mapa;
2. profile producentów i oferta;
3. zapytania lub wiadomości;
4. obserwowanie aktualności;
5. opinie i reputacja;
6. grupy i wydarzenia;
7. dokumentacja upraw — tylko dla producenta i tylko po potwierdzeniu funkcjonalności.

Nie nazywaj sekcji `Marketplace`.

Rekomendowany nagłówek:

```text
Wszystko, czego potrzebujesz, aby znaleźć i poznać lokalnych producentów
```

## 8.9. Sekcja zaufania i granic usługi

### Nagłówek

```text
Bezpośredni kontakt, jasne zasady
```

### Treść

```text
Plonbli udostępnia profile, oferty i narzędzia kontaktu. Nie jest stroną sprzedaży i nie obsługuje płatności. Dostępność, cena, odbiór i rozliczenie są ustalane bezpośrednio między użytkownikiem a producentem.
```

Dodaj widoczne linki do regulaminu i polityki prywatności.

## 8.10. FAQ — proponowany zestaw

### Czy Plonbli jest sklepem?

Nie. Plonbli pomaga znaleźć producenta, sprawdzić jego ofertę i skontaktować się bezpośrednio. Nie przyjmujemy zamówień i nie obsługujemy płatności.

### Jak ustalam odbiór produktu?

Wyślij zapytanie do producenta. Termin, miejsce odbioru, cena i sposób rozliczenia są ustalane bezpośrednio między Wami.

### Czy mogę zapłacić przez Plonbli?

Nie. Plonbli nie przetwarza płatności.

### Kto może utworzyć konto?

Publiczna aplikacja przewiduje role konsumenta, rolnika oraz konto łączące obie role. Rejestracja wymaga akceptacji regulaminu, polityki prywatności i potwierdzenia pełnoletności.

### Czy Plonbli jest bezpłatne?

**[TBD]** Regulamin opisuje serwis jako działający pro bono, a publiczny landing aplikacji deklaruje bezpłatność. Przed publikacją odpowiedzi potwierdź aktualny model biznesowy. Do czasu potwierdzenia nie obiecuj `zawsze za darmo`.

### Co to jest profil-ambasador?

To wizytówka lokalnego producenta utworzona przez użytkownika, która pomaga pokazać produkty, lokalizację i sposób bezpośredniego kontaktu.

### Czy Plonbli weryfikuje produkty?

Zgodnie z aktualnym regulaminem Plonbli nie prowadzi uprzedniej weryfikacji każdego produktu ani nie jest stroną ustaleń między użytkownikami.

## 8.11. Finalne CTA

### Nagłówek

```text
Sprawdź, kto produkuje żywność w Twojej okolicy
```

### CTA główne

```text
Przejdź do Plonbli
```

### CTA drugie

```text
Dodaj profil producenta
```

### Microcopy

```text
Znajdź producenta. Wyślij zapytanie. Umów odbiór bezpośrednio.
```

## 8.12. Footer

Powinien zawierać:

- logo i krótki opis;
- link do aplikacji;
- logowanie i rejestrację;
- regulamin;
- politykę prywatności;
- linki społecznościowe;
- adresy kontaktowe publikowane w dokumentach prawnych;
- krótkie zastrzeżenie o braku obsługi płatności.

Nie umieszczaj danych podmiotu prawnego, adresu siedziby ani numerów rejestrowych, dopóki nie zostaną dostarczone i zweryfikowane.

---

# 9. Gotowy zestaw copy dla pierwszej wersji landingu

Poniższy blok można potraktować jako domyślny content source. Edycje powinny zachować sens i granice produktu.

```yaml
brand: "Plonbli"
hero:
  eyebrow: "Lokalna żywność • bezpośredni kontakt"
  title: "Lokalne produkty bliżej Ciebie"
  description: "Znajdź producentów w okolicy, sprawdź ich ofertę i wyślij zapytanie bezpośrednio."
  primaryCta: "Sprawdź producentów w okolicy"
  secondaryCta: "Daj się znaleźć jako producent"
  note: "Plonbli nie jest sklepem. Odbiór i rozliczenie ustalasz bezpośrednio z producentem."

howItWorks:
  title: "Od odkrycia do rozmowy — prosto i bezpośrednio"
  items:
    - title: "Znajdź producenta"
      text: "Odkryj gospodarstwa i lokalnych twórców żywności w swojej okolicy."
    - title: "Sprawdź ofertę"
      text: "Zobacz produkty, dostępność i informacje opublikowane przez producenta."
    - title: "Wyślij zapytanie"
      text: "Zapytaj o produkt, termin odbioru lub inne szczegóły."
    - title: "Umów się bezpośrednio"
      text: "Odbiór i rozliczenie ustalasz bezpośrednio z producentem."

forConsumers:
  title: "Poznaj ludzi, od których pochodzi jedzenie"
  description: "Plonbli pomaga odkrywać lokalne gospodarstwa, sprawdzać ich ofertę i pytać o szczegóły bezpośrednio u źródła."

forProducers:
  title: "Daj się znaleźć lokalnie"
  description: "Pokaż swoją ofertę osobom z okolicy i odpowiadaj na zapytania bezpośrednio."
  cta: "Dodaj profil producenta"

trust:
  title: "Bezpośredni kontakt, jasne zasady"
  description: "Plonbli udostępnia profile, oferty i narzędzia kontaktu. Nie jest stroną sprzedaży i nie obsługuje płatności. Dostępność, cena, odbiór i rozliczenie są ustalane bezpośrednio między użytkownikiem a producentem."

finalCta:
  title: "Sprawdź, kto produkuje żywność w Twojej okolicy"
  primaryCta: "Przejdź do Plonbli"
  secondaryCta: "Dodaj profil producenta"
  note: "Znajdź producenta. Wyślij zapytanie. Umów odbiór bezpośrednio."
```

---

# 10. Kierunek marki i design system

## 10.1. Nazwa kierunku

**Natural Premium Storybook / Local Farm Storybook**

## 10.2. Charakter

Marka ma wyglądać:

- ciepło;
- naturalnie;
- ręcznie;
- lokalnie;
- wiarygodnie;
- przyjaźnie;
- lekko bajkowo, ale nie infantylnie;
- premium, lecz nie ekskluzywnie i chłodno.

Hasło stylistyczne:

> Lokalna żywność pokazana jak mała, piękna historia z gospodarstwa.

## 10.3. Emocje

- lokalność;
- świeżość;
- zaufanie;
- prostota;
- bliskość;
- spokojna radość;
- wiejskość premium;
- bezpośredni kontakt z producentem.

## 10.4. Paleta bazowa

| Token | Hex | Zastosowanie |
|---|---:|---|
| `plonbli-green` | `#6FAF3F` | podstawowy kolor marki, CTA, ikony, aktywne elementy |
| `soft-meadow-green` | `#9BC56A` | łagodne tła, pola, dekoracje roślinne |
| `cream-paper` | `#F5EEDC` | podstawowe ciepłe tło, karty |
| `warm-ivory` | `#FFF8E7` | jasne powierzchnie, podbicia, pola tekstowe |
| `olive-premium` | `#4D6732` | nagłówki, ciemny tekst, eleganckie akcenty |
| `earth-brown` | `#8A6A43` | drewno, ziemia, linie, elementy ilustracji |
| `harvest-beige` | `#D8C49A` | ścieżki, światło, subtelne ozdoby |
| `turnip-violet` | `#C8A9B8` | rzadki akcent warzywny |
| `sky-blue-washed` | `#BFD5D8` | niebo, dalszy plan, chłodny kontrapunkt |

### Kolory znalezione w istniejącym zielonym logo

W plikach logo występują również przybliżone barwy:

- `#6BB146` — zieleń znaku;
- `#90C05F` — jaśniejsza zieleń;
- `#FEFCDA` — jasny krem.

**[REKOMENDACJA]** Przy nowym wdrożeniu najpierw stosuj paletę kanoniczną z tabeli. Kolory wyciągnięte z rasterów traktuj jako pomoc przy dopasowaniu assetów, nie jako osobny system.

## 10.5. Typografia

### Nagłówki

Preferowane:

- `Cormorant Garamond SemiBold`;
- alternatywnie `Lora SemiBold`.

Dopuszczalne:

- Libre Baskerville;
- Playfair Display.

### Tekst użytkowy

Preferowany:

- `Nunito Sans`.

Dopuszczalne:

- Source Sans 3;
- Inter;
- Aptos, jeżeli projekt musi korzystać z fontu systemowego/biurowego.

### Reguła

Nagłówki mogą być bardziej eleganckie, ale nawigacja, CTA, formularze, FAQ i dłuższe teksty muszą pozostać proste i wysoce czytelne.

## 10.6. Rekomendowane tokeny CSS

Poniższy przykład jest propozycją, nie wymogiem konkretnego frameworka:

```css
:root {
  --color-brand: #6faf3f;
  --color-brand-soft: #9bc56a;
  --color-surface: #f5eedc;
  --color-surface-light: #fff8e7;
  --color-text: #4d6732;
  --color-earth: #8a6a43;
  --color-border: #d8c49a;
  --color-accent-violet: #c8a9b8;
  --color-accent-sky: #bfd5d8;

  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-body: "Nunito Sans", system-ui, sans-serif;

  --radius-sm: 0.75rem;
  --radius-md: 1.25rem;
  --radius-lg: 2rem;
  --shadow-soft: 0 1rem 3rem rgb(77 103 50 / 0.12);
}
```

## 10.7. Komponenty wizualne

Preferowane:

- kremowe powierzchnie przypominające papier;
- zaokrąglone karty;
- duże, spokojne ilustracje;
- organiczne obrysy i subtelne ziarno;
- zielony pasek lub wyraźny blok CTA;
- drobne motywy warzyw, liści, skrzynek i koszy;
- pszczoła jako powtarzalny motyw;
- dużo oddechu i jeden główny komunikat na sekcję.

Unikaj:

- szkła, chromu i futurystycznego 3D;
- neonów;
- agresywnych gradientów SaaS;
- stockowych zdjęć korporacyjnych;
- zatłoczonych dashboardów w hero;
- ikon koszyka, kasy, karty i kuriera;
- przesadnie dziecięcej kreskówki;
- wizualnego folkloru, który wygląda jak kostium lub stereotyp.

## 10.8. Styl ilustracji

Fraza referencyjna:

```text
ręcznie malowana ilustracja, watercolor + gouache, storybook, soft grain, vintage poster, warm natural light, gentle outlines, premium organic farm aesthetic
```

### Postacie

- sympatyczne i ekspresyjne;
- naturalne, bez memowej przesady;
- lokalni producenci, sąsiedzi i klienci;
- różne grupy wieku;
- bardziej wiarygodni ludzie z gospodarstwa niż anonimowe postacie reklamowe.

### Tła

- polska wieś;
- pole;
- sad;
- pasieka;
- szklarnia;
- piekarnia;
- serowarnia;
- lokalny targ;
- drewniany stół;
- mapa okolicy z gospodarstwami.

### Światło

- miękki poranek lub późne popołudnie;
- ciepłe, naturalne światło;
- zieleń, ziemia i kremowe powierzchnie;
- subtelna papierowa tekstura.

## 10.9. Kompozycja

Najbezpieczniejszy układ:

1. logo i krótki headline;
2. duża ilustracyjna scena;
3. prosty schemat działania lub CTA;
4. adres `plonbli.pl` albo prawdziwy kod QR.

Nie przeładowuj sekcji. Jedna sekcja = jedna myśl.

## 10.10. Ruch i animacje

**[REKOMENDACJA]**

- używaj bardzo subtelnych wejść, parallaxu lub ruchu liści/pszczoły;
- zawsze respektuj `prefers-reduced-motion`;
- animacja nie może opóźniać wyświetlenia H1 i CTA;
- nie stosuj autoplay video z dźwiękiem;
- unikaj ciężkich bibliotek tylko dla efektu dekoracyjnego.

---

# 11. Inwentaryzacja dostępnych assetów

Pliki są obecnie dostępne pod nazwami źródłowymi. Przed commitowaniem warto skopiować je do przewidywalnej struktury i nadać nazwy bez spacji oraz polskich znaków.

| Plik źródłowy | Wymiary | Rola / zawartość | Status | Sugerowana nazwa w repo |
|---|---:|---|---|---|
| `Plonbli zieleń logo 1.png` | 787×787 | okrągłe zielono-kremowe logo | **preferowany raster marki** | `public/brand/plonbli-logo-round-green.png` |
| `Plonbli - logo koło 1.png` | 787×787 | okrągłe monochromatyczne logo | wariant pomocniczy | `public/brand/plonbli-logo-round-mono.png` |
| `Plonbli - logo 1.png` | 787×787 | sam szary znak | wariant pomocniczy | `public/brand/plonbli-mark-gray.png` |
| `Plonbli - logo 2.png` | 787×787 | sam czarny znak | wariant kontrastowy | `public/brand/plonbli-mark-black.png` |
| `plonbli.PNG` | 2480×3508 | duży zielony znak „P” z pszczołą i kremowym tłem/paddingiem | wymaga przycięcia i optymalizacji | `public/brand/plonbli-mark-green-source.png` |
| `plon1.png` | 1122×1402 | pionowy plakat storybook, zgodny z nowym kierunkiem | dobry moodboard; tekst/QR zweryfikować | `public/campaign/plonbli-storybook-poster-reference.png` |
| `plonbli_infografika.png` | 1536×1024 | rozbudowana infografika z wcześniejszym modelem platformy | **legacy — nie kopiować treści** | `docs/legacy/plonbli-infographic-legacy.png` |

## 11.1. Reguły użycia logo

- Stosuj jeden wariant podstawowy w headerze i footerze.
- Zachowuj proporcje.
- Nie osadzaj małego, rozmytego rastra w dużym rozmiarze.
- W miarę możliwości odtwórz lub pozyskaj źródłowy plik SVG; nie wykonuj automatycznej wektoryzacji bez kontroli jakości.
- Zapewnij wersję na jasne i ciemne tło.
- Nie dodawaj efektów 3D, połysku ani ciężkiego cienia.
- Tekst alternatywny: `Plonbli`.

## 11.2. Reguły użycia grafik referencyjnych

- `plon1.png` można traktować jako moodboard klimatu i kompozycji.
- Tekst widoczny w obrazku nie powinien zastępować prawdziwego HTML.
- Kod QR należy wygenerować na nowo z docelowego, potwierdzonego URL.
- Nie ufaj kodom QR ani drobnym napisom wygenerowanym przez AI.
- `plonbli_infografika.png` zawiera stare sformułowania o kupowaniu, sprzedaży, prowizji, płatnościach i dostawie. Nie używaj ich w nowym landingu.

## 11.3. Optymalizacja obrazów

- twórz warianty AVIF/WebP i zachowaj PNG jako źródło, jeśli potrzebna jest przezroczystość;
- używaj responsywnych `srcset`/komponentów obrazowych istniejącego stacku;
- ustawiaj jawne `width` i `height`, aby ograniczyć CLS;
- hero powinno mieć odpowiedni preload tylko wtedy, gdy obraz faktycznie jest LCP;
- ilustracje poniżej folda ładuj leniwie;
- nie publikuj źródeł o rozdzielczości 2–3 tys. pikseli bez kompresji;
- sprawdź czy przezroczyste marginesy w `plonbli.PNG` nie zwiększają niepotrzebnie pliku.

---

# 12. System istniejących grafik social

## 12.1. Format

Aktualne serie promptów używają formatu pionowego 4:5, najlepiej `1080×1350`.

## 12.2. Stały układ

1. Góra: okrągłe logo po lewej, napis Plonbli, duży tytuł produktu.
2. Pod tytułem: krótki zielony subtitle.
3. Środek: duża scena ręcznie malowana.
4. Na dole sceny: skrzynka, kosz, blat albo deska z komunikatem o lokalnym źródle.
5. Dokładnie cztery jasne, zaokrąglone karty:
   - `1. Dlaczego warto?`
   - `2. Kalendarz`
   - `3. Ciekawostka`
   - `4. Jak to działa?`
6. Karta `Jak to działa?` zawiera dokładnie trzy kroki:
   - `Znajdź gospodarstwo w okolicy`
   - `Sprawdź ofertę`
   - `Umów odbiór bezpośrednio`
7. Stopka: zielony akwarelowy pasek z tekstem `Lokalna żywność bliżej Ciebie` i przycisk `plonbli.pl`.

## 12.3. Zakazy w szablonie social

- nie zmieniaj liczby kart;
- nie dodawaj osobnego paska procesu;
- nie dodawaj czwartego kroku;
- nie dodawaj telefonów z ekranem checkoutu;
- nie dodawaj symboli sklepu, kuriera ani cen;
- tekst po polsku ma być krótki i czytelny;
- w seriach mięsnych: brak krwi, uboju i graficznych scen; wyłącznie czysta, szanująca produkt prezentacja kulinarna.

## 12.4. Istniejące serie tematyczne

Dostępne materiały wskazują co najmniej na serie:

- jaja kurze;
- jaja zielononóżki;
- jaja przepiórcze;
- jaja kacze;
- jaja gęsie;
- drób;
- kurczak;
- indyk;
- kaczka;
- gęś;
- królik;
- wołowina;
- wieprzowina;
- cielęcina;
- jagnięcina.

Te materiały są biblioteką contentową i wizualną. Nie należy kopiować całych promptów do komponentów landingu.

---

# 13. Kanały i adresy projektu

## 13.1. Oficjalne / robocze adresy

| Kanał | URL | Uwagi |
|---|---|---|
| Landing | `https://plonbli.pl/` | obecny stary landing |
| Aplikacja testowa | `https://plonbliapp.vercel.app/` | publiczny build testowy |
| Rejestracja | `https://plonbliapp.vercel.app/register` | publiczny formularz |
| Logowanie | `https://plonbliapp.vercel.app/login` | publiczny formularz |
| Regulamin | `https://plonbliapp.vercel.app/terms` | aktualizacja widoczna: 2026-03-30 |
| Polityka prywatności | `https://plonbliapp.vercel.app/privacy` | aktualizacja widoczna: 2026-03-30 |
| X | `https://x.com/plonbli` | treści marki i wiadomości rolnicze |
| Instagram | `https://www.instagram.com/plonbli/` | grafiki edukacyjne i lokalne produkty |
| Facebook | `https://www.facebook.com/share/1YkUnnggkF/` | **[TBD]** link typu share; pozyskać kanoniczny URL strony |
| Telegram — kanał | `https://t.me/plonbli` | komunikacja jednostronna |
| Telegram — grupa | `https://t.me/Plonbligrupa` | grupa robocza/społecznościowa |

## 13.2. Zalecane centralne źródło URL w kodzie

Nie rozrzucaj adresów po komponentach. Utwórz jedno źródło konfiguracji, np.:

```ts
export const siteConfig = {
  siteUrl: "https://plonbli.pl",
  appUrl: process.env.PUBLIC_APP_URL ?? "https://plonbliapp.vercel.app",
  social: {
    x: "https://x.com/plonbli",
    instagram: "https://www.instagram.com/plonbli/",
    facebook: "https://www.facebook.com/share/1YkUnnggkF/",
    telegramChannel: "https://t.me/plonbli",
    telegramGroup: "https://t.me/Plonbligrupa",
  },
};
```

Dostosuj nazwę zmiennej środowiskowej do stacku repozytorium. Nie zakładaj konkretnego frameworka.

## 13.3. Pozycjonowanie kanałów

Obserwowane kierunki:

- **X** — wiadomości i praktyczne informacje dla środowiska rolniczego, m.in. rynek, dopłaty, pogoda i sezon;
- **Instagram** — edukacyjne grafiki produktowe i prosty schemat znajdź–sprawdź–umów odbiór;
- **Telegram kanał** — aktualności projektu;
- **Telegram grupa** — rozmowa robocza/społeczność;
- **Facebook** — obecność marki, ale potrzebny jest stabilny kanoniczny adres strony.

Landing nie musi osadzać feedów społecznościowych. Zwykłe, dostępne linki będą szybsze i bezpieczniejsze prywatnościowo.

---

# 14. Regulamin, prywatność i moderacja

Ta sekcja jest podsumowaniem publicznych dokumentów z 2026-03-30. Nie zastępuje przeglądu prawnego.

## 14.1. Charakter serwisu

**[LIVE REGULAMIN]**

- serwis ogłoszeniowy działający pro bono;
- dostawca hostingu ogłoszeń;
- łączy lokalnych rolników z konsumentami;
- nie jest stroną umowy sprzedaży;
- nie pośredniczy w transakcjach ani płatnościach;
- nie przetwarza płatności;
- cena, płatność i dostawa są ustalane bezpośrednio między stronami;
- nie weryfikuje produktów przed każdą publikacją.

## 14.2. Treści użytkowników

Użytkownicy odpowiadają za:

- oferty;
- posty;
- opinie;
- wiadomości;
- rzetelność i zgodność treści z prawem;
- nienaruszanie praw osób trzecich.

## 14.3. Moderacja i DSA

Publiczny regulamin deklaruje:

- możliwość zgłaszania treści nielegalnych lub niezgodnych z regulaminem;
- zgłoszenia na `contact@plonbli.pl`;
- konieczność wskazania URL i uzasadnienia;
- informowanie użytkownika o usunięciu treści;
- prawo odwołania w ciągu 14 dni;
- brak uprzedniej weryfikacji każdej treści.

Landing powinien linkować do regulaminu, ale nie musi streszczać całej procedury.

## 14.4. Dane osobowe deklarowane w polityce prywatności

- imię i nazwisko;
- e-mail;
- zaszyfrowane hasło;
- województwo, powiat, gmina, kod pocztowy;
- avatar;
- współrzędne GPS za zgodą;
- dane adresowe;
- oferty, posty, wiadomości, opinie;
- członkostwo w grupach;
- podstawowe dane profilu z Google/Facebook przy logowaniu zewnętrznym.

## 14.5. Cele przetwarzania

- łączenie rolników i konsumentów;
- mapa i wyszukiwanie najbliższych producentów;
- wiadomości i komunikacja;
- system opinii i reputacji;
- bezpieczeństwo platformy.

## 14.6. Cookies

Publiczna polityka deklaruje:

- cookies sesyjne;
- zapamiętywanie preferencji, np. motywu;
- brak cookies reklamowych i śledzących.

Nie dodawaj analityki reklamowej, pikseli retargetingowych ani osadzonych widgetów, które przeczą tej deklaracji, bez aktualizacji polityki i wymaganych mechanizmów zgody.

## 14.7. Retencja i prawa użytkownika

Publiczna polityka deklaruje:

- dostęp, sprostowanie, usunięcie i przenoszenie danych;
- możliwość eksportu i usunięcia konta z ustawień;
- trwałe usunięcie danych w ciągu 30 dni po usunięciu konta, poza wyjątkami prawnymi.

## 14.8. Kontakty prawne

- regulamin i moderacja: `contact@plonbli.pl`;
- prywatność: `privacy@plonbli.pl`.

**[TBD]** Polityka wskazuje administratora opisowo jako właściciela serwisu, bez pełnych danych identyfikacyjnych w widocznym tekście. Nie dopisuj danych na podstawie domysłów.

---

# 15. Audyt starego stanu i wykryte sprzeczności

## 15.1. Stary landing

Obecny landing `plonbli.pl` używa tytułu `Plonbli — plon blisko Ciebie!`, a indeksowany opis zawiera komunikację zbliżoną do `Kupuj lokalnie` i `Aplikacja już wkrótce`.

Problemy:

- `Kupuj lokalnie` nie wyjaśnia, że zakup nie odbywa się przez Plonbli;
- `Aplikacja już wkrótce` jest nieaktualne, ponieważ istnieje publiczny build testowy;
- strona nie komunikuje jasno granicy: brak zamówień i płatności;
- nie wykorzystuje pełnej wartości aplikacji i profilu-ambasadora;
- potrzebuje aktualnych CTA do aplikacji.

## 15.2. Publiczna aplikacja testowa

Aplikacja używa obecnie między innymi:

- `kupuj bez pośredników`;
- `zamów produkty`;
- `sprzedawaj bezpośrednio`;
- `sprzedaż bez pośredników`;
- `zero prowizji`;
- `Marketplace`;
- `przeglądaj i zamawiaj lokalne produkty`;
- FAQ `Jak złożyć zamówienie?`.

To jest sprzeczne z regulaminem i poprawionym przewodnikiem komunikacji. W nowym landingu należy użyć modelu zapytania i kontaktu. Docelowo warto również ujednolicić samą aplikację.

## 15.3. Stara ulotka A5

Historyczna ulotka zawiera sformułowania:

- `zamawiać je wygodnie`;
- `dodawaj produkty do koszyka`;
- `Zamów wygodnie`;
- `Wybierz odbiór lub dostawę`;
- `kupuj lokalnie`.

Ulotka jest **nieaktualna treściowo**. Można zachować jedynie wybrane inspiracje kompozycyjne i kolorystyczne.

## 15.4. Stara infografika

`plonbli_infografika.png` zawiera starszy model z elementami takimi jak:

- kupowanie lokalnie;
- wybór produktów;
- odbiór i płatność;
- gotówka/BLIK;
- prowizja od sprzedaży;
- model sprzedaży;
- określenie platformy społecznościowej/handlowej.

Nie używaj jej jako źródła copy ani specyfikacji funkcjonalnej.

## 15.5. „Rolnik” kontra „producent”

- aplikacja i regulamin używają głównie słowa `rolnik`;
- marka i poprawiony przewodnik świadomie rozszerzają język do `producent`, ponieważ obejmuje on również sadownika, pszczelarza, serowara, lokalną piekarnię itp.

**[REKOMENDACJA]**

- na landingu używaj domyślnie `producent`;
- `rolnik` stosuj tam, gdzie opisujesz istniejącą rolę konta lub stricte gospodarstwo rolne;
- nie nazywaj każdego lokalnego twórcy żywności rolnikiem.

## 15.6. Pisownia marki

- marka w materiałach wizualnych występuje jako `Plonbli`;
- publiczna aplikacja stylizuje nazwę jako `plonbli`.

**[REKOMENDACJA]** W zwykłym tekście, H1, metadanych i altach stosuj `Plonbli`. Małą literę pozostaw tylko wtedy, gdy jest świadomym elementem logotypu lub identyfikatora technicznego.

## 15.7. Bezpłatność

- regulamin używa określenia `pro bono`;
- publiczna aplikacja deklaruje `bezpłatna platforma` i `wszystkie funkcje za darmo`.

**[TBD]** Przed publikacją trwałej obietnicy ustal, czy model bezpłatny pozostaje obowiązujący. Nie stosuj `zawsze za darmo`, jeżeli strategia nie jest formalnie zatwierdzona.

---

# 16. SEO i metadane

## 16.1. Rekomendowany title

```text
Plonbli — lokalni producenci żywności blisko Ciebie
```

Alternatywa krótsza:

```text
Plonbli — lokalne produkty bliżej Ciebie
```

## 16.2. Rekomendowany meta description

```text
Znajdź lokalnych producentów żywności, sprawdź ich ofertę i wyślij zapytanie bezpośrednio. Odbiór i rozliczenie ustalasz z producentem.
```

## 16.3. Open Graph

- `og:title`: zgodny z title;
- `og:description`: zgodny z modelem zapytania;
- `og:image`: dedykowany obraz 1200×630 bez drobnego tekstu i bez fałszywego QR;
- `og:type`: `website`;
- `og:locale`: `pl_PL`;
- `og:url`: kanoniczny URL produkcyjny.

## 16.4. Dane strukturalne

Rozważ:

- `Organization` dla marki;
- `WebSite` dla landingu;
- `WebApplication` lub `SoftwareApplication` dla aplikacji, jeśli wszystkie pola można podać prawdziwie;
- `FAQPage` tylko dla widocznych, identycznych odpowiedzi FAQ;
- `BreadcrumbList` na stronach wewnętrznych.

Nie deklaruj ocen, cen, dostępności ani ofert w schema, jeżeli landing ich rzeczywiście nie publikuje.

## 16.5. Frazy tematyczne

Naturalnie używaj:

- lokalni producenci żywności;
- gospodarstwa w okolicy;
- lokalne produkty;
- żywność od producenta;
- lokalne gospodarstwa;
- bezpośredni kontakt z producentem;
- sprawdź ofertę producenta;
- umów odbiór bezpośrednio.

Nie upychaj fraz `sklep`, `zakupy`, `zamów online` ani `dostawa`, ponieważ zaburzają pozycjonowanie i obietnicę produktu.

## 16.6. Techniczne SEO

- jeden logiczny H1;
- poprawna hierarchia H2/H3;
- canonical;
- sitemap i robots zgodne ze środowiskiem;
- brak indeksowania preview/staging, jeśli nie ma być publiczne;
- czytelny tekst HTML zamiast tekstu w grafikach;
- poprawne alt texty;
- linki do regulaminu i prywatności;
- brak powielonych title/description;
- poprawny język dokumentu `pl` lub `pl-PL`.

---

# 17. Wymagania implementacyjne dla Codex

## 17.1. Ogólne

- Najpierw przeanalizuj istniejący stack i konwencje repozytorium.
- Nie migruj frameworka bez wyraźnego polecenia.
- Nie dodawaj nowych ciężkich zależności, jeżeli efekt można osiągnąć CSS-em lub istniejącym komponentem.
- Zachowaj istniejące testy, linting i formatowanie.
- Nie commituj sekretów ani kluczy usług.
- Treści i URL-e trzymaj centralnie, aby można było je zmienić bez edycji wielu komponentów.

## 17.2. Struktura treści

Preferuj dane oddzielone od layoutu, np. plik `content`, `site-config` lub lokalne zasoby tłumaczeń. Dzięki temu można:

- sprawdzić zakazane frazy;
- aktualizować CTA;
- przygotować wersję językową;
- testować spójność treści.

## 17.3. Nawigacja i linki

- wszystkie CTA do aplikacji powinny korzystać z jednego `appUrl`;
- rejestracja i logowanie mogą być wyprowadzane z `appUrl`;
- linki zewnętrzne otwierane w nowej karcie powinny używać bezpiecznego `rel="noopener noreferrer"`;
- nie otwieraj każdej strony wewnętrznej w nowej karcie;
- zapewnij wyraźne stany hover, focus i active.

## 17.4. Dostępność

Minimum:

- semantyczny HTML;
- dostępna nawigacja klawiaturą;
- widoczne focus ringi;
- kontrast zgodny co najmniej z WCAG AA;
- prawidłowe etykiety przycisków i linków;
- alt texty opisujące znaczenie, nie tylko wygląd;
- ilustracje dekoracyjne z pustym `alt`;
- FAQ zaimplementowane semantycznie;
- brak interakcji dostępnych wyłącznie po hover;
- obsługa `prefers-reduced-motion`;
- dotykowe cele co najmniej około 44×44 px;
- brak tekstu kluczowego wyłącznie w obrazie;
- język dokumentu ustawiony na polski.

## 17.5. Wydajność

Cele rekomendowane:

- brak dużego JS tylko dla dekoracji;
- obrazy w nowoczesnych formatach;
- fonty ograniczone do potrzebnych odmian;
- preload tylko krytycznych zasobów;
- lazy loading poniżej folda;
- minimalizacja CLS przez jawne wymiary;
- hero renderowany bez oczekiwania na klientowy JavaScript, jeżeli stack na to pozwala;
- brak ciężkich embedów social w pierwszym renderze;
- test Lighthouse i Web Vitals przed zamknięciem zadania.

## 17.6. Responsywność

Przetestuj co najmniej:

- 320 px;
- 375/390 px;
- 768 px;
- 1024 px;
- 1280–1440 px;
- szeroki desktop.

Sprawdź:

- łamanie długich polskich słów;
- CTA na jednej lub dwóch liniach;
- menu;
- karty „Jak to działa”;
- kolejność sekcji;
- kadrowanie ilustracji;
- brak poziomego scrolla.

## 17.7. Prywatność

- nie dodawaj cookies śledzących ani marketingowych bez decyzji biznesowej i aktualizacji polityki;
- nie osadzaj zewnętrznych widgetów, które ładują tracking przed zgodą;
- analitykę projektuj zgodnie z deklarowanym zakresem prywatności;
- formularze nie powinny zbierać danych, których landing nie potrzebuje;
- linki do dokumentów prawnych muszą być łatwe do znalezienia.

## 17.8. Bezpieczeństwo treści

- treści z CMS lub backendu renderuj bezpiecznie;
- nie używaj niekontrolowanego `innerHTML`;
- waliduj URL-e zewnętrzne;
- nie pokazuj danych lokalizacyjnych użytkownika bez zgody;
- nie zapisuj zgody na lokalizację na landingu, jeśli nie jest potrzebna do samej strony.

## 17.9. Zakazane elementy UI

Na nowym landingu nie dodawaj:

- koszyka;
- ikony checkoutu;
- pól karty płatniczej;
- przycisku `Kup teraz`;
- liczników zamówień;
- symulowanych cen w hero;
- kuriera lub śledzenia dostawy;
- dashboardu transakcji;
- obietnicy prowizji 0%;
- tabeli planów cenowych, dopóki model nie zostanie zatwierdzony.

---

# 18. Analityka i nazewnictwo zdarzeń

## 18.1. Bezpieczny lejek produktu

```text
home.viewed
search.performed
listing.viewed
producer_profile.viewed
inquiry_draft.item_added
inquiry_draft.item_removed
inquiry_draft.quantity_changed
inquiry.started
inquiry.sent
inquiry.status_changed
producer_response.sent
conversation.started
message.sent
```

## 18.2. Zdarzenia landingu — rekomendacja

```text
landing.viewed
landing.primary_cta.clicked
landing.secondary_cta.clicked
landing.how_it_works.viewed
landing.consumer_section.viewed
landing.producer_section.viewed
landing.ambassador_section.viewed
landing.faq.opened
landing.social_link.clicked
landing.legal_link.clicked
```

Przykładowe parametry:

```text
cta_id
cta_label
section_id
destination
viewport_category
referrer_category
```

Nie używaj:

```text
purchase
payment.started
payment.completed
checkout.started
order.placed
cart.item_added
```

## 18.3. Prywatność analityki

- nie wysyłaj e-maila, dokładnej lokalizacji ani treści zapytania do analityki;
- nie używaj identyfikatorów użytkownika na anonimowym landingu bez potrzeby;
- nie łącz eventów z profilami reklamowymi bez odpowiedniej zgody i polityki;
- nazwy CTA zapisuj jako stabilny identyfikator, nie wyłącznie tekst widoczny.

---

# 19. Kontrola copy przed wdrożeniem

## 19.1. Frazy do wyszukania w repo

Przed ukończeniem zadania przeszukaj publiczne treści landingu pod kątem:

```text
kup
kupuj
kup teraz
koszyk
checkout
kasa
zamów
zamówienie
sprzedawaj
sprzedaż
marketplace
płatność w Plonbli
BLIK
prowizja
GMV
dostawa przez Plonbli
```

Nie usuwaj automatycznie słów z regulaminu lub polityki prywatności. Zweryfikuj kontekst. Na przykład regulamin może prawidłowo mówić, że Plonbli **nie pośredniczy w płatnościach**.

## 19.2. Test sensu każdego CTA

Dla każdego CTA odpowiedz:

1. Dokąd prowadzi?
2. Czy docelowa strona istnieje?
3. Czy tekst CTA opisuje faktyczną akcję?
4. Czy nie sugeruje transakcji w Plonbli?
5. Czy stan focus jest widoczny?
6. Czy kliknięcie jest mierzone bez nadmiarowego śledzenia?

## 19.3. Test obietnic

Każdą obietnicę zaklasyfikuj jako:

- potwierdzona w produkcie;
- deklarowana, ale wymaga testu;
- marketingowa, lecz bezpieczna;
- niepotwierdzona — usuń lub oznacz TBD.

---

# 20. Definition of Done dla nowego landingu

## 20.1. Produkt i treść

- [ ] Hero w 5 sekund wyjaśnia, że Plonbli pomaga znaleźć producenta i skontaktować się bezpośrednio.
- [ ] Nigdzie nie przedstawiono Plonbli jako sklepu lub operatora płatności.
- [ ] Jest widoczny disclaimer o odbiorze i rozliczeniu bezpośrednio z producentem.
- [ ] CTA prowadzą do poprawnych adresów aplikacji.
- [ ] Osobno przedstawiono wartość dla konsumenta i producenta.
- [ ] Funkcje niepotwierdzone nie są opisane jako gotowe.
- [ ] FAQ odpowiada na pytania o sklep, płatność i odbiór.
- [ ] Regulamin i prywatność są dostępne z footera.

## 20.2. Marka

- [ ] Użyto kanonicznej palety lub świadomie udokumentowanych odstępstw.
- [ ] Logo jest ostre, proporcjonalne i dostępne.
- [ ] Ilustracje zachowują Natural Premium Storybook.
- [ ] Brak ikon koszyka, kasy, płatności i kuriera.
- [ ] Typografia jest czytelna na urządzeniach mobilnych.

## 20.3. Technika

- [ ] Brak błędów lint/typecheck/build.
- [ ] Brak poziomego scrolla na mobile.
- [ ] Nawigacja działa z klawiatury.
- [ ] Focus jest widoczny.
- [ ] Obrazy mają rozmiary i optymalizację.
- [ ] Brak istotnego CLS.
- [ ] Meta title, description, OG i canonical są poprawne.
- [ ] `prefers-reduced-motion` jest respektowane.
- [ ] Nie dodano trackerów sprzecznych z polityką prywatności.
- [ ] Wszystkie publiczne URL-e pochodzą ze wspólnej konfiguracji.

## 20.4. QA copy

- [ ] Przeszukano repo pod kątem zakazanych fraz.
- [ ] `Plonbli` zapisano konsekwentnie.
- [ ] `producent` i `rolnik` są używane świadomie.
- [ ] Polskie znaki, interpunkcja i spacje są poprawne.
- [ ] Tekst nie jest zaszyty wyłącznie w grafice.

---

# 21. Otwarte decyzje

Nie rozwiązuj poniższych punktów przez zgadywanie:

1. **[TBD] Docelowa domena aplikacji** — czy CTA ma pozostać na `plonbliapp.vercel.app`, czy otrzyma subdomenę produkcyjną?
2. **[TBD] Status wersji** — beta, testy publiczne, MVP czy produkcja?
3. **[TBD] Model bezpłatności** — czy `pro bono` i wszystkie funkcje bez opłat pozostają trwałą zasadą?
4. **[TBD] Zakres gotowych funkcji** — mapa, czat, grupy, wydarzenia, reputacja, dziennik upraw, PWA, OAuth.
5. **[TBD] Profil-ambasador** — aktualny limit, zgoda producenta, moderacja i odpowiedzialność za dane.
6. **[TBD] Kanoniczny URL Facebooka** — obecny link jest linkiem udostępniania.
7. **[TBD] Dane administratora i właściciela** — pełna identyfikacja prawna do dokumentów i footera.
8. **[TBD] Czy landing ma mieć osobne podstrony** — dla producentów, o projekcie, kontakt, FAQ.
9. **[TBD] Docelowy system analityczny** — powinien być zgodny z polityką cookies i prywatności.
10. **[TBD] Wersja logo SVG** — potrzebne oryginalne źródło lub ręcznie zweryfikowany wektor.
11. **[TBD] Czy strona ma być wielojęzyczna** — obecny priorytet to `pl-PL`.
12. **[TBD] Kontakt ogólny na landingu** — `contact@plonbli.pl` jest w regulaminie; potwierdzić, czy ma być publicznym kontaktem marketingowym.

---

# 22. Sugerowana struktura plików w repo

Dostosuj do istniejącego stacku; nie twórz równoległego systemu, jeżeli repo ma już własne konwencje.

```text
/docs/
  PLONBLI_PROJECT_CONTEXT.md
  /legacy/
    plonbli-infographic-legacy.png

/public/
  /brand/
    plonbli-logo-round-green.png
    plonbli-logo-round-mono.png
    plonbli-mark-black.png
  /landing/
    hero-storybook.avif
    hero-storybook.webp
    og-plonbli.jpg

/src/ lub równoważny katalog aplikacji/
  /content/
    landing.pl.ts
  /config/
    site.ts
  /components/
    Header
    Hero
    HowItWorks
    ConsumerBenefits
    ProducerBenefits
    AmbassadorSection
    TrustSection
    FAQ
    FinalCTA
    Footer
```

---

# 23. Polecenie startowe dla Codex

Poniższy prompt można wkleić do zadania po umieszczeniu tego pliku w repo:

```text
Przeczytaj w całości docs/PLONBLI_PROJECT_CONTEXT.md i przeanalizuj istniejący landing oraz stack repozytorium. Następnie przebuduj landing Plonbli zgodnie z sekcjami 8–20 dokumentu.

Priorytety:
1. Plonbli ma być przedstawione jako katalog lokalnych producentów i narzędzie bezpośredniego kontaktu, nie sklep.
2. Usuń lub zastąp język kupowania, koszyka, zamówienia, checkoutu i płatności.
3. Zastosuj rekomendowany hero, pełny czterokrokowy schemat działania, sekcje dla konsumenta i producenta, sekcję zaufania, FAQ i finalne CTA.
4. Zachowaj styl Natural Premium Storybook, kanoniczną paletę i dostępność WCAG AA.
5. Użyj istniejącego stacku i konwencji repo. Nie migruj frameworka i nie dodawaj ciężkich zależności bez potrzeby.
6. Umieść URL-e i copy w centralnej konfiguracji/danych.
7. Zoptymalizuj obrazy i Core Web Vitals.
8. Przed zakończeniem uruchom dostępne testy, lint, typecheck i build oraz przeszukaj publiczne copy pod kątem zakazanych fraz.
9. Funkcje oznaczone TBD lub wymagające potwierdzenia przedstaw tylko wtedy, gdy ich działanie wynika z kodu.
10. W podsumowaniu wypisz zmienione pliki, wyniki testów i wszystkie nierozstrzygnięte konflikty.
```

---

# 24. Master prompt dla nowych ilustracji

Poniższy prompt pochodzi z kanonicznego kierunku marki i służy do tworzenia ilustracji bez finalnego tekstu:

```text
Premium natural storybook illustration for a Polish local food discovery and producer-contact brand called Plonbli. Warm hand-painted watercolor and gouache style, soft paper texture, gentle vintage poster feeling, organic farm aesthetic. Scene set in a peaceful Polish countryside with green fields, vegetable beds, baskets of fresh produce, small local farm buildings in the background. Friendly cartoon local producers and customers, expressive but tasteful, warm and trustworthy mood. The scene should suggest discovering local producers and sending a direct inquiry, not shopping, checkout, delivery service or online payment. Soft afternoon sunlight, muted natural colors, cream paper background, olive green accents, subtle grain, elegant composition with clear empty space for headline and logo. Premium but approachable, local, fresh, authentic, cozy, high-quality editorial poster style.
```

## 24.1. Negative prompt

```text
No photorealism, no harsh digital 3D, no neon colors, no corporate stock photo look, no cluttered layout, no shopping cart, no checkout screen, no payment terminal, no delivery courier, no online store interface, no fake QR codes, no unreadable typography, no distorted hands, no aggressive expressions, no childish plastic cartoon style, no overly saturated colors.
```

## 24.2. Workflow produkcyjny

1. Wygeneruj ilustrację bez tekstu lub z czystym miejscem na tekst.
2. Dodaj tekst, logo i prawdziwy QR w Figma/Canva/kodzie.
3. Nie traktuj liter i QR wygenerowanych przez model obrazu jako finalnych.
4. Na landing używaj tekstu HTML, nie tekstu zaszytego w bitmapie.

---

# 25. Źródła i pochodzenie informacji

## 25.1. Lokalne pliki projektu

- `bazowy-styl-kampanii-Plonbli.txt` — kanoniczny przewodnik komunikacji i stylu.
- `linki-do-projektu.txt` — oficjalne/robocze adresy projektu.
- `Plonbli zieleń logo 1.png` — zielony wariant logo.
- `Plonbli - logo koło 1.png` — wariant okrągły monochromatyczny.
- `Plonbli - logo 1.png` — szary znak.
- `Plonbli - logo 2.png` — czarny znak.
- `plonbli.PNG` — duży zielony znak.
- `plon1.png` — pionowy moodboard/plakat storybook.
- `plonbli_infografika.png` — historyczna infografika z nieaktualnym językiem transakcyjnym.
- `05_seria_jaja_i_produkty_z_jaj_prompty.txt` — system grafik produktowych.
- `06_seria_swieze_mieso_prompty.txt` — system grafik produktowych i reguły czystej prezentacji kulinarnej.
- `plonbli_ulotka_informacyjna_A5_natural_premium_final.*` — historyczna ulotka, nieaktualna treściowo.

## 25.2. Publiczne źródła sprawdzone 2026-07-10

- `https://plonbli.pl/`
- `https://plonbliapp.vercel.app/`
- `https://plonbliapp.vercel.app/register`
- `https://plonbliapp.vercel.app/login`
- `https://plonbliapp.vercel.app/terms`
- `https://plonbliapp.vercel.app/privacy`
- kanały społecznościowe wymienione w sekcji 13.

## 25.3. Ważna uwaga o aktualności

Publiczna aplikacja, dokumenty prawne i materiały kampanijne mogą rozwijać się niezależnie. Przed większym wdrożeniem należy ponownie sprawdzić:

- funkcje aktywne w aplikacji;
- docelowe URL-e;
- aktualność regulaminu i polityki prywatności;
- model bezpłatności;
- treści na obecnym landingu;
- poprawność linków social.

---

# 26. Najważniejsze reguły w skrócie

1. **Plonbli nie jest sklepem.**
2. **Plonbli nie obsługuje zamówień ani płatności.**
3. **Główna wartość: znajdź producenta, sprawdź ofertę, wyślij zapytanie, umów się bezpośrednio.**
4. **Na landingu preferuj słowo „producent”; „rolnik” pozostaw dla kontekstu rolniczego i istniejących ról konta.**
5. **Usuń język marketplace, koszyka, checkoutu, prowizji i sprzedaży przez platformę.**
6. **Używaj ciepłego stylu Natural Premium Storybook.**
7. **Trzymaj copy i URL-e centralnie.**
8. **Nie obiecuj funkcji, których nie potwierdzono w kodzie.**
9. **Linkuj regulamin i prywatność; nie dodawaj trackerów sprzecznych z ich treścią.**
10. **Nowy landing ma prowadzić do rozmowy z producentem, nie symulować zakup.**

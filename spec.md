# Portfolio Tymon Wójcik — specyfikacja

Strona jest budowana wg mockupów (pliki `mockups/*.png`) oraz tego dokumentu. Gdy mockup i spec się różnią, wygrywa spec. Rzeczy oznaczone **[założenie]** nie wynikają wprost z mockupu — traktuj je jako domyślne i zaznacz w odpowiedzi, jeśli zrobiłeś inaczej.

## 1. Założenia ogólne

- Portfolio malarskie, **mobile-first, orientacja pionowa**. Mockup istnieje tylko w wersji na telefon.
- Strona statyczna: czysty HTML, CSS i vanilla JS, bez frameworków i bez kroku build. **[założenie]**
- **Na razie tylko wersja polska ma właściwą treść.** Tłumaczenia są na później. Mechanizm dwujęzyczny ma być jednak od razu przygotowany jako szkielet: przycisk `en` w nagłówku działa i przełącza na wersję angielską, która jest na razie **dokładnym powtórzeniem wersji polskiej** (ta sama treść i te same grafiki). Szczegóły w sekcji 8.
- **Desktop jest poza zakresem na tym etapie.** Nie projektuj ani nie testuj układu na szerokich ekranach, nie dodawaj dla niego osobnych reguł. Wystarczy, że strona nie wyglądałaby na nim zepsuta w sposób oczywisty (np. brak poziomego scrolla); dopracujemy to później.
- Szybkość ładowania ma znaczenie: obrazy prac w `srcset`, lazy-load, preload sąsiednich slajdów.
- Dostępność: `alt` do obrazów prac, `aria-label` do strzałek, `lang` na `<html>` zgodny z faktycznym językiem treści (sekcja 8).

## 2. Typografia i kolory

- Font interfejsu: Helvetica → stos `"Helvetica Neue", Helvetica, Arial, sans-serif`.
- Tło stron: białe. Czarne tło wokół ekranów w mockupie to tylko prezentacja, nie część projektu.
- Linki nawigacyjne (`o pracy`, `<<`, `>>`, `[1/2]`, `menu`, `en`/`pl`): ciemnoniebieskie, podkreślone. Odcień pobierz z mockupu.
- Strzałka powrotu `<----` i strzałka nawigatora `<<`: czarne, grube, dostarczane jako **pliki SVG** (`img/heading/pl/strzałka.svg` i `img/heading/pl/nawigator.svg`), po jednym pliku na wszystkich ekranach i w obu wersjach językowych. Skalowane według `--ux` (proporcje pliku bez zmian). Strzałka `>>` w nawigatorze to ten sam plik `nawigator.svg` odbity poziomo (`transform: scaleX(-1)`). **[założenie]** Na ekranie Kontakt strzałka powrotu jest obrócona o 90° w CSS. Każda ma być prawdziwym linkiem lub przyciskiem z `aria-label` (`<----`: "wstecz", `<<`: "poprzedni slajd", `>>`: "następny slajd"), a pole dotyku większe niż sama grafika (padding). Pozostałe elementy interfejsu (`menu`, `en`/`pl`, `o pracy`, `[n/N]`, `Tymon Wójcik`) zostają **prawdziwym tekstem**.
- Duże napisy w menu (`inne prace`, `o mnie/bio`, `kontakt`) mają zdeformowaną typografię — są **grafiką SVG**, nie tekstem HTML (sekcja 5).

## 3. Ekrany

### A. Galeria (strona startowa)

- Nagłówek: `menu` (lewo, otwiera ekran C) · `Tymon Wójcik` (środek) · `en` (prawo, przełącza język; patrz sekcja 8).
- Środek: obraz pracy na pełną szerokość kolumny, w pasie na środku ekranu. Nad i pod nim biało.
- Pod obrazem: link `o pracy` (otwiera ekran B dla bieżącego slajdu), niżej nawigator `<<  [n/N]  >>`. Cały układ jest ułożony wyżej na ekranie, a **dół ekranu pozostaje pusty** (dolna strefa bezpieczna, sekcja 6a). Nie przesuwaj nawigatora ani linku w dół.
- Nawigator przełącza **całe slajdy**, nie tylko plik obrazu. Każdy slajd ma własny obraz i własny ekran "o pracy" (sekcja 4). `[n/N]` pokazuje numer bieżącego i liczbę wszystkich. Na krańcach zakresu przycisk jest nieaktywny, bez zapętlania. **[założenie]**

### B. O pracy

- Sam tekst, bez obrazu. Układ od góry:
  - blok tytułu: **maksymalnie 3 linijki** (pogrubione, kursywa), czasem mniej,
  - technika mniejszym drukiem (np. "olej na płótnie") w **stałym miejscu pod blokiem tytułu**, niezależnie od liczby linijek tytułu. Blok tytułu ma więc zawsze zarezerwowaną wysokość trzech linijek,
  - długi opis, wyjustowany,
  - na dole: wymiary (lewo) i rok (prawo).
- **Kliknięcie/tap w dowolnym miejscu wraca do galerii na tym samym slajdzie.** Nie implementuj wariantu "przytrzymaj, żeby zobaczyć".
- Ekran jest czystym tekstem, więc ładuje się natychmiast (dane są już w pamięci, patrz sekcja 4).

### C. Menu

- Trzy duże grafiki SVG ułożone pionowo: `inne prace`, `o mnie/bio`, `kontakt` — każda z własnym podkreśleniem (jest częścią grafiki).
- Tło: wyblakłe zdjęcie twarzy w skali szarości, na cały ekran.
- `<----` w **lewym górnym rogu**: wraca do poprzedniego ekranu (do galerii na slajdzie, z którego przyszliśmy). Dół ekranu pusty (sekcja 6a).

### D. Inne prace

- Ten sam układ co ekran A, ale z **inną listą prac** (osobny zestaw danych).
- Nagłówek: `<----` (wraca do poprzedniego ekranu, w tym samym miejscu co `menu` w ekranie A) · `Tymon Wójcik`. Bez przełącznika języka, jak w mockupie. **[założenie]**
- `o pracy` i nawigator działają i są rozmieszczone jak w ekranie A (dół ekranu pusty).
- jak na razie w folderze 'works' są tylko pliki jpg do galerii głównej, resztą obrazków zajmiemy się później

### E. O mnie / bio

- Wyjustowany tekst biograficzny (w mockupie lorem ipsum) na tle wyblakłego zdjęcia twarzy w skali szarości.
- `<----` w **lewym górnym rogu**: powrót. Tekst zaczyna się pod strzałką.

### F. Kontakt

- Trzy linie tekstu obrócone o 90°, czytane od dołu do góry, ułożone od lewej do prawej: e-mail, telefon, Instagram.
  - `tymekw@icloud.com` (link `mailto:`)
  - `737 826 710` (link `tel:`)
  - `@tymekwojcik_` (link do profilu na Instagramie) **[założenie co do linków]**
- Tło: wyblakły obraz w skali szarości, jak w mockupie.
- `<----` w górnej części ekranu, **obrócona razem z tekstem** (jak w mockupie): powrót.
- Zachowanie przy obrocie telefonu: sekcja 6.

## 4. Dane

Prace trzymaj w jednym pliku `data/works.json` (albo podobnym), nie w HTML. Dwa zestawy: galeria startowa i "inne prace". Przykład wpisu:

```json
{
  "id": "start-01",
  "image": "works/start-01.webp",
  "focus": "50% 40%",
  "title": { "pl": ["Tytuł", "linijka 2", "linijka 3"], "en": ["Tytuł", "linijka 2", "linijka 3"] },
  "technique": { "pl": "olej na płótnie", "en": "olej na płótnie" },
  "dimensions": "100 × 80 cm",
  "year": "202x",
  "text": { "pl": "…", "en": "…" }
}
```

Nowa praca = nowy wpis w pliku, bez zmian w kodzie. Dane wczytaj raz na starcie i trzymaj w pamięci.

Pola tekstowe są w obiektach kluczowanych językiem (`pl`, `en`). Pola `en` zawierają na razie **te same wartości co `pl`** (kopia, bez tłumaczenia). **Nie tłumacz niczego na angielski.** Późniejsze tłumaczenie ma sprowadzać się do podmiany wartości w polach `en`, bez zmian w kodzie.

## 5. Zasoby graficzne

### Struktura plików (stan obecny)

```
projekt/
├── spec.md
├── mockups/                 mockupy PNG
├── works/                   zdjęcia prac
├── img/
│   ├── heading/
│   │   ├── pl/              inne_prace.svg, kontakt.svg, o_mnie_bio.svg,
│   │   │                    nawigator.svg, strzałka.svg
│   │   └── en/              docelowo kopie napisów z pl/
│   └── background/          tła z twarzą
└── data/                    do utworzenia: works.json
```

- Nazwy katalogów są w liczbie pojedynczej (`heading`, `background`), trzymaj się ich.
- Folder `heading/` zawiera napisy menu i strzałki interfejsu. `strzałka.svg` i `nawigator.svg` nie zależą od języka: jedna kopia (z `pl/`) służy obu wersjom, nie kopiuj ich do `en/`.
- Nazwy ze spacjami i polskimi znakami (`inne prace.svg`, `o mnie_bio.svg`, `strzałka.svg`) zmień na ASCII (`inne-prace.svg`, `o-mnie-bio.svg`, `strzalka.svg`) i zaktualizuj odwołania, bo takie nazwy sprawiają kłopoty w adresach URL.
- Zdjęcia prac leżą w `works/` w katalogu głównym projektu, nie w `img/`.

- **Napisy w menu** (`inne prace`, `o mnie/bio`, `kontakt`): SVG z tekstem zamienionym na krzywe (bez zależności od fontu), osobne ścieżki dla PL i EN, np. `img/heading/pl/inne-prace.svg` i `img/heading/en/inne-prace.svg`; pliki w `en/` są na razie kopiami plików z `pl/` (te same grafiki), podmienimy je razem z tłumaczeniem. Rozmiar względem szerokości kolumny (jednostki względne), żeby ładnie się skalowały. Jeśli dostaniesz wersję rastrową zamiast SVG: PNG/WebP w 3-krotnym rozmiarze. Wstaw `<img>` z sensownym `alt`.
- **Strzałki** (`strzałka.svg`, `nawigator.svg`): pliki SVG (grafiki, nie tekst) w `img/heading/pl/`, eksportowane jak napisy: tekst zamieniony na krzywe, kadr przylegający do grafiki, opcja "Responsywny".
- **Tła z twarzą** ("all over"): w `img/background/`; rastry, WebP lub JPG w skali szarości, w 2 rozmiarach (`srcset`). Nie wektoryzuj. Skalowanie przez `object-fit: cover`; punkt ostrości (twarz w kadrze) ustawiony w `object-position` osobno dla każdego tła.
- **Obrazy prac** (`works/`): WebP lub JPG w kilku szerokościach (`srcset`/`sizes`), pierwszy obraz bez lazy-load, reszta z lazy-load. Podczas oglądania slajdu załaduj z wyprzedzeniem sąsiednie.

## 6. Obrót ekranu (iOS Safari i inne przeglądarki mobilne)

**Wymaganie.** Na ekranie Kontakt układ ma **zostać w miejscu względem ekranu urządzenia** po obróceniu telefonu: nie wolno mu przeliczyć się na układ poziomy jak standardowej stronie. Po obróceniu telefonu o 90° zgodnie z ruchem wskazówek zegara pionowy tekst staje się poziomy i czytelny. Efekt ma być taki jak przy włączonej blokadzie orientacji w iOS. Zrób to przez flagę per ekran (`lockPortrait`), tak żeby dało się ją łatwo włączyć dla innych ekranów lub całej strony.

**Czego nie robić.** Nie używaj `screen.orientation.lock()`: Safari na iOS go nie wspiera, a na Androidzie wymaga trybu pełnoekranowego. Nie zakładaj też, że manifest PWA coś zablokuje.

**Jak zrobić.** Emulacja w CSS/JS:

1. Cała zawartość ekranu w kontenerze `.stage`.
2. Gdy viewport jest poziomy (`@media (orientation: landscape) and (pointer: coarse)`), kontener dostaje zamienione wymiary (`width` = wysokość viewportu, `height` = szerokość viewportu, w `dvh`/`dvw` lub `svh`/`svw`), `position: fixed` i `transform: rotate(±90deg)` z odpowiednim `transform-origin`, tak by wypełniał cały viewport.
3. Kierunek obrotu musi być **przeciwny do obrotu urządzenia**, żeby układ wyglądał na nieruchomy względem ekranu. Odczytaj go z `screen.orientation.angle` (fallback: `window.orientation`; ten odczyt iOS wspiera od 16.4) i obsłuż zdarzenia `orientationchange`/`change` oraz `resize`. Obsłuż **oba** kierunki obrotu.
4. Uwzględnij safe areas (`env(safe-area-inset-*)`), notch i wyspa w trybie poziomym nie mogą zasłaniać treści. Tło wyblakłego zdjęcia ma wypełniać cały viewport, także poza safe area.
5. Emulację włączaj tylko na urządzeniach dotykowych (`pointer: coarse`); desktopu nie ruszamy (patrz sekcja 1).
6. Przy obrocie w drugą stronę tekst będzie do góry nogami — to akceptowalne.

**Uwagi i testy.**
- Pasek adresu i system UI Safari obracają się razem z interfejsem i są poza kontrolą strony.
- Przy włączonej blokadzie orientacji w Centrum Sterowania iOS strona w ogóle nie dostaje obrotu, więc wymaganie jest spełnione bez kodu. Kod ma działać przy wyłączonej blokadzie.
- Przetestuj na prawdziwym iPhonie w Safari, w obu kierunkach obrotu. Emulacja w DevTools nie odtwarza tego wiarygodnie.

## 6a. Dolna strefa bezpieczna (pasek Safari na iPhonie)

Safari na iPhonie ma na dole pasek adresu i zakładek. Strona nie może go ukryć (brak API ani meta tagu), a jego wysokość zależy od wersji iOS, modelu telefonu i stanu paska (rozwinięty lub zwinięty). Zakładamy więc, że pasek **zawsze tam jest**, i projektujemy pod niego.

- Mockup już to uwzględnia: elementy interaktywne są w górnej i środkowej części ekranu (strzałki powrotu u góry, nawigator wyżej niż dolna krawędź), a dół ekranu jest pusty. **Nie przesuwaj elementów w dół.**
- W `<head>` (statycznie, nie wstrzykiwane JS-em): `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.
- Wysokość ekranów jednoekranowych w `svh` (z fallbackiem `vh`), a nie `dvh`, żeby układ nie skakał przy zmianie stanu paska. Na dole `padding-bottom: env(safe-area-inset-bottom, 0px)`.
- **Nie wpisuj na sztywno wysokości paska** żadną wartością w pikselach.
- Tła z twarzą mają sięgać do dolnej krawędzi widocznego obszaru, bez białego pasa.
- **Projektujemy przy założeniu, że pasek Safari jest zawsze rozwinięty** (tak ładują się strony). Nie obsługuj stanu ze zwiniętym paskiem i nie reaguj na jego zmiany. Dokument się nie przewija (`html, body { height: 100svh; overflow: hidden }`), a jeśli tekst na ekranie B lub E jest dłuższy niż ekran, przewija się **wewnątrz kontenera**. Dzięki temu pasek nie zwija się przy przewijaniu i układ nie skacze. Sprawdź to na prawdziwym iPhonie.
- Zweryfikuj na prawdziwym iPhonie, z paskiem na dole (ustawienie domyślne) i na górze (opcja w ustawieniach Safari). W iOS 26 zgłaszane są problemy z jednostkami viewportu, więc wynik trzeba obejrzeć, a nie tylko policzyć.
- Sprawdź współdziałanie z emulacją obrotu z sekcji 6: w pozycji poziomej pasek jest inny, a na ekranie Kontakt nic ważnego nie może być zasłonięte.

## 6b. Skalowanie i kanwa 375 × 812

Mockupy są narysowane na kanwie **375 × 812** (szerokość × wysokość, w pikselach CSS), czyli w rozmiarze ekranu iPhone'a X. Traktuj je jako szablon: na innym ekranie układ skaluje się o procent różnicy wymiarów względem tej kanwy.

**Kanwa jest orientacyjną proporcją, nie dokładnym rozmiarem żadnego ekranu.** Smartfony mają różne proporcje, a widoczny obszar w Safari jest zawsze niższy niż cały ekran, więc 375 × 812 to jeden uśredniony punkt odniesienia. Układ ma wyglądać dobrze w całym zakresie realnych proporcji, bez nakładania się elementów i bez przycinania treści, a nie tylko dokładnie na 375 × 812. Nie wpisuj w kodzie żadnych wartości typu "na iPhone'ie X jest tyle".

- **Wysokość kanwy 812 odpowiada widocznej wysokości `100svh`** (pasek Safari rozwinięty, sekcja 6a), nie całemu ekranowi telefonu. Układ jest więc w pionie nieco ściśnięty względem mockupu. **[założenie]**
- Zdefiniuj dwie jednostki: poziomą `--ux` = szerokość kontenera / 375 i pionową `--uy` = wysokość kontenera / 812. Zalecane jednostki `cqw` i `cqh` na kontenerze `.stage` (`container-type: size`), bo działają także na ekranie Kontakt z emulacją obrotu (sekcja 6), gdzie `.stage` ma zamienione wymiary. Fallback: `vw` i `svh`.
- Reguły skalowania:
  - **Położenia poziome, marginesy boczne, rozmiar tekstu i szerokość napisów SVG:** według `--ux`. Wysokość napisów SVG wynika z ich proporcji (bez rozciągania, żeby nie zniekształcać liter).
  - **Położenia pionowe i odstępy między elementami:** według `--uy`.
  - **Zdjęcia prac są wyłączone ze skalowania:** zawsze pełna szerokość kolumny, wysokość wynika z proporcji pliku, a środek pasa ze zdjęciem leży na pionowej pozycji z mockupu przeliczonej przez `--uy`.
  - **Tła z twarzą:** `object-fit: cover`, wypełniają cały `.stage`.
- Zwróć uwagę na krótkie ekrany (współczynnik wysokości wyraźnie mniejszy od jedności): elementy mogą się zbliżyć lub nałożyć. Sprawdź układ w oknach 320×568, 375×667, 375×812, 390×844 i 430×932 (widoczny viewport) i zgłoś, jeśli coś się zderza.
- Na początku zrób prostą stronę `test.html`, która wypisuje `innerWidth`, `innerHeight`, wartość `100svh`, `100lvh` oraz `env(safe-area-inset-*)`. Posłuży do zmierzenia prawdziwych wartości na iPhonie.

## 7. Przejścia i nawigacja

- Wybierz najprostszy routing działający na statycznym hostingu i obsługujący przycisk Wstecz przeglądarki (np. hash routing). Stan galerii (numer slajdu) ma przetrwać wejście w "o pracy" i powrót, oraz wejście w menu i powrót strzałką.
- Przejścia między ekranami: brak lub natychmiastowe cięcie. Mockup nie przewiduje animacji. **[założenie]**
- Swipe w galerii nie jest wymagany, nawigacja tylko przez `<<` i `>>`. **[założenie]**

## 8. Wersje językowe

- **Stan na teraz:** istnieje tylko treść po polsku. Wersja angielska to szkielet, który jest po prostu powtórzeniem polskiej, bez żadnych tłumaczeń.
- `en` w nagłówku działa: przełącza na wersję angielską, a w tym samym miejscu pojawia się wtedy `pl` (powrót). Po przełączeniu użytkownik widzi tę samą treść i te same grafiki co po polsku.
- Szkielet obejmuje wszystko, co ma mieć wersje językowe: dane prac, napisy SVG w menu, teksty bio i kontakt. Każde z nich ma osobne pole lub ścieżkę dla `en`, wypełnione kopią wersji polskiej. Dodanie tłumaczenia = podmiana treści w tych polach i plikach, bez zmian w kodzie.
- Jeśli pole `en` jest puste lub go brak, kod pokazuje wartość `pl` (zabezpieczenie na czas, gdy tłumaczenie będzie dodawane stopniowo). **[założenie]**
- `lang` na `<html>`: dopóki treść wersji `en` jest kopią polskiej, zostaw `lang="pl"`. Przestaw na `en` dopiero, gdy pojawi się faktyczne tłumaczenie.
- Wybrany język zapamiętaj (`localStorage` w `try/catch`) i odzwierciedl w adresie, żeby linki dało się udostępniać.

## 9. Kolejność pracy dla agenta

0. Strona testowa `test.html` z pomiarem viewportu (sekcja 6b).
1. Szkielet, routing, dane, ekran A i B z jedną-dwiema przykładowymi pracami.
2. Ekrany C, D, E z grafikami (placeholdery, jeśli SVG jeszcze nie ma).
3. Ekran F i obsługa obrotu (sekcja 6).
4. Szkielet wersji angielskiej (kopia PL, bez tłumaczeń), optymalizacja obrazów, test na telefonie.

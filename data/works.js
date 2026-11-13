/* ============================================================
   DANE PORTFOLIO — jedyne miejsce z treściami prac, bio i kontaktu.
   Nowa praca = nowy wpis w tablicy ponizej (bez zmian w kodzie).
   Pola "en" sa na razie kopiami "pl" (spec par. 8).

   UWAGA: tytuły, techniki, wymiary i opisy w "works" są TYMCZASOWE
   (placeholder) — do podmiany na prawdziwe. Kolejność wpisów w "works"
   = kolejność slajdów w galerii głównej (A).

   TYTUŁ: może być tekstem albo tablicą linijek — tablica jest teraz sklejana
   spacjami, a o łamaniu na ekranie B decyduje app.js (1, 2 albo 3 linijki,
   zawsze "po równo" i zawsze bez wpływu na resztę tekstu).
   Wymuszone łamanie w konkretnym miejscu: znak "|" w tytule,
   np. "Emigracja zarobkowa | mojej matki".
   ============================================================ */

window.PORTFOLIO_DATA = {
  "works": [
    {
      "id": "start-01",
      "image": "img/works/main-gallery/tomas.webp",
      "focus": "50% 50%",
      "title": {
        "pl": ["Tytuł obrazu", "linijka 2", "linijka 3"],
        "en": ["Tytuł obrazu", "linijka 2", "linijka 3"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "100 × 80 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida."
      }
    },
    {
      "id": "start-02",
      "image": "img/works/main-gallery/emigracja-matki.webp",
      "focus": "50% 50%",
      "title": {
        "pl": ["Emigracja zarobkowa mojej matki", "w ford puma", "pierwszej generacji"],
        "en": ["Emigracja zarobkowa mojej matki", "w ford puma", "pierwszej generacji"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "70 × 120 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    },
    {
      "id": "start-03",
      "image": "img/works/main-gallery/10-zl.webp",
      "focus": "50% 50%",
      "title": {
        "pl": ["Szybki samochód, sweatshop yamaszy", "w Indiach i pustostan", "na Zaciszu"],
        "en": ["Szybki samochód, sweatshop yamaszy", "w Indiach i pustostan", "na Zaciszu"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "130 × 90 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      }
    },
    {
      "id": "start-04",
      "image": "img/works/main-gallery/szmal.webp",
      "focus": "50% 50%",
      "title": {
        "pl": ["Gonitwa cyfrowych aut, wizerunki", "klaunów i koło fortuny", "z minionkiem"],
        "en": ["Gonitwa cyfrowych aut, wizerunki", "klaunów i koło fortuny", "z minionkiem"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "100 × 105 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
      }
    },
    {
      "id": "start-05",
      "image": "img/works/main-gallery/szmal-2.webp",
      "focus": "50% 50%",
      "title": {
        "pl": ["Gonitwa monet", "w nadmorskim", "salonie hazardu"],
        "en": ["Gonitwa monet", "w nadmorskim", "salonie hazardu"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "150 × 95 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    },
    {
      "id": "start-06",
      "image": "img/works/main-gallery/zetony.webp",
      "focus": "50% 50%",
      "title": {
        "pl": ["Portret zbiorowy", "monet"],
        "en": ["Portret zbiorowy", "monet"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "140 × 92 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida."
      }
    },
    {
      "id": "start-07",
      "image": "img/works/main-gallery/antycypacja-nagrody.webp",
      "focus": "50% 50%",
      "title": {
        "pl": ["One clip the end", "chwytak z nagrodami"],
        "en": ["One clip the end", "chwytak z nagrodami"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "120 × 87 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      }
    },
    {
      "id": "start-08",
      "image": "img/works/main-gallery/one-clip-the-end.webp",
      "focus": "50% 50%",
      "title": {
        "pl": ["Obiekt monitorowany", "nadmorski pawilon"],
        "en": ["Obiekt monitorowany", "nadmorski pawilon"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "90 × 120 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida."
      }
    },
    {
      "id": "start-09",
      "image": "img/works/main-gallery/szybki-samochod-w-indiach.webp",
      "focus": "50% 50%",
      "title": {
        "pl": ["Powierzchnia wody", "panorama"],
        "en": ["Powierzchnia wody", "panorama"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "200 × 65 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida."
      }
    },
    {
      "id": "start-10",
      "image": "img/works/main-gallery/gonitwa-cyfrowych-aut.webp",
      "focus": "50% 50%",
      "title": {
        "pl": ["Kąpiel z boją", "widok z wody"],
        "en": ["Kąpiel z boją", "widok z wody"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "160 × 80 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    }
  ],
  "otherWorks": [
    {
      "id": "other-01",
      "image": "img/works/other-works/img-2933.jpg",
      "focus": "50% 50%",
      "title": {
        "pl": ["Tytuł innej pracy", "linijka 2", "linijka 3"],
        "en": ["Tytuł innej pracy", "linijka 2", "linijka 3"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "90 × 110 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
      }
    },
    {
      "id": "other-02",
      "image": "img/works/other-works/img-2959.jpg",
      "focus": "50% 50%",
      "title": {
        "pl": ["Tytuł obrazu", "linijka 2", "linijka 3"],
        "en": ["Tytuł obrazu", "linijka 2", "linijka 3"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "80 × 100 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
      }
    },
    {
      "id": "other-03",
      "image": "img/works/other-works/drzwi-kopia.jpg",
      "focus": "50% 50%",
      "title": {
        "pl": ["Drzwi", "linijka 2", "linijka 3"],
        "en": ["Drzwi", "linijka 2", "linijka 3"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "olej na płótnie"
      },
      "dimensions": "60 × 90 cm",
      "year": "202x",
      "text": {
        "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
      }
    }
  ],
  "bio": {
    "pl": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  "contact": {
    "email": "tymekw@icloud.com",
    "phone": "737 826 710",
    "instagram": "@tymekwojcik_"
  }
}


;

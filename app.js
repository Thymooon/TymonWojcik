/* ===================================================================
   Portfolio Tymon Wójcik — logika strony (vanilla JS, bez builda)
   Ekrany: A galeria · B o pracy · C menu · D inne prace · E bio · F kontakt
   Dane: data/works.js (window.PORTFOLIO_DATA)
   =================================================================== */
'use strict';

/* --- Konfiguracja ------------------------------------------------- */

// Typografia jako SVG (spec §5): każdy <img data-svg="nazwa.svg"> w index.html
// jest podmieniany na plik z katalogu img/heading/<język>/ — bez zmian w kodzie.
// data-alt-pl / data-alt-en (opcjonalne) ustawiają tekst alternatywny.
const HEADING_DIR = 'img/heading/';

// Widok => id elementu ekranu w index.html
const SCREENS = {
  gallery: 'gallery-screen',
  about: 'about-screen',
  menu: 'menu-screen',
  other: 'other-gallery-screen',
  bio: 'bio-screen',
  contact: 'contact-screen'
};

const VIEWS = Object.keys(SCREENS);

// Zachowanie per ekran.
// lockPortrait: true => po obróceniu telefonu w poziom układ zostaje w miejscu
// względem urządzenia (emulacja blokady orientacji, spec §6). Łatwo rozszerzyć
// na kolejne ekrany.
const SCREEN_BEHAVIOUR = {
  gallery: { lockPortrait: false },
  about: { lockPortrait: false },
  menu: { lockPortrait: false },
  other: { lockPortrait: false },
  bio: { lockPortrait: false },
  contact: { lockPortrait: true }
};

// Tekst zapasowy, gdy w danych nie ma bio (spec: placeholder, chodzi o układ).
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.';

/* --- Stan --------------------------------------------------------- */

const state = {
  view: 'gallery',       // gallery | about | menu | other | bio | contact
  lang: 'pl',            // pl | en (na razie EN = kopia PL)
  slide: 0,              // pozycja w galerii startowej (A)
  otherSlide: 0,         // pozycja w "inne prace" (D)
  aboutSource: 'gallery' // z której listy pochodzi otwarty ekran "o pracy"
};

let data = { works: [], otherWorks: [], bio: {}, contact: {} };
const dom = {};
const preloadedImages = new Set();
let headingsLang = null;
let rotationTimer = null;
let titleTimer = null;

/* --- Start -------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', boot);

function boot() {
  data = normalizeData(window.PORTFOLIO_DATA);
  cacheDom();
  state.lang = initialLang();
  bindEvents();
  syncFromHash();
  writeHash(false);
}
/* --- Dane --------------------------------------------------------- */

function normalizeData(raw) {
  const source = raw && typeof raw === 'object' ? raw : {};
  return {
    works: Array.isArray(source.works) ? source.works : [],
    otherWorks: Array.isArray(source.otherWorks) ? source.otherWorks : [],
    bio: source.bio || {},
    contact: source.contact || {}
  };
}

// Zwraca wartość pola w bieżącym języku; brak wersji EN => wartość PL (spec §8).
function localize(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  return value[state.lang] || value.pl || value.en || '';
}

// Tytuł pracy jako JEDEN tekst. Dawne tablice linijek (["...", "..."]) sklejamy
// spacjami — o łamaniu decyduje teraz renderTitle (spec §3B), a nie ręczne
// przecinki w danych. Znak "|" w tytule wymusza łamanie w tym miejscu.
function titleText(work) {
  if (!work) return '';
  const raw = Array.isArray(work.title) ? work.title : localize(work.title);
  const joined = Array.isArray(raw) ? raw.join(' ') : (raw === null || raw === undefined ? '' : String(raw));
  return joined.replace(/\s+/g, ' ').trim();
}

// To samo bez znaków "|" — do atrybutu alt obrazu.
function titlePlain(work) {
  return titleText(work).replace(/\s*\|\s*/g, ' ').trim();
}

/* --- DOM ---------------------------------------------------------- */

function cacheDom() {
  dom.stage = document.querySelector('.stage');

  // Nagłówek ekranu A
  dom.headerMenu = document.getElementById('header-menu');
  dom.headerLang = document.getElementById('header-lang');

  // Ekran A — galeria
  dom.artworkImg = document.getElementById('artwork-img');
  dom.aboutLink = document.getElementById('about-link');
  dom.prevBtn = document.getElementById('prev-btn');
  dom.nextBtn = document.getElementById('next-btn');
  dom.counter = document.getElementById('counter');

  // Ekran B — o pracy
  dom.aboutScreen = document.getElementById('about-screen');
  dom.aboutBackBtn = document.getElementById('about-back-btn');
  dom.aboutTitleBlock = document.getElementById('about-title-block');
  dom.aboutTechnique = document.getElementById('about-technique');
  dom.aboutDescription = document.getElementById('about-description');
  dom.aboutDim = document.getElementById('about-dim');
  dom.aboutYear = document.getElementById('about-year');

  // Ekran C — menu
  dom.menuBackBtn = document.getElementById('menu-back-btn');
  dom.menuInnePrace = document.getElementById('menu-inne-prace');
  dom.menuOMnie = document.getElementById('menu-o-mnie');
  dom.menuKontakt = document.getElementById('menu-kontakt');

  // Ekran D — inne prace
  dom.otherArtworkImg = document.getElementById('other-artwork-img');
  dom.otherAboutLink = document.getElementById('other-about-link');
  dom.otherPrevBtn = document.getElementById('other-prev-btn');
  dom.otherNextBtn = document.getElementById('other-next-btn');
  dom.otherCounter = document.getElementById('other-counter');
  dom.otherBackBtn = document.getElementById('other-back-btn');

  // Pola obrazów (rodzic <img>) — w nich działa lupa, patrz sekcja "Lupa obrazu"
  dom.artworkFrame = dom.artworkImg ? dom.artworkImg.parentElement || null : null;
  dom.otherArtworkFrame = dom.otherArtworkImg ? dom.otherArtworkImg.parentElement || null : null;

  // Ekran E — bio
  dom.bioBackBtn = document.getElementById('bio-back-btn');
  dom.bioText = document.getElementById('bio-text');

  // Ekran F — kontakt
  dom.contactBackBtn = document.getElementById('contact-back-btn');
  dom.contactEmail = document.getElementById('contact-email');
  dom.contactPhone = document.getElementById('contact-phone');
  dom.contactInsta = document.getElementById('contact-insta');
}

function on(element, type, handler) {
  if (element) element.addEventListener(type, handler);
}

/* --- Zdarzenia ---------------------------------------------------- */

function bindEvents() {
  // Ekran A — galeria (nawigator przełącza całe slajdy, bez zapętlenia)
  on(dom.prevBtn, 'click', () => {
    if (state.slide > 0) goTo({ slide: state.slide - 1 }, false);
  });
  on(dom.nextBtn, 'click', () => {
    if (state.slide < data.works.length - 1) goTo({ slide: state.slide + 1 }, false);
  });
  on(dom.aboutLink, 'click', () => goTo({ view: 'about', aboutSource: 'gallery' }));

  // Ekran B — strzałka i tap w dowolnym miejscu wracają (spec §3B)
  on(dom.aboutBackBtn, 'click', (event) => {
    event.stopPropagation();
    backFromAbout();
  });
  on(dom.aboutScreen, 'click', backFromAbout);

  // Nagłówek
  on(dom.headerMenu, 'click', () => goTo({ view: 'menu' }));
  on(dom.headerLang, 'click', toggleLang);

  // Ekran C — menu
  on(dom.menuBackBtn, 'click', () => goTo({ view: 'gallery' }));
  on(dom.menuInnePrace, 'click', () => goTo({ view: 'other' }));
  on(dom.menuOMnie, 'click', () => goTo({ view: 'bio' }));
  on(dom.menuKontakt, 'click', () => goTo({ view: 'contact' }));

  // Ekran D — inne prace
  on(dom.otherPrevBtn, 'click', () => {
    if (state.otherSlide > 0) goTo({ otherSlide: state.otherSlide - 1 }, false);
  });
  on(dom.otherNextBtn, 'click', () => {
    if (state.otherSlide < data.otherWorks.length - 1) goTo({ otherSlide: state.otherSlide + 1 }, false);
  });
  on(dom.otherAboutLink, 'click', () => goTo({ view: 'about', aboutSource: 'other' }));
  on(dom.otherBackBtn, 'click', () => goTo({ view: 'menu' }));

  // Ekrany E i F — powrót do menu
  on(dom.bioBackBtn, 'click', () => goTo({ view: 'menu' }));
  on(dom.contactBackBtn, 'click', () => goTo({ view: 'menu' }));

  // Routing (spec §7)
  window.addEventListener('hashchange', syncFromHash);
  window.addEventListener('popstate', syncFromHash);

  // Obrót ekranu (spec §6)
  window.addEventListener('resize', scheduleRotationUpdate);
  window.addEventListener('orientationchange', scheduleRotationUpdate);
  // Tytuł na ekranie B mierzy się w pikselach — po zmianie rozmiaru mierzymy od nowa
  window.addEventListener('resize', scheduleTitleRefit);
  window.addEventListener('orientationchange', scheduleTitleRefit);
  if (window.screen && window.screen.orientation && window.screen.orientation.addEventListener) {
    window.screen.orientation.addEventListener('change', scheduleRotationUpdate);
  }

  // Lupa obrazu (ekrany A i D): tap = przybliżenie, tap = powrót, przeciąganie
  // = panoramowanie (sekcja "Lupa obrazu" niżej).
  initZoom();
  // Po zmianie rozmiaru pola obrazu powiększenie byłoby zakotwiczone do
  // nieaktualnych pikseli — wracamy do 1×.
  window.addEventListener('resize', resetZooms);
  window.addEventListener('orientationchange', resetZooms);
}

function backFromAbout() {
  goTo({ view: state.aboutSource === 'other' ? 'other' : 'gallery' });
}

function toggleLang() {
  state.lang = state.lang === 'pl' ? 'en' : 'pl';
  goTo({});
}
/* --- Routing (hash) ----------------------------------------------- */

// Przykład hasha: #slide=1&other=2&view=other&lang=en
function serializeState() {
  const params = new URLSearchParams();
  params.set('slide', String(state.slide));
  params.set('other', String(state.otherSlide));
  if (state.view !== 'gallery') params.set('view', state.view);
  if (state.view === 'about') params.set('source', state.aboutSource);
  params.set('lang', state.lang);
  return params.toString();
}

function currentHash() {
  return window.location.hash.replace(/^#\/?/, '');
}

function toIndex(raw, length) {
  const value = parseInt(raw, 10);
  if (!Number.isInteger(value) || value < 0) return 0;
  if (length > 0 && value > length - 1) return length - 1;
  return value;
}

function readStateFromHash() {
  const params = new URLSearchParams(currentHash());

  const view = params.get('view');
  state.view = VIEWS.indexOf(view) !== -1 ? view : 'gallery';

  const lang = params.get('lang');
  if (lang === 'pl' || lang === 'en') state.lang = lang;

  state.slide = toIndex(params.get('slide'), data.works.length);
  state.otherSlide = toIndex(params.get('other'), data.otherWorks.length);
  state.aboutSource = params.get('source') === 'other' ? 'other' : 'gallery';
}

// push = false => podmiana wpisu w historii (przełączanie slajdów nie zaśmieca
// historii przeglądarki). push = true => nowy wpis (zmiana ekranu).
function writeHash(push) {
  const hash = serializeState();
  if (currentHash() === hash) return;

  if (!push) {
    try {
      window.history.replaceState(null, '', '#' + hash);
      return;
    } catch (err) {
      // np. dokument otwarty z file:// — wtedy lecimy niżej, przez location.hash
    }
  }

  window.location.hash = hash;
}

function goTo(patch, push) {
  Object.assign(state, patch);
  writeHash(push !== false);
  render();
}

function syncFromHash() {
  readStateFromHash();
  render();
}

function initialLang() {
  const fromHash = new URLSearchParams(currentHash()).get('lang');
  if (fromHash === 'pl' || fromHash === 'en') return fromHash;

  try {
    const saved = window.localStorage.getItem('portfolio_lang');
    if (saved === 'pl' || saved === 'en') return saved;
  } catch (err) {
    // prywatny tryb Safari / zablokowany localStorage
  }

  return 'pl';
}

function persistLang() {
  try {
    window.localStorage.setItem('portfolio_lang', state.lang);
  } catch (err) {
    // jw.
  }
}

/* --- Renderowanie ------------------------------------------------- */

function render() {
  renderHeader();
  renderScreens();
  renderView();
  updateRotation();
  applyLocalizedImages();
  persistLang();
}

function renderHeader() {
  if (dom.headerLang) {
    const next = state.lang === 'pl' ? 'en' : 'pl';
    // Etykieta języka może być tekstem albo grafiką SVG (data-svg) — tekst
    // podmieniamy tylko w pierwszym przypadku, żeby nie skasować obrazka.
    if (!dom.headerLang.querySelector('img')) {
      dom.headerLang.textContent = next;
    }
    dom.headerLang.setAttribute('aria-label', next === 'en' ? 'Switch to English' : 'Przełącz na polski');
  }
  // Spec §8: dopóki treść wersji EN jest kopią polskiej, <html lang> zostaje "pl".
  if (document.documentElement.lang !== 'pl') {
    document.documentElement.lang = 'pl';
  }
}

function renderScreens() {
  VIEWS.forEach((view) => {
    const element = document.getElementById(SCREENS[view]);
    if (!element) return;
    const active = view === state.view;
    element.classList.toggle('active', active);
    element.setAttribute('aria-hidden', active ? 'false' : 'true');
  });
}

function renderView() {
  if (state.view === 'gallery') renderGallery();
  else if (state.view === 'other') renderOtherGallery();
  else if (state.view === 'about') renderAbout();
  else if (state.view === 'bio') renderBio();
  else if (state.view === 'contact') renderContact();
}
/* --- Ekran A: galeria startowa ------------------------------------ */

function renderGallery() {
  const total = data.works.length;
  const work = data.works[state.slide];

  resetZooms();
  setImage(dom.artworkImg, work);

  if (dom.counter) dom.counter.textContent = '[' + (total ? state.slide + 1 : 0) + '/' + total + ']';
  if (dom.prevBtn) dom.prevBtn.disabled = state.slide <= 0;
  if (dom.nextBtn) dom.nextBtn.disabled = total === 0 || state.slide >= total - 1;
  if (dom.aboutLink) dom.aboutLink.disabled = !work;

  preloadNeighbours(data.works, state.slide);
}

/* --- Ekran D: inne prace ------------------------------------------ */

function renderOtherGallery() {
  const total = data.otherWorks.length;
  const work = data.otherWorks[state.otherSlide];

  resetZooms();
  setImage(dom.otherArtworkImg, work);

  if (dom.otherCounter) dom.otherCounter.textContent = '[' + (total ? state.otherSlide + 1 : 0) + '/' + total + ']';
  if (dom.otherPrevBtn) dom.otherPrevBtn.disabled = state.otherSlide <= 0;
  if (dom.otherNextBtn) dom.otherNextBtn.disabled = total === 0 || state.otherSlide >= total - 1;
  if (dom.otherAboutLink) dom.otherAboutLink.disabled = !work;

  preloadNeighbours(data.otherWorks, state.otherSlide);
}

/* --- Ekran B: o pracy --------------------------------------------- */

function renderAbout() {
  const work = currentAboutWork();

  renderTitle(dom.aboutTitleBlock, titleText(work));

  if (dom.aboutTechnique) dom.aboutTechnique.textContent = work ? localize(work.technique) : '';
  if (dom.aboutDescription) dom.aboutDescription.textContent = work ? localize(work.text) : '';
  if (dom.aboutDim) dom.aboutDim.textContent = work ? (work.dimensions || '') : '';
  if (dom.aboutYear) dom.aboutYear.textContent = work ? (work.year || '') : '';
}

// Praca, którą pokazuje ekran B (z galerii A albo z "innych prac" D).
function currentAboutWork() {
  const fromOther = state.aboutSource === 'other';
  const list = fromOther ? data.otherWorks : data.works;
  const index = fromOther ? state.otherSlide : state.slide;
  return list[index] || null;
}

/* --- Tytuł pracy: 1, 2 albo 3 linijki, zawsze "po równo" ----------- */

// Zasada (spec §3B): tytuł zajmuje MINIMALNĄ liczbę linijek
// (1, jeśli się mieści; inaczej 2; inaczej 3), a przy 2–3 linijkach dzieli się
// tak, żeby linijki były podobnej długości — bez "sieroty" na końcu.
// Pole ma w CSS STAŁĄ wysokość 3 linijek, więc krótszy tytuł nie przesuwa
// techniki, opisu ani stopki.
// Wymuszone łamanie: znak "|" w tytule (np. "Emigracja zarobkowa | mojej matki").

const TITLE_MAX_LINES = 3;      // maksymalna liczba linijek tytułu
const TITLE_MIN_SCALE = 0.72;   // awaryjne zmniejszanie liter, gdy tytuł nie
const TITLE_SHRINK_STEP = 0.92; // mieści się w 3 linijkach (patrz renderTitle)

function renderTitle(container, text) {
  if (!container) return;

  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  setTitleScale(container, null);
  container.textContent = '';
  if (!clean) return;

  // 1) Autor wymusił łamanie znakiem "|" — szanujemy to i nic nie liczymy.
  if (clean.indexOf('|') !== -1) {
    setTitleLines(container, clean.split(/\s*\|\s*/));
    return;
  }

  const words = clean.split(' ');
  if (words.length < 2) {
    container.textContent = clean;
    return;
  }

  // 2) Mierzymy realne szerokości słów (przeglądarka, nie oszacowanie).
  let metrics = measureTitleWords(container, words);
  if (!metrics) {
    // Brak pomiaru (ekran ukryty / stub DOM) — zostaje naturalne łamanie.
    container.textContent = clean;
    return;
  }

  // 3) Ile linijek tytuł potrzebuje? Więcej niż 3 => stopniowo zmniejszamy
  //    litery, żeby tytuł nigdy nie został ucięty przez overflow: hidden.
  let lines = greedyTitleLines(metrics.widths, metrics.space, metrics.width);
  let scale = 1;
  while (lines.length > TITLE_MAX_LINES && scale > TITLE_MIN_SCALE + 0.001) {
    scale = Math.max(TITLE_MIN_SCALE, scale * TITLE_SHRINK_STEP);
    setTitleScale(container, scale);
    metrics = measureTitleWords(container, words);
    if (!metrics) {
      setTitleScale(container, null);
      container.textContent = clean;
      return;
    }
    lines = greedyTitleLines(metrics.widths, metrics.space, metrics.width);
  }

  if (lines.length === 1) {
    container.textContent = clean;
    return;
  }

  // 4) Podział "po równo"; gdy się nie uda — zostaje podział zachłanny.
  const breaks = balanceTitleBreaks(metrics.widths, metrics.space, lines.length, metrics.width);
  setTitleLines(container, breaks
    ? splitTitleWords(words, breaks)
    : lines.map((line) => line.map((index) => words[index]).join(' ')));
}

// Układa słowa jako <span>y i mierzy: szerokość każdego słowa, szerokość spacji
// i dostępną szerokość pola. null = pomiar niemożliwy (np. display: none).
function measureTitleWords(container, words) {
  if (typeof container.getBoundingClientRect !== 'function') return null;

  const width = container.clientWidth || Math.round(container.getBoundingClientRect().width || 0);
  if (!width) return null;

  container.textContent = '';
  const spans = words.map((word, index) => {
    if (index > 0) container.appendChild(document.createTextNode(' '));
    const span = document.createElement('span');
    span.textContent = word;
    container.appendChild(span);
    return span;
  });

  const rects = spans.map((span) => (typeof span.getBoundingClientRect === 'function'
    ? span.getBoundingClientRect()
    : null));
  if (rects.some((rect) => !rect || !rect.width)) return null;

  const widths = rects.map((rect) => rect.width);

  // Szerokość spacji: największa przerwa między sąsiednimi słowami w tej samej
  // linii (spacja na końcu zawiniętej linii bywa liczona inaczej, stąd max).
  let space = 0;
  for (let i = 1; i < rects.length; i += 1) {
    const gap = rects[i].left - rects[i - 1].right;
    if (gap > 0 && gap < width && gap > space) space = gap;
  }
  if (!space) space = Math.min.apply(null, widths) * 0.25;

  return { widths, space, width };
}

// Podział zachłanny — dokładnie to, co zrobiłaby przeglądarka bez naszych <br>.
// Liczba linijek, którą zwraca, to MINIMUM potrzebne tytułowi.
function greedyTitleLines(widths, space, maxWidth) {
  const lines = [];
  let current = [];
  let used = 0;

  widths.forEach((wordWidth, index) => {
    const extra = current.length ? space + wordWidth : wordWidth;
    if (current.length && used + extra > maxWidth + 0.01) {
      lines.push(current);
      current = [index];
      used = wordWidth;
      return;
    }
    current.push(index);
    used += extra;
  });

  if (current.length) lines.push(current);
  return lines;
}

// Szerokość linijki złożonej ze słów widths[from..to-1].
function titleLineWidth(widths, space, from, to) {
  let total = 0;
  for (let i = from; i < to; i += 1) total += widths[i];
  const gaps = to - from - 1;
  return gaps > 0 ? total + gaps * space : total;
}

// Dzieli tytuł na dokładnie `count` linijek tak, żeby NAJSZERSZA linijka była
// jak najwęższa (czyli wszystkie linijki podobnej długości). Zwraca indeksy
// początków linijek 2..count albo null, gdy taki podział nie mieści się w polu.
function balanceTitleBreaks(widths, space, count, maxWidth) {
  const total = widths.length;
  if (count < 2 || count > Math.min(TITLE_MAX_LINES, total)) return null;

  const best = [];
  for (let k = 0; k <= count; k += 1) best.push(new Array(total + 1).fill(null));
  best[0][0] = { max: 0, start: 0 };

  for (let k = 1; k <= count; k += 1) {
    for (let end = k; end <= total; end += 1) {
      for (let start = k - 1; start < end; start += 1) {
        const previous = best[k - 1][start];
        if (!previous) continue;
        const candidate = Math.max(previous.max, titleLineWidth(widths, space, start, end));
        if (!best[k][end] || candidate < best[k][end].max) {
          best[k][end] = { max: candidate, start };
        }
      }
    }
  }

  const final = best[count][total];
  if (!final || final.max > maxWidth + 0.01) return null;

  const starts = [];
  let end = total;
  for (let k = count; k > 0; k -= 1) {
    const node = best[k][end];
    starts.unshift(node.start);
    end = node.start;
  }

  return starts.slice(1);
}

function splitTitleWords(words, starts) {
  const lines = [];
  let from = 0;
  starts.concat([words.length]).forEach((to) => {
    lines.push(words.slice(from, to).join(' '));
    from = to;
  });
  return lines;
}

// Linijki jako tekst + <br> (bez innerHTML — spec: bez wstrzykiwania HTML).
function setTitleLines(container, lines) {
  container.textContent = '';
  lines.slice(0, TITLE_MAX_LINES).forEach((line, index) => {
    if (index > 0) container.appendChild(document.createElement('br'));
    container.appendChild(document.createTextNode(line));
  });
}

// --title-scale skaluje TYLKO litery tytułu (patrz .about-title-block w CSS).
function setTitleScale(container, value) {
  if (!container.style || typeof container.style.setProperty !== 'function') return;
  if (value === null) container.style.removeProperty('--title-scale');
  else container.style.setProperty('--title-scale', String(value));
}

/* --- Ekran E: o mnie / bio ---------------------------------------- */

function renderBio() {
  if (!dom.bioText) return;
  dom.bioText.textContent = localize(data.bio) || LOREM;
}

/* --- Ekran F: kontakt --------------------------------------------- */

function renderContact() {
  const contact = data.contact || {};
  const email = contact.email || 'tymekw@icloud.com';
  const phone = contact.phone || '737 826 710';
  const instagram = contact.instagram || '@tymekwojcik_';

  if (dom.contactEmail) {
    dom.contactEmail.textContent = email;
    dom.contactEmail.href = 'mailto:' + email;
  }
  if (dom.contactPhone) {
    dom.contactPhone.textContent = phone;
    dom.contactPhone.href = 'tel:' + phone.replace(/[^\d+]/g, '');
  }
  if (dom.contactInsta) {
    dom.contactInsta.textContent = instagram;
    dom.contactInsta.href = 'https://instagram.com/' + instagram.replace(/^@/, '');
  }
}

/* --- Obrazy -------------------------------------------------------- */

function setImage(img, work) {
  if (!img) return;

  if (!work || !work.image) {
    img.removeAttribute('src');
    img.removeAttribute('srcset');
    img.alt = '';
    return;
  }

  if (work.srcset) {
    img.setAttribute('srcset', work.srcset);
    img.setAttribute('sizes', work.sizes || '100vw');
  } else {
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
  }

  img.style.objectPosition = work.focus || '50% 50%';
  img.alt = titlePlain(work) || 'Praca malarska';
  img.src = work.image;
}

// Podczas oglądania slajdu ładujemy z wyprzedzeniem sąsiednie (spec §5).
function preloadNeighbours(list, index) {
  [index - 1, index + 1].forEach((neighbourIndex) => {
    const work = list[neighbourIndex];
    if (!work || !work.image || preloadedImages.has(work.image)) return;
    preloadedImages.add(work.image);
    const image = new Image();
    image.src = work.image;
  });
}

/* --- Lupa obrazu: tap = przybliżenie, tap = powrót (ekrany A i D) --- */

// Jedno tapnięcie w obraz przybliża go do --zoom-factor (style.css) w miejscu
// palca; drugie tapnięcie wraca do 1×. Przeciągnięcie palcem po powiększeniu
// panoramuje obraz — punkt, w który tapnąłeś, zostaje punktem zaczepienia.
// Animowany jest wyłącznie transform, więc wszystko dzieje się na GPU:
// brak przeliczania układu, brak przemalowywania, brak dodatkowych plików.

const ZOOM_TAP_SLOP = 8; // px: mniejszy ruch palca to jeszcze tap, większy to panoramowanie

// Wartość liczbowa zmiennej CSS (np. --zoom-factor); brak => wartość zapasowa.
function readCssNumber(name, fallback) {
  if (typeof window === 'undefined' || !window.getComputedStyle || !document.documentElement) return fallback;
  const raw = window.getComputedStyle(document.documentElement).getPropertyValue(name);
  const value = parseFloat(raw);
  return isFinite(value) ? value : fallback;
}

// Przesunięcie, przy którym punkt (we współrzędnych okna) zostaje w miejscu po
// powiększeniu o z. Obraz ma w CSS transform-origin: 0 0, więc wystarczy mnożenie.
function zoomOffset(point, origin, z) {
  return (point - origin) * (1 - z);
}

// Dopuszczalne przesunięcie JEDNEJ osi (min/max w px ekranu). Obraz jest
// wyśrodkowany w polu, a po powiększeniu nie może odsłonić tła pola — dlatego
// granice liczymy od krawędzi pola. Gdy powiększony obraz jest mniejszy od pola
// (np. --zoom-factor blisko 1), zwracamy jedną wartość = wyśrodkowanie.
function zoomPanLimits(baseSize, boxSize, z) {
  const scaled = baseSize * z;
  const offset = (boxSize - baseSize) / 2; // wyśrodkowanie obrazu w polu (CSS: center)
  if (scaled <= boxSize) {
    const centered = (baseSize - scaled) / 2;
    return { min: centered, max: centered };
  }
  return { min: boxSize - offset - scaled, max: -offset };
}

function clampValue(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

// Geometria gestu: pole (rect) + obraz w stanie 1× (offsetWidth/Height, czyli
// wymiary układu — transformacja ich nie zmienia).
function zoomGeometry(frame, image) {
  if (!frame || !image || typeof frame.getBoundingClientRect !== 'function') return null;
  const box = frame.getBoundingClientRect();
  const baseWidth = image.offsetWidth;
  const baseHeight = image.offsetHeight;
  if (!box || !box.width || !box.height || !baseWidth || !baseHeight) return null;
  return {
    left: box.left + (box.width - baseWidth) / 2,
    top: box.top + (box.height - baseHeight) / 2,
    width: box.width,
    height: box.height,
    baseWidth,
    baseHeight
  };
}

function createZoom(frame, image) {
  if (!frame || !image) return null;

  const view = {
    zoomed: false,
    z: 1,
    tx: 0,
    ty: 0,
    pointerId: null,
    startX: 0,
    startY: 0,
    startTx: 0,
    startTy: 0,
    moved: false,
    settleTimer: null,
    geometry: null
  };

  // Podczas ruchu i animacji liczy się płynność: translate3d trzyma obraz na
  // własnej warstwie GPU, więc przeciąganie nie przemalowuje pikseli.
  function paint() {
    if (image.style) {
      image.style.transform = view.zoomed
        ? 'translate3d(' + view.tx.toFixed(2) + 'px, ' + view.ty.toFixed(2) + 'px, 0) scale(' + view.z + ')'
        : '';
    }
    frame.classList.toggle('is-zoomed', view.zoomed);
  }

  // Stan SPOCZYNKU (po tapnięciu i po puszczeniu palca). translate3d i
  // will-change każą przeglądarce rozciągnąć gotową bitmapę 1× — obraz robi się
  // wtedy wyraźnie mniej ostry niż przy natywnym zoomie przeglądarki. Dlatego
  // bez ruchu wracamy do zwykłego translate(): bez podpowiedzi GPU element jest
  // malowany w skali powiększenia, czyli próbkowany z pełnej rozdzielczości
  // pliku (ostro), a nie z bitmapy zrobionej dla 1×.
  function paintSettled() {
    if (!image.style) return;
    image.style.transform = view.zoomed
      ? 'translate(' + view.tx.toFixed(2) + 'px, ' + view.ty.toFixed(2) + 'px) scale(' + view.z + ')'
      : '';
  }

  function cancelSettle() {
    if (view.settleTimer !== null && typeof clearTimeout === 'function') clearTimeout(view.settleTimer);
    view.settleTimer = null;
  }

  function settle() {
    cancelSettle();
    image.classList.remove('is-zooming'); // zdejmuje transition ORAZ will-change
    paintSettled();
  }

  // Po animacji tapnięcia przechodzimy w stan spoczynku — transitionend jest
  // dokładny, a timer to bezpiecznik na wypadek braku animacji (--zoom-ms: 0)
  // albo przerwanego przejścia (np. po zmianie slajdu w trakcie).
  function scheduleSettle() {
    cancelSettle();
    if (typeof setTimeout !== 'function') return;
    const ms = Math.max(0, readCssNumber('--zoom-ms', 260));
    view.settleTimer = setTimeout(function onSettle() {
      view.settleTimer = null;
      settle();
    }, ms + 80);
  }

  // W trakcie animacji (tap) view.tx/ty są już DOCELOWE, a palec widzi stan
  // pośredni. Przed przeciąganiem bierzemy stan faktyczny z macierzy transform,
  // żeby obraz nie skoczył, gdy chwycisz go w połowie najazdu.
  function syncFromComputedTransform() {
    if (!view.zoomed || typeof window === 'undefined' || !window.getComputedStyle) return;
    const style = window.getComputedStyle(image);
    const matrix = style ? style.transform : null;
    if (typeof matrix !== 'string' || matrix.indexOf('matrix') !== 0) return;

    const parts = matrix.replace(/^matrix(3d)?\(/, '').replace(/\)$/, '').split(',');
    const tx = parseFloat(parts[parts.length === 6 ? 4 : 12]);
    const ty = parseFloat(parts[parts.length === 6 ? 5 : 13]);
    if (isFinite(tx) && isFinite(ty)) {
      view.tx = tx;
      view.ty = ty;
    }
  }

  function reset() {
    view.pointerId = null;
    view.moved = false;
    cancelSettle();
    if (!view.zoomed) return;
    view.zoomed = false;
    view.tx = 0;
    view.ty = 0;
    image.classList.remove('is-zooming'); // zmiana slajdu = bez animacji
    paint();
  }

  function zoomIn(clientX, clientY) {
    const geometry = zoomGeometry(frame, image);
    if (!geometry) return;

    const factor = readCssNumber('--zoom-factor', 2);
    const z = factor > 1 ? factor : 2; // 1× i mniej = brak powiększenia, więc zapas
    // Punkt dotknięcia przycięty do obrazu — tap w białym marginesie pola też działa.
    const localX = clampValue(clientX - geometry.left, 0, geometry.baseWidth);
    const localY = clampValue(clientY - geometry.top, 0, geometry.baseHeight);
    const limitX = zoomPanLimits(geometry.baseWidth, geometry.width, z);
    const limitY = zoomPanLimits(geometry.baseHeight, geometry.height, z);

    view.zoomed = true;
    view.z = z;
    view.tx = clampValue(zoomOffset(localX, 0, z), limitX.min, limitX.max);
    view.ty = clampValue(zoomOffset(localY, 0, z), limitY.min, limitY.max);
    image.classList.add('is-zooming');
    paint();
    scheduleSettle();
  }

  function zoomOut() {
    if (!view.zoomed) return;
    view.zoomed = false;
    view.tx = 0;
    view.ty = 0;
    image.classList.add('is-zooming');
    paint();
    scheduleSettle();
  }

  on(frame, 'pointerdown', (event) => {
    if (view.pointerId !== null) return;                      // drugi palec (pinch) — ignorujemy
    if (typeof event.button === 'number' && event.button !== 0) return;

    view.pointerId = event.pointerId === undefined ? 'pointer' : event.pointerId;
    view.startX = event.clientX;
    view.startY = event.clientY;
    syncFromComputedTransform();
    view.startTx = view.tx;
    view.startTy = view.ty;
    view.moved = false;
    view.geometry = zoomGeometry(frame, image);
    cancelSettle();
    image.classList.remove('is-zooming');                     // ciągnięcie bez animacji
    // Dotknięcie w trakcie animacji: zdejmowanie transition pokazuje wartość
    // docelową, więc od razu malujemy stan z chwili dotknięcia (bez skoku).
    if (view.zoomed) paint();
    if (event.preventDefault) event.preventDefault();          // bez zaznaczania / "ducha" obrazka

    if (frame.setPointerCapture && event.pointerId !== undefined) {
      try {
        frame.setPointerCapture(event.pointerId);
      } catch (error) {
        // Safari potrafi odmówić — gest i tak kończy się na pointerup
      }
    }
  });

  on(frame, 'pointermove', (event) => {
    if (event.pointerId !== undefined && event.pointerId !== view.pointerId) return;

    const dx = event.clientX - view.startX;
    const dy = event.clientY - view.startY;
    if (!view.moved && Math.sqrt(dx * dx + dy * dy) > ZOOM_TAP_SLOP) view.moved = true;
    if (!view.moved || !view.zoomed || !view.geometry) return; // to jeszcze tap / brak zoomu

    const limitX = zoomPanLimits(view.geometry.baseWidth, view.geometry.width, view.z);
    const limitY = zoomPanLimits(view.geometry.baseHeight, view.geometry.height, view.z);
    const tx = clampValue(view.startTx + dx, limitX.min, limitX.max);
    const ty = clampValue(view.startTy + dy, limitY.min, limitY.max);
    if (tx === view.tx && ty === view.ty) return; // dotarcie do krawędzi — bez zapisu
    view.tx = tx;
    view.ty = ty;
    paint();
  });

  on(frame, 'pointerup', (event) => {
    if (event.pointerId !== undefined && event.pointerId !== view.pointerId) return;

    const wasTap = !view.moved;
    const x = view.startX;
    const y = view.startY;
    view.pointerId = null;
    view.geometry = null;

    if (frame.releasePointerCapture && event.pointerId !== undefined) {
      try {
        frame.releasePointerCapture(event.pointerId);
      } catch (error) {
        // jw.
      }
    }

    if (!wasTap) {
      settle(); // po puszczeniu palca obraz ma być ostry (stan spoczynku)
      return;
    }
    if (view.zoomed) zoomOut();
    else zoomIn(x, y);
  });

  // Koniec animacji tapnięcia = przejście w stan spoczynku (ostrość).
  on(image, 'transitionend', (event) => {
    if (event && event.propertyName && event.propertyName !== 'transform') return;
    settle();
  });

  on(frame, 'pointercancel', () => {
    view.pointerId = null;
    view.geometry = null;
  });

  // Bez natywnego menu "Zapisz obraz" i bez przeciągania obrazka do przeglądarki.
  on(frame, 'contextmenu', (event) => {
    if (event.preventDefault) event.preventDefault();
  });
  on(frame, 'dragstart', (event) => {
    if (event.preventDefault) event.preventDefault();
  });

  return {
    reset: reset,
    isZoomed: () => view.zoomed,
    state: view
  };
}

const zooms = [];

function initZoom() {
  zooms.push(createZoom(dom.artworkFrame, dom.artworkImg));
  zooms.push(createZoom(dom.otherArtworkFrame, dom.otherArtworkImg));
}

// Wywoływane przy każdym renderze galerii i po zmianie rozmiaru okna —
// wtedy powiększenie byłoby zakotwiczone do nieaktualnych wymiarów pola.
function resetZooms() {
  for (let i = 0; i < zooms.length; i += 1) {
    if (zooms[i]) zooms[i].reset();
  }
}

/* --- Napisy SVG menu (PL/EN z fallbackiem na PL) ------------------- */

function applyLocalizedImages(force) {
  if (!force && headingsLang === state.lang) return;
  headingsLang = state.lang;

  const images = document.querySelectorAll('img[data-svg]');
  for (let i = 0; i < images.length; i += 1) {
    const img = images[i];
    const file = img.getAttribute('data-svg');
    if (!file) continue;

    // Tekst alternatywny per język — sam obrazek nie jest tekstem, więc to on
    // jest jedyną treścią, którą widzą czytniki ekranu i roboty indeksujące.
    const alt = img.getAttribute('data-alt-' + state.lang);
    if (alt !== null) img.alt = alt;

    // Fallback: brak pliku w danym języku => grafika z PL (spec §8).
    img.dataset.fellBack = '';
    img.onerror = function handleMissingTranslation() {
      if (img.dataset.fellBack === '1') return;
      img.dataset.fellBack = '1';
      img.src = HEADING_DIR + 'pl/' + file;
    };

    img.src = HEADING_DIR + state.lang + '/' + file;
  }
}
/* --- Obrót ekranu (spec §6) --------------------------------------- */

// Emulacja "blokady orientacji": ekran z lockPortrait (na razie Kontakt) po
// obróceniu telefonu zostaje w miejscu względem urządzenia — obracamy cały
// kontener o kąt przeciwny do obrotu urządzenia i zamieniamy jego wymiary.
function updateRotation() {
  if (!dom.stage) return;

  const behaviour = SCREEN_BEHAVIOUR[state.view] || {};
  const shouldRotate = Boolean(behaviour.lockPortrait) && isCoarsePointer() && isLandscape();

  if (!shouldRotate) {
    dom.stage.classList.remove('is-rotated', 'rot-ccw', 'rot-cw');
    return;
  }

  // angle 90 => urządzenie obrócone w lewo, 270 => w prawo (spec §6 pkt 3).
  const clockwise = deviceAngle() === 270;
  dom.stage.classList.add('is-rotated');
  dom.stage.classList.toggle('rot-cw', clockwise);
  dom.stage.classList.toggle('rot-ccw', !clockwise);
}

function scheduleRotationUpdate() {
  updateRotation();
  // iOS aktualizuje wymiary viewportu chwilę po obrocie — mierzymy ponownie.
  window.clearTimeout(rotationTimer);
  rotationTimer = window.setTimeout(updateRotation, 300);
}

/* --- Tytuł pracy po zmianie rozmiaru (spec §3B) -------------------- */

// Tytuł dzieli się na linijki na podstawie realnych szerokości w pikselach,
// więc po zmianie rozmiaru okna / obrocie telefonu trzeba go przełożyć.
function scheduleTitleRefit() {
  window.clearTimeout(titleTimer);
  titleTimer = window.setTimeout(refitTitle, 150);
}

function refitTitle() {
  if (state.view !== 'about' || !dom.aboutTitleBlock) return;
  renderTitle(dom.aboutTitleBlock, titleText(currentAboutWork()));
}

function deviceAngle() {
  const orientation = window.screen && window.screen.orientation;
  let raw = 0;

  if (orientation && typeof orientation.angle === 'number') {
    raw = orientation.angle;
  } else if (typeof window.orientation === 'number') {
    raw = window.orientation;
  }

  return ((raw % 360) + 360) % 360;
}

function isCoarsePointer() {
  return window.matchMedia ? window.matchMedia('(pointer: coarse)').matches : false;
}

function isLandscape() {
  return window.matchMedia ? window.matchMedia('(orientation: landscape)').matches : false;
}





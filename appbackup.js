document.addEventListener('DOMContentLoaded', async () => {
  let worksData = [
    {
      "id": "work-1",
      "image": "img/works/img-4437.jpg",
      "focus": "50% 50%",
      "title": {
        "pl": ["Tytuł pierwszej pracy", "druga linijka tytułu", "trzecia linijka tytułu"],
        "en": ["Title of first work", "second line of title", "third line of title"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "oil on canvas"
      },
      "dimensions": "80 × 100 cm",
      "year": "2024",
      "text": {
        "pl": "To jest przykładowy, dłuższy opis pierwszej pracy malarskiej. Tekst jest wyjustowany i opowiada o procesie twórczym oraz koncepcji dzieła. Reprezentuje poszukiwania w zakresie formy i koloru.",
        "en": "This is a sample longer description of the first painting. The text is justified and discusses the creative process and concept of the artwork. It represents explorations in form and color."
      }
    },
    {
      "id": "work-2",
      "image": "img/works/emigracja-matki.jpg",
      "focus": "50% 50%",
      "title": {
        "pl": ["Emigracja zarobkowa mojej matki", "w ford puma", "pierwszej generacji"],
        "en": ["Emigracja zarobkowa mojej matki", "w ford puma", "pierwszej generacji"]
      },
      "technique": {
        "pl": "olej na płótnie",
        "en": "oil on canvas"
      },
      "dimensions": "70 × 120 cm",
      "year": "2023",
      "text": {
        "pl": "Praca odnosi się do osobistych doświadczeń migracyjnych oraz kulturowego kontekstu motoryzacji przełomu wieków. Kompozycja łączy realizm z nostalgią.",
        "en": "The work refers to personal migration experiences and the cultural context of turn-of-the-century automotive culture. The composition combines realism with nostalgia."
      }
    }
  ];

  let currentSlide = 0;
  // Dostępne widoki: 'gallery' | 'about' | 'menu' | 'bio' | 'other'
  let currentView = 'gallery';
  let currentLang = localStorage.getItem('portfolio_lang') || 'pl';

  // Load works data
  try {
    const res = await fetch('data/works.json');
    if (res.ok) {
      const data = await res.json();
      if (data.works && data.works.length > 0) {
        worksData = data.works;
      }
    }
  } catch (err) {
    console.warn('Failed to load works.json via fetch (likely file:// protocol), using fallback data.', err);
  }

  if (worksData.length === 0) return;

  // DOM Elements
  const screens = {
    gallery: document.getElementById('gallery-screen'),
    about: document.getElementById('about-screen'),
    menu: document.getElementById('menu-screen'),
    other: document.getElementById('other-gallery-screen'),
    bio: document.getElementById('bio-screen')
  };

  const headerMenu = document.getElementById('header-menu');
  const headerBrand = document.getElementById('header-brand');
  const headerLang = document.getElementById('header-lang');

  const artworkImg = document.getElementById('artwork-img');
  const aboutLink = document.getElementById('about-link');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const counterBtn = document.getElementById('counter-btn');

  const aboutBackBtn = document.getElementById('about-back-btn');
  const aboutTitleBlock = document.getElementById('about-title-block');
  const aboutTechnique = document.getElementById('about-technique');
  const aboutDescription = document.getElementById('about-description');
  const aboutDim = document.getElementById('about-dim');
  const aboutYear = document.getElementById('about-year');

  const menuBackBtn = document.getElementById('menu-back-btn');
  const menuInnePrace = document.getElementById('menu-inne-prace');
  const menuOMnie = document.getElementById('menu-o-mnie');
  const menuKontakt = document.getElementById('menu-kontakt');

  const otherBackBtn = document.getElementById('other-back-btn');
  const bioBackBtn = document.getElementById('bio-back-btn');

  function getLocalized(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[currentLang] || obj['pl'] || '';
  }

  function updateViewFromHash() {
    const hash = window.location.hash.substring(1); // e.g. slide=0&view=menu
    const params = new URLSearchParams(hash.replace('/', '&'));
    
    let slideParam = parseInt(params.get('slide'), 10);
    if (!isNaN(slideParam) && slideParam >= 0 && slideParam < worksData.length) {
      currentSlide = slideParam;
    } else {
      currentSlide = 0;
    }

    const viewParam = params.get('view');
    if (['about', 'menu', 'bio', 'other'].includes(viewParam)) {
      currentView = viewParam;
    } else {
      currentView = 'gallery';
    }

    render();
  }

  function setHash() {
    const viewPart = currentView !== 'gallery' ? `&view=${currentView}` : '';
    window.location.hash = `slide=${currentSlide}${viewPart}`;
  }

  function render() {
    // Update html lang attribute
    document.documentElement.lang = currentLang;
    if (headerLang) {
      headerLang.textContent = currentLang === 'pl' ? 'en' : 'pl';
      headerLang.setAttribute('aria-label', currentLang === 'pl' ? 'Switch to English' : 'Przełącz na polski');
    }

    // Swapping screen visibility
    Object.keys(screens).forEach(viewName => {
      if (screens[viewName]) {
        if (viewName === currentView) {
          screens[viewName].classList.add('active');
        } else {
          screens[viewName].classList.remove('active');
        }
      }
    });

    const work = worksData[currentSlide];
    const total = worksData.length;

    // Render specifics depending on current view
    if (currentView === 'gallery') {
      artworkImg.src = work.image;
      const titles = getLocalized(work.title);
      artworkImg.alt = Array.isArray(titles) ? titles.join(' ') : titles;
      counterBtn.textContent = `[${currentSlide + 1}/${total}]`;

      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === total - 1;

    } else if (currentView === 'about') {
      const titles = getLocalized(work.title);
      aboutTitleBlock.innerHTML = Array.isArray(titles) ? titles.join('<br>') : titles;
      aboutTechnique.textContent = getLocalized(work.technique);
      aboutDescription.textContent = getLocalized(work.text);
      aboutDim.textContent = work.dimensions || '';
      aboutYear.textContent = work.year || '';
    }
  }

  // --- Event Listeners ---

  // Gallery Navigation
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentSlide > 0) {
      currentSlide--;
      setHash();
    }
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentSlide < worksData.length - 1) {
      currentSlide++;
      setHash();
    }
  });

  aboutLink.addEventListener('click', (e) => {
    e.stopPropagation();
    currentView = 'about';
    setHash();
  });

  // Header actions
  headerLang.addEventListener('click', (e) => {
    e.stopPropagation();
    currentLang = currentLang === 'pl' ? 'en' : 'pl';
    try {
      localStorage.setItem('portfolio_lang', currentLang);
    } catch (err) {}
    render();
  });

  headerMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    currentView = 'menu';
    setHash();
  });

  // Screen B (About screen) interactions
  aboutBackBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentView = 'gallery';
    setHash();
  });

  screens.about.addEventListener('click', () => {
    currentView = 'gallery';
    setHash();
  });

  // Menu Screen interactions
  if (menuBackBtn) {
    menuBackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentView = 'gallery';
      setHash();
    });
  }

  if (menuInnePrace) {
    menuInnePrace.addEventListener('click', (e) => {
      e.stopPropagation();
      currentView = 'other';
      setHash();
    });
  }

  if (menuOMnie) {
    menuOMnie.addEventListener('click', (e) => {
      e.stopPropagation();
      currentView = 'bio';
      setHash();
    });
  }

  // Back buttons from sub-screens
  if (otherBackBtn) {
    otherBackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentView = 'menu';
      setHash();
    });
  }

  if (bioBackBtn) {
    bioBackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentView = 'menu';
      setHash();
    });
  }

  window.addEventListener('hashchange', updateViewFromHash);

  // Initial load execution
  if (!window.location.hash) {
    window.location.hash = 'slide=0';
  } else {
    updateViewFromHash();
  }
});
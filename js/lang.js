(function() {
  var LANG_KEY = 'sundara-lang';
  var HERO_TITLE = {
    en: 'Luxury villas in Bali. Stay or invest.',
    fr: 'Villas de luxe à Bali. Séjournez ou investissez.'
  };

  function syncHeroTitle() {
    var heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    var heroEN = heroTitle.querySelector('.lang-en-inline');
    var heroFR = heroTitle.querySelector('.lang-fr-inline');

    if (heroEN) heroEN.textContent = HERO_TITLE.en;
    if (heroFR) heroFR.textContent = HERO_TITLE.fr;
  }

  function applyLang(lang) {
    syncHeroTitle();
    if (lang === 'fr') {
      document.body.classList.add('fr');
    } else {
      document.body.classList.remove('fr');
    }
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    var langEN = document.getElementById('langEN');
    var langFR = document.getElementById('langFR');
    if (langEN) langEN.style.color = lang === 'en' ? 'var(--gold)' : '';
    if (langFR) langFR.style.color = lang === 'fr' ? 'var(--gold)' : '';
  }

  function init() {
    syncHeroTitle();
    var saved = localStorage.getItem(LANG_KEY) || 'en';
    applyLang(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.setLang = applyLang;
  window.toggleLang = function() {
    var current = localStorage.getItem(LANG_KEY) || 'en';
    applyLang(current === 'en' ? 'fr' : 'en');
  };
})();

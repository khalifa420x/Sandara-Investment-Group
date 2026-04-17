(function() {
  var LANG_KEY = 'sundara-lang';

  function applyLang(lang) {
    if (lang === 'fr') {
      document.body.classList.add('fr');
    } else {
      document.body.classList.remove('fr');
    }
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;

    // Update lang toggle buttons (desktop + mobile)
    var langEN = document.getElementById('langEN');
    var langFR = document.getElementById('langFR');
    if (langEN) langEN.style.color = lang === 'en' ? 'var(--gold)' : '';
    if (langFR) langFR.style.color = lang === 'fr' ? 'var(--gold)' : '';
  }

  // Run on every page load
  var saved = localStorage.getItem(LANG_KEY) || 'en';
  document.addEventListener('DOMContentLoaded', function() {
    applyLang(saved);
  });

  // Expose globally
  window.setLang = applyLang;
  window.toggleLang = function() {
    var current = localStorage.getItem(LANG_KEY) || 'en';
    applyLang(current === 'en' ? 'fr' : 'en');
  };
})();

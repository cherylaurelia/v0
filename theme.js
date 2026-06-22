// theme toggle: cycles light <-> dark, persists to localStorage.
// (an inline <head> script applies the saved theme before paint to avoid flicker.)
(function () {
  var btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var current = document.documentElement.getAttribute('data-theme')
        || (prefersDark ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    a.target = '_blank';
    a.rel = 'noopener';
  });

  var panels = document.querySelectorAll('[data-panel]');
  var navLinks = document.querySelectorAll('nav a[data-tab]');

  function showTab(name) {
    if (!name || !document.querySelector('[data-panel="' + name + '"]')) {
      name = 'about';
    }
    panels.forEach(function (p) {
      p.hidden = p.getAttribute('data-panel') !== name;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-tab') === name);
    });
  }

  document.querySelectorAll('[data-tab]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var name = el.getAttribute('data-tab');
      if (location.hash.slice(1) === name) showTab(name); // re-click same tab
      else location.hash = name;
      window.scrollTo(0, 0);
    });
  });

  window.addEventListener('hashchange', function () {
    showTab(location.hash.slice(1));
  });

  showTab(location.hash.slice(1)); // honor the hash on first load
})();

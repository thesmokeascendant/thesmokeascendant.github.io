// Smoke Ascendant — main.js
// Mobile rail toggle, active-link scrollspy, reading progress bar.
(function () {
  var toggle = document.getElementById('railToggle');
  var rail = document.getElementById('rail');

  if (toggle && rail) {
    toggle.addEventListener('click', function () {
      var open = rail.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    rail.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 880) {
          rail.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // in-page scrollspy (only runs if the page has id="top"-style sections)
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var links = rail ? rail.querySelectorAll('.tree a[href*="#"]') : [];
  if (sections.length && links.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          var id = e.target.id;
          links.forEach(function (l) {
            if (l.getAttribute('href').indexOf('#' + id) !== -1) l.classList.add('active');
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(function (s) { obs.observe(s); });
  }

  // reading progress bar (long-form pages only)
  var bar = document.querySelector('.site-progress');
  if (bar) {
    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var scrolled = h.scrollTop;
      var height = h.scrollHeight - h.clientHeight;
      bar.style.width = height > 0 ? (scrolled / height * 100) + '%' : '0%';
    }, { passive: true });
  }
})();

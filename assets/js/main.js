/* =========================================================
   BARABAS — interakcje: mega-menu mobile, hero slider
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  // === MOBILE BURGER ===
  var burger = document.querySelector('.mobile-burger');
  var nav = document.querySelector('.main-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // === MOBILE: rozwijanie submenu na klik ===
  if (window.matchMedia('(max-width: 768px)').matches) {
    document.querySelectorAll('.main-menu > li.has-submenu > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var li = link.parentElement;
        // jeśli ma submenu - pierwsze kliknięcie rozwija, drugie idzie dalej
        if (li.querySelector('.submenu') && !li.classList.contains('open')) {
          e.preventDefault();
          li.classList.toggle('open');
        }
      });
    });

    document.querySelectorAll('.submenu li.has-children > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var li = link.parentElement;
        if (li.querySelector('.submenu-level-2') && !li.classList.contains('open')) {
          e.preventDefault();
          li.classList.toggle('open');
        }
      });
    });
  }

  // === HERO SLIDER ===
  var slides = document.querySelectorAll('.hero-slide');
  var dots = document.querySelectorAll('.hero-dot');
  var current = 0;
  var timer = null;

  if (slides.length > 1) {
    function showSlide(n) {
      slides.forEach(function (s, i) {
        s.classList.toggle('active', i === n);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === n);
      });
      current = n;
    }

    function nextSlide() {
      showSlide((current + 1) % slides.length);
    }

    function startTimer() {
      timer = setInterval(nextSlide, 5000);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showSlide(i);
        clearInterval(timer);
        startTimer();
      });
    });

    startTimer();
  }

  // === LICZNIKI (animacja) ===
  var counters = document.querySelectorAll('.liczba-num[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var end = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.getAttribute('data-suffix') || '';
          var dur = 1600;
          var start = null;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(end * eased).toLocaleString('pl-PL') + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  }

});

  // === GALERIA MODELU (miniatury przełączają główne zdjęcie) ===
  var galThumbs = document.querySelectorAll('.gal-thumb');
  var galMain = document.querySelector('.gal-main-img');
  if (galThumbs.length && galMain) {
    galThumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var src = thumb.getAttribute('data-full');
        galMain.style.opacity = '0';
        setTimeout(function () {
          galMain.setAttribute('src', src);
          galMain.style.opacity = '1';
        }, 150);
        galThumbs.forEach(function (t) { t.classList.remove('active'); });
        thumb.classList.add('active');
      });
    });
  }

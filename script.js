// ============================================
// Footer year
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// Scroll reveal (IntersectionObserver)
// ============================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================
// Active nav link highlighting on scroll
// ============================================
const sections = document.querySelectorAll('main > section[id], .hero[id]');
const navAnchors = document.querySelectorAll('.nav__links a[data-nav]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav__links a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' });

sections.forEach(sec => navObserver.observe(sec));

// ============================================
// Stat counters — animate numbers into view
// ============================================
const statEls = document.querySelectorAll('.stat-num');

const animateCount = (el) => {
  const target = parseFloat(el.dataset.count);
  const isDecimal = el.dataset.decimal === 'true';
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = isDecimal ? value.toFixed(1) : Math.round(value);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isDecimal ? target.toFixed(1) : target + (target >= 30 ? '+' : '');
  };
  requestAnimationFrame(step);
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

statEls.forEach(el => statObserver.observe(el));

// ============================================
// Back-to-top button
// ============================================
const toTopBtn = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  toTopBtn.classList.toggle('show', window.scrollY > 600);
}, { passive: true });

toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// Nav background intensifies on scroll
// ============================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 40 ? 'rgba(124,224,196,0.18)' : 'transparent';
}, { passive: true });

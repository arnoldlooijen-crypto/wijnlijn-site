// Voetjaar
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Mobiel menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

// Kleine helper om elementen met tekst/klasse te bouwen
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

// Haalt content.json op; valt terug op de ingebouwde tekst (fallback-content.js)
// als dat niet lukt, bijvoorbeeld bij lokaal openen zonder server.
async function loadSiteData() {
  try {
    const res = await fetch('content.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('content.json gaf status ' + res.status);
    return await res.json();
  } catch (e) {
    console.warn('content.json kon niet via fetch geladen worden (normaal bij lokaal openen zonder server) — ingebouwde tekst wordt gebruikt.', e);
    return window.FALLBACK_CONTENT;
  }
}

// Zet de bedrijfsnaam op de plekken die op elke pagina voorkomen (nav + footer + titel)
function applySiteMeta(data, titleSuffix) {
  document.getElementById('nav-name').textContent = data.meta.businessName || 'De Wijnlijn';
  document.getElementById('footer-name').textContent = data.meta.businessName || 'De Wijnlijn';
  document.title = (data.meta.businessName || 'De Wijnlijn') + (titleSuffix ? ' — ' + titleSuffix : '');
}

// Fade-in van elementen met class "reveal" zodra ze in beeld komen
function initReveal() {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(node => io.observe(node));
  } else {
    document.querySelectorAll('.reveal').forEach(node => node.classList.add('in'));
  }
}

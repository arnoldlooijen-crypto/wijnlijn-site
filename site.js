document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    const btn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav.links');
    if (btn && nav) { btn.addEventListener('click', () => nav.classList.toggle('open')); }
    initPage();
});
function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
}
async function loadSiteData() {
    try {
          const res = await fetch('content.json', { cache: 'no-store' });
          if (!res.ok) throw new Error('status ' + res.status);
          return await res.json();
    } catch (e) {
          console.warn('content.json kon niet geladen worden', e);
          return null;
    }
}
function applyTitle(data, suffix) {
    document.title = (data.meta.businessName || 'De Wijnlijn') + (suffix ? ' - ' + suffix : '');
}
function initReveal() {
    if ('IntersectionObserver' in window) {
          const io = new IntersectionObserver((entries) => {
                  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
          }, { threshold: 0.12 });
          document.querySelectorAll('.reveal').forEach(node => io.observe(node));
    } else {
          document.querySelectorAll('.reveal').forEach(node => node.classList.add('in'));
    }
}

function initPage() {
    loadSiteData().then(data => {
          if (!data) return;
          const page = document.body.getAttribute('data-page');
          if (page === 'home') renderHome(data);
          else if (page === 'proeverijen') renderProeverijen(data);
          else if (page === 'opleidingen') renderOpleidingen(data);
          else if (page === 'zakelijk') renderZakelijk(data);
          else if (page === 'over') renderOver(data);
          else if (page === 'contact') renderContact(data);
          initReveal();
    });
}

function renderHome(data) {
    applyTitle(data, data.meta.tagline || '');
    const h = data.home;
    document.getElementById('home-tagline').textContent = h.tagline || '';
    const leadWrap = document.getElementById('home-lead');
    (h.lead || []).forEach(p => leadWrap.appendChild(el('p', 'lead reveal', p)));
    document.getElementById('home-cta1').textContent = h.cta1 || '';
    document.getElementById('home-cta2').textContent = h.cta2 || '';
    const wrap = document.getElementById('home-pillars');
    (h.pillars || []).forEach(p => {
          const card = el('div', 'card reveal');
          card.appendChild(el('h3', null, p.title || ''));
          card.appendChild(el('p', null, p.text || ''));
          const link = el('a', 'more', 'Meer weten &#8594;');
          link.href = p.link || '#';
          card.appendChild(link);
          wrap.appendChild(card);
    });
}

function renderProeverijen(data) {
    const d = data.proeverijen;
    applyTitle(data, d.heading || 'Proeverijen');
    document.getElementById('pv-eyebrow').textContent = d.eyebrow || '';
    document.getElementById('pv-heading').textContent = d.heading || '';
    const introWrap = document.getElementById('pv-intro');
    (d.intro || []).forEach(p => introWrap.appendChild(el('p', null, p)));
    const wrap = document.getElementById('pv-sections');
    (d.sections || []).forEach(s => {
          const block = el('div', 'card reveal');
          block.style.marginBottom = '26px';
          block.appendChild(el('h3', null, s.title || ''));
          (s.text || []).forEach(p => block.appendChild(el('p', null, p)));
          if (s.fact) block.appendChild(el('p', 'fact', s.fact));
          if (s.closing) { const c = el('p', null, s.closing); c.style.fontStyle = 'italic'; c.style.color = 'var(--lavender-deep)'; block.appendChild(c); }
          wrap.appendChild(block);
    });
}

function renderOpleidingen(data) {
    const d = data.opleidingen;
    applyTitle(data, d.heading || 'Wijnopleidingen');
    document.getElementById('opl-eyebrow').textContent = d.eyebrow || '';
    document.getElementById('opl-heading').textContent = d.heading || '';
    const introWrap = document.getElementById('opl-intro');
    (d.intro || []).forEach(p => introWrap.appendChild(el('p', null, p)));
    const wrap = document.getElementById('opl-courses');
    (d.courses || []).forEach(c => {
          const box = el('div', 'course reveal');
          const head = el('div', 'course-head');
          head.appendChild(el('h3', null, (c.code || '') + ' - ' + (c.name || '')));
          head.appendChild(el('span', 'price', c.price || ''));
          box.appendChild(head);
          box.appendChild(el('div', 'subtitle', c.subtitle || ''));
          (c.text || []).forEach(p => box.appendChild(el('p', null, p)));
          const meta = el('div', 'meta');
          const mkMeta = (label, value) => { const m = el('div'); m.appendChild(el('strong', null, label)); m.appendChild(document.createTextNode(value || '')); return m; };
          meta.appendChild(mkMeta('Duur', c.duration));
          meta.appendChild(mkMeta('Data', c.dates));
          meta.appendChild(mkMeta('Investering', (c.price || '') + (c.priceNote ? ' - ' + c.priceNote : '')));
          meta.appendChild(mkMeta('Voor wie', c.audience));
          box.appendChild(meta);
          wrap.appendChild(box);
    });
    document.getElementById('opl-picker-heading').textContent = d.pickerHeading || '';
    const pickerWrap = document.getElementById('opl-picker');
    (d.picker || []).forEach(p => {
          const box = el('div');
          box.appendChild(el('strong', null, p.level || ''));
          box.appendChild(el('span', null, p.text || ''));
          pickerWrap.appendChild(box);
    });
    const closingWrap = document.getElementById('opl-closing');
    (d.closing || []).forEach(p => closingWrap.appendChild(el('p', null, p)));
}

function renderZakelijk(data) {
    const d = data.zakelijk;
    applyTitle(data, d.heading || 'Zakelijk');
    document.getElementById('zk-eyebrow').textContent = d.eyebrow || '';
    document.getElementById('zk-heading').textContent = d.heading || '';
    const introWrap = document.getElementById('zk-intro');
    (d.intro || []).forEach(p => { const e2 = el('p', null, p); e2.style.color = '#EFEAF6'; introWrap.appendChild(e2); });
    const wrap = document.getElementById('zk-sections');
    (d.sections || []).forEach(s => {
          const block = el('div', 'card reveal');
          block.style.marginBottom = '26px';
          block.appendChild(el('h3', null, s.title || ''));
          (s.text || []).forEach(p => block.appendChild(el('p', null, p)));
          wrap.appendChild(block);
    });
    document.getElementById('zk-closing').textContent = d.closing || '';
}

function renderOver(data) {
    const d = data.over;
    applyTitle(data, d.heading || 'Over mij');
    document.getElementById('over-eyebrow').textContent = d.eyebrow || '';
    document.getElementById('over-heading').textContent = d.heading || '';
    document.getElementById('over-photo').src = d.photo || '';
    document.getElementById('over-photo2').src = d.photo2 || '';
    const pWrap = document.getElementById('over-paragraphs');
    (d.paragraphs || []).forEach(p => pWrap.appendChild(el('p', null, p)));
    const credWrap = document.getElementById('over-credentials');
    (d.credentials || []).forEach(c => credWrap.appendChild(el('span', null, c)));
}

function renderContact(data) {
    const d = data.contact;
    applyTitle(data, d.heading || 'Contact');
    document.getElementById('ct-eyebrow').textContent = d.eyebrow || '';
    document.getElementById('ct-heading').textContent = d.heading || '';
    document.getElementById('ct-intro').textContent = d.intro || '';
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => { a.href = 'mailto:' + (data.meta.email || 'info@dewijnlijn.nl'); a.textContent = data.meta.email || 'info@dewijnlijn.nl'; });
    const form = document.getElementById('wijnlijn-form');
    if (form) {
          form.addEventListener('submit', (e) => {
                  e.preventDefault();
                  const fd = new FormData(form);
                  fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(fd).toString() })
                    .then(() => { form.style.display = 'none'; document.getElementById('form-success').style.display = 'block'; })
                    .catch(() => { form.style.display = 'none'; document.getElementById('form-success').style.display = 'block'; });
          });
    }
}

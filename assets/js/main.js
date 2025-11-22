/*
  Bootstraps components, language switcher, tab handling and page includes.
  Functions:
   - loadComponent(targetSelector, url)
   - loadPage(name)
*/
async function loadComponent(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url);
    const html = await res.text();
    el.innerHTML = html;
  } catch (e) {
    console.error(`Failed to load component from ${url}:`, e);
    el.innerHTML = `<div class="text-red-600">Failed to load ${url}</div>`;
  }
}

async function loadPage(name) {
  const url = name === 'soups' ? 'pages/hot-soups.html' : 'pages/juices.html';
  const content = document.querySelector('#content-target');
  const res = await fetch(url);
  content.innerHTML = await res.text();
  // translate content after load (use selected language)
  const lang = document.querySelector('#lang').value;
  i18n.translate(lang);
  // refresh AOS if used
  if (window.AOS) AOS.refresh();
}

function setupTabs() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('bg-rose-100', 'text-rose-700'));
    btn.classList.add('bg-rose-100', 'text-rose-700');
    loadPage(btn.getAttribute('data-tab'));
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  // inject components
  await loadComponent('#header-target', 'components/header.html');
  await loadComponent('#nav-target', 'components/nav.html');
  await loadComponent('#footer-target', 'components/footer.html');

  // initial translations
  const langSelect = document.querySelector('#lang');
  const initialLang = langSelect.value || 'hi';
  i18n.translate(initialLang);

  // when language changes, re-translate and reload content titles
  langSelect.addEventListener('change', () => {
    const lang = langSelect.value;
    i18n.translate(lang);
    // reload the current page fragment so its texts update
    const active = document.querySelector('.tab-btn.bg-rose-100') || document.querySelector('.tab-btn[data-tab="soups"]');
    loadPage(active?.getAttribute('data-tab') || 'soups');
  });

  // initialize tabs & default page
  setupTabs();
  // mark soups tab active initially
  const firstTab = document.querySelector('.tab-btn[data-tab="soups"]');
  if (firstTab) firstTab.classList.add('bg-rose-100', 'text-rose-700');
  await loadPage('soups');

  // init AOS (optional)
  if (window.AOS) AOS.init({ duration: 600, once: true });
});
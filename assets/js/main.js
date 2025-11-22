/*
  Bootstraps components, language switcher, tab handling and page includes.
  Functions:
   - loadComponent(targetSelector, url)
   - loadPage(name)
*/
document.addEventListener('DOMContentLoaded', () => {
  // Ensure default tab is visible (soups)
  const firstTab = document.querySelector('.tab-btn[data-tab="soups"]');
  if (firstTab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('bg-green-100','text-green-700'));
    firstTab.classList.add('bg-green-100','text-green-700');
    // ARIA state
    document.querySelectorAll('.tab-btn').forEach(b => b.setAttribute('aria-selected','false'));
    firstTab.setAttribute('aria-selected','true');
  }
  document.querySelectorAll('[data-section]').forEach(s => s.style.display = 'none');
  const soups = document.querySelector('[data-section="soups"]');
  if (soups) soups.style.display = '';

  if (window.AOS) AOS.init({ duration: 600, once: true });
});

// Progressive reveal toggle for benefits lists (delegated)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.reveal-toggle');
  if (!btn) return;
  const selector = btn.getAttribute('data-target');
  const list = document.querySelector(selector);
  if (!list) return;
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    // collapse with animated max-height
    const fullHeight = list.scrollHeight;
    // set current height then force to collapsed height
    list.style.maxHeight = fullHeight + 'px';
    // compute collapsed height = height of first list item
    const firstLi = list.querySelector('li');
    const liStyle = firstLi ? getComputedStyle(firstLi) : null;
    const marginBottom = liStyle ? parseFloat(liStyle.marginBottom || 0) : 0;
    const collapsedHeight = firstLi ? (firstLi.offsetHeight + marginBottom) : 0;
    // trigger reflow
    /* eslint-disable no-unused-expressions */
    list.offsetHeight;
    list.style.maxHeight = collapsedHeight + 'px';
    list.classList.add('collapsed');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Show more';
  } else {
    // expand with animated max-height
    const fullHeight = list.scrollHeight;
    list.style.maxHeight = fullHeight + 'px';
    // after transition, clear max-height to allow content to resize naturally
    const onEnd = (ev) => {
      if (ev.target !== list) return;
      list.style.maxHeight = null;
      list.removeEventListener('transitionend', onEnd);
    };
    list.addEventListener('transitionend', onEnd);
    list.classList.remove('collapsed');
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = 'Show less';
  }
});

// Dismiss today's banner and persist choice per language
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.today-dismiss');
  if (!btn) return;
  const lang = document.documentElement.lang || (window.location.pathname.split('/')[1] || 'en');
  try { localStorage.setItem('todayDismissed-' + lang, '1'); } catch (err) {}
  const banner = btn.closest('.today-banner');
  if (banner) banner.remove();
});

// On load, hide banner if dismissed for this language
document.addEventListener('DOMContentLoaded', () => {
  const lang = document.documentElement.lang || (window.location.pathname.split('/')[1] || 'en');
  try {
    if (localStorage.getItem('todayDismissed-' + lang)){
      const banner = document.querySelector('.today-banner');
      if (banner) banner.remove();
    }
  } catch (err) {}
});

// Initialize collapsed lists to show only the first item (mobile-first behavior)
function initCollapsedBenefits(){
  document.querySelectorAll('.benefits.collapsed').forEach(list => {
    const firstLi = list.querySelector('li');
    if (!firstLi) return;
    const liStyle = getComputedStyle(firstLi);
    const marginBottom = parseFloat(liStyle.marginBottom || 0);
    const collapsedHeight = firstLi.offsetHeight + marginBottom;
    list.style.maxHeight = collapsedHeight + 'px';
  });
}

document.addEventListener('DOMContentLoaded', initCollapsedBenefits);
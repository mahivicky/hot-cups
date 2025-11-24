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
  // debug: log juice toggle count
  try { console.debug('main.js loaded, juice-toggle count:', document.querySelectorAll('.juice-toggle').length); } catch (e) {}
});

// Progressive reveal toggle for benefits lists (delegated)
document.addEventListener("click", (event) => {
  const target = event.target;

  // ----------------------------
  // 1. BENEFITS REVEAL TOGGLE
  // ----------------------------
  const revealBtn = target.closest(".reveal-toggle");
  if (revealBtn) {
    event.stopPropagation();          // prevent juice toggle handler
    handleRevealToggle(revealBtn);
    return;
  }

  // ----------------------------
  // 2. JUICE DESCRIPTION TOGGLE
  // ----------------------------
  const juiceBtn = target.closest(".juice-toggle");
  if (juiceBtn) {
    event.stopPropagation();          // prevent reveal handler
    handleJuiceToggle(juiceBtn);
    return;
  }

  // ----------------------------
  // 3. DISMISS TODAY’S BANNER
  // ----------------------------
  const dismissBtn = target.closest(".today-dismiss");
  if (dismissBtn) {
    handleDismissBanner(dismissBtn);
    return;
  }
});

function handleRevealToggle(btn) {
  const selector = btn.getAttribute("data-target");
  const list =
    selector?.startsWith("#")
      ? document.getElementById(selector.slice(1))
      : document.querySelector(selector);

  if (!list) return;

  const expanded = btn.getAttribute("aria-expanded") === "true";

  if (expanded) {
    // Collapse
    const fullHeight = list.scrollHeight;
    list.style.maxHeight = fullHeight + "px";

    // compute collapsed height
    const firstLi = list.querySelector("li");
    const mb = firstLi ? parseFloat(getComputedStyle(firstLi).marginBottom) : 0;
    const collapsedHeight = firstLi ? firstLi.offsetHeight + mb : 0;

    list.offsetHeight; // reflow
    list.style.maxHeight = collapsedHeight + "px";
    list.classList.add("collapsed");

    btn.setAttribute("aria-expanded", "false");
    btn.textContent = "Show more";
  } else {
    // Expand
    const fullHeight = list.scrollHeight;
    list.style.maxHeight = fullHeight + "px";

    const onEnd = (ev) => {
      console.log('Benefits list expanded, resetting maxHeight');
      if (ev.target === list) {
        console.log('Benefits list expanded, resetting maxHeight');
        // list.style.maxHeight = null;
        list.removeEventListener("transitionend", onEnd);
      }
    };
    list.addEventListener("transitionend", onEnd);

    list.classList.remove("collapsed");
    btn.setAttribute("aria-expanded", "true");
    btn.textContent = "Show less";
  }
}

function handleDismissBanner(btn) {
  const lang =
    document.documentElement.lang ||
    window.location.pathname.split("/")[1] ||
    "en";

  try {
    localStorage.setItem("todayDismissed-" + lang, "1");
  } catch (err) {}

  const banner = btn.closest(".today-banner");
  if (banner) banner.remove();
}

function handleJuiceToggle(btn) {
  const selector = btn.getAttribute("data-target");
  const panel =
    selector?.startsWith("#")
      ? document.getElementById(selector.slice(1))
      : document.querySelector(selector);

  if (!panel) return;

  const expanded = btn.getAttribute("aria-expanded") === "true";

  if (expanded) {
    // Collapse
    const full = panel.scrollHeight;
    panel.style.maxHeight = full + "px";
    panel.offsetHeight;
    panel.style.maxHeight = "0px";

    const onEnd = (ev) => {
      if (ev.target === panel) {
        panel.style.maxHeight = null;
        if (!panel.classList.contains("max-h-0")) panel.classList.add("max-h-0");
        panel.addEventListener("transitionend", onEnd);
      }
    };
    panel.addEventListener("transitionend", onEnd);

    btn.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
    btn.textContent = "▾";
  } else {
    // Expand
    const full = panel.scrollHeight;
    panel.style.maxHeight = full + "px";

    const onEnd = (ev) => {
      if (ev.target === panel) {
        panel.style.maxHeight = null;
        if (panel.classList.contains("max-h-0")) panel.classList.remove("max-h-0");
        panel.removeEventListener("transitionend", onEnd);
      }
    };
    panel.addEventListener("transitionend", onEnd);

    btn.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
    btn.textContent = "▴";
  }
}

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

function expandSection(el) {
  el.classList.remove('collapsed');

  // Step 1: fix the element at the collapsed height
  let startHeight = el.offsetHeight;

  // Step 2: set max-height explicitly so no transition occurs yet
  el.style.maxHeight = startHeight + 'px';

  // Force reflow
  el.offsetHeight;

  // Step 3: animate to full height
  let endHeight = el.scrollHeight;
  el.style.maxHeight = endHeight + 'px';

  // Step 4: after transition, clear max-height safely
  el.addEventListener('transitionend', function onEnd(ev) {
    if (ev.target === el) {
      el.style.maxHeight = null;
      el.removeEventListener('transitionend', onEnd);
    }
  });
}


(() => {
  let debounceTimer   = null;
  let rafId           = null;
  let cachedContainer = null;
  let lastMsgCount    = 0;

  /* ── Scroll container ─────────────────────────────────────── */
  function findScrollContainer() {
    if (cachedContainer && document.body.contains(cachedContainer)) return cachedContainer;

    const seed = document.querySelector('[data-message-author-role="user"]');
    if (!seed) return null;

    let el = seed.parentElement;
    while (el && el !== document.body) {
      const { overflowY } = getComputedStyle(el);
      if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
        cachedContainer = el;
        return el;
      }
      el = el.parentElement;
    }
    cachedContainer = document.documentElement;
    return cachedContainer;
  }

  /* ── True offset relative to a container ─────────────────── */
  function offsetFromContainer(el, container) {
    let top = 0;
    let node = el;
    while (node && node !== container) {
      top += node.offsetTop;
      node = node.offsetParent;
    }
    return top;
  }

  /* ── Build markers ────────────────────────────────────────── */
  function createMarkers() {
    const messages = document.querySelectorAll('[data-message-author-role="user"]');
    if (messages.length === 0) return;

    // Skip rebuild if nothing new arrived
    if (messages.length === lastMsgCount && document.querySelector('.cgpt-rail')) return;
    lastMsgCount = messages.length;

    // Tear down old UI
    document.querySelector('.cgpt-rail')?.remove();
    document.querySelector('.cgpt-preview')?.remove();

    const container = findScrollContainer();
    if (!container) return;

    /* Rail */
    const rail = document.createElement('div');
    rail.className = 'cgpt-rail';
    document.body.appendChild(rail);

    /* Tooltip */
    const preview = document.createElement('div');
    preview.className = 'cgpt-preview';
    document.body.appendChild(preview);

    /* Line connector */
    const line = document.createElement('div');
    line.className = 'cgpt-line';
    rail.appendChild(line);

    /* Positions */
    const offsets = Array.from(messages).map(m => offsetFromContainer(m, container));
    const min   = offsets[0];
    const max   = offsets[offsets.length - 1];
    const span  = max - min || 1;
    const PAD   = 4;
    const RANGE = 100 - PAD * 2;

    messages.forEach((msg, i) => {
      const pct = PAD + ((offsets[i] - min) / span) * RANGE;

      const dot = document.createElement('div');
      dot.className = 'cgpt-dot';
      dot.style.top = `${pct}%`;
      dot.setAttribute('data-index', i + 1);

      /* Hover — show preview */
      dot.addEventListener('mouseenter', () => {
        const text = msg.innerText.trim().slice(0, 140) || '(empty)';
        preview.innerHTML =
          `<span class="cgpt-preview-num">Q${i + 1}</span>${text}`;
        preview.style.display = 'block';

        const { top: dt } = dot.getBoundingClientRect();
        const ph = preview.offsetHeight || 76;
        const ty = Math.max(8, Math.min(dt - ph / 2, window.innerHeight - ph - 8));
        preview.style.top = `${ty}px`;
      });

      dot.addEventListener('mouseleave', () => {
        preview.style.display = 'none';
      });

      /* Click — scroll to message */
      dot.addEventListener('click', () => {
        const target = offsets[i] - container.clientHeight / 2 + msg.offsetHeight / 2;
        container.scrollTo({ top: target, behavior: 'smooth' });

        msg.classList.add('cgpt-highlight');
        setTimeout(() => msg.classList.remove('cgpt-highlight'), 2000);
      });

      rail.appendChild(dot);
    });

    /* Position the connector line between first and last dot */
    const firstDot = rail.querySelector('.cgpt-dot');
    const lastDot  = rail.querySelectorAll('.cgpt-dot');
    if (firstDot && lastDot.length > 1) {
      line.style.top    = `${PAD}%`;
      line.style.bottom = `${PAD}%`;
    }
  }

  /* ── Debounce via rAF ─────────────────────────────────────── */
  function scheduleUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(createMarkers);
    }, 600);
  }

  /* ── MutationObserver ─────────────────────────────────────── */
  const IGNORE = new Set(['cgpt-rail', 'cgpt-preview', 'cgpt-dot', 'cgpt-line', 'cgpt-highlight']);

  new MutationObserver(mutations => {
    const relevant = mutations.some(m =>
      [...m.addedNodes].some(n => n.nodeType === 1 && !IGNORE.has(n.className))
    );
    if (relevant) scheduleUpdate();
  }).observe(document.body, { childList: true, subtree: true });

  /* ── Bootstrap ────────────────────────────────────────────── */
  setTimeout(createMarkers, 1800);
})();

(() => {
  let debounceTimer = null;
  let messages = [];
  let isScrolling = false;

  /* ── Get ChatGPT user messages ────────────────────────────── */
  function getUserMessages() {
    return document.querySelectorAll('[data-message-author-role="user"]');
  }

  /* ── Refresh messages array ───────────────────────────────– */
  function refreshMessages() {
    const userMessages = getUserMessages();
    
    messages = Array.from(userMessages).map((msg, idx) => ({
      id: idx,
      number: idx + 1,
      text: msg.innerText.trim().slice(0, 100),
      element: msg
    }));

    return messages;
  }

  /* ── Scroll to message with proper detection ──────────────── */
  function scrollToMessage(msgIndex) {
    if (msgIndex < 0 || msgIndex >= messages.length) return;

    isScrolling = true;
    const msg = messages[msgIndex].element;
    
    if (!msg || !msg.parentElement) {
      console.warn('[Prompt Marks] Message element not found');
      isScrolling = false;
      return;
    }

    // Use scrollIntoView for reliable scrolling (ChatGPT optimized)
    msg.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Highlight message after scroll completes
    setTimeout(() => {
      msg.classList.add('prompt-marks-highlight');
      setTimeout(() => {
        msg.classList.remove('prompt-marks-highlight');
        isScrolling = false;
      }, 2000);
    }, 600);
  }

  /* ── Update popup list with fresh messages ─────────────────– */
  function updatePopupList() {
    const popup = document.querySelector('.prompt-marks-popup');
    if (!popup) return;

    refreshMessages();

    const listContainer = popup.querySelector('.prompt-marks-list');
    const footer = popup.querySelector('.prompt-marks-footer');

    if (listContainer && messages.length > 0) {
      listContainer.innerHTML = messages.map(msg => `
        <div class="prompt-marks-item" data-id="${msg.id}">
          <span class="prompt-marks-number">Q${msg.number}</span>
          <span class="prompt-marks-text">${msg.text}${msg.text.length === 100 ? '...' : ''}</span>
        </div>
      `).join('');

      // Attach click handlers
      listContainer.querySelectorAll('.prompt-marks-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = parseInt(item.dataset.id);
          scrollToMessage(id);
        });
      });
    }

    // Update count
    if (footer) {
      footer.querySelector('.prompt-marks-count').textContent = 
        `${messages.length} message${messages.length !== 1 ? 's' : ''}`;
    }
  }

  /* ── Create popup UI (only once) ───────────────────────────– */
  function createPopup() {
    let popup = document.querySelector('.prompt-marks-popup');
    
    if (popup) {
      // Toggle existing popup
      popup.classList.toggle('active');
      if (popup.classList.contains('active')) {
        updatePopupList();
      }
      return;
    }

    // Create new popup
    popup = document.createElement('div');
    popup.className = 'prompt-marks-popup';

    const header = document.createElement('div');
    header.className = 'prompt-marks-header';
    header.innerHTML = `
      <h3>📝 Sent Messages</h3>
      <button class="prompt-marks-close" title="Close">✕</button>
    `;

    const listContainer = document.createElement('div');
    listContainer.className = 'prompt-marks-list';

    const footer = document.createElement('div');
    footer.className = 'prompt-marks-footer';
    footer.innerHTML = `<span class="prompt-marks-count">0 messages</span>`;

    popup.appendChild(header);
    popup.appendChild(listContainer);
    popup.appendChild(footer);

    // Prevent popup from affecting page scroll
    popup.addEventListener('wheel', (e) => {
      const isListScrollable = 
        listContainer.scrollHeight > listContainer.clientHeight;
      if (!isListScrollable) {
        e.preventDefault();
      }
    }, { passive: false });

    document.body.appendChild(popup);

    // Close button
    header.querySelector('.prompt-marks-close').addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.remove('active');
    });

    // Prevent clicks inside popup from bubbling
    popup.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Open popup with messages
    popup.classList.add('active');
    updatePopupList();
  }

  /* ── Create floating button ───────────────────────────────── */
  function createButton() {
    let btn = document.querySelector('.prompt-marks-btn');
    if (btn) return;

    btn = document.createElement('button');
    btn.className = 'prompt-marks-btn';
    btn.title = 'Open message list';
    btn.innerHTML = '💬';

    // Prevent button click from scrolling or bubbling
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      createPopup();
    });

    document.body.appendChild(btn);
  }

  /* ── Schedule updates on new messages ──────────────────────– */
  function scheduleUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      // Only update if popup is open
      const popup = document.querySelector('.prompt-marks-popup');
      if (popup && popup.classList.contains('active')) {
        updatePopupList();
      }
    }, 500);
  }

  /* ── MutationObserver for new messages ──────────────────────– */
  const IGNORE = new Set(['prompt-marks-popup', 'prompt-marks-btn', 'prompt-marks-highlight']);

  new MutationObserver(mutations => {
    // Only check for new user messages being added
    const hasNewMessages = mutations.some(m => {
      return [...m.addedNodes].some(n => {
        if (n.nodeType !== 1) return false;
        return !IGNORE.has(n.className) && 
               n.getAttribute && 
               n.getAttribute('data-message-author-role') === 'user';
      });
    });

    if (hasNewMessages && !isScrolling) {
      scheduleUpdate();
    }
  }).observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: false,
    characterData: false
  });

  /* ── Bootstrap: Initialize extension ──────────────────────– */
  function bootstrap() {
    try {
      // Wait for ChatGPT to load messages
      const checkInterval = setInterval(() => {
        const userMsg = document.querySelector('[data-message-author-role="user"]');
        if (userMsg) {
          clearInterval(checkInterval);
          createButton();
          refreshMessages();
        }
      }, 200);

      // Timeout after 10 seconds
      setTimeout(() => clearInterval(checkInterval), 10000);
    } catch (e) {
      console.warn('[Prompt Marks] Bootstrap error:', e);
    }
  }

  // Start after a brief delay
  setTimeout(bootstrap, 500);
})();

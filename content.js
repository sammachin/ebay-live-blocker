// eBay Live Blocker - Content Script
// Hides all "Live" shopping/auction content from eBay pages

const LIVE_SELECTORS = [
  // eBay Live module containers
  '[data-module-name*="live"]',
  '[data-module-name*="Live"]',
  '[class*="live-"]',
  '[class*="-live"]',
  '[class*="ebaylive"]',
  '[class*="eBayLive"]',
  '[id*="live-"]',
  '[id*="-live"]',

  // Section/card based selectors
  '.ebay-live',
  '.live-shopping',
  '.live-auctions',
  '.live-stream',

  // Aria / data attribute hints
  '[aria-label*="live" i]',
  '[data-testid*="live" i]',
];

// Text patterns to match section headings / labels
const LIVE_TEXT_PATTERNS = [
  /\bebay\s+live\b/i,
  /\blive\s+shopping\b/i,
  /\blive\s+auction/i,
  /\bshop\s+live\b/i,
  /\bwatch\s+live\b/i,
];

// How far up the DOM to walk when removing a text-matched element
const MAX_ANCESTOR_DEPTH = 6;

function hideElement(el) {
  if (el && el.style) {
    el.style.setProperty('display', 'none', 'important');
    el.setAttribute('data-live-blocker-hidden', '1');
  }
}

// Walk up the tree to find a sensible section-level container to hide
function findSectionAncestor(el) {
  const SECTION_TAGS = new Set(['SECTION', 'ARTICLE', 'ASIDE', 'LI', 'DIV']);
  let node = el;
  for (let i = 0; i < MAX_ANCESTOR_DEPTH; i++) {
    const parent = node.parentElement;
    if (!parent || parent === document.body) break;
    // Stop if parent contains a lot of text (we'd hide too much)
    const directText = [...parent.childNodes]
      .filter(n => n.nodeType === Node.TEXT_NODE)
      .map(n => n.textContent.trim())
      .join('');
    if (directText.length > 100) break;
    node = parent;
    if (SECTION_TAGS.has(node.tagName)) break;
  }
  return node;
}

function runBlocker() {
  // 1. Selector-based hiding
  LIVE_SELECTORS.forEach(selector => {
    try {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.getAttribute('data-live-blocker-hidden')) {
          hideElement(el);
        }
      });
    } catch (_) {}
  });

  // 2. Text-based hiding — find headings/labels that mention "Live"
  const candidates = document.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, [class*="title"], [class*="heading"], [class*="label"], span, a'
  );

  candidates.forEach(el => {
    if (el.getAttribute('data-live-blocker-hidden')) return;
    const text = el.textContent.trim();
    if (LIVE_TEXT_PATTERNS.some(re => re.test(text))) {
      const section = findSectionAncestor(el);
      hideElement(section);
    }
  });
}

// Run immediately on load
runBlocker();

// Re-run when eBay lazy-loads content into the page
const observer = new MutationObserver(() => runBlocker());
observer.observe(document.body, { childList: true, subtree: true });

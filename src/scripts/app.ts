/* Client-side enhancements. Everything here is progressive: the page is fully
   readable and navigable with this script disabled. */

const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

/* ---------------------------------------------------------------- toast */
let toastTimer: number | undefined;
function toast(message: string): void {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el?.classList.remove('show'), 1900);
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for non-secure contexts.
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }
}

/* ---------------------------------------------------------------- theme */
function setupTheme(): void {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const root = document.documentElement;

  const resolved = (): 'light' | 'dark' => {
    const attr = root.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const reflect = (): void => {
    const r = resolved();
    btn.setAttribute('data-resolved', r);
    btn.setAttribute(
      'aria-label',
      r === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  };
  reflect();

  btn.addEventListener('click', () => {
    const next = resolved() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore */
    }
    reflect();
  });
}

/* ------------------------------------------------------- nav / scrollspy */
function setupNav(): void {
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const progress = document.getElementById('scroll-progress');
  const navLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('a[data-navlink]')
  );

  // sticky shadow + progress bar
  let ticking = false;
  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      nav?.setAttribute('data-scrolled', String(y > 8));
      if (progress) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = h > 0 ? Math.min(y / h, 1) : 0;
        progress.style.transform = `scaleX(${ratio})`;
      }
      ticking = false;
    });
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // mobile menu
  const closeMenu = (): void => {
    links?.setAttribute('data-open', 'false');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open menu');
  };
  toggle?.addEventListener('click', () => {
    const open = links?.getAttribute('data-open') === 'true';
    links?.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  });
  navLinks.forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (e) => {
    if (
      links?.getAttribute('data-open') === 'true' &&
      !links.contains(e.target as Node) &&
      !toggle?.contains(e.target as Node)
    ) {
      closeMenu();
    }
  });

  // scroll spy
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href') ?? ''))
    .filter((s): s is Element => s !== null);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((a) =>
            a.setAttribute(
              'aria-current',
              a.getAttribute('href') === `#${id}` ? 'true' : 'false'
            )
          );
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }
}

/* -------------------------------------------------------- hero rotator */
function setupRotator(): void {
  const el = document.getElementById('hero-rotator');
  if (!el || reduceMotion) return;
  let phrases: string[] = [];
  try {
    phrases = JSON.parse(el.dataset.rotate ?? '[]');
  } catch {
    return;
  }
  if (phrases.length < 2) return;

  let i = 0; // currently shown phrase (DOM already shows phrases[0])
  const typePause = 2400;
  const eraseSpeed = 28;
  const typeSpeed = 48;

  const erase = (): void => {
    const text = el.textContent ?? '';
    if (text.length === 0) {
      i = (i + 1) % phrases.length;
      type();
      return;
    }
    el.textContent = text.slice(0, -1);
    window.setTimeout(erase, eraseSpeed);
  };
  const type = (): void => {
    const target = phrases[i] ?? '';
    const text = el.textContent ?? '';
    if (text === target) {
      window.setTimeout(erase, typePause);
      return;
    }
    el.textContent = target.slice(0, text.length + 1);
    window.setTimeout(type, typeSpeed);
  };

  window.setTimeout(erase, typePause);
}

/* ----------------------------------------------------- copy-to-clipboard */
function setupCopyButtons(): void {
  document
    .querySelectorAll<HTMLElement>('[data-copy]')
    .forEach((btn) =>
      btn.addEventListener('click', async () => {
        const ok = await copyText(btn.dataset.copy ?? '');
        toast(ok ? btn.dataset.copyLabel ?? 'Copied!' : 'Copy failed');
      })
    );
}

/* ---------------------------------------------------------- publications */
function setupFilters(): void {
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('.filter[data-filter]')
  );
  if (!buttons.length) return;
  const pubs = Array.from(document.querySelectorAll<HTMLElement>('.pub'));
  const groups = Array.from(document.querySelectorAll<HTMLElement>('.pub-group'));
  const empty = document.getElementById('pub-empty');

  const apply = (filter: string): void => {
    let visible = 0;
    pubs.forEach((pub) => {
      const match =
        filter === 'all' ||
        pub.dataset.type === filter ||
        pub.dataset.status === filter;
      pub.classList.toggle('is-hidden', !match);
      if (match) visible++;
    });
    groups.forEach((g) => {
      const any = g.querySelector('.pub:not(.is-hidden)');
      g.style.display = any ? '' : 'none';
    });
    if (empty) empty.hidden = visible !== 0;
  };

  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      buttons.forEach((b) =>
        b.setAttribute('aria-pressed', String(b === btn))
      );
      apply(btn.dataset.filter ?? 'all');
    })
  );
}

/* ------------------------------------------------------------ cite dialog */
function setupCite(): void {
  const dialog = document.getElementById('cite-dialog') as HTMLDialogElement | null;
  const pre = document.getElementById('cite-pre');
  const copyBtn = document.getElementById('cite-copy');
  const closeBtn = document.getElementById('cite-close');
  if (!dialog || !pre || typeof dialog.showModal !== 'function') return;

  document.querySelectorAll<HTMLElement>('.cite-btn').forEach((btn) =>
    btn.addEventListener('click', () => {
      pre.textContent = btn.dataset.bibtex ?? '';
      dialog.showModal();
    })
  );
  copyBtn?.addEventListener('click', async () => {
    const ok = await copyText(pre.textContent ?? '');
    toast(ok ? 'BibTeX copied!' : 'Copy failed');
  });
  closeBtn?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
}

/* ------------------------------------------------------- scroll reveal */
function setupReveal(): void {
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const els = document.querySelectorAll<HTMLElement>('.section .reveal');
  if (!els.length) return;
  try {
    // Hide them only now that we know JS + IO are available.
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
  } catch {
    // Anything goes wrong → reveal everything.
    document.documentElement.classList.remove('js-reveal');
  }
}

/* ---------------------------------------------------------- easter egg */
function consoleEgg(): void {
  const style =
    'color:#ef5630;font-family:monospace;font-size:13px;font-weight:bold';
  // eslint-disable-next-line no-console
  console.log('%c👋 Hi, fellow hardware nerd.', style);
  // eslint-disable-next-line no-console
  console.log(
    '%cBuilding an open-source GPU from scratch. Say hi: sp839@snu.edu.in',
    'color:#888;font-family:monospace'
  );
}

/* ------------------------------------------------------------------ boot */
function boot(): void {
  setupTheme();
  setupNav();
  setupRotator();
  setupCopyButtons();
  setupFilters();
  setupCite();
  setupReveal();
  consoleEgg();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

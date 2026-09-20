(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  function setMenu(open) {
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    links?.classList.toggle('open', open);
  }
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  links?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav')) setMenu(false);
  });
  window.matchMedia('(min-width: 701px)').addEventListener('change', event => {
    if (event.matches) setMenu(false);
  });
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
  const config = window.PORTFOLIO_CONFIG || {};
  function publicURL(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value.trim());
      return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
    } catch { return null; }
  }
  function connectProfile(id, label, href, detail) {
    const placeholder = document.getElementById(id);
    if (!placeholder || !href) return;
    const anchor = document.createElement('a');
    anchor.className = 'contact-placeholder contact-active';
    anchor.id = id;
    anchor.href = href;
    const name = document.createElement('span');
    name.textContent = label;
    const caption = document.createElement('span');
    caption.textContent = detail;
    anchor.append(name, caption);
    placeholder.replaceWith(anchor);
  }
  connectProfile('linkedin-link', 'LinkedIn', publicURL(config.linkedin), 'View profile ↗');
  connectProfile('github-link', 'GitHub', publicURL(config.github), 'Explore projects ↗');
  const email = typeof config.email === 'string' ? config.email.trim() : '';
  if (/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email)) {
    connectProfile('email-link', 'Email', 'mailto:' + email, 'Get in touch ↗');
  }
  const demoURL = publicURL(config.demo?.url);
  if (demoURL) {
    const slot = document.getElementById('demo-link-slot');
    const title = document.getElementById('demo-title');
    const description = document.getElementById('demo-description');
    if (config.demo.title && title) title.textContent = config.demo.title;
    if (config.demo.description && description) description.textContent = config.demo.description;
    if (slot) {
      const link = document.createElement('a');
      link.className = 'demo-link';
      link.href = demoURL;
      link.textContent = 'Open project demo ↗';
      slot.replaceChildren(link);
      document.getElementById('demo-status').textContent = 'Explore demo';
      document.getElementById('demo-project').classList.remove('future');
    }
  }
})();

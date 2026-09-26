(() => {
  const menu = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menu && mobileNav) menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    mobileNav.hidden = open;
    menu.textContent = open ? '☰' : '×';
  });

  const grid = document.getElementById('hero-grid');
  if (!grid) return;
  const search = document.getElementById('hero-search');
  const empty = document.getElementById('empty-state');
  let activeFilter = 'all';
  const card = h => `<a class="hero-card" href="/heroes/${h.id}/" data-search="${[h.name,h.role,h.lead,...h.events.map(e=>e.text)].join(' ').toLowerCase()}">
    <div class="portrait portrait-${h.id}" role="img" aria-label="Мемориальная рамка: ${h.name}"><span>${h.initials}</span><small>${h.years}<br>портрет будет добавлен</small></div>
    <div class="card-body"><span class="card-badge">${h.badge}</span><h3>${h.name}</h3><p class="card-meta">${h.years} · ${h.role}</p><p>${h.lead}</p><span class="card-link">Открыть историю <b>↗</b></span></div>
  </a>`;
  function render() {
    const q = search.value.trim().toLowerCase();
    const items = HEROES.filter(h => (activeFilter === 'all' || h.connection.includes(activeFilter)) && (!q || [h.name,h.role,h.lead,...h.events.map(e=>e.text)].join(' ').toLowerCase().includes(q)));
    grid.innerHTML = items.map(card).join('');
    empty.hidden = items.length > 0;
  }
  search.addEventListener('input', render);
  document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); activeFilter = btn.dataset.filter; render();
  }));
  render();
})();

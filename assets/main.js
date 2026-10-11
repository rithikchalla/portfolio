(() => {
  const S = window.SITE;
  const $ = (s) => document.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- background: data packets flowing between nodes ---------- */
  const cv = $('#bg'), ctx = cv.getContext('2d');
  let W, H, nodes = [], packets = [];
  const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  function resize() {
    const d = devicePixelRatio || 1;
    W = cv.width = innerWidth * d; H = cv.height = innerHeight * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.min(70, Math.floor(innerWidth * innerHeight / 22000));
    nodes = Array.from({ length: n }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25
    }));
    packets = [];
  }
  const mouse = { x: -999, y: -999 };
  addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  function draw() {
    const a = css('--a'), b = css('--b'), line = css('--line');
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > innerWidth) n.vx *= -1;
      if (n.y < 0 || n.y > innerHeight) n.vy *= -1;
      const dx = n.x - mouse.x, dy = n.y - mouse.y, dist = Math.hypot(dx, dy);
      if (dist < 140) { n.x += dx / dist * 1.2; n.y += dy / dist * 1.2; }
    }
    const links = [];
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < 150) { links.push([i, j]); ctx.strokeStyle = line; ctx.globalAlpha = 1 - d / 150; ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke(); }
    }
    ctx.globalAlpha = 1;
    if (links.length && Math.random() < .08 && packets.length < 40) {
      const l = links[Math.floor(Math.random() * links.length)];
      packets.push({ l, t: 0, c: Math.random() < .5 ? a : b });
    }
    packets = packets.filter((p) => (p.t += .02) < 1);
    for (const p of packets) {
      const A = nodes[p.l[0]], B = nodes[p.l[1]];
      ctx.fillStyle = p.c; ctx.shadowColor = p.c; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(A.x + (B.x - A.x) * p.t, A.y + (B.y - A.y) * p.t, 2.6, 0, 7); ctx.fill();
    }
    ctx.shadowBlur = 0; ctx.fillStyle = line;
    for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, 2, 0, 7); ctx.fill(); }
    if (!reduce) requestAnimationFrame(draw);
  }
  addEventListener('resize', resize);
  resize(); draw();

  /* ---------- typewriter ---------- */
  const t = $('#typed');
  if (reduce) t.textContent = S.roles[0];
  else {
    let r = 0, c = 0, del = false;
    (function tick() {
      const w = S.roles[r];
      t.textContent = w.slice(0, c);
      if (!del && c === w.length) { del = true; return setTimeout(tick, 1400); }
      if (del && c === 0) { del = false; r = (r + 1) % S.roles.length; }
      c += del ? -1 : 1;
      setTimeout(tick, del ? 28 : 55);
    })();
  }

  /* ---------- scroll progress + reveal ---------- */
  const prog = $('#progress');
  addEventListener('scroll', () => {
    const h = document.documentElement;
    prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  }, { passive: true });

  let barsDone = false;
  function fillBars() { document.querySelectorAll('.fill').forEach((f) => f.style.width = f.dataset.w + '%'); }
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.id === 'skills' && !barsDone) { barsDone = true; setTimeout(fillBars, 250); }
    if (e.target.id === 'terminal') typeTerminal();
    io.unobserve(e.target);
  }), { threshold: .15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---------- counters ---------- */
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '';
    const fmt = (v) => (end >= 1000 ? v.toLocaleString() : v) + suf;
    if (reduce) return (el.textContent = fmt(end));
    const t0 = performance.now();
    (function step(now) {
      const p = Math.min(1, (now - t0) / 1800);
      el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  });

  /* ---------- skills ---------- */
  const filters = $('#filters'), chips = $('#chips'), bars = $('#bars');
  function renderSkills(cat) {
    const list = S.skills.filter((s) => cat === 'All' || s.cat === cat);
    chips.innerHTML = list.map((s, i) => `<span class="chip" style="animation-delay:${i * 40}ms">${s.name}</span>`).join('');
    bars.innerHTML = list.map((s) => `<div class="bar-row"><div class="top"><span>${s.name}</span><span>${s.level}%</span></div><div class="track"><div class="fill" data-w="${s.level}"></div></div></div>`).join('');
    if (barsDone) requestAnimationFrame(() => requestAnimationFrame(fillBars));
  }
  S.categories.forEach((c, i) => {
    const b = document.createElement('button');
    b.textContent = c; if (!i) b.className = 'on';
    b.onclick = () => { filters.querySelectorAll('button').forEach((x) => x.classList.remove('on')); b.classList.add('on'); renderSkills(c); };
    filters.appendChild(b);
  });
  renderSkills('All');

  /* ---------- project cards with tilt + spotlight ---------- */
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  $('#grid').innerHTML = S.projects.map((p) => `
    <a class="card" href="${esc(p.url)}" target="_blank" rel="noopener">
      <span class="tag">// ${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
      <div class="stack">${p.stack.map((x) => `<span>${esc(x)}</span>`).join('')}</div>
      <span class="go">View on GitHub →</span>
    </a>`).join('');
  if (!reduce) document.querySelectorAll('.card').forEach((c) => {
    c.addEventListener('mousemove', (e) => {
      const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      c.style.setProperty('--mx', x + 'px'); c.style.setProperty('--my', y + 'px');
      c.style.transform = `rotateX(${(.5 - y / r.height) * 8}deg) rotateY(${(x / r.width - .5) * 8}deg) translateY(-4px)`;
    });
    c.addEventListener('mouseleave', () => (c.style.transform = ''));
  });

  /* ---------- terminal ---------- */
  let typed = false;
  function typeTerminal() {
    if (typed) return; typed = true;
    const pre = $('#term');
    if (reduce) { pre.textContent = S.terminal.join('\n'); return; }
    let li = 0, ci = 0, html = '';
    (function tick() {
      if (li >= S.terminal.length) return;
      const line = S.terminal[li], cmd = line.startsWith('$');
      ci++;
      pre.innerHTML = html + `<span class="${cmd ? 'cmd' : 'out'}">${esc(line.slice(0, ci))}</span>`;
      if (ci >= line.length) { html += `<span class="${cmd ? 'cmd' : 'out'}">${esc(line)}</span>\n`; li++; ci = 0; return setTimeout(tick, cmd ? 350 : 200); }
      setTimeout(tick, cmd ? 45 : 12);
    })();
  }

  $('#year').textContent = new Date().getFullYear();
})();

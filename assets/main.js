(() => {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
  const onView = (el, fn, threshold = .25) => new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { o.disconnect(); fn(); } }), { threshold }).observe(el);

  /* ---------- cursor ---------- */
  const cur = $('#cursor');
  if (fine) {
    let x = 0, y = 0, tx = 0, ty = 0;
    addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      const dx = tx - x; x += dx * .25; y += (ty - y) * .25;
      cur.style.transform = `translate(${x}px,${y}px)`;
      cur.firstElementChild.style.setProperty('--rot', clamp(dx, -25, 25) + 'deg');
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', (e) => {
      const card = e.target.closest('.card'), drag = e.target.closest('.onode,.stage3d');
      const hot = e.target.closest('a,button,.row');
      cur.classList.toggle('big', !!(card || drag));
      cur.firstElementChild.textContent = card ? 'OPEN' : drag ? 'DRAG' : '';
      cur.firstElementChild.style.background = hot && !card ? 'var(--tomato)' : '';
    });
  }

  /* ---------- hero name: letters dodge the cursor ---------- */
  const letters = [];
  $$('#name .nm').forEach((row, ri) => {
    [...row.dataset.t].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'ch'; s.textContent = ch; row.appendChild(s); letters.push(s);
      if (!reduce) s.animate(
        [{ transform: 'translateY(-130%) rotate(-25deg)', opacity: 0 }, { transform: 'translateY(8%) rotate(4deg)', opacity: 1, offset: .7 }, { transform: 'none', opacity: 1 }],
        { duration: 700, delay: 150 + i * 70 + ri * 300, easing: 'cubic-bezier(.3,1.3,.4,1)', fill: 'backwards' });
    });
  });
  const hl = $('.hero-l');
  if (!reduce && fine) {
    let mx = -999, my = -999, raf = 0;
    const apply = () => {
      raf = 0;
      for (const l of letters) {
        const r = l.getBoundingClientRect(), dx = r.left + r.width / 2 - mx, dy = r.top + r.height / 2 - my, d = Math.hypot(dx, dy) || 1, R = 170;
        l.style.transform = d < R ? `translate(${dx / d * (R - d) / R * 60}px,${dy / d * (R - d) / R * 44}px) rotate(${dx / d * (R - d) / R * 26}deg)` : '';
      }
    };
    hl.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(apply); });
    hl.addEventListener('mouseleave', () => { mx = my = -999; apply(); });
  }

  /* ---------- typed roles ---------- */
  const typed = $('#typed');
  if (reduce) typed.textContent = S.roles[0];
  else {
    let r = 0, c = 0, del = false;
    (function tick() {
      const w = S.roles[r]; typed.textContent = w.slice(0, c);
      if (!del && c === w.length) { del = true; return setTimeout(tick, 1600); }
      if (del && c === 0) { del = false; r = (r + 1) % S.roles.length; }
      c += del ? -1 : 1; setTimeout(tick, del ? 25 : 55);
    })();
  }

  /* ---------- marquee ---------- */
  $$('[data-mq]').forEach((el) => {
    const html = ['Apache Spark', 'Apache Iceberg', 'Lakehouse', 'BigQuery', 'Palantir Foundry', 'Ontology', 'AI Agents', 'RAG', 'dbt', 'Python', 'SQL']
      .map((w) => `<span>${esc(w)}</span>`).join('');
    el.innerHTML = html + html;
  });

  /* ---------- pipeline conveyor ---------- */
  const n = S.stations.length, pos = (i) => 6 + i * (88 / (n - 1));
  $('#stations').innerHTML = S.stations.map((s, i) => `<div class="st" style="--p:${pos(i)}%"><b>${i + 1}</b><span>${esc(s.name)}</span></div>`).join('');
  const pipe = $('#pipeline'), box = $('#box'), fill = $('#line-fill'), sts = $$('.st');
  const pn = $('#panel-n'), pt = $('#panel-t'), pp = $('#panel-p'), panel = $('#panel');
  let stage = -1;
  const swap = (el) => { el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); };
  function onPipe() {
    const r = pipe.getBoundingClientRect(), p = clamp(-r.top / (r.height - innerHeight), 0, 1), x = 4 + p * 92;
    box.style.left = x + '%'; fill.style.width = x + '%';
    box.style.translate = `0 ${Math.sin(p * 50) * -6}px`;
    let i = 0, best = 1e9; for (let k = 0; k < n; k++) { const d = Math.abs(pos(k) - x); if (d < best) { best = d; i = k; } }
    if (i === stage) return; stage = i;
    box.className = 'box s' + i; sts.forEach((s, k) => s.classList.toggle('on', k === i));
    pn.textContent = i + 1; pt.textContent = S.stations[i].title; pp.textContent = S.stations[i].text; swap(panel);
  }
  addEventListener('scroll', onPipe, { passive: true }); addEventListener('resize', onPipe); onPipe();

  /* ---------- iceberg dive panel (3D lives in scenes.js; it reads window.diveProgress) ---------- */
  const dive = $('#dive'), dn = $('#dive-n'), dt = $('#dive-t'), dp = $('#dive-p'), dpanel = $('#dive-panel'), dfill = $('#depth-fill'), dnum = $('#depth-n');
  let dstep = -1;
  function onDive() {
    const r = dive.getBoundingClientRect(), p = clamp(-r.top / (r.height - innerHeight), 0, 1);
    window.diveProgress = p;
    dfill.style.height = p * 100 + '%'; dnum.parentElement.style.setProperty('--d', p * 100 + '%');
    dnum.textContent = Math.round(p * 90) + ' m';
    dive.classList.toggle('under', p > .16);
    const i = Math.min(S.dive.length - 1, Math.floor(p * S.dive.length * .999));
    if (i === dstep) return; dstep = i;
    dn.textContent = i; dt.textContent = S.dive[i].title; dp.textContent = S.dive[i].text; swap(dpanel);
    window.diveStep = i;
  }
  addEventListener('scroll', onDive, { passive: true }); addEventListener('resize', onDive); onDive();

  /* ---------- AI agent trace (drives the 3D scene through events) ---------- */
  const trace = $('#trace');
  const emit = (name, detail) => dispatchEvent(new CustomEvent(name, { detail }));
  let runId = 0, visible = false;
  async function runAgent() {
    const id = ++runId; trace.innerHTML = '';
    const alive = () => id === runId;
    for (const step of S.trace) {
      if (!alive()) return;
      const el = document.createElement('div'); el.className = 'tr ' + step.t;
      const who = { user: 'USER', plan: 'PLAN', tool: 'TOOL', answer: 'AGENT' }[step.t];
      if (step.t === 'tool') {
        el.innerHTML = `<span class="who">${who}</span><code>${esc(step.tool)}</code>(${esc(step.s)})<span class="res">⟳ running<span class="spinner"></span></span>`;
        trace.appendChild(el); requestAnimationFrame(() => el.classList.add('in'));
        emit('agent:tool', { tool: step.tool, phase: 'call' });
        await wait(1300); if (!alive()) return;
        el.querySelector('.res').innerHTML = `⮑ <b>${esc(step.r)}</b>`;
        emit('agent:tool', { tool: step.tool, phase: 'done' });
        await wait(500);
      } else {
        el.innerHTML = `<span class="who">${who}</span><span class="txt"></span>`;
        trace.appendChild(el); requestAnimationFrame(() => el.classList.add('in'));
        if (step.t === 'answer') emit('agent:answer', {});
        if (step.t === 'plan') emit('agent:think', {});
        const t = el.querySelector('.txt');
        if (reduce) t.textContent = step.s;
        else for (let k = 1; k <= step.s.length; k++) { if (!alive()) return; t.textContent = step.s.slice(0, k); await wait(step.t === 'user' ? 22 : 12); }
        await wait(700);
      }
      trace.scrollTop = trace.scrollHeight;
    }
    emit('agent:idle', {});
    await wait(6000);
    if (alive() && visible) runAgent();
  }
  $('#replay').addEventListener('click', runAgent);
  new IntersectionObserver((es) => es.forEach((e) => {
    const was = visible; visible = e.isIntersecting;
    if (visible && !was && !trace.childElementCount) runAgent();
  }), { threshold: .3 }).observe($('#agents'));

  /* ---------- ontology explorer: tiny force layout + drag ---------- */
  const board = $('#onto-board'), svg = $('#onto-svg'), card = $('#onto-card');
  const O = S.ontology, nodes = O.objects.map((o, i) => ({ ...o, x: 0, y: 0, vx: 0, vy: 0, a: i / O.objects.length * Math.PI * 2 }));
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const linksEl = O.links.map(([a, b, label]) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.innerHTML = `<line></line><text text-anchor="middle">${esc(label)}</text>`;
    svg.appendChild(g); return { a: byId[a], b: byId[b], g, line: g.firstChild, text: g.lastChild };
  });
  nodes.forEach((nd) => {
    const el = document.createElement('div'); el.className = 'onode c-' + nd.color; el.tabIndex = 0;
    el.innerHTML = `${esc(nd.id)}<small>object type</small>`;
    board.appendChild(el); nd.el = el;
  });
  let W = 0, H = 0, drag = null, sel = null;
  function sizeBoard() {
    const fresh = !W; W = board.clientWidth; H = board.clientHeight;
    if (fresh) nodes.forEach((nd) => { nd.x = W / 2 + Math.cos(nd.a) * W * .3; nd.y = H / 2 + Math.sin(nd.a) * H * .32; });
  }
  sizeBoard(); addEventListener('resize', sizeBoard);
  function select(nd) {
    sel = nd; nodes.forEach((x) => x.el.classList.toggle('sel', x === nd));
    const rel = O.links.filter(([a, b]) => a === nd.id || b === nd.id);
    linksEl.forEach((l) => l.line.classList.toggle('hot', l.a === nd || l.b === nd));
    card.innerHTML = `<div class="win-bar"><i></i><i></i><i></i><span>ontology / object types / ${esc(nd.id)}</span></div>
      <div class="onto-body"><h3>${esc(nd.id)}</h3><small>backed by a Spark-built dataset · ${nd.props.length} properties</small>
      <h5>properties</h5><ul>${nd.props.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      <h5>links</h5><ul>${rel.map(([a, b, l]) => `<li>${esc(a)} → <b>${esc(l)}</b> → ${esc(b)}</li>`).join('')}</ul>
      <h5>actions</h5><div class="acts">${nd.actions.map((a) => `<button type="button">${esc(a)}()</button>`).join('')}</div>
      <div class="onto-toast" id="onto-toast"></div></div>`;
    $$('.acts button', card).forEach((b) => b.onclick = () => {
      const t = $('#onto-toast'); t.textContent = `✔ ${b.textContent} submitted on ${nd.id}: validated, logged, written back (demo)`;
      t.classList.remove('on'); void t.offsetWidth; t.classList.add('on');
    });
  }
  select(byId.Order);
  let moved = false;
  board.addEventListener('pointerdown', (e) => {
    const el = e.target.closest('.onode'); if (!el) return;
    drag = nodes.find((n) => n.el === el); moved = false; el.setPointerCapture(e.pointerId);
  });
  board.addEventListener('pointermove', (e) => {
    if (!drag) return; const r = board.getBoundingClientRect();
    drag.x = clamp(e.clientX - r.left, 40, W - 40); drag.y = clamp(e.clientY - r.top, 30, H - 30); drag.vx = drag.vy = 0; moved = true;
  });
  const end = () => { if (drag && !moved) select(drag); drag = null; };
  board.addEventListener('pointerup', end); board.addEventListener('pointercancel', () => (drag = null));
  board.addEventListener('keydown', (e) => { const nd = nodes.find((n) => n.el === e.target); if (nd && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); select(nd); } });
  let tt = 0;
  (function sim() {
    tt += .016;
    const L = Math.min(W, 700) * .36;
    for (const a of nodes) for (const b of nodes) if (a !== b) {
      const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy + .01, f = 42000 / d2;
      a.vx += dx * f / Math.sqrt(d2) * .05; a.vy += dy * f / Math.sqrt(d2) * .05;
    }
    for (const l of linksEl) {
      const dx = l.b.x - l.a.x, dy = l.b.y - l.a.y, d = Math.hypot(dx, dy) || 1, f = (d - L) * .004;
      l.a.vx += dx / d * f * 4; l.a.vy += dy / d * f * 4; l.b.vx -= dx / d * f * 4; l.b.vy -= dy / d * f * 4;
    }
    nodes.forEach((nd, i) => {
      nd.vx += (W / 2 - nd.x) * .002; nd.vy += (H / 2 - nd.y) * .003;
      if (!reduce) { nd.vx += Math.cos(tt + i) * .03; nd.vy += Math.sin(tt * 1.3 + i) * .03; }
      if (nd === drag) return;
      nd.vx *= .82; nd.vy *= .82; nd.x = clamp(nd.x + nd.vx, 60, W - 60); nd.y = clamp(nd.y + nd.vy, 34, H - 34);
    });
    nodes.forEach((nd) => { nd.el.style.left = nd.x + 'px'; nd.el.style.top = nd.y + 'px'; });
    linksEl.forEach((l) => {
      l.line.setAttribute('x1', l.a.x); l.line.setAttribute('y1', l.a.y); l.line.setAttribute('x2', l.b.x); l.line.setAttribute('y2', l.b.y);
      l.text.setAttribute('x', (l.a.x + l.b.x) / 2); l.text.setAttribute('y', (l.a.y + l.b.y) / 2 - 6);
    });
    requestAnimationFrame(sim);
  })();

  /* ---------- certification coin ---------- */
  const coin = $('#coin'), wrap = $('#coin-wrap');
  $('#cert-domains').innerHTML = S.cert.domains.map((d) => `<li>${esc(d)}</li>`).join('');
  const ring = $('.ring'), txt = 'GOOGLE CLOUD CERTIFIED ✱ PROFESSIONAL DATA ENGINEER ✱ ';
  ring.innerHTML = [...txt].map((c, i) => `<i style="transform:translateX(-50%) rotate(${i * 360 / txt.length}deg)">${c === ' ' ? '&nbsp;' : esc(c)}</i>`).join('');
  coin.addEventListener('click', () => coin.classList.toggle('flip'));
  coin.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); coin.classList.toggle('flip'); } });
  if (fine && !reduce) {
    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      wrap.style.transform = `rotateX(${-y * 24}deg) rotateY(${x * 24}deg)`;
    });
    wrap.addEventListener('mouseleave', () => (wrap.style.transform = ''));
    wrap.style.transition = 'transform .2s'; wrap.style.transformStyle = 'preserve-3d';
  }
  if (S.cert.url) $('#cert-ctas').innerHTML = `<a class="btn lime" href="${esc(S.cert.url)}" target="_blank" rel="noopener">verify credential ↗</a>`;
  onView($('#cert'), () => { if (!reduce) setTimeout(() => { coin.classList.add('flip'); setTimeout(() => coin.classList.remove('flip'), 2200); }, 500); }, .5);

  /* ---------- skills table ---------- */
  const CAT_COL = { 'AI / Agents': 'var(--tomato)', 'Lakehouse & Spark': '#7fd3ff', 'Foundry': 'var(--lime)', 'Cloud & Warehouse': 'var(--blue)', 'ML': 'var(--pink)', 'Languages & Tools': '#e9e2cf' };
  const RH = 46, rowsEl = $('#rows'), sqlEl = $('#sql'), filtersEl = $('#filters');
  let cat = 'All', key = 'level', dir = -1;
  const rowEls = S.skills.map((s) => {
    const r = document.createElement('div'); r.className = 'row';
    r.innerHTML = `<b>${esc(s.name)}</b><span class="cat hide-s">${esc(s.cat)}</span><div class="meter"><div class="bar"><i style="--c:${CAT_COL[s.cat] || 'var(--lime)'}" data-w="${s.level}"></i></div><span class="n">${s.level}</span></div>`;
    rowsEl.appendChild(r); return r;
  });
  function layout() {
    const vis = S.skills.map((s, i) => [s, i]).filter(([s]) => cat === 'All' || s.cat === cat)
      .sort((a, b) => (typeof a[0][key] === 'number' ? a[0][key] - b[0][key] : a[0][key].localeCompare(b[0][key])) * dir);
    const shown = new Set(vis.map(([, i]) => i));
    vis.forEach(([, i], k) => { rowEls[i].style.top = k * RH + 'px'; rowEls[i].classList.remove('out'); });
    S.skills.forEach((_, i) => { if (!shown.has(i)) { rowEls[i].style.top = vis.length * RH + 'px'; rowEls[i].classList.add('out'); } });
    rowsEl.style.height = vis.length * RH + 'px';
    const col = { name: 'skill', cat: 'category', level: 'confidence' }[key];
    sqlEl.innerHTML = `<span class="k">SELECT</span> skill, category, confidence\n<span class="k">FROM</span>   <span class="f">rithik.toolbox</span>` +
      (cat !== 'All' ? `\n<span class="k">WHERE</span>  category = <span class="v">'${esc(cat)}'</span>` : '') +
      `\n<span class="k">ORDER BY</span> ${col} <span class="k">${dir < 0 ? 'DESC' : 'ASC'}</span>;  <span style="opacity:.5">-- ${vis.length} rows</span>`;
    $$('.th button').forEach((b) => { b.lastElementChild.textContent = b.dataset.k === key ? (dir < 0 ? '▼' : '▲') : ''; });
  }
  S.categories.forEach((c) => {
    const b = document.createElement('button'); b.type = 'button'; b.textContent = c === 'All' ? '*' : c; if (c === cat) b.className = 'on';
    b.onclick = () => { cat = c; $$('button', filtersEl).forEach((x) => x.classList.toggle('on', x === b)); layout(); };
    filtersEl.appendChild(b);
  });
  $$('.th button').forEach((b) => b.addEventListener('click', () => {
    if (key === b.dataset.k) dir *= -1; else { key = b.dataset.k; dir = key === 'level' ? -1 : 1; } layout();
  }));
  layout();
  onView(rowsEl, () => $$('.bar i', rowsEl).forEach((i, k) => setTimeout(() => (i.style.width = i.dataset.w + '%'), k * 50)), .15);

  /* ---------- dbt demo ---------- */
  const body = $('#dirty-body'), runBtn = $('#run'), status = $('#status'), GL = '01{}[]<>#$%&*?/\\=+';
  let cleaned = false, busy = false;
  body.innerHTML = S.dirty.map((r) => `<tr>${r.raw.map((v) => `<td class="raw">${esc(v)}</td>`).join('')}</tr>`).join('');
  const cells = $$('td', body), nCols = S.dirty[0].raw.length;
  const val = (i, k) => S.dirty[Math.floor(i / nCols)][k][i % nCols];
  function run() {
    if (busy) return;
    if (cleaned) {
      cells.forEach((c, i) => { c.textContent = val(i, 'raw'); c.className = 'raw'; });
      cleaned = false; runBtn.textContent = '▶ dbt run'; status.className = ''; status.textContent = '5 rows · 3 duplicates · 4 formats'; return;
    }
    busy = true; runBtn.textContent = '… running'; status.textContent = 'compiling models…';
    const t0 = performance.now();
    (function tick(now) {
      let left = 0;
      cells.forEach((c, i) => {
        const el = now - t0, d = reduce ? 0 : 500 + i * 55, target = val(i, 'clean');
        if (el >= d) { if (c.className !== 'ok') { c.textContent = target; c.className = 'ok'; } return; }
        left++; c.className = 'scr';
        c.textContent = [...target].map((ch, k) => (el / d > k / target.length ? ch : GL[(Math.random() * GL.length) | 0])).join('');
      });
      if (left) return requestAnimationFrame(tick);
      busy = false; cleaned = true; runBtn.textContent = '↺ make it dirty again';
      status.className = 'done'; status.textContent = '✔ 5 rows · 3 keys · 1 format · tests pass';
      const r = runBtn.getBoundingClientRect(); burst(r.left + r.width / 2, r.top);
    })(t0);
  }
  runBtn.addEventListener('click', run);
  onView($('#dirty'), () => setTimeout(() => !cleaned && run(), 600), .5);

  /* ---------- projects ---------- */
  const HC = { 'Data Engineering': 'var(--lime)', 'ML / AI': 'var(--pink)', 'AI / Agents': 'var(--tomato)', 'Tooling': '#a9c4ff' };
  $('#grid').innerHTML = S.projects.map((p, i) => `
    <a class="card" href="${esc(p.url)}" target="_blank" rel="noopener" style="--r:${[-1.4, 1, -.6, 1.6, -1.1, .7][i % 6]}deg;--hc:${HC[p.tag] || 'var(--lime)'}">
      <header><span>TABLE</span><em>${esc(p.tag)}</em></header>
      <h3>${esc(p.title)}</h3>
      <dl class="cols"><div><dt>purpose</dt><dd>${esc(p.desc)}</dd></div><div><dt>stack</dt><dd class="st-tags">${p.stack.map((x) => `<span>${esc(x)}</span>`).join('')}</dd></div></dl>
      <footer>SELECT * → github ↗</footer>
    </a>`).join('');

  /* ---------- confetti made of data ---------- */
  const fx = $('#fx'), ctx = fx.getContext('2d');
  let parts = [], running = false;
  const fit = () => { const d = devicePixelRatio || 1; fx.width = innerWidth * d; fx.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  fit(); addEventListener('resize', fit);
  const TOK = ['NULL', '0', '1', '{ }', 'JOIN', '✔', 'SELECT', 'spark', 'ICEBERG', 'agent()'], COL = ['#c8ff2e', '#ff4a1c', '#3a46ff', '#ffb8d4', '#14110f'];
  function burst(ox, oy) {
    if (reduce) return;
    for (let i = 0; i < 70; i++) {
      const a = -Math.PI / 2 + (Math.random() - .5) * 2.4, v = 7 + Math.random() * 11;
      parts.push({ x: ox, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * 6, vr: (Math.random() - .5) * .3, t: TOK[(Math.random() * TOK.length) | 0], c: COL[(Math.random() * COL.length) | 0], s: 14 + Math.random() * 14, life: 0 });
    }
    if (!running) { running = true; requestAnimationFrame(step); }
  }
  function step() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter((p) => p.y < innerHeight + 60 && ++p.life < 260);
    for (const p of parts) {
      p.vy += .32; p.vx *= .992; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.font = `800 ${p.s}px "IBM Plex Mono",monospace`; ctx.lineWidth = 4; ctx.strokeStyle = '#14110f'; ctx.strokeText(p.t, 0, 0);
      ctx.fillStyle = p.c === '#14110f' ? '#f3ecdc' : p.c; ctx.fillText(p.t, 0, 0); ctx.restore();
    }
    if (parts.length) requestAnimationFrame(step); else running = false;
  }
  window.burst = burst;
  $('#fire').addEventListener('click', (e) => { const r = e.currentTarget.getBoundingClientRect(); burst(r.left + r.width / 2, r.top); });
  addEventListener('agent:answer', () => { const r = $('#trace').getBoundingClientRect(); burst(r.left + r.width / 2, r.bottom - 40); });

  $('#year').textContent = new Date().getFullYear();
})();

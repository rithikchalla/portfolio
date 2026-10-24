(() => {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
  const onView = (el, fn, threshold = .25) => new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { o.unobserve(e.target); fn(e.target); } }), { threshold }).observe(el);
  const swap = (el) => { el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); };
  // wrap numbers like 70%, $130K, 120+, ~50, 600 TB, 100M in <strong>
  const hl = (t) => esc(t).replace(/([−~$]*\d[\d,.]*(?:%|K\b|M\b| TB|\+)?(?:\/(?:yr|week))?)/g, (m) => /\d{2,}|%|\$|K|M|TB|\+/.test(m) ? `<strong>${m}</strong>` : m);
  const ICON = {
    in: '<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z"/></svg>',
    gh: '<svg viewBox="0 0 24 24"><path d="M12 .5a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><path d="M2 5h20v14H2zm2 2v.5l8 5 8-5V7zm16 10V9.8l-8 5-8-5V17z"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6zm8 1.5V8h4.5zM9 12h8v1.5H9zm0 3h8v1.5H9z"/></svg>'
  };
  const contactBtns = (primary) => [
    `<a class="btn ${primary ? 'lime' : ''}" href="${esc(S.linkedin)}" target="_blank" rel="noopener">${ICON.in}LinkedIn</a>`,
    `<a class="btn ${primary ? '' : 'lime'}" href="mailto:${esc(S.email)}">${ICON.mail}${esc(S.email)}</a>`,
    `<a class="btn" href="${esc(S.github)}" target="_blank" rel="noopener">${ICON.gh}GitHub</a>`,
    S.resumeUrl ? `<a class="btn dark" href="${esc(S.resumeUrl)}" target="_blank" rel="noopener">${ICON.doc}résumé</a>` : ''
  ].join('');

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
      const drag = e.target.closest('.onode,.stage3d'), commit = e.target.closest('.commit');
      const hot = e.target.closest('a,button,.row');
      cur.classList.toggle('big', !!(drag || commit));
      cur.firstElementChild.textContent = drag ? 'DRAG' : commit ? (commit.classList.contains('open') ? 'LESS' : 'MORE') : '';
      cur.firstElementChild.style.background = hot ? 'var(--tomato)' : '';
    });
  }

  /* ---------- hero ---------- */
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
  const heroL = $('.hero-l');
  if (!reduce && fine) {
    let mx = -999, my = -999, raf = 0;
    const apply = () => {
      raf = 0;
      for (const l of letters) {
        const r = l.getBoundingClientRect(), dx = r.left + r.width / 2 - mx, dy = r.top + r.height / 2 - my, d = Math.hypot(dx, dy) || 1, R = 170;
        l.style.transform = d < R ? `translate(${dx / d * (R - d) / R * 60}px,${dy / d * (R - d) / R * 44}px) rotate(${dx / d * (R - d) / R * 26}deg)` : '';
      }
    };
    heroL.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(apply); });
    heroL.addEventListener('mouseleave', () => { mx = my = -999; apply(); });
  }
  $('#hero-ctas').innerHTML = contactBtns(true);
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
  // stat tiles with count-up
  $('#stats').innerHTML = S.stats.map((s, i) => `<div class="stat" style="--r:${[-1.2, .8, -.5, 1.1][i % 4]}deg"><b data-n="${s.n}" data-p="${esc(s.prefix || '')}" data-s="${esc(s.suffix || '')}">${esc((s.prefix || '') + s.n + (s.suffix || ''))}</b><span>${esc(s.label)}</span></div>`).join('');
  onView($('#stats'), () => $$('#stats b').forEach((b) => {
    if (reduce) return;
    const n = +b.dataset.n, t0 = performance.now();
    (function step(now) {
      const p = Math.min(1, (now - t0) / 1600);
      b.textContent = b.dataset.p + Math.round(n * (1 - Math.pow(1 - p, 3))) + b.dataset.s;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }), .4);

  $$('[data-mq]').forEach((el) => {
    const html = ['Palantir Foundry', 'Palantir AIP', 'Google ADK', 'Multi-agent systems', 'RAG', 'Text-to-SQL', 'BigQuery', 'Apache Spark', 'Apache Iceberg', 'Snowflake', 'Airflow', 'GCP', 'Kafka']
      .map((w) => `<span>${esc(w)}</span>`).join('');
    el.innerHTML = html + html;
  });

  /* ---------- below the waterline (3D in scenes.js reads window.diveProgress / diveStep) ---------- */
  const dive = $('#dive'), dk = $('#dive-k'), dt = $('#dive-t'), dp = $('#dive-p'), di = $('#dive-items'), dpanel = $('#dive-panel'), dfill = $('#depth-fill'), dnum = $('#depth-n');
  let dstep = -1;
  function onDive() {
    const r = dive.getBoundingClientRect(), p = clamp(-r.top / (r.height - innerHeight), 0, 1);
    window.diveProgress = p;
    dfill.style.height = p * 100 + '%'; dnum.parentElement.style.setProperty('--d', p * 100 + '%');
    dnum.textContent = '−' + Math.round(p * 90) + ' m';
    dive.classList.toggle('under', p > .12);
    const i = Math.min(S.dive.length - 1, Math.floor(p * S.dive.length * .999));
    if (i === dstep) return; dstep = i; window.diveStep = i;
    const d = S.dive[i];
    dk.textContent = d.kicker; dt.textContent = d.title; dp.textContent = d.text;
    di.innerHTML = d.items.map((m, k) => `<li style="--i:${k}"><b>${esc(m.k)}</b><span>${esc(m.v)}</span></li>`).join('');
    swap(dpanel);
  }
  addEventListener('scroll', onDive, { passive: true }); addEventListener('resize', onDive); onDive();

  /* ---------- git log --career ---------- */
  const hash = (s) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7); };
  $('#log').innerHTML = S.experience.map((e, i) => `
    <div class="commit ${e.head ? 'head open' : ''} ${e.edu ? 'edu' : ''}" tabindex="0" role="button" aria-expanded="${e.head ? 'true' : 'false'}">
      <div class="rail"><span class="dot"></span></div>
      <div class="body">
        <div class="line1"><span class="hash">${hash(e.org + e.role)}</span>
          ${e.head ? '<span class="ref">HEAD → main</span>' : e.edu ? '<span class="ref">tag: education</span>' : ''}
          <span class="org">${esc(e.org)}</span></div>
        <div class="meta"><b>${esc(e.role)}</b> · ${esc(e.when)} · ${esc(e.where)} ${e.groups.length ? '<span class="toggle">· click to ' + (e.head ? 'collapse' : 'expand') + '</span>' : ''}</div>
        <div class="more"><div>
          ${e.groups.map((g) => `${g.name ? `<h5>${esc(g.name)}</h5>` : ''}<ul>${g.bullets.map((b) => `<li>${hl(b)}</li>`).join('')}</ul>`).join('')}
          ${e.tags.length ? `<div class="tags">${e.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
        </div></div>
      </div>
    </div>`).join('');
  $$('.commit').forEach((c, i) => {
    const t = () => { if (!$('.more ul', c)) return; c.classList.toggle('open'); c.setAttribute('aria-expanded', c.classList.contains('open')); const tg = $('.toggle', c); if (tg) tg.textContent = '· click to ' + (c.classList.contains('open') ? 'collapse' : 'expand'); };
    c.addEventListener('click', t);
    c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t(); } });
    onView(c, () => setTimeout(() => c.classList.add('in'), reduce ? 0 : 80), .1);
  });

  /* ---------- agent walkthroughs (drive the 3D scene through events) ---------- */
  const trace = $('#trace'), tabs = $('#tabs');
  const emit = (name, detail) => dispatchEvent(new CustomEvent(name, { detail }));
  let runId = 0, visible = false, cur_s = 0;
  tabs.innerHTML = S.scenarios.map((s, i) => `<button type="button" role="tab" aria-selected="${i === 0}">${esc(s.name)}<small>${esc(s.stack)}</small></button>`).join('');
  const tabBtns = $$('button', tabs);
  tabBtns.forEach((b, i) => b.addEventListener('click', () => runAgent(i)));
  async function runAgent(si = cur_s) {
    cur_s = si; const sc = S.scenarios[si];
    tabBtns.forEach((b, k) => b.setAttribute('aria-selected', k === si));
    $('#stack-tag').textContent = sc.stack; $('#term-title').textContent = `agent.run("${sc.id}")  · sample data`;
    const id = ++runId; trace.innerHTML = ''; emit('agent:reset', {});
    const alive = () => id === runId;
    for (const step of sc.trace) {
      if (!alive()) return;
      const el = document.createElement('div'); el.className = 'tr ' + step.t;
      const who = { user: 'IN', plan: 'PLAN', tool: 'TOOL', answer: 'OUT' }[step.t];
      if (step.t === 'tool') {
        el.innerHTML = `<span class="who">${who}</span><code>${esc(step.tool)}</code>(${esc(step.s)})<span class="res">⟳ running<span class="spinner"></span></span>`;
        trace.appendChild(el); requestAnimationFrame(() => el.classList.add('in'));
        emit('agent:tool', { tool: step.tool, phase: 'call' });
        await wait(1200); if (!alive()) return;
        el.querySelector('.res').innerHTML = `⮑ <b>${esc(step.r)}</b>`;
        emit('agent:tool', { tool: step.tool, phase: 'done' });
        await wait(450);
      } else {
        el.innerHTML = `<span class="who">${who}</span><span class="txt"></span>`;
        trace.appendChild(el); requestAnimationFrame(() => el.classList.add('in'));
        if (step.t === 'answer') emit('agent:answer', {});
        if (step.t === 'plan') emit('agent:think', {});
        const t = el.querySelector('.txt');
        if (reduce) t.textContent = step.s;
        else for (let k = 1; k <= step.s.length; k++) { if (!alive()) return; t.textContent = step.s.slice(0, k); await wait(step.t === 'user' ? 20 : 11); }
        await wait(600);
      }
      trace.scrollTop = trace.scrollHeight;
    }
    emit('agent:idle', {});
    await wait(5500);
    if (alive() && visible) runAgent((si + 1) % S.scenarios.length);
  }
  $('#replay').addEventListener('click', () => runAgent(cur_s));
  new IntersectionObserver((es) => es.forEach((e) => {
    const was = visible; visible = e.isIntersecting;
    if (visible && !was && !trace.childElementCount) runAgent(0);
  }), { threshold: .3 }).observe($('#agents'));

  /* ---------- case studies + public repos ---------- */
  const HC = { 'AI system': 'var(--lime)', 'Platform': '#a9c4ff', 'Cost & speed': 'var(--pink)' };
  $('#cases').innerHTML = S.cases.map((c, i) => `
    <article class="case" style="--r:${[-1.2, .9, -.5, 1.3, -1, .6][i % 6]}deg;--hc:${HC[c.tag] || 'var(--lime)'}">
      <header><span>CASE ${String(i + 1).padStart(2, '0')}</span><em>${esc(c.tag)}</em></header>
      <div class="big"><b>${esc(c.metric)}</b><span>${esc(c.metricLabel)}</span></div>
      <h3>${esc(c.title)}</h3>
      <dl><div><dt>problem</dt><dd>${esc(c.problem)}</dd></div><div><dt>built</dt><dd>${esc(c.build)}</dd></div><div><dt>result</dt><dd>${hl(c.result)}</dd></div></dl>
      <footer>${c.stack.map((x) => `<span>${esc(x)}</span>`).join('')}</footer>
    </article>`).join('');
  $$('.case').forEach((c, i) => onView(c, () => setTimeout(() => c.classList.add('in'), reduce ? 0 : (i % 3) * 120), .15));
  $('#repos').innerHTML = S.projects.length
    ? `<b>Public on GitHub:</b>${S.projects.map((p) => `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title)} ↗<small>${esc(p.desc)}</small></a>`).join('')}<a href="${esc(S.github)}" target="_blank" rel="noopener">all repos ↗</a>`
    : '';

  /* ---------- ontology explorer: tiny force layout + drag ---------- */
  const board = $('#onto-board'), svg = $('#onto-svg'), card = $('#onto-card');
  const O = S.ontology, nodes = O.objects.map((o, i) => ({ ...o, x: 0, y: 0, vx: 0, vy: 0, a: i / O.objects.length * Math.PI * 2 }));
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const linksEl = O.links.map(([a, b, label]) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.innerHTML = `<line></line><text text-anchor="middle">${esc(label)}</text>`;
    svg.appendChild(g); return { a: byId[a], b: byId[b], line: g.firstChild, text: g.lastChild };
  });
  nodes.forEach((nd) => {
    const el = document.createElement('div'); el.className = 'onode c-' + nd.color; el.tabIndex = 0;
    el.innerHTML = `${esc(nd.id)}<small>object type</small>`; board.appendChild(el); nd.el = el;
  });
  let W = 0, H = 0, drag = null, moved = false;
  function sizeBoard() {
    const fresh = !W; W = board.clientWidth; H = board.clientHeight;
    if (fresh) nodes.forEach((nd) => { nd.x = W / 2 + Math.cos(nd.a) * W * .3; nd.y = H / 2 + Math.sin(nd.a) * H * .32; });
  }
  sizeBoard(); addEventListener('resize', sizeBoard);
  function select(nd) {
    nodes.forEach((x) => x.el.classList.toggle('sel', x === nd));
    const rel = O.links.filter(([a, b]) => a === nd.id || b === nd.id);
    linksEl.forEach((l) => l.line.classList.toggle('hot', l.a === nd || l.b === nd));
    card.innerHTML = `<div class="win-bar"><i></i><i></i><i></i><span>ontology / object types / ${esc(nd.id)}</span></div>
      <div class="onto-body"><h3>${esc(nd.id)}</h3><small>backed by a PySpark-built dataset · ${nd.props.length} properties</small>
      <h5>properties</h5><ul>${nd.props.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      <h5>links</h5><ul>${rel.map(([a, b, l]) => `<li>${esc(a)} → <b>${esc(l)}</b> → ${esc(b)}</li>`).join('')}</ul>
      <h5>actions (used by people and AIP agents)</h5><div class="acts">${nd.actions.map((a) => `<button type="button">${esc(a)}()</button>`).join('')}</div>
      <div class="onto-toast" id="onto-toast"></div></div>`;
    $$('.acts button', card).forEach((b) => b.onclick = () => {
      const t = $('#onto-toast'); t.textContent = `✔ ${b.textContent} on ${nd.id}: validated, logged, written back (sample)`;
      t.classList.remove('on'); void t.offsetWidth; t.classList.add('on');
    });
  }
  select(byId.Order);
  board.addEventListener('pointerdown', (e) => { const el = e.target.closest('.onode'); if (!el) return; drag = nodes.find((n) => n.el === el); moved = false; el.setPointerCapture(e.pointerId); });
  board.addEventListener('pointermove', (e) => { if (!drag) return; const r = board.getBoundingClientRect(); drag.x = clamp(e.clientX - r.left, 40, W - 40); drag.y = clamp(e.clientY - r.top, 30, H - 30); drag.vx = drag.vy = 0; moved = true; });
  board.addEventListener('pointerup', () => { if (drag && !moved) select(drag); drag = null; });
  board.addEventListener('pointercancel', () => (drag = null));
  board.addEventListener('keydown', (e) => { const nd = nodes.find((n) => n.el === e.target); if (nd && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); select(nd); } });
  let tt = 0, boardVisible = false;
  new IntersectionObserver((es) => es.forEach((e) => (boardVisible = e.isIntersecting))).observe(board);
  (function sim() {
    requestAnimationFrame(sim);
    if (!boardVisible) return;
    tt += .016;
    const L = Math.min(W, 700) * .36;
    for (const a of nodes) for (const b of nodes) if (a !== b) {
      const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy + .01, f = 42000 / d2, d = Math.sqrt(d2);
      a.vx += dx / d * f * .05; a.vy += dy / d * f * .05;
    }
    for (const l of linksEl) {
      const dx = l.b.x - l.a.x, dy = l.b.y - l.a.y, d = Math.hypot(dx, dy) || 1, f = (d - L) * .016;
      l.a.vx += dx / d * f; l.a.vy += dy / d * f; l.b.vx -= dx / d * f; l.b.vy -= dy / d * f;
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
  })();

  /* ---------- certification coin ---------- */
  const coin = $('#coin'), wrap = $('#coin-wrap');
  $('#cert-domains').innerHTML = S.cert.domains.map((d) => `<li>${esc(d)}</li>`).join('');
  $('#cert-date').textContent = '✓ ' + S.cert.date;
  const ring = $('.ring'), txt = 'GOOGLE CLOUD CERTIFIED ✱ PROFESSIONAL DATA ENGINEER ✱ ';
  ring.innerHTML = [...txt].map((c, i) => `<i style="transform:translateX(-50%) rotate(${i * 360 / txt.length}deg)">${c === ' ' ? '&nbsp;' : esc(c)}</i>`).join('');
  coin.addEventListener('click', () => coin.classList.toggle('flip'));
  coin.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); coin.classList.toggle('flip'); } });
  if (fine && !reduce) {
    wrap.style.transition = 'transform .2s'; wrap.style.transformStyle = 'preserve-3d';
    wrap.addEventListener('mousemove', (e) => { const r = wrap.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; wrap.style.transform = `rotateX(${-y * 24}deg) rotateY(${x * 24}deg)`; });
    wrap.addEventListener('mouseleave', () => (wrap.style.transform = ''));
  }
  if (S.cert.url) $('#cert-ctas').innerHTML = `<a class="btn lime" href="${esc(S.cert.url)}" target="_blank" rel="noopener">verify credential ↗</a>`;
  onView($('#cert'), () => { if (!reduce) setTimeout(() => { coin.classList.add('flip'); setTimeout(() => coin.classList.remove('flip'), 2200); }, 500); }, .5);

  /* ---------- skills table: sort + filter, "used at" from the résumé ---------- */
  const RH = 46, rowsEl = $('#rows'), sqlEl = $('#sql'), filtersEl = $('#filters');
  let cat = 'All', key = 'cat', dir = 1;
  const rowEls = S.skills.map((s) => {
    const r = document.createElement('div'); r.className = 'row';
    r.innerHTML = `<b>${esc(s.name)}</b><span class="cat hide-s">${esc(s.cat)}</span><span class="at">${s.at ? esc(s.at) : '<i>toolkit</i>'}</span>`;
    rowsEl.appendChild(r); return r;
  });
  const val = (s, k) => k === 'at' ? (s.at ? (s.at === 'everywhere' ? 'a' : 'b' + s.at) : 'z') : k === 'cat' ? String(S.categories.indexOf(s.cat)).padStart(2, '0') : s[k];
  function layout() {
    const vis = S.skills.map((s, i) => [s, i]).filter(([s]) => cat === 'All' || s.cat === cat)
      .sort((a, b) => (val(a[0], key).localeCompare(val(b[0], key)) || a[1] - b[1]) * dir);
    const shown = new Set(vis.map(([, i]) => i));
    vis.forEach(([, i], k) => { rowEls[i].style.top = k * RH + 'px'; rowEls[i].classList.remove('out'); });
    S.skills.forEach((_, i) => { if (!shown.has(i)) { rowEls[i].style.top = vis.length * RH + 'px'; rowEls[i].classList.add('out'); } });
    rowsEl.style.height = vis.length * RH + 'px';
    const col = { name: 'skill', cat: 'category', at: 'used_at' }[key];
    sqlEl.innerHTML = `<span class="k">SELECT</span> skill, category, used_at\n<span class="k">FROM</span>   <span class="f">rithik.toolbox</span>` +
      (cat !== 'All' ? `\n<span class="k">WHERE</span>  category = <span class="v">'${esc(cat)}'</span>` : '') +
      `\n<span class="k">ORDER BY</span> ${col} <span class="k">${dir < 0 ? 'DESC' : 'ASC'}</span>;  <span style="opacity:.5">-- ${vis.length} rows</span>`;
    $$('.th button').forEach((b) => { b.lastElementChild.textContent = b.dataset.k === key ? (dir < 0 ? '▼' : '▲') : ''; });
  }
  S.categories.forEach((c) => {
    const b = document.createElement('button'); b.type = 'button'; b.textContent = c === 'All' ? '*' : c; if (c === cat) b.className = 'on';
    b.onclick = () => { cat = c; $$('button', filtersEl).forEach((x) => x.classList.toggle('on', x === b)); layout(); };
    filtersEl.appendChild(b);
  });
  $$('.th button').forEach((b) => b.addEventListener('click', () => { if (key === b.dataset.k) dir *= -1; else { key = b.dataset.k; dir = 1; } layout(); }));
  layout();

  /* ---------- contact ---------- */
  $('#open-to').innerHTML = `Interested in <b>${esc(S.openTo)}</b> roles · ${esc(S.location)}`;
  $('#contact-ctas').innerHTML = contactBtns(false);

  /* ---------- confetti made of data ---------- */
  const fx = $('#fx'), ctx = fx.getContext('2d');
  let parts = [], running = false;
  const fit = () => { const d = devicePixelRatio || 1; fx.width = innerWidth * d; fx.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  fit(); addEventListener('resize', fit);
  const TOK = ['NULL', '{ }', 'JOIN', '✔', 'SELECT', 'spark', 'ICEBERG', 'agent()', 'RAG', 'AIP'], COL = ['#c8ff2e', '#ff4a1c', '#3a46ff', '#ffb8d4', '#14110f'];
  function burst(ox, oy) {
    if (reduce) return;
    for (let i = 0; i < 60; i++) {
      const a = -Math.PI / 2 + (Math.random() - .5) * 2.4, v = 7 + Math.random() * 11;
      parts.push({ x: ox, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * 6, vr: (Math.random() - .5) * .3, t: TOK[(Math.random() * TOK.length) | 0], c: COL[(Math.random() * COL.length) | 0], s: 14 + Math.random() * 12, life: 0 });
    }
    if (!running) { running = true; requestAnimationFrame(step); }
  }
  function step() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter((p) => p.y < innerHeight + 60 && ++p.life < 240);
    for (const p of parts) {
      p.vy += .32; p.vx *= .992; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.font = `800 ${p.s}px "IBM Plex Mono",monospace`; ctx.lineWidth = 4; ctx.strokeStyle = '#14110f'; ctx.strokeText(p.t, 0, 0);
      ctx.fillStyle = p.c === '#14110f' ? '#f3ecdc' : p.c; ctx.fillText(p.t, 0, 0); ctx.restore();
    }
    if (parts.length) requestAnimationFrame(step); else running = false;
  }
  $('#fire').addEventListener('click', (e) => { const r = e.currentTarget.getBoundingClientRect(); burst(r.left + r.width / 2, r.top); });

  $('#year').textContent = new Date().getFullYear();
})();

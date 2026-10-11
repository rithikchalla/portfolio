(() => {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- cursor: a lime square that leans into its movement ---------- */
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
      const card = e.target.closest('.card');
      const hot = e.target.closest('a,button,.row');
      cur.classList.toggle('big', !!card);
      cur.firstElementChild.textContent = card ? 'OPEN' : '';
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
  const hero = $('#hero');
  if (!reduce && fine) {
    let mx = -999, my = -999, raf = 0;
    const apply = () => {
      raf = 0;
      for (const l of letters) {
        const r = l.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = cx - mx, dy = cy - my, d = Math.hypot(dx, dy) || 1, R = 190;
        if (d < R) { const f = (R - d) / R; l.style.transform = `translate(${dx / d * f * 70}px,${dy / d * f * 50}px) rotate(${dx / d * f * 28}deg) scale(${1 + f * .12})`; }
        else l.style.transform = '';
      }
    };
    hero.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(apply); });
    hero.addEventListener('mouseleave', () => { mx = my = -999; apply(); });
  }
  const stk = $$('.stickers .s');
  if (!reduce && fine) addEventListener('mousemove', (e) => {
    const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
    stk.forEach((s, i) => { s.style.translate = `${nx * (30 + i * 14)}px ${ny * (24 + i * 10)}px`; });
  });

  /* ---------- the dirty table: dbt run ---------- */
  const body = $('#dirty-body'), runBtn = $('#run'), status = $('#status');
  const GL = '01{}[]<>#$%&*?/\\=+';
  let cleaned = false, busy = false;
  body.innerHTML = S.dirty.map((r) => `<tr>${r.raw.map((v) => `<td class="raw">${esc(v)}</td>`).join('')}</tr>`).join('');
  const cells = $$('td', body);
  const nCols = S.dirty[0].raw.length;
  const val = (i, key) => S.dirty[Math.floor(i / nCols)][key][i % nCols];
  function run() {
    if (busy) return;
    if (cleaned) {
      cells.forEach((c, i) => { c.textContent = val(i, 'raw'); c.className = 'raw'; });
      cleaned = false; runBtn.textContent = '▶ dbt run'; status.className = '';
      status.textContent = '5 rows · 3 duplicates · 4 formats'; return;
    }
    busy = true; runBtn.textContent = '… running'; status.textContent = 'compiling 4 models…';
    const t0 = performance.now(), dur = (i) => reduce ? 0 : 500 + i * 55;
    (function tick(now) {
      let left = 0;
      cells.forEach((c, i) => {
        const el = now - t0, d = dur(i), target = val(i, 'clean');
        if (el >= d) { if (c.className !== 'ok') { c.textContent = target; c.className = 'ok'; } return; }
        left++; c.className = 'scr';
        c.textContent = [...target].map((ch, k) => (el / d > k / target.length ? ch : GL[(Math.random() * GL.length) | 0])).join('');
      });
      if (left) return requestAnimationFrame(tick);
      busy = false; cleaned = true; runBtn.textContent = '↺ make it dirty again';
      status.className = 'done'; status.textContent = '✔ 5 rows · 3 keys · 1 format · tests pass';
      burst(innerWidth * .72, innerHeight * .6);
    })(t0);
  }
  runBtn.addEventListener('click', run);
  setTimeout(() => !cleaned && !busy && run(), 1800);

  /* ---------- marquee bands ---------- */
  $$('[data-mq]').forEach((el) => {
    const words = el.dataset.mq ? ['extract', 'transform', 'load', 'test', 'document', 'repeat', 'open to work', 'hire me'] : S.skills.map((s) => s.name);
    const html = words.map((w) => `<span>${esc(w)}</span>`).join('');
    el.innerHTML = html + html;
  });

  /* ---------- pipeline: scroll drives the box ---------- */
  const pipe = $('#pipeline'), box = $('#box'), fill = $('#line-fill'), sts = $$('.st');
  const pn = $('#panel-n'), pt = $('#panel-t'), pp = $('#panel-p'), panel = $('#panel');
  let stage = -1;
  function setStage(i) {
    if (i === stage) return; stage = i;
    box.className = 'box s' + i;
    sts.forEach((s, k) => s.classList.toggle('on', k === i));
    const st = S.stations[i];
    pn.textContent = i + 1; pt.textContent = st.title; pp.textContent = st.text;
    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
  }
  function onScroll() {
    const r = pipe.getBoundingClientRect(), total = r.height - innerHeight;
    const p = clamp(-r.top / total, 0, 1), x = 4 + p * 92;
    box.style.left = x + '%'; fill.style.width = x + '%';
    box.style.translate = `0 ${Math.sin(p * 40) * -6}px`;
    setStage(x < 22 ? 0 : x < 50 ? 1 : x < 78 ? 2 : 3);
  }
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();

  /* ---------- skills as a sortable SQL table ---------- */
  const CAT_COL = { 'Data Engineering': 'var(--lime)', 'ML / AI': 'var(--tomato)', 'Languages': 'var(--blue)', 'Tooling': 'var(--pink)' };
  const H = 46, rowsEl = $('#rows'), sqlEl = $('#sql'), filtersEl = $('#filters');
  let cat = 'All', key = 'level', dir = -1;
  const rowEls = S.skills.map((s) => {
    const r = document.createElement('div'); r.className = 'row';
    r.innerHTML = `<b>${esc(s.name)}</b><span class="cat hide-s">${esc(s.cat)}</span><div class="meter"><div class="bar"><i style="--c:${CAT_COL[s.cat] || 'var(--lime)'}" data-w="${s.level}"></i></div><span class="n">${s.level}</span></div>`;
    rowsEl.appendChild(r); return r;
  });
  function layout() {
    const vis = S.skills.map((s, i) => [s, i]).filter(([s]) => cat === 'All' || s.cat === cat)
      .sort((a, b) => (typeof a[0][key] === 'number' ? a[0][key] - b[0][key] : a[0][key].localeCompare(b[0][key])) * dir);
    const hid = S.skills.map((s, i) => i).filter((i) => !vis.some(([, v]) => v === i));
    vis.forEach(([, i], n) => { rowEls[i].style.top = n * H + 'px'; rowEls[i].classList.remove('out'); });
    hid.forEach((i, n) => { rowEls[i].style.top = (vis.length + n) * H + 'px'; rowEls[i].classList.add('out'); });
    rowsEl.style.height = vis.length * H + 'px';
    const col = { name: 'skill', cat: 'category', level: 'confidence' }[key];
    sqlEl.innerHTML = `<span class="k">SELECT</span> skill, category, confidence\n<span class="k">FROM</span>   <span class="f">toolbox</span>` +
      (cat !== 'All' ? `\n<span class="k">WHERE</span>  category = <span class="v">'${esc(cat)}'</span>` : '') +
      `\n<span class="k">ORDER BY</span> ${col} <span class="k">${dir < 0 ? 'DESC' : 'ASC'}</span>;  <span style="opacity:.5">-- ${vis.length} rows</span>`;
    $$('.th button').forEach((b) => { b.lastElementChild.textContent = b.dataset.k === key ? (dir < 0 ? '▼' : '▲') : ''; });
  }
  S.categories.forEach((c) => {
    const b = document.createElement('button'); b.textContent = c === 'All' ? '*' : c; if (c === cat) b.className = 'on';
    b.onclick = () => { cat = c; $$('button', filtersEl).forEach((x) => x.classList.toggle('on', x === b)); layout(); };
    filtersEl.appendChild(b);
  });
  $$('.th button').forEach((b) => b.addEventListener('click', () => {
    if (key === b.dataset.k) dir *= -1; else { key = b.dataset.k; dir = key === 'level' ? -1 : 1; } layout();
  }));
  layout();
  new IntersectionObserver((es, o) => es.forEach((e) => {
    if (!e.isIntersecting) return; o.disconnect();
    $$('.bar i', rowsEl).forEach((i, n) => setTimeout(() => (i.style.width = i.dataset.w + '%'), n * 60));
  }), { threshold: .2 }).observe(rowsEl);

  /* ---------- projects as database tables ---------- */
  const HC = { 'Data Engineering': 'var(--lime)', 'ML / AI': 'var(--pink)', 'Tooling': '#a9c4ff' };
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
  const TOK = ['NULL', '0', '1', '{ }', 'JOIN', '✔', 'SELECT', 'dbt', 'ETL', '404→200'], COL = ['#c8ff2e', '#ff4a1c', '#3a46ff', '#ffb8d4', '#14110f'];
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
  $('#fire').addEventListener('click', (e) => { const r = e.currentTarget.getBoundingClientRect(); burst(r.left + r.width / 2, r.top); });

  $('#year').textContent = new Date().getFullYear();
})();

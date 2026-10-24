import * as THREE from './vendor/three.module.min.js';

const S = window.SITE;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const C = { paper: 0xf3ecdc, paper2: 0xfffdf6, ink: 0x14110f, lime: 0xc8ff2e, tomato: 0xff4a1c, blue: 0x3a46ff, pink: 0xffb8d4, deep: 0x141a5c, ice: 0xe6f6ff };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();

/* ---------- shared stage plumbing: one rAF loop, only visible stages render ---------- */
const stages = [];
function stage({ host, canvas, bg, fov = 40 }) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: bg == null }); }
  catch (e) { host.classList.add('no-webgl'); return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  if (!canvas) host.prepend(renderer.domElement);
  const scene = new THREE.Scene(); if (bg != null) scene.background = new THREE.Color(bg);
  const camera = new THREE.PerspectiveCamera(fov, 1, .1, 100);
  const st = { host, renderer, scene, camera, visible: false, tick: null, labels: [] };
  const size = () => {
    const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  size(); new ResizeObserver(size).observe(host);
  new IntersectionObserver((es) => es.forEach((e) => (st.visible = e.isIntersecting)), { rootMargin: '100px' }).observe(host);
  stages.push(st); return st;
}
function label(st, text, cls = '') {
  const el = document.createElement('div'); el.className = 'label3d ' + cls; el.textContent = text;
  st.host.appendChild(el); const l = { el, pos: new THREE.Vector3(), obj: null }; st.labels.push(l); return l;
}
const v = new THREE.Vector3();
function placeLabels(st) {
  const w = st.host.clientWidth, h = st.host.clientHeight;
  for (const l of st.labels) {
    if (l.obj) l.obj.getWorldPosition(v).add(l.pos); else v.copy(l.pos);
    v.project(st.camera);
    const hidden = v.z > 1 || Math.abs(v.x) > 1.1 || Math.abs(v.y) > 1.1 || l.hide;
    l.el.style.display = hidden ? 'none' : '';
    l.el.style.left = (v.x * .5 + .5) * w + 'px'; l.el.style.top = (-v.y * .5 + .5) * h + 'px';
  }
}
function edges(mesh, color = C.ink, opacity = 1) {
  const e = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 1), new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity }));
  mesh.add(e); return e;
}
const clock = new THREE.Clock();
(function loop() {
  const t = clock.getElapsedTime();
  for (const st of stages) if (st.visible && st.tick) { st.tick(t); st.renderer.render(st.scene, st.camera); placeLabels(st); }
  requestAnimationFrame(loop);
})();

/* =====================================================================
   1) HERO: the same 2,744 points re-shape into data architectures
   ===================================================================== */
(function hero() {
  const host = document.getElementById('hero3d'); if (!host) return;
  const st = stage({ host, bg: null, fov: 38 }); if (!st) return;
  const { scene, camera } = st;
  camera.position.set(0, 1.2, 8.2); camera.lookAt(0, 0, 0);
  const N = 14 ** 3;
  const shapes = [];
  // WAREHOUSE: a tidy cube of rows, columns and partitions
  shapes.push((() => { const a = new Float32Array(N * 3); let k = 0; for (let x = 0; x < 14; x++) for (let y = 0; y < 14; y++) for (let z = 0; z < 14; z++) { a[k++] = (x - 6.5) * .2; a[k++] = (y - 6.5) * .2; a[k++] = (z - 6.5) * .2; } return a; })());
  // DATA LAKE: a wide rippling surface
  shapes.push((() => { const a = new Float32Array(N * 3), side = Math.ceil(Math.sqrt(N)); for (let i = 0; i < N; i++) { const x = (i % side) / side * 5.2 - 2.6, z = Math.floor(i / side) / side * 5.2 - 2.6; a[i * 3] = x; a[i * 3 + 1] = Math.sin(x * 2) * .18 + Math.cos(z * 2.4) * .18 - .4; a[i * 3 + 2] = z; } return a; })());
  // ICEBERG TABLE: a small tip above a waterline and a big body below
  shapes.push((() => { const a = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const r = rand(), th = rand() * Math.PI * 2; let x, y, z;
    if (i < N * .28) { const rr = 1.5 + rand() * 1.4; x = Math.cos(th) * rr; z = Math.sin(th) * rr; y = .25 + Math.sin(th * 6) * .03; }
    else if (r < .2) { const h = rand(); y = .25 + h * 1.0; const rr = (1 - h) * .55 * (.85 + rand() * .3); x = Math.cos(th) * rr; z = Math.sin(th) * rr; }
    else { const h = rand(); y = .25 - h * 2.3; const rr = Math.sin(Math.min(1, h * 1.3) * Math.PI * .85 + .25) * 1.15 * (.8 + rand() * .25); x = Math.cos(th) * rr; z = Math.sin(th) * rr; }
    a[i * 3] = x; a[i * 3 + 1] = y; a[i * 3 + 2] = z; } return a; })());
  // NEURAL NET: layers of neurons with weights between them
  shapes.push((() => { const a = new Float32Array(N * 3), L = [5, 8, 8, 3], xs = [-2.1, -.7, .7, 2.1], nodes = [];
    L.forEach((n, li) => { for (let j = 0; j < n; j++) nodes.push([xs[li], (j - (n - 1) / 2) * .42, li]); });
    const ed = []; for (const p of nodes) for (const q of nodes) if (q[2] === p[2] + 1) ed.push([p, q]);
    const perNode = 40; let i = 0;
    for (const p of nodes) for (let k = 0; k < perNode && i < N; k++, i++) { const th = rand() * 6.28, ph = Math.acos(2 * rand() - 1), r = .11; a[i * 3] = p[0] + r * Math.sin(ph) * Math.cos(th); a[i * 3 + 1] = p[1] + r * Math.cos(ph); a[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th); }
    for (let e = 0; i < N; i++, e++) { const [p, q] = ed[e % ed.length], t = rand(); a[i * 3] = lerp(p[0], q[0], t); a[i * 3 + 1] = lerp(p[1], q[1], t); a[i * 3 + 2] = 0; }
    return a; })());
  // AI AGENT: a core with tools in orbit
  shapes.push((() => { const a = new Float32Array(N * 3); let i = 0; const core = 1300;
    for (; i < core; i++) { const y = 1 - 2 * (i + .5) / core, r = Math.sqrt(1 - y * y), th = i * 2.39996; a[i * 3] = Math.cos(th) * r * .8; a[i * 3 + 1] = y * .8; a[i * 3 + 2] = Math.sin(th) * r * .8; }
    const tools = 6, per = 110;
    for (let t = 0; t < tools; t++) { const ang = t / tools * 6.28, cx = Math.cos(ang) * 2.1, cz = Math.sin(ang) * 2.1, cy = Math.sin(ang * 2) * .35;
      for (let k = 0; k < per; k++, i++) { const th = rand() * 6.28, ph = Math.acos(2 * rand() - 1), r = .2; a[i * 3] = cx + r * Math.sin(ph) * Math.cos(th); a[i * 3 + 1] = cy + r * Math.cos(ph); a[i * 3 + 2] = cz + r * Math.sin(ph) * Math.sin(th); }
      for (let k = 0; k < 60; k++, i++) { const tt = k / 60 * .75 + .2; a[i * 3] = cx * tt; a[i * 3 + 1] = cy * tt; a[i * 3 + 2] = cz * tt; } }
    for (let k = 0; i < N; i++, k++) { const th = k * .013; a[i * 3] = Math.cos(th) * 2.1; a[i * 3 + 1] = Math.sin(th * 2) * .35; a[i * 3 + 2] = Math.sin(th) * 2.1; }
    return a; })());

  const cur = new Float32Array(shapes[0]), speed = new Float32Array(N).map(() => .03 + rand() * .07);
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(cur, 3));
  const pal = [C.ink, C.ink, C.ink, C.blue, C.tomato].map((c) => new THREE.Color(c)), col = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { const c = pal[(rand() * pal.length) | 0]; col.set([c.r, c.g, c.b], i * 3); }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: .075, vertexColors: true, sizeAttenuation: true }));
  const group = new THREE.Group(); group.add(pts); scene.add(group); group.rotation.set(.35, -.6, 0);

  const nameEl = document.getElementById('shape-name'), dotsEl = document.getElementById('shape-dots');
  dotsEl.innerHTML = S.shapes.map((s) => `<button type="button" aria-label="${s.name}" title="${s.name}"></button>`).join('');
  const lineEl = document.getElementById('shape-line');
  const dots = [...dotsEl.children];
  let shape = 0, lastUser = -1e9;
  function go(i) {
    shape = (i + shapes.length) % shapes.length;
    nameEl.textContent = S.shapes[shape].name; lineEl.textContent = S.shapes[shape].line; nameEl.style.animation = 'none'; void nameEl.offsetWidth; nameEl.style.animation = '';
    dots.forEach((d, k) => d.classList.toggle('on', k === shape));
  }
  go(0);
  dots.forEach((d, k) => d.addEventListener('click', (e) => { e.stopPropagation(); lastUser = performance.now(); go(k); }));
  // drag to spin, click to reshape
  let down = null, rx = .35, ry = -.6, vx = 0, vy = 0;
  host.addEventListener('pointerdown', (e) => { if (e.target.closest('button')) return; down = { x: e.clientX, y: e.clientY, rx, ry, moved: false }; host.setPointerCapture(e.pointerId); });
  host.addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - down.x, dy = e.clientY - down.y; if (Math.abs(dx) + Math.abs(dy) > 4) down.moved = true; ry = down.ry + dx * .01; rx = clamp(down.rx + dy * .01, -1, 1.2); });
  host.addEventListener('pointerup', () => { if (down && !down.moved) { lastUser = performance.now(); go(shape + 1); } down = null; });
  let lastSwap = performance.now();
  st.tick = (t) => {
    const tg = shapes[shape];
    for (let i = 0; i < N; i++) { const k = speed[i]; for (let j = 0; j < 3; j++) { const q = i * 3 + j; cur[q] += (tg[q] - cur[q]) * k; } }
    if (shape === 1) for (let i = 0; i < N; i++) cur[i * 3 + 1] += Math.sin(t * 2 + cur[i * 3] * 2 + cur[i * 3 + 2]) * .004;
    geo.attributes.position.needsUpdate = true;
    if (!down && !reduce) ry += .0035;
    group.rotation.x += (rx - group.rotation.x) * .1; group.rotation.y += (ry - group.rotation.y) * .1;
    const now = performance.now();
    if (!reduce && now - lastUser > 7000 && now - lastSwap > 4200) { lastSwap = now; go(shape + 1); }
    if (now - lastUser < 7000) lastSwap = now;
  };
})();

/* =====================================================================
   2) WHAT'S UNDER MY TITLE: the title is the tip; my work is underneath
   ===================================================================== */
(function dive() {
  const canvas = document.getElementById('ice3d'); if (!canvas) return;
  const host = canvas.parentElement;
  const st = stage({ host, canvas, bg: C.paper, fov: 45 }); if (!st) return;
  const { scene, camera } = st;
  scene.fog = new THREE.Fog(C.paper, 10, 30);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8890c0, 1.5));
  const sun = new THREE.DirectionalLight(0xffffff, 1.5); sun.position.set(4, 8, 6); scene.add(sun);

  // water
  const wGeo = new THREE.PlaneGeometry(60, 60, 70, 70); wGeo.rotateX(-Math.PI / 2);
  const base = wGeo.attributes.position.array.slice();
  scene.add(new THREE.Mesh(wGeo, new THREE.MeshBasicMaterial({ color: C.blue, transparent: true, opacity: .28, side: THREE.DoubleSide, depthWrite: false })));
  scene.add(new THREE.Mesh(wGeo, new THREE.MeshBasicMaterial({ color: C.ink, wireframe: true, transparent: true, opacity: .18 })));

  // the iceberg
  const prof = [[0, 1.6], [.45, 1.25], [.8, .7], [1.05, .1], [1.6, -.6], [2.35, -1.9], [2.6, -3.1], [2.4, -4.4], [1.7, -5.5], [.6, -6.2], [0, -6.3]].map(([r, y]) => new THREE.Vector2(r, y));
  const ig = new THREE.LatheGeometry(prof, 9).toNonIndexed(), p = ig.attributes.position;
  const h3 = (x, y, z) => { const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453; return s - Math.floor(s); };
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), r = Math.hypot(x, z); if (r < .01) continue;
    const n = (h3(Math.round(x * 100), Math.round(y * 100), Math.round(z * 100)) - .5) * .5;
    p.setXYZ(i, x * (1 + n / r * .9), y + n * .3, z * (1 + n / r * .9));
  }
  ig.computeVertexNormals();
  const bergMat = new THREE.MeshLambertMaterial({ color: C.ice, flatShading: true, transparent: true, opacity: .42, depthWrite: false, side: THREE.DoubleSide });
  const berg = new THREE.Mesh(ig, bergMat); edges(berg, C.ink, .5);
  const bergG = new THREE.Group(); bergG.add(berg); scene.add(bergG);

  // one tier of glowing blocks per layer of my story (the finale step has no tier)
  const layers = S.dive.filter((d) => !d.finale);
  const ys = [2.5, -.8, -2.0, -3.15, -4.25, -5.35];
  const cols = [C.lime, C.lime, C.tomato, C.blue, C.pink, C.paper];
  const linkMat = new THREE.LineBasicMaterial({ color: C.ink, transparent: true, opacity: .55 });
  const tiers = layers.map((d, ti) => {
    const n = Math.max(1, d.items.length), items = [], rad = n === 1 ? 0 : [0, .75, 1.05, 1.3, 1.25, 1.1][ti] || 1;
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2 + ti * .9, sz = ti === 0 ? .5 : ti === layers.length - 1 ? .46 : .36;
      const mat = new THREE.MeshLambertMaterial({ color: cols[ti % cols.length], flatShading: true, transparent: true, emissive: cols[ti % cols.length], emissiveIntensity: 0 });
      const m = new THREE.Mesh(new THREE.BoxGeometry(sz, sz, sz), mat); edges(m);
      m.position.set(Math.cos(a) * rad, (ys[ti] ?? -5) + (i % 2 ? .12 : -.12) * (n > 1), Math.sin(a) * rad);
      bergG.add(m); items.push(m);
    }
    // sonar ring that pulses out from the active tier
    const ring = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 64 }, (_, k) => new THREE.Vector3(Math.cos(k / 64 * 6.283), 0, Math.sin(k / 64 * 6.283)))),
      new THREE.LineBasicMaterial({ color: cols[ti % cols.length] === C.paper ? C.lime : cols[ti % cols.length], transparent: true, opacity: 0 }));
    ring.position.y = ys[ti] ?? -5; bergG.add(ring);
    return { items, d, ring };
  });
  for (let ti = 1; ti < tiers.length; ti++) tiers[ti].items.forEach((m, i) => {
    const up = tiers[ti - 1].items[i % tiers[ti - 1].items.length];
    bergG.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([up.position, m.position]), linkMat));
  });
  // labels: job title on the tip, metrics on the active tier, strata names like a cross-section
  const tip = label(st, S.title.toUpperCase() + ' · CVS HEALTH', 'metric'); tip.obj = tiers[0].items[0]; tip.pos.set(0, .55, 0);
  const metricLabels = [];
  tiers.forEach((t, ti) => t.d.items.forEach((it, i) => { const l = label(st, it.k + ' ' + (it.s || ''), 'metric'); l.obj = t.items[i]; l.pos.set(0, .42, 0); l.tier = ti; metricLabels.push(l); }));
  const strata = tiers.map((t, ti) => { const l = label(st, t.d.strata || '', 'strata'); l.pos.set(2.9, ys[ti], 0); return l; });

  // bubbles + splash rings
  const BN = 300, bp = new Float32Array(BN * 3), bv = new Float32Array(BN);
  for (let i = 0; i < BN; i++) { bp.set([(rand() - .5) * 16, -rand() * 9, (rand() - .5) * 10], i * 3); bv[i] = .012 + (i % 5) * .003; }
  const bGeo = new THREE.BufferGeometry(); bGeo.setAttribute('position', new THREE.BufferAttribute(bp, 3));
  scene.add(new THREE.Points(bGeo, new THREE.PointsMaterial({ color: 0xffffff, size: .07, transparent: true, opacity: .85 })));
  const ripples = [0, 1, 2].map(() => { const r = new THREE.Mesh(new THREE.RingGeometry(.92, 1, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide })); r.rotation.x = -Math.PI / 2; r.position.y = .02; scene.add(r); return r; });
  let splashT = -10;
  const flash = document.getElementById('dive-flash');
  function splash(t) {
    splashT = t;
    if (!reduce) { flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go'); }
    // burst of bubbles around the camera
    for (let i = 0; i < BN; i += 2) { bp[i * 3] = camera.position.x + (rand() - .5) * 6; bp[i * 3 + 1] = -.3 - rand() * 2.5; bp[i * 3 + 2] = (rand() - .5) * 6 + 1; bv[i] = .03 + rand() * .05; }
  }

  const sky = new THREE.Color(C.paper), deep = new THREE.Color(C.deep), tmp = new THREE.Color();
  const camPos = new THREE.Vector3(1.2, 3.4, 8.8), look = new THREE.Vector3(0, 2.4, 0), wantPos = new THREE.Vector3(), wantLook = new THREE.Vector3();
  let wasUnder = false;
  st.tick = (t) => {
    const prog = window.diveProgress || 0, step = window.diveStep || 0, N = S.dive.length, finale = !!(S.dive[step] && S.dive[step].finale);
    // follow the layers; on the finale, pull back to show the whole iceberg
    const f = clamp(prog * N - .5, 0, layers.length - 1), i0 = Math.floor(f), i1 = Math.min(layers.length - 1, i0 + 1);
    const ty = lerp(ys[i0], ys[i1], f - i0);
    if (finale) { wantPos.set(7.5, -1.2, 13.5); wantLook.set(0, -2.2, 0); }
    else { wantPos.set(Math.sin(t * .15) * .7 + 1.2, ty + .9, step === 0 ? 8.8 : 6.4); wantLook.set(0, ty - .1, 0); }
    camPos.lerp(wantPos, .07); look.lerp(wantLook, .08);
    camera.position.copy(camPos); camera.lookAt(look);
    // waterline crossing = splash
    const under = camPos.y < .05;
    if (under !== wasUnder) { wasUnder = under; host.parentElement.classList.toggle('under', under); if (under) splash(t); else splashT = t; }
    const u = clamp((.35 - camPos.y) / 1.2, 0, 1);
    tmp.copy(sky).lerp(deep, u); scene.background.copy(tmp); scene.fog.color.copy(tmp);
    scene.fog.near = lerp(12, finale ? 9 : 4, u); scene.fog.far = lerp(32, finale ? 30 : 16, u);
    const a = wGeo.attributes.position.array;
    for (let i = 0; i < a.length; i += 3) a[i + 1] = base[i + 1] + Math.sin(base[i] * .6 + t * 1.4) * .08 + Math.cos(base[i + 2] * .5 + t) * .08;
    wGeo.attributes.position.needsUpdate = true;
    ripples.forEach((r, k) => { const e = t - splashT - k * .25; const on = e > 0 && e < 2.2; r.visible = on; if (on) { r.scale.setScalar(.5 + e * 3.2); r.material.opacity = (1 - e / 2.2) * .8; } });
    bergG.rotation.y = t * .07; bergG.position.y = Math.sin(t * .8) * .06;
    const b = bGeo.attributes.position.array;
    for (let i = 0; i < BN; i++) { b[i * 3 + 1] += bv[i]; if (b[i * 3 + 1] > -.1) { b[i * 3 + 1] = -9; bv[i] = .012 + (i % 5) * .003; } }
    bGeo.attributes.position.needsUpdate = true;
    tiers.forEach((tr, i) => {
      const hot = finale || i === step, dim = !finale && step > 0 && !hot;
      tr.items.forEach((m, k) => {
        const s = hot ? (finale ? 1.15 : 1.35 + Math.sin(t * 4 + k) * .08) : 1;
        m.scale.setScalar(m.scale.x + (s - m.scale.x) * .15); if (hot) m.rotation.y += .02;
        m.material.emissiveIntensity += ((hot ? .55 + Math.sin(t * 5 + k) * .15 : 0) - m.material.emissiveIntensity) * .1;
        m.material.opacity += ((dim ? .35 : 1) - m.material.opacity) * .1;
      });
      const e = ((t * .7) % 1); tr.ring.visible = hot && !reduce;
      tr.ring.scale.setScalar(.4 + e * 3.2); tr.ring.material.opacity = (1 - e) * .9;
      strata[i].el.classList.toggle('hot', hot && !finale || (finale && false));
      strata[i].hide = camPos.y > .4 && !finale;
    });
    tip.hide = step > 1 && !finale;
    metricLabels.forEach((l) => (l.hide = finale || l.tier !== step));
  };
})();

/* =====================================================================
   3) AGENT: a core that thinks, with tools in orbit that light up
   ===================================================================== */
(function agent() {
  const host = document.getElementById('agent3d'); if (!host) return;
  const st = stage({ host, bg: C.deep, fov: 42 }); if (!st) return;
  const { scene, camera } = st;
  camera.position.set(0, 3.2, 8.6); camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x404880, 1.8));
  const dl = new THREE.DirectionalLight(0xffffff, 1.4); dl.position.set(3, 6, 5); scene.add(dl);

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 0), new THREE.MeshLambertMaterial({ color: C.lime, flatShading: true }));
  edges(core, C.ink); scene.add(core);
  const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.45, 1), new THREE.MeshBasicMaterial({ color: C.paper, wireframe: true, transparent: true, opacity: .15 }));
  scene.add(shell);
  const coreLabel = label(st, 'AGENT', 'agent-core'); coreLabel.pos.set(0, 1.6, 0);

  const orbit = new THREE.Group(); scene.add(orbit);
  const R = 3.3, ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 121 }, (_, i) => new THREE.Vector3(Math.cos(i / 120 * 6.283) * R, 0, Math.sin(i / 120 * 6.283) * R))), new THREE.LineDashedMaterial({ color: C.paper, dashSize: .15, gapSize: .12, transparent: true, opacity: .45 }));
  ring.computeLineDistances(); orbit.add(ring);
  const geos = [new THREE.OctahedronGeometry(.42), new THREE.BoxGeometry(.6, .6, .6), new THREE.TetrahedronGeometry(.5), new THREE.DodecahedronGeometry(.42), new THREE.CylinderGeometry(.35, .35, .55, 6), new THREE.TorusGeometry(.3, .12, 6, 12)];
  const cols = [C.pink, C.paper, C.blue, 0x7fd3ff, C.tomato, C.lime];
  const tools = S.tools.map((name, i) => {
    const a = i / S.tools.length * Math.PI * 2;
    const m = new THREE.Mesh(geos[i % geos.length], new THREE.MeshLambertMaterial({ color: cols[i % cols.length], flatShading: true }));
    m.position.set(Math.cos(a) * R, Math.sin(a * 2) * .3, Math.sin(a) * R); edges(m, C.ink); orbit.add(m);
    const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), m.position.clone()]);
    const line = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: C.paper, transparent: true, opacity: .2 })); orbit.add(line);
    const l = label(st, name); l.obj = m; l.pos.set(0, .7, 0);
    return { name, m, line, l, heat: 0, base: cols[i % cols.length] };
  });
  // a pulse that travels along the active edge
  const pulse = new THREE.Mesh(new THREE.SphereGeometry(.13, 12, 12), new THREE.MeshBasicMaterial({ color: C.lime })); pulse.visible = false; orbit.add(pulse);
  let active = null, dir = 1, pt = 0, think = 0, celebrate = 0;
  addEventListener('agent:tool', (e) => {
    const tl = tools.find((x) => x.name === e.detail.tool); if (!tl) return;
    active = tl; dir = e.detail.phase === 'call' ? 1 : -1; pt = 0; pulse.visible = true;
    pulse.material.color.set(dir > 0 ? C.lime : C.tomato);
  });
  addEventListener('agent:think', () => (think = 1));
  addEventListener('agent:reset', () => { active = null; pulse.visible = false; });
  addEventListener('agent:answer', () => (celebrate = 1));

  // a field of dim "data" specks
  const SN = 400, sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) { const r = 6 + rand() * 10, th = rand() * 6.28, ph = Math.acos(2 * rand() - 1); sp.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)], i * 3); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const specks = new THREE.Points(sg, new THREE.PointsMaterial({ color: C.paper, size: .05, transparent: true, opacity: .6 })); scene.add(specks);

  let mx = 0, my = 0;
  host.addEventListener('pointermove', (e) => { const r = host.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width - .5; my = (e.clientY - r.top) / r.height - .5; });
  const hot = new THREE.Color(C.tomato), tmp = new THREE.Color();
  st.tick = (t) => {
    orbit.rotation.y = reduce ? 0 : t * .12;
    core.rotation.x += .004 + think * .05; core.rotation.y += .006 + think * .07; think *= .97;
    shell.rotation.y -= .003; shell.scale.setScalar(1 + Math.sin(t * 2) * .03 + celebrate * .4); celebrate *= .95;
    specks.rotation.y = t * .02;
    camera.position.x += (mx * 3 - camera.position.x) * .05; camera.position.y += (3.2 - my * 2 - camera.position.y) * .05; camera.lookAt(0, 0, 0);
    tools.forEach((tl) => {
      const on = tl === active; tl.heat += ((on ? 1 : 0) - tl.heat) * .08;
      tl.m.material.color.copy(tmp.set(tl.base).lerp(hot, tl.heat));
      tl.m.scale.setScalar(1 + tl.heat * .5 + celebrate * .3); tl.m.rotation.x += .01 + tl.heat * .06; tl.m.rotation.y += .013;
      tl.line.material.opacity = .2 + tl.heat * .8; tl.line.material.color.set(on ? C.lime : C.paper);
      tl.l.el.classList.toggle('hot', tl.heat > .5);
    });
    if (active && pulse.visible) {
      pt = Math.min(1, pt + .025); const k = dir > 0 ? pt : 1 - pt;
      pulse.position.copy(active.m.position).multiplyScalar(k);
      if (pt >= 1) { pulse.visible = false; if (dir < 0) active = null; }
    }
  };
})();


/* =====================================================================
   4) SKILLS: a constellation of skills wired to where I used them
   ===================================================================== */
(function skills() {
  const host = document.getElementById('skills3d'); if (!host) return;
  const st = stage({ host, bg: C.paper2, fov: 40 }); if (!st) return;
  const { scene, camera } = st;
  camera.position.set(0, 1.6, 12.6); camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x999999, 1.8));
  const dl = new THREE.DirectionalLight(0xffffff, 1.2); dl.position.set(3, 5, 6); scene.add(dl);
  const CAT = { 'AI & LLM': C.tomato, 'Data Engineering': C.lime, 'Cloud & DevOps': 0x7fd3ff, 'Languages': C.pink, 'Analytics & ML': 0xc9b8ff };
  const g = new THREE.Group(); scene.add(g);

  // companies: a ring of boxes in the middle
  const orgKeys = Object.keys(S.orgs), orgs = {};
  orgKeys.forEach((k, i) => {
    const a = i / orgKeys.length * Math.PI * 2;
    const m = new THREE.Mesh(new THREE.BoxGeometry(.42, .42, .42), new THREE.MeshLambertMaterial({ color: C.ink, flatShading: true, emissive: C.lime, emissiveIntensity: 0 }));
    m.position.set(Math.cos(a) * 2.0, (i % 2 ? .35 : -.35), Math.sin(a) * 2.0); edges(m, C.lime, .8); g.add(m);
    const l = label(st, S.orgs[k].name, 'org'); l.obj = m; l.pos.set(0, .46, 0);
    orgs[k] = { m, l };
  });
  // skills on a sphere, grouped into latitude bands by category so clusters read
  const sk = S.skills, n = sk.length, order = sk.map((x, i) => i).sort((a, b) => S.categories.indexOf(sk[a].cat) - S.categories.indexOf(sk[b].cat) || a - b);
  const nodes = [], lines = [];
  order.forEach((i, k) => {
    const y = 1 - 2 * (k + .5) / n, r = Math.sqrt(1 - y * y), th = k * 2.39996, R = 4.5;
    const pos = new THREE.Vector3(Math.cos(th) * r * R, y * R * .82, Math.sin(th) * r * R);
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(.14), new THREE.MeshLambertMaterial({ color: CAT[sk[i].cat] || C.lime, flatShading: true }));
    m.position.copy(pos); edges(m, C.ink); g.add(m);
    const l = label(st, sk[i].name, 'sk' + (sk[i].r.length ? '' : ' tool')); l.obj = m; l.pos.set(0, .26, 0);
    l.el.addEventListener('click', () => dispatchEvent(new CustomEvent('skill:pick', { detail: { i } })));
    const used = [...new Set(sk[i].r.map((x) => x[0]))];
    const ls = used.map((o) => { const ln = new THREE.Line(new THREE.BufferGeometry().setFromPoints([pos, orgs[o].m.position]), new THREE.LineBasicMaterial({ color: C.ink, transparent: true, opacity: .12 })); g.add(ln); return { ln, o }; });
    nodes[i] = { m, l, pos, used, ls };
  });

  let sel = -1, ry = 0, rx = .12, targetRy = null, down = null, last = 0;
  addEventListener('skill:select', (e) => {
    sel = e.detail.i; const p = nodes[sel].pos;
    let want = Math.atan2(-p.x, p.z);              // rotate so the skill faces the camera
    while (want - ry > Math.PI) want -= Math.PI * 2; while (want - ry < -Math.PI) want += Math.PI * 2;
    targetRy = want;
  });
  host.addEventListener('pointerdown', (e) => { if (e.target.closest('.label3d')) return; down = { x: e.clientX, y: e.clientY, ry, rx }; targetRy = null; host.setPointerCapture(e.pointerId); });
  host.addEventListener('pointermove', (e) => { if (!down) return; ry = down.ry + (e.clientX - down.x) * .008; rx = clamp(down.rx + (e.clientY - down.y) * .006, -.6, .6); });
  host.addEventListener('pointerup', () => { down = null; last = performance.now(); });
  const v3 = new THREE.Vector3();
  st.tick = (t) => {
    if (targetRy != null) { ry += (targetRy - ry) * .06; if (Math.abs(targetRy - ry) < .002) targetRy = null; }
    else if (!down && !reduce && performance.now() - last > 2500) ry += .0025;
    g.rotation.y = ry; g.rotation.x += (rx - g.rotation.x) * .1;
    const hotOrgs = sel >= 0 ? new Set(nodes[sel].used) : new Set();
    nodes.forEach((nd, i) => {
      const on = i === sel;
      nd.m.scale.setScalar(nd.m.scale.x + ((on ? 2.2 : 1) - nd.m.scale.x) * .12); nd.m.rotation.y += on ? .05 : .01;
      nd.ls.forEach(({ ln }) => { ln.material.opacity += ((on ? 1 : sel >= 0 ? .05 : .12) - ln.material.opacity) * .1; ln.material.color.set(on ? C.tomato : C.ink); });
      nd.l.el.classList.toggle('hot', on);
      // fade labels on the far side of the sphere
      nd.m.getWorldPosition(v3); const depth = clamp((v3.z + 4.5) / 9, 0, 1);
      nd.l.el.style.opacity = on ? 1 : (.25 + depth * .75).toFixed(2);
      nd.l.el.style.zIndex = on ? 6 : Math.round(depth * 4);
    });
    Object.entries(orgs).forEach(([k, o]) => {
      const on = hotOrgs.has(k);
      o.m.material.emissiveIntensity += ((on ? .9 : 0) - o.m.material.emissiveIntensity) * .1;
      o.m.scale.setScalar(o.m.scale.x + ((on ? 1.35 : 1) - o.m.scale.x) * .1); o.m.rotation.y += .01;
      o.l.el.classList.toggle('hot', on); o.l.hide = sel >= 0 && !on;
    });
  };
})();

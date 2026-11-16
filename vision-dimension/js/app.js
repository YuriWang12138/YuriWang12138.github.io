(function () {
'use strict';
var D = window.VD, $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var ASSETS = window.VD_ASSETS || {}, asset = function (p) { return ASSETS[p] || p; };
var TAU = Math.PI * 2, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, reduce ? 0 : ms); }); };
var lerp = function (a, b, k) { return a + (b - a) * k; }, clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
var easeOut = function (k) { return 1 - Math.pow(1 - k, 3); }, easeIn = function (k) { return k * k * k; }, easeIO = function (k) { return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
function tween(ms, fn) { return new Promise(function (res) { if (reduce) { fn(1); return res(); } var t0 = performance.now(); (function step(t) { var k = clamp((t - t0) / ms, 0, 1); fn(k); k < 1 ? requestAnimationFrame(step) : res(); })(t0); }); }
var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
var byId = {}; D.members.forEach(function (m) { byId[m.id] = m; });
var levelName = function (a) { return a.level === '国赛' ? '全国总决赛' : (a.comp === 'lnwc' ? '省赛' : '辽宁赛区'); };
var prizeText = function (a) { return a.prize + (a.n > 1 ? ' ×' + a.n : ''); };
var ICON = {
  flag: 'M5 21V4h11l-2 4 2 4H5', eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zm10 3a3 3 0 100-6 3 3 0 000 6z',
  users: 'M16 19v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1M9.5 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM21 19v-1a4 4 0 00-3-3.8M15.5 3.2a3.5 3.5 0 010 6.6',
  trophy: 'M8 21h8m-4-4v4M7 4h10v5a5 5 0 01-10 0V4zm0 2H4v1a3 3 0 003 3m10-4h3v1a3 3 0 01-3 3', layout: 'M4 4h16v16H4zM4 10h16M10 10v10',
  cursor: 'M5 3l14 7-6 2-2 6zM14 14l5 5', film: 'M4 5h16v14H4zM8 5v14M16 5v14M4 9h4m8 0h4M4 15h4m8 0h4',
  cube: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 9l8-4.5M12 12v9m0-9L4 7.5', chat: 'M4 5h16v11H9l-5 4V5zM8 9.5h8M8 12.5h5',
  pen: 'M4 20l1-5L16 4l4 4L9 19l-5 1zM14 6l4 4', megaphone: 'M4 10v4h3l8 5V5L7 10H4zm14-1a4 4 0 010 6',
  spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16z',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01', box: 'M3 8l9-5 9 5v8l-9 5-9-5V8zm0 0l9 5 9-5M12 13v8'
};
function awardsOf(m) { return D.awards.filter(function (a) { return m.guidesAll || a.by.indexOf(m.id) >= 0; }); }
function tally(list) { var t = { 国赛: 0, 省赛: 0 }; list.forEach(function (a) { t[a.level] += a.n || 1; }); return t; }

/* ================= static sections ================= */
(function buildStatic() {
  var t = tally(D.awards), workIds = Object.keys(D.works);
  $('#stats').innerHTML = [[t['国赛'], '全国总决赛奖项'], [t['省赛'], '省级赛事奖项'], [D.mentorAwards.length, '优秀指导教师'], [workIds.length, '获奖作品']]
    .map(function (s) { return '<li><b data-n="' + s[0] + '">0</b><span>' + s[1] + '</span></li>'; }).join('');
  var mq = workIds.map(function (w) { return '<span>《' + esc(D.works[w]) + '》</span><i>✦</i>'; }).join('');
  $('#marquee').innerHTML = mq + mq;

  var o = D.org;
  $('#orgTree').innerHTML =
    '<div class="org-tier reveal"><p class="org-label"><em>01</em>指导教师<i>GUIDANCE</i></p><div class="org-row">' +
    o.mentors.map(function (n) { return '<div class="org-node mentor"><span class="tag">指导教师</span><b>' + n + '</b></div>'; }).join('') + '</div></div>' +
    '<div class="org-tier reveal"><p class="org-label"><em>02</em>社长团 · 核心成员<i>LEADERSHIP</i></p><div class="org-row">' +
    o.leaders.map(function (l) { return '<div class="org-node"><span class="tag">' + l.tag + '</span><b>' + l.name + '</b><small>' + l.duty + '</small></div>'; }).join('') + '</div></div>' +
    '<div class="org-tier reveal"><p class="org-label"><em>03</em>下设部门<i>DEPARTMENTS</i></p><div class="org-depts">' +
    o.depts.map(function (d) { return '<div class="dept"><em>' + (d.n < 10 ? '0' : '') + d.n + '<small>人</small></em><small>' + d.en + '</small><h3>' + d.name + '</h3><ul>' + d.keys.map(function (k) { return '<li>' + k + '</li>'; }).join('') + '</ul></div>'; }).join('') + '</div></div>';

  $('#works').innerHTML = workIds.map(function (w, i) {
    var as = D.awards.filter(function (a) { return a.work === w; }), names = [];
    as.forEach(function (a) { a.by.forEach(function (id) { if (names.indexOf(byId[id].name) < 0) names.push(byId[id].name); }); });
    return '<li><em>' + (i < 9 ? '0' : '') + (i + 1) + '</em><div><h3>《' + esc(D.works[w]) + '》</h3><p>' + names.join(' · ') + '　指导教师 王诗凯</p></div><div class="badges">' +
      as.map(function (a) { return '<span class="badge ' + (a.level === '国赛' ? (a.prize === '一等奖' ? 'g1' : 'g2') : '') + '">' + D.comps[a.comp].short + ' · ' + levelName(a) + '<b>' + prizeText(a) + '</b></span>'; }).join('') + '</div></li>';
  }).join('');
})();

/* ================= certificates + lightbox ================= */
var CERTS = [];
D.awards.forEach(function (a) { a.certs.forEach(function (c) { CERTS.push({ id: c, comp: a.comp, title: D.comps[a.comp].short + ' · ' + levelName(a) + a.prize, sub: '《' + D.works[a.work] + '》', by: a.by, award: true }); }); });
D.mentorAwards.forEach(function (a) { CERTS.push({ id: a.cert, comp: a.comp, mentor: true, title: D.comps[a.comp].short + ' · ' + levelName(a) + '优秀指导教师', sub: '王诗凯' + (a.work ? ' · 《' + D.works[a.work] + '》' : ''), by: ['wsk'] }); });
function certHtml(c, i) { return '<figure class="cert" tabindex="0" role="button" data-i="' + i + '" data-comp="' + c.comp + '" data-mentor="' + (c.mentor ? 1 : 0) + '"><div class="ph"><img loading="lazy" src="' + asset('assets/img/certs/' + c.id + '-thumb.webp') + '" alt="' + esc(c.title + ' ' + c.sub) + '"></div><figcaption><b>' + esc(c.title) + '</b><span>' + esc(c.sub) + '</span></figcaption></figure>'; }
(function buildCerts() {
  $('#certGrid').innerHTML = CERTS.map(certHtml).join('');
  var fs = [['all', '全部 ' + CERTS.length]].concat(Object.keys(D.comps).map(function (k) { return [k, D.comps[k].short]; })).concat([['mentor', '优秀指导教师']]);
  $('#filters').innerHTML = fs.map(function (f, i) { return '<button type="button" data-f="' + f[0] + '"' + (i ? '' : ' class="on"') + '>' + f[1] + '</button>'; }).join('');
  $('#filters').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    $$('#filters button').forEach(function (x) { x.classList.toggle('on', x === b); });
    var f = b.dataset.f;
    $$('#certGrid .cert').forEach(function (el) { el.classList.toggle('hide', !(f === 'all' || (f === 'mentor' ? el.dataset.mentor === '1' : el.dataset.comp === f && el.dataset.mentor !== '1'))); });
  });
})();
var LB = { list: [], i: 0, el: $('#lightbox') };
function lbShow(i) { LB.i = (i + LB.list.length) % LB.list.length; var c = LB.list[LB.i]; $('#lbImg').src = asset('assets/img/certs/' + c.id + '.webp'); $('#lbCap').textContent = c.title + '　' + c.sub; }
function lbOpen(list, i) { LB.list = list; lbShow(i); LB.el.classList.add('on'); LB.el.setAttribute('aria-hidden', 'false'); }
function lbClose() { LB.el.classList.remove('on'); LB.el.setAttribute('aria-hidden', 'true'); }
LB.el.addEventListener('click', function (e) { if (e.target.closest('.lb-prev')) lbShow(LB.i - 1); else if (e.target.closest('.lb-next')) lbShow(LB.i + 1); else if (e.target.id !== 'lbImg') lbClose(); });
document.addEventListener('click', function (e) {
  var c = e.target.closest('.cert'); if (!c) return;
  var scope = c.parentNode, items = $$('.cert:not(.hide)', scope);
  lbOpen(items.map(function (el) { return CERTS[+el.dataset.i]; }), items.indexOf(c));
});

/* ================= cards ================= */
var stage = $('#stage'), cardsEl = $('#cards'), N = D.members.length;
cardsEl.innerHTML = D.members.map(function (m, i) {
  var t = tally(awardsOf(m)), th = m.theme;
  return '<article class="card' + (m.light ? ' light' : '') + '" tabindex="-1" role="button" aria-label="' + m.name + ' · ' + m.role + '" data-i="' + i + '" style="--c1:' + th[0] + ';--c2:' + th[1] + ';--c3:' + th[2] + ';--tx:' + th[3] + '"><div class="card-in">' +
    '<div class="card-art"><div class="hill"></div><div class="hill"></div><img class="card-portrait" src="' + asset('assets/img/members/' + m.key + '-card.webp') + '" alt="' + m.name + '" draggable="false"><div class="fade"></div></div>' +
    '<header class="card-head"><div class="card-avatar"><img src="' + asset('assets/img/members/' + m.key + '-avatar.webp') + '" alt="" draggable="false"></div><div class="card-ribbon"><span class="card-class">' + m.role + ' — ' + m.roleEn + '</span><strong class="card-name">' + m.name + '</strong></div></header>' +
    '<div class="card-body"><div class="card-rows">' + m.info.map(function (r) { return '<span>' + r[0] + '：<b>' + r[1] + '</b></span>'; }).join('') + '<span>分工：<b>' + (m.dutyShort || m.duty) + '</b></span><span>战绩：<b class="stars">国赛' + t['国赛'] + ' · 省赛' + t['省赛'] + '</b></span></div>' +
    '<ul class="card-skills">' + m.skills.map(function (s) { return '<li><i><svg viewBox="0 0 24 24"><path d="' + ICON[s[0]] + '"/></svg></i>' + s[1] + '</li>'; }).join('') + '</ul>' +
    '<p class="card-flavor">“' + esc(m.flavor) + '”</p>' +
    '<footer class="card-foot"><span>VD-0' + (i + 1) + '<br>' + m.en + '</span>' + (m.sign ? '<img class="card-sign" src="' + asset('assets/img/sign/' + m.key + '.png') + '" alt="" draggable="false">' : '') + '</footer></div>' +
    '<div class="card-shine"></div></div></article>';
}).join('');
var cards = $$('.card', cardsEl), ring = { pos: 0, target: 0, mode: 'pack', focus: -1, drag: null, raf: 0, moved: false };
function cw() { return cards[0].offsetWidth; }
function ringTransform(i, spread) {
  var a = (i - ring.pos) * TAU / N, R = Math.min(stage.clientWidth * .36, cw() * 1.75) * (spread || 1);
  var z = Math.cos(a), k = (z + 1) / 2, x = Math.sin(a) * R, y = -(1 - k) * cw() * .34, s = .6 + .4 * k;
  return { z: z, k: k, css: 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) scale(' + s.toFixed(3) + ') rotateY(' + (-Math.sin(a) * 14).toFixed(1) + 'deg)' };
}
function applyRing() {
  cards.forEach(function (c, i) {
    var t = ringTransform(i);
    c.style.transform = t.css; c.style.zIndex = Math.round(t.z * 100) + 100; c.style.opacity = 1;
    c.style.filter = t.k > .97 ? '' : 'brightness(' + (.78 + .22 * t.k).toFixed(2) + ') saturate(' + (.8 + .2 * t.k).toFixed(2) + ')';
  });
}
function frontIndex() { return ((Math.round(ring.target) % N) + N) % N; }
function ringLoop(now) {
  ring.raf = 0; if (ring.mode !== 'ring') return;
  var dt = Math.min(.1, (now - (ring.last || now)) / 1000 || .016); ring.last = now;
  if (!ring.drag) ring.pos += (ring.target - ring.pos) * (1 - Math.exp(-dt * 8));
  if (Math.abs(ring.target - ring.pos) < .0005 && !ring.drag) ring.pos = ring.target;
  applyRing();
  if (ring.drag || ring.pos !== ring.target) ring.raf = requestAnimationFrame(ringLoop); else ring.last = 0;
}
function kick() { if (!ring.raf && ring.mode === 'ring') ring.raf = requestAnimationFrame(ringLoop); }
function rotateTo(i) { var d = ((i - ring.target) % N + N) % N; if (d > N / 2) d -= N; ring.target += d; cards.forEach(function (c) { c.classList.remove('t', 'hot'); }); kick(); }
function step(d) { if (ring.mode !== 'ring') return; ring.target = Math.round(ring.target) + d; cards.forEach(function (c) { c.classList.remove('t', 'hot'); }); kick(); }

function focusCard(i) {
  ring.mode = 'focus'; ring.focus = i; stage.classList.add('focus');
  var m = D.members[i], s = Math.min(1.42, stage.clientHeight * .9 / cards[0].offsetHeight);
  $('#focusRole').textContent = m.roleEn; $('#focusName').textContent = m.name; $('#focusDuty').textContent = m.role + ' · ' + m.duty;
  cards.forEach(function (c, j) {
    c.classList.add('t'); c.classList.remove('hot');
    if (j === i) { c.style.transform = 'translate3d(0,' + (-stage.clientHeight * .045).toFixed(0) + 'px,0) scale(' + s.toFixed(3) + ')'; c.style.zIndex = 300; c.style.filter = ''; }
    else { c.style.transform = ringTransform(j, 1.25).css; c.style.filter = 'blur(12px) brightness(.9)'; c.style.opacity = .55; }
  });
}
function unfocus() {
  if (ring.mode !== 'focus') return;
  stage.classList.remove('focus'); ring.mode = 'ring'; ring.focus = -1;
  cards.forEach(function (c) { c.classList.add('t'); }); applyRing();
  setTimeout(function () { if (ring.mode === 'ring') cards.forEach(function (c) { c.classList.remove('t'); }); }, 1000);
}
stage.addEventListener('pointerdown', function (e) {
  if (ring.mode !== 'ring' || e.target.closest('button')) return;
  ring.drag = { x: e.clientX, pos: ring.pos, t: performance.now(), vx: 0, lx: e.clientX, id: e.pointerId, card: e.target.closest('.card') };
  ring.moved = false; cards.forEach(function (c) { c.classList.remove('t'); });
});
window.addEventListener('pointermove', function (e) {
  var d = ring.drag;
  if (d && e.pointerId === d.id) {
    var dx = e.clientX - d.x; if (Math.abs(dx) > 6) { ring.moved = true; cards.forEach(function (c) { c.classList.remove('hot'); }); }
    if (ring.moved) { var R = Math.min(stage.clientWidth * .36, cw() * 1.75); ring.pos = d.pos - dx / (R * 1.15) * (N / TAU) * 1.2; d.vx = e.clientX - d.lx; d.lx = e.clientX; ring.target = ring.pos; kick(); }
    return;
  }
  var c = e.target.closest && e.target.closest('.card');
  cards.forEach(function (x) { if (x !== c) x.classList.remove('hot'); });
  if (!c || e.pointerType === 'touch') return;
  var i = +c.dataset.i, ok = ring.mode === 'focus' ? i === ring.focus : (ring.mode === 'ring' && i === frontIndex() && ring.pos === ring.target);
  if (!ok) { c.classList.remove('hot'); return; }
  var r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
  c.classList.add('hot'); c.style.setProperty('--ry', ((px - .5) * 16).toFixed(1) + 'deg'); c.style.setProperty('--rx', ((.5 - py) * 12).toFixed(1) + 'deg');
  c.style.setProperty('--mx', (px * 100).toFixed(0) + '%'); c.style.setProperty('--my', (py * 100).toFixed(0) + '%'); c.style.setProperty('--ang', ((px - .5) * 40).toFixed(0) + 'deg');
});
function endDrag(e) {
  var d = ring.drag; if (!d || e.pointerId !== d.id) return; ring.drag = null;
  if (ring.moved) { var R = Math.min(stage.clientWidth * .36, cw() * 1.75); ring.target = Math.round(ring.pos - d.vx * 6 / R * (N / TAU)); kick(); return; }
  if (d.card) { var i = +d.card.dataset.i; if (i === frontIndex() && Math.abs(ring.pos - ring.target) < .35) { ring.target = ring.pos = Math.round(ring.target); focusCard(i); } else rotateTo(i); }
}
window.addEventListener('pointerup', endDrag); window.addEventListener('pointercancel', endDrag);
stage.addEventListener('click', function (e) {
  if (ring.mode !== 'focus') return;
  var c = e.target.closest('.card');
  if (e.target.closest('#focusGo') || (c && +c.dataset.i === ring.focus)) { if (ring.justFocused) return; openProfile(ring.focus); }
  else unfocus();
});
/* the pointerup that focuses a card is followed by a click on the same card: ignore that one */
stage.addEventListener('pointerup', function () { ring.justFocused = ring.mode === 'focus' ? false : true; setTimeout(function () { ring.justFocused = false; }, 60); }, true);
$('#prevCard').onclick = function () { step(-1); }; $('#nextCard').onclick = function () { step(1); };
window.addEventListener('resize', function () { if (ring.mode === 'ring') applyRing(); else if (ring.mode === 'focus') focusCard(ring.focus); });

async function deal(fromPack) {
  ring.mode = 'deal'; ring.pos = ring.target = 0;
  var H = stage.clientHeight, w = cw();
  cards.forEach(function (c, i) { c.classList.remove('t'); c.style.filter = ''; c.style.opacity = 0; c.style.zIndex = 20 - i; c.style.transform = 'translate3d(0,' + (H * .3) + 'px,0) scale(.62)'; });
  await sleep(40);
  for (var i = 0; i < N; i++) {
    var c = cards[i], o = i - (N - 1) / 2;
    c.classList.add('t'); c.style.opacity = 1;
    c.style.transform = 'translate3d(' + (o * w * .2).toFixed(0) + 'px,' + (-H * .2 + Math.abs(o) * w * .05).toFixed(0) + 'px,0) scale(.72) rotate(' + (o * 6).toFixed(1) + 'deg)';
    await sleep(120);
  }
  await sleep(fromPack ? 520 : 300);
}
async function toRing() {
  stage.classList.add('opened', 'ring'); stage.classList.remove('opening'); $('#team').classList.add('opened'); ring.mode = 'ring'; setCardTabs(true);
  cards.forEach(function (c) { c.classList.add('t'); }); applyRing();
  await sleep(1050);
  if (ring.mode === 'ring') cards.forEach(function (c) { c.classList.remove('t'); });
}

/* ================= card pack (three.js) ================= */
var pack = { ok: false, state: 'idle', rot: 0, vel: 0, auto: true, lastTouch: 0, visible: false };
(function initPack() {
  var canvas = $('#packCanvas'), pull = $('#pull'), THREE = window.THREE;
  if (!THREE) return;
  var renderer; try { renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true }); } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
  var scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(28, 1, .1, 60); camera.position.z = 12.4;
  var W = 2.5, H = 4.2, T = .3, S0 = .075, S1 = .925, yTear = (S1 - .5) * H;

  // soft-box environment so the foil has something to reflect
  var ec = document.createElement('canvas'); ec.width = 512; ec.height = 256; var ex = ec.getContext('2d');
  var eg = ex.createLinearGradient(0, 0, 0, 256); eg.addColorStop(0, '#fff7ee'); eg.addColorStop(.32, '#8d86a8'); eg.addColorStop(.6, '#3a3348'); eg.addColorStop(1, '#6d5a58'); ex.fillStyle = eg; ex.fillRect(0, 0, 512, 256);
  [[40, 60, 46, 120, '#ffffff'], [150, 40, 26, 150, '#ffe3c4'], [250, 70, 60, 90, '#ffffff'], [360, 50, 30, 140, '#e9e2ff'], [450, 80, 40, 100, '#ffffff']].forEach(function (b) { ex.fillStyle = b[4]; ex.filter = 'blur(6px)'; ex.fillRect(b[0], b[1], b[2], b[3]); });
  var et = new THREE.CanvasTexture(ec); et.mapping = THREE.EquirectangularReflectionMapping; et.encoding = THREE.sRGBEncoding;
  scene.environment = new THREE.PMREMGenerator(renderer).fromEquirectangular(et).texture;
  var dl = new THREE.DirectionalLight(0xffffff, 1.1); dl.position.set(2.5, 3, 6); scene.add(dl, new THREE.AmbientLight(0xffffff, .35));

  function foil(back) {
    var c = document.createElement('canvas'); c.width = 1024; c.height = 1720; var x = c.getContext('2d'), w = 1024, h = 1720;
    var g = x.createLinearGradient(0, 0, w * .35, h); g.addColorStop(0, '#262250'); g.addColorStop(.36, '#5a4c95'); g.addColorStop(.62, '#b56a8c'); g.addColorStop(.84, '#e7935f'); g.addColorStop(1, '#f5c08a');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    for (var i = 0; i < 7; i++) { var sx = -200 + i * 210; var sg = x.createLinearGradient(sx, 0, sx + 160, 0); sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(.5, 'rgba(255,255,255,' + (.05 + (i % 3) * .035) + ')'); sg.addColorStop(1, 'rgba(255,255,255,0)'); x.save(); x.transform(1, 0, -.25, 1, 0, 0); x.fillStyle = sg; x.fillRect(sx, 0, 160, h); x.restore(); }
    var sh = h * S0;
    [[0, sh], [h - sh, h]].forEach(function (b) { x.fillStyle = 'rgba(20,14,40,.22)'; x.fillRect(0, b[0], w, sh); for (var y = b[0] + 6; y < b[1]; y += 13) { x.fillStyle = 'rgba(255,255,255,.28)'; x.fillRect(0, y, w, 3); x.fillStyle = 'rgba(10,6,30,.3)'; x.fillRect(0, y + 4, w, 3); } });
    x.globalCompositeOperation = 'destination-out'; x.beginPath();
    for (var tx = 0; tx < w; tx += 24) { x.moveTo(tx, 0); x.lineTo(tx + 12, 15); x.lineTo(tx + 24, 0); x.moveTo(tx, h); x.lineTo(tx + 12, h - 15); x.lineTo(tx + 24, h); }
    x.fill(); x.globalCompositeOperation = 'source-over';
    x.textAlign = 'center'; x.fillStyle = '#fff';
    var sp = function (v) { if ('letterSpacing' in x) x.letterSpacing = v; };
    if (!back) {
      x.save(); x.translate(w / 2, 560);
      x.save(); x.transform(1, -.2, 0, 1, 0, 0); var pg = x.createLinearGradient(0, -210, 0, 210); pg.addColorStop(0, 'rgba(255,255,255,.2)'); pg.addColorStop(.55, 'rgba(255,225,190,.85)'); pg.addColorStop(1, 'rgba(255,255,255,.25)'); x.fillStyle = pg; x.fillRect(-105, -220, 210, 440); x.restore();
      x.beginPath(); x.arc(0, 20, 78, Math.PI, 0); x.fillStyle = 'rgba(255,250,240,.95)'; x.fill();
      x.rotate(-.33); x.lineWidth = 9; x.strokeStyle = 'rgba(255,240,220,.95)'; x.beginPath(); x.ellipse(0, 0, 330, 118, 0, 0, TAU); x.stroke(); x.restore();
      x.font = '400 190px "VD Brush","KaiTi",serif'; sp('14px'); x.fillText('视像维度', w / 2 + 7, 1010);
      x.font = '500 50px "VD Latin",serif'; sp('15px'); x.fillText('VISION DIMENSION', w / 2 + 7, 1100);
      x.globalAlpha = .9; x.lineWidth = 2.5; x.strokeStyle = '#fff'; x.strokeRect(w / 2 - 210, 1180, 420, 74);
      x.font = '600 34px "VD Latin",serif'; sp('12px'); x.fillText('MEMBER PACK', w / 2 + 6, 1229);
      x.font = '500 34px "VD Serif",serif'; sp('10px'); x.fillText('AI 视觉设计社团 · 成员卡 ×6', w / 2 + 5, 1470); x.globalAlpha = 1;
    } else {
      x.globalAlpha = .92; x.font = '500 46px "VD Latin",serif'; sp('14px'); x.fillText('VISION DIMENSION', w / 2 + 7, 520);
      x.font = '400 120px "VD Brush","KaiTi",serif'; sp('10px'); x.fillText('社团成员卡包', w / 2 + 5, 700);
      x.font = '500 38px "VD Serif",serif'; sp('8px');
      ['指导教师 ×2', '社长 ×1', '核心成员 ×3'].forEach(function (s, i) { x.fillText(s, w / 2 + 4, 900 + i * 76); });
      x.font = '500 30px "VD Serif",serif'; sp('8px'); x.fillText('创意设计 · 数字影像 · 内容传播 · 项目实践', w / 2 + 4, 1250);
      for (var b = 0; b < 46; b++) { x.fillRect(w / 2 - 190 + b * 8.3, 1380, (b * 7 % 5) + 1.5, 80); } x.globalAlpha = 1;
    }
    var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 8; return t;
  }
  function bulge(u, v) { if (v <= S0 || v >= S1) return .012; var t = (v - S0) / (S1 - S0); return .012 + T * Math.pow(Math.sin(Math.PI * t), .42) * Math.pow(Math.max(0, 1 - u * u), .55) * (1 + .04 * Math.sin(u * 9 + t * 8)); }
  function faceGeo(v0, v1, seg) {
    var g = new THREE.PlaneGeometry(W, H * (v1 - v0), 44, seg), p = g.attributes.position, uv = g.attributes.uv;
    for (var i = 0; i < p.count; i++) { var u = p.getX(i) / (W / 2), v = v0 + (p.getY(i) / (H * (v1 - v0)) + .5) * (v1 - v0); p.setY(i, (v - .5) * H); p.setZ(i, bulge(u, v)); uv.setXY(i, (u + 1) / 2, v); }
    g.computeVertexNormals(); return g;
  }
  var mats = [], group = new THREE.Group(), tab = new THREE.Group(), tabIn = new THREE.Group();
  function build() {
    var mk = function (tex) { var m = new THREE.MeshStandardMaterial({ map: tex, metalness: .78, roughness: .3, envMapIntensity: 1.25, alphaTest: .5 }); mats.push(m); return m; };
    var mf = mk(foil(false)), mb = mk(foil(true)), gb = faceGeo(0, S1, 60), gt = faceGeo(S1, 1, 4);
    var b1 = new THREE.Mesh(gb, mf), b2 = new THREE.Mesh(gb, mb); b2.rotation.y = Math.PI;
    var t1 = new THREE.Mesh(gt, mf), t2 = new THREE.Mesh(gt, mb); t2.rotation.y = Math.PI;
    tabIn.add(t1, t2); tabIn.position.set(-W / 2, -yTear, 0); tab.add(tabIn); tab.position.set(W / 2, yTear, 0);
    group.add(b1, b2, tab); scene.add(group);
  }
  var base = 1, size = { w: 1, h: 1 };
  function resize() {
    size.w = stage.clientWidth; size.h = stage.clientHeight; renderer.setSize(size.w, size.h, false);
    camera.aspect = size.w / size.h; camera.updateProjectionMatrix();
    var visW = 2 * camera.position.z * Math.tan(camera.fov * Math.PI / 360) * camera.aspect; base = Math.min(1, visW / (W * 1.5));
    if (pack.state === 'idle') group.scale.setScalar(base);
  }
  var v3 = new THREE.Vector3(), drag = null, pulling = null, pullP = 0, t0 = performance.now();
  function project(x, y, z) { v3.set(x, y, z).applyMatrix4(group.matrixWorld).project(camera); return [(v3.x + 1) / 2 * size.w, (1 - v3.y) / 2 * size.h]; }
  function frame(now) {
    pack.raf = 0; if (pack.state === 'done' || !pack.visible) return;
    var t = (now - t0) / 1000, dt = Math.min(.1, (now - (pack.last || now)) / 1000 || .016), f = dt * 60; pack.last = now;
    if (pack.state === 'idle') {
      if (drag) { pack.auto = false; }
      else if (pulling) { pack.rot += (Math.round(pack.rot / TAU) * TAU - pack.rot) * (1 - Math.exp(-dt * 12)); pack.vel = 0; }
      else if (pack.auto) { pack.rot = lerp(pack.rot, Math.round(pack.rot / TAU) * TAU + Math.sin(t * .8) * .42, 1 - Math.exp(-dt * 4)); }
      else { pack.rot += pack.vel * f; pack.vel *= Math.pow(.95, f); if (now - pack.lastTouch > 3500 && Math.abs(pack.vel) < .002) pack.auto = true; }
      group.rotation.y = pack.rot; group.rotation.x = Math.sin(t * .6) * .05; group.position.y = -.12 + Math.sin(t * 1.1) * .05;
      tab.rotation.z = lerp(tab.rotation.z, -pullP * .55, 1 - Math.exp(-dt * 20));
      group.updateMatrixWorld();
      var a = project(-W / 2 + .1, yTear + (H / 2 - yTear) * .5, .03), b = project(W / 2, yTear, .03), facing = Math.cos(pack.rot);
      pack.px = b[0] - a[0];
      pull.style.transform = 'translate(' + (a[0] + pullP * pack.px * .8).toFixed(1) + 'px,' + (a[1] - pullP * 30).toFixed(1) + 'px) translateY(-50%)';
      pull.style.opacity = clamp((facing - .55) / .3, 0, 1); pull.style.pointerEvents = facing > .7 ? 'auto' : 'none';
    }
    renderer.render(scene, camera);
    pack.raf = requestAnimationFrame(frame);
  }
  function run() { if (!pack.raf && pack.state !== 'done' && pack.visible) { pack.last = 0; pack.raf = requestAnimationFrame(frame); } }
  canvas.addEventListener('pointerdown', function (e) { if (pack.state !== 'idle') return; drag = { x: e.clientX, id: e.pointerId }; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', function (e) { if (!drag || e.pointerId !== drag.id) return; var dx = e.clientX - drag.x; drag.x = e.clientX; pack.vel = dx * .012; pack.rot += pack.vel; pack.lastTouch = performance.now(); });
  var stop = function (e) { if (drag && e.pointerId === drag.id) { drag = null; pack.lastTouch = performance.now(); } };
  canvas.addEventListener('pointerup', stop); canvas.addEventListener('pointercancel', stop);
  pull.addEventListener('pointerdown', function (e) { if (pack.state !== 'idle') return; pulling = { x: e.clientX, id: e.pointerId, moved: false }; pull.setPointerCapture(e.pointerId); e.preventDefault(); });
  pull.addEventListener('pointermove', function (e) { if (!pulling || e.pointerId !== pulling.id) return; var dx = e.clientX - pulling.x; if (Math.abs(dx) > 4) pulling.moved = true; pullP = clamp(dx / ((pack.px || 300) * .8), 0, 1); if (pullP >= .92) { pulling = null; open(); } });
  var pullEnd = function (e) { if (!pulling || e.pointerId !== pulling.id) return; var go = !pulling.moved || pullP > .45; pulling = null; if (go) open(); else pullP = 0; };
  pull.addEventListener('pointerup', pullEnd); pull.addEventListener('pointercancel', pullEnd);
  pull.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });

  async function open() {
    if (pack.state !== 'idle') return; pack.state = 'opening'; stage.classList.add('opening');
    var r0 = pack.rot, r1 = Math.round(r0 / TAU) * TAU, z0 = tab.rotation.z, p0 = pullP;
    mats.forEach(function (m) { m.transparent = false; });
    await tween(520, function (k) {
      var e = easeOut(k); group.rotation.y = lerp(r0, r1, e); group.rotation.x *= .9;
      tab.rotation.z = lerp(z0, -1.25, e); tab.position.x = W / 2 - easeIn(k) * 5; tab.position.y = yTear + e * 1.4; tab.position.z = e * .6;
    });
    tab.visible = false; pack.rot = r1;
    var y0 = group.position.y;
    await tween(620, function (k) { var e = easeIO(k); group.position.y = lerp(y0, -2, e); group.scale.setScalar(base * lerp(1, 1.22, e)); group.rotation.x = lerp(group.rotation.x, -.08, e); });
    await deal(true);
    await tween(560, function (k) { var e = easeIn(k); group.position.y = lerp(-2, -7.5, e); group.rotation.z = e * .2; });
    pack.state = 'done'; pullP = p0 * 0;
    toRing();
  }
  function reset() {
    pack.state = 'idle'; pack.rot = 0; pack.vel = 0; pack.auto = true; pullP = 0; tab.visible = true; tab.rotation.set(0, 0, 0); tab.position.set(W / 2, yTear, 0);
    group.position.set(0, 0, 0); group.rotation.set(0, 0, 0); group.scale.setScalar(base); run();
  }
  pack.open = open; pack.reset = reset; pack.ok = true;
  var fontsReady = document.fonts && document.fonts.load ? Promise.all([document.fonts.load('190px "VD Brush"', '视像维度社团成员卡包'), document.fonts.load('50px "VD Latin"', 'VISION'), document.fonts.load('34px "VD Serif"', '视觉设计')]).catch(function () {}) : Promise.resolve();
  Promise.race([fontsReady, new Promise(function (r) { setTimeout(r, 2500); })]).then(function () { build(); resize(); run(); });
  window.addEventListener('resize', resize);
  new IntersectionObserver(function (es) { pack.visible = es[0].isIntersecting; run(); }, { threshold: .05 }).observe(stage);
})();
async function skipToRing() { if (ring.mode !== 'pack') return; stage.classList.add('opening'); pack.state = 'done'; $('#packCanvas').style.display = 'none'; await deal(false); toRing(); }
$('#skipPack').onclick = skipToRing;
if (!pack.ok) { stage.classList.add('opened'); new IntersectionObserver(function (es, ob) { if (es[0].isIntersecting) { ob.disconnect(); skipToRing(); } }, { threshold: .4 }).observe(stage); }
$('#repack').onclick = function () {
  if (!pack.ok) return;
  ring.mode = 'pack'; stage.classList.remove('opened', 'ring', 'focus', 'opening'); $('#team').classList.remove('opened'); setCardTabs(false); $('#packCanvas').style.display = '';
  cards.forEach(function (c) { c.classList.remove('t', 'hot'); c.style.opacity = 0; });
  pack.reset();
};
if (!pack.ok) $('#repack').style.display = 'none';

/* ================= profile ================= */
var profile = $('#profile');
function openProfile(i) {
  var m = D.members[i], as = awardsOf(m), th = m.theme, list = [];
  CERTS.forEach(function (c, ci) { if (m.guidesAll || c.by.indexOf(m.id) >= 0) list.push(ci); });
  var rows = as.map(function (a) { return '<li><time>' + a.date + '</time><span>《' + esc(D.works[a.work]) + '》<small>' + D.comps[a.comp].short + ' · ' + a.cat + '</small></span><b>' + levelName(a) + ' ' + prizeText(a) + '</b></li>'; });
  if (m.guidesAll) D.mentorAwards.forEach(function (a) { rows.push('<li><time>2026</time><span>优秀指导教师<small>' + D.comps[a.comp].name + (a.work ? ' · 《' + esc(D.works[a.work]) + '》' : '') + '</small></span><b>' + levelName(a) + '</b></li>'); });
  $('#profileIn').innerHTML =
    '<div class="pf-photo" style="--c1:' + th[0] + ';--c2:' + th[1] + ';--c3:' + th[2] + '"><img src="' + asset('assets/img/members/' + m.key + '-full.webp') + '" alt="' + m.name + '"></div>' +
    '<p class="pf-role">' + m.roleEn + '</p><h2 class="pf-name">' + m.name + '</h2><p class="pf-sub">' + m.role + ' · ' + m.duty + '</p>' +
    (m.sign ? '<img class="pf-sign" src="' + asset('assets/img/sign/' + m.key + '.png') + '" alt="' + m.name + '签名">' : '') +
    '<p class="pf-bio">' + esc(m.bio) + '</p>' +
    '<div class="pf-meta">' + m.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div>' +
    '<h3 class="pf-h"><b>' + (m.guidesAll ? '指导获奖' : '获奖记录') + '</b>AWARDS · ' + rows.length + '</h3><ul class="pf-list">' + rows.join('') + '</ul>' +
    (list.length ? '<h3 class="pf-h"><b>证书</b>CERTIFICATES</h3><div class="pf-certs">' + list.map(function (ci) { return certHtml(CERTS[ci], ci); }).join('') + '</div>' : '');
  profile.scrollTop = 0; profile.classList.add('on'); profile.setAttribute('aria-hidden', 'false'); document.body.classList.add('locked');
}
function closeProfile() { profile.classList.remove('on'); profile.setAttribute('aria-hidden', 'true'); document.body.classList.remove('locked'); }
$('#profileBack').onclick = closeProfile;
$('#focusClose').onclick = function (e) { e.stopPropagation(); unfocus(); };
function setCardTabs(on) { cards.forEach(function (c) { c.tabIndex = on ? 0 : -1; }); }
function activateCard(i) {
  if (ring.mode === 'focus') { if (i === ring.focus) openProfile(i); else unfocus(); }
  else if (ring.mode === 'ring') { if (i === frontIndex()) { ring.target = ring.pos = Math.round(ring.target); focusCard(i); } else rotateTo(i); }
}
cardsEl.addEventListener('focusin', function (e) { var c = e.target.closest('.card'); if (c && ring.mode === 'ring' && c.matches(':focus-visible')) rotateTo(+c.dataset.i); });
stage.addEventListener('scroll', function () { stage.scrollLeft = stage.scrollTop = 0; });
window.addEventListener('keydown', function (e) {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.closest) {
    var kc = e.target.closest('.card'), kf = e.target.closest('.cert');
    if (kc) { e.preventDefault(); activateCard(+kc.dataset.i); return; }
    if (kf) { e.preventDefault(); kf.click(); return; }
  }
  if (e.key === 'Escape') { if (LB.el.classList.contains('on')) lbClose(); else if (profile.classList.contains('on')) closeProfile(); else unfocus(); }
  else if (LB.el.classList.contains('on')) { if (e.key === 'ArrowLeft') lbShow(LB.i - 1); if (e.key === 'ArrowRight') lbShow(LB.i + 1); }
  else if (ring.mode === 'ring' && !profile.classList.contains('on')) { var r = stage.getBoundingClientRect(); if (r.top < innerHeight * .6 && r.bottom > innerHeight * .4) { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); } }
});

/* ================= nav, reveal, counters ================= */
var nav = $('#nav'), links = $$('.nav nav a');
function onScroll() {
  nav.classList.toggle('solid', scrollY > 40);
  var cur = ''; ['about', 'team', 'org', 'awards'].forEach(function (id) { if (document.getElementById(id).getBoundingClientRect().top < innerHeight * .45) cur = id; });
  links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + cur); });
}
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
var io = new IntersectionObserver(function (es) {
  es.forEach(function (e) {
    if (!e.isIntersecting) return; io.unobserve(e.target); e.target.classList.add('in');
    $$('b[data-n]', e.target).forEach(function (b) { var n = +b.dataset.n; tween(1200, function (k) { b.textContent = Math.round(n * easeOut(k)); }); });
  });
}, { threshold: .15 });
$$('.reveal').forEach(function (el) { io.observe(el); });
})();

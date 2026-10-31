/* Shared experiments menu. Include in each experiment: <script src="../menu.js"></script> */
(function () {
  var EXPERIMENTS = [
    { name: 'Stickers', path: 'stickers/' },
    { name: 'Arrows', path: 'arrows/' }
  ];

  var cs = document.currentScript;
  var root = new URL('.', cs ? cs.src : location.href).href; // folder containing menu.js = site root
  var here = location.pathname;

  var css = '' +
    '#xm-wrap{position:fixed;left:calc(20px + env(safe-area-inset-left));bottom:calc(20px + env(safe-area-inset-bottom));z-index:100001;font:15px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;touch-action:manipulation}' +
    '#xm-btn{width:40px;height:40px;border-radius:50%;border:0;padding:0;background:#2a2a2a;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .15s,background .15s;opacity:.95;box-shadow:0 0 0 1px rgba(255,255,255,.22),0 2px 8px rgba(0,0,0,.35)}' +
    '#xm-btn:active{transform:scale(.9);background:#3a3a3a}' +
    '#xm-pop{position:absolute;left:0;bottom:50px;min-width:170px;background:#222;border-radius:14px;padding:6px;box-shadow:0 8px 24px rgba(0,0,0,.45),0 1px 3px rgba(0,0,0,.4);display:none}' +
    '#xm-pop.open{display:block}' +
    '#xm-pop a{display:block;padding:11px 14px;border-radius:9px;color:#ddd;text-decoration:none;-webkit-tap-highlight-color:transparent}' +
    '#xm-pop a:active{background:#333}' +
    '#xm-pop a.cur{background:#333;color:#fff;font-weight:600}' +
    '#xm-pop .xm-h{padding:6px 14px 4px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#777}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var wrap = document.createElement('div');
  wrap.id = 'xm-wrap';
  var btn = document.createElement('button');
  btn.id = 'xm-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Switch experiment');
  btn.setAttribute('aria-haspopup', 'true');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 5h12M3 9h12M3 13h12" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
  var pop = document.createElement('div');
  pop.id = 'xm-pop';
  pop.setAttribute('role', 'menu');
  var h = document.createElement('div');
  h.className = 'xm-h';
  h.textContent = 'Experiments';
  pop.appendChild(h);

  EXPERIMENTS.forEach(function (ex) {
    var url = new URL(ex.path, root);
    var a = document.createElement('a');
    a.href = url.href;
    a.textContent = ex.name;
    a.setAttribute('role', 'menuitem');
    if (here.indexOf(url.pathname) === 0) { a.className = 'cur'; a.setAttribute('aria-current', 'page'); }
    pop.appendChild(a);
  });

  wrap.appendChild(btn);
  wrap.appendChild(pop);

  function setOpen(o) {
    pop.classList.toggle('open', o);
    btn.setAttribute('aria-expanded', o ? 'true' : 'false');
  }
  btn.addEventListener('click', function () { setOpen(!pop.classList.contains('open')); });

  // keep menu interaction away from the experiment's own pointer/touch handlers
  ['pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'touchstart', 'mousedown', 'wheel'].forEach(function (n) {
    wrap.addEventListener(n, function (e) { e.stopPropagation(); }, { passive: true });
  });

  // tap outside closes (capture, so it still fires even if the page stops propagation)
  document.addEventListener('pointerdown', function (e) {
    if (!wrap.contains(e.target)) setOpen(false);
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

  function mount() { document.body.appendChild(wrap); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();

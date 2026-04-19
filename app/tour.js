/* ─────────────────────────────────────────────
   DISRUPT Launch — Self-Guided Product Tour
   Activated by ?tour=true on any page.
   Forces ?demo=true on launch.html / dashboard.html
   so prospects walk through real, populated screens.
   ───────────────────────────────────────────── */
(function(){
  var TOUR_KEY = 'disrupt-tour-active';
  var STRIPE_SELF   = 'https://buy.stripe.com/00w5kr6wn1hKfA4aC7dnW00';
  var STRIPE_GUIDED = 'https://buy.stripe.com/4gM3cj7Ar2lObjOh0vdnW01';

  var params = new URLSearchParams(location.search);
  var tourActive = params.get('tour') === 'true' || sessionStorage.getItem(TOUR_KEY) === '1';
  if (!tourActive) return;
  sessionStorage.setItem(TOUR_KEY, '1');

  var path = location.pathname.toLowerCase();
  var page =
    path.indexOf('launch.html') !== -1   ? 'launch'   :
    path.indexOf('dashboard.html') !== -1 ? 'dashboard' :
                                            'index';

  // Force ?demo=true on launch + dashboard so the tour walks real data.
  if ((page === 'launch' || page === 'dashboard') && params.get('demo') !== 'true') {
    params.set('demo', 'true');
    params.set('tour', 'true');
    location.replace(location.pathname + '?' + params.toString());
    return;
  }

  // ---------- step definitions ----------
  function gotoLaunchScreen(id){
    document.querySelectorAll('.screen').forEach(function(s){ s.classList.remove('active'); });
    var el = document.getElementById(id);
    if (el) el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }
  function gotoDashboardTab(name){
    if (typeof window.showTab === 'function') {
      var btns = document.querySelectorAll('.tab-btn');
      var idx = name === 'home' ? 0 : name === 'execute' ? 1 : 2;
      window.showTab(name, btns[idx]);
    }
  }

  var STEPS = {
    index: [
      { selector: '.hero-headline', position: 'bottom',
        eyebrow: 'TOUR · 1 of 5', title: 'The Offer',
        body: 'A complete AI growth system designed for the funeral profession — built from your answers in about 20 minutes.' },
      { selector: '.deliverables-grid', position: 'top',
        eyebrow: 'TOUR · 2 of 5', title: 'Eight Modules, Built For You',
        body: 'Strategy, brand, personas, video scripts, pre-need engine, 90-day roadmap, and a private execution dashboard.' },
      { selector: '#how-it-works .steps', position: 'top',
        eyebrow: 'TOUR · 3 of 5', title: 'Four Steps, Hours Not Months',
        body: 'Choose your tier, answer 6 sections, the AI builds your system, and you execute on the dashboard.' },
      { selector: '.pricing-grid', position: 'top',
        eyebrow: 'TOUR · 4 of 5', title: 'Two Ways To Launch',
        body: 'Self-Guided or Guided. Same complete system — different level of strategist support.' },
      { final: true, eyebrow: 'TOUR · 5 of 5', title: 'See What You Actually <span>Get</span>',
        body: 'Next: walk through the intake form, the AI strategy output, and the execution dashboard with real demo data populated.',
        buttons: [
          { label: 'Continue → Intake form', href: 'launch.html?demo=true&tour=true', primary: true }
        ] }
    ],

    launch: [
      { before: function(){ gotoLaunchScreen('screen-mode'); },
        selector: '.mode-cards', position: 'bottom',
        eyebrow: 'TOUR · 1 of 4', title: 'Step 1: Pick Your Path',
        body: 'After payment, every owner lands here. Self-Guided or Guided — the experience adapts from this choice.' },
      { before: function(){ gotoLaunchScreen('screen-q'); },
        selector: '.q-wrap', position: 'top',
        eyebrow: 'TOUR · 2 of 4', title: 'Step 2: Six Sections, ~20 Minutes',
        body: 'Identity, market, personas, brand, services, goals. Every answer feeds the AI build — that\'s why the output is specific to your funeral home, not generic.' },
      { before: function(){
          gotoLaunchScreen('screen-out');
          if (typeof window.demoSkipToOutput === 'function') {
            try { window.demoSkipToOutput(); } catch(e){}
          }
        },
        selector: '.out-panel.active', position: 'top',
        eyebrow: 'TOUR · 3 of 4', title: 'Step 3: Your Strategy Output',
        body: 'Eight modules generated from your answers — goals, competitors, brand, personas, scripts, pre-need engine, and a 13-week roadmap. All ready to execute.' },
      { final: true, eyebrow: 'TOUR · 4 of 4', title: 'Now The <span>Execution</span>',
        body: 'A strategy is only as good as its execution. The dashboard tracks your 90-day rollout — weekly tasks, wins logged, metrics watched.',
        buttons: [
          { label: 'Continue → Dashboard', href: 'dashboard.html?demo=true&tour=true', primary: true }
        ] }
    ],

    dashboard: [
      { before: function(){ gotoDashboardTab('home'); },
        selector: '.topbar-nav', position: 'bottom',
        eyebrow: 'TOUR · 1 of 4', title: 'Your Private Dashboard',
        body: 'Once your strategy is built, this is where execution lives. Three tabs: Home, Execute, Strategy.' },
      { before: function(){ gotoDashboardTab('home'); },
        selector: '#tab-home', position: 'top',
        eyebrow: 'TOUR · 2 of 4', title: 'Home: Progress At A Glance',
        body: '90-day timeline, weekly progress, and the metrics that matter — cases, reviews, pre-need inquiries, reach.' },
      { before: function(){ gotoDashboardTab('execute'); },
        selector: '#tab-execute', position: 'top',
        eyebrow: 'TOUR · 3 of 4', title: 'Execute: Weekly Tasks',
        body: 'Each week\'s content tasks are pre-loaded from your roadmap. Check them off as you go and log wins as they happen.' },
      { final: true, eyebrow: 'TOUR · 4 of 4', title: 'I\'m Ready, <span>Let\'s Go.</span>',
        body: 'You\'ve seen the offer, the intake, the AI output, and the execution dashboard. Pick your tier and start building today.',
        buttons: [
          { label: 'Self-Guided — $4,997 →', href: STRIPE_SELF, secondary: true },
          { label: 'Guided — $6,997 →',     href: STRIPE_GUIDED, primary: true }
        ] }
    ]
  };

  // ---------- engine ----------
  var steps = STEPS[page] || [];
  if (!steps.length) return;
  var idx = 0;
  var els = {};
  var stepToken = 0;

  function ensureChrome(){
    if (els.spotlight) return;
    // launch + dashboard always render a demo bar in tour mode (we forced ?demo=true).
    if (page === 'launch' || page === 'dashboard') {
      document.body.classList.add('tour-with-demo-bar');
    }
    els.spotlight = document.createElement('div');
    els.spotlight.className = 'tour-spotlight';
    els.spotlight.style.display = 'none';
    document.body.appendChild(els.spotlight);

    els.blocker = document.createElement('div');
    els.blocker.className = 'tour-blocker';
    document.body.appendChild(els.blocker);

    els.tooltip = document.createElement('div');
    els.tooltip.className = 'tour-tooltip';
    els.tooltip.style.display = 'none';
    document.body.appendChild(els.tooltip);

    els.progress = document.createElement('div');
    els.progress.className = 'tour-progress';
    document.body.appendChild(els.progress);

    els.skip = document.createElement('button');
    els.skip.className = 'tour-skip';
    els.skip.textContent = 'End tour ✕';
    els.skip.onclick = endTour;
    document.body.appendChild(els.skip);
  }

  function renderProgress(){
    var html = '<span class="tour-progress-label">Tour</span>';
    for (var i = 0; i < steps.length; i++) {
      var cls = 'tour-progress-dot';
      if (i < idx) cls += ' done';
      else if (i === idx) cls += ' active';
      html += '<span class="' + cls + '"></span>';
    }
    els.progress.innerHTML = html;
  }

  function positionTooltip(rect, position){
    var pad = 16;
    var tip = els.tooltip;
    tip.style.display = 'block';
    var tw = tip.offsetWidth, th = tip.offsetHeight;
    var vw = window.innerWidth, vh = window.innerHeight;
    var top, left;

    if (position === 'bottom') {
      top  = rect.bottom + pad;
      left = rect.left + rect.width / 2 - tw / 2;
    } else if (position === 'top') {
      top  = rect.top - th - pad;
      left = rect.left + rect.width / 2 - tw / 2;
    } else if (position === 'right') {
      top  = rect.top + rect.height / 2 - th / 2;
      left = rect.right + pad;
    } else if (position === 'left') {
      top  = rect.top + rect.height / 2 - th / 2;
      left = rect.left - tw - pad;
    } else {
      top  = vh / 2 - th / 2;
      left = vw / 2 - tw / 2;
    }

    // Fallback if tooltip would clip off the viewport
    if (top < pad) top = rect.bottom + pad;
    if (top + th > vh - pad) top = rect.top - th - pad;
    if (top < pad) top = pad;
    if (top + th > vh - pad) top = vh - th - pad;
    if (left < pad) left = pad;
    if (left + tw > vw - pad) left = vw - tw - pad;

    tip.style.top  = top  + 'px';
    tip.style.left = left + 'px';
  }

  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  }); }

  function showStep(i){
    if (i < 0 || i >= steps.length) return;
    idx = i;
    var token = ++stepToken;
    var step = steps[i];

    // Tear down any final-card from prior step
    if (els.finalCard) { els.finalCard.remove(); els.finalCard = null; }
    if (els.finalBackdrop) { els.finalBackdrop.remove(); els.finalBackdrop = null; }

    if (typeof step.before === 'function') {
      try { step.before(); } catch(e){ console.warn('[tour] before() failed', e); }
    }

    ensureChrome();
    renderProgress();

    // Always hide previous spotlight/tooltip so stale state never bleeds through.
    els.spotlight.style.display = 'none';
    els.tooltip.style.display = 'none';

    if (step.final) {
      renderFinal(step);
      return;
    }

    var target = step.selector ? document.querySelector(step.selector) : null;
    if (!target) {
      renderTooltip(step, { top: window.innerHeight/2 - 100, left: window.innerWidth/2 - 180, right:0, bottom:0, width:0, height:0 }, 'center');
      return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(function(){
      if (token !== stepToken) return; // stale; a newer step has started
      var rect = target.getBoundingClientRect();
      var spot = els.spotlight;
      spot.style.display = 'block';
      spot.style.top    = (rect.top - 6) + 'px';
      spot.style.left   = (rect.left - 6) + 'px';
      spot.style.width  = (rect.width + 12) + 'px';
      spot.style.height = (rect.height + 12) + 'px';
      renderTooltip(step, rect, step.position || 'bottom');
    }, 320);
  }

  function renderTooltip(step, rect, position){
    var canBack = idx > 0;
    var html =
      '<div class="tour-tooltip-eyebrow">' + escapeHtml(step.eyebrow || '') + '</div>' +
      '<div class="tour-tooltip-title">'   + escapeHtml(step.title   || '') + '</div>' +
      '<div class="tour-tooltip-body">'    + escapeHtml(step.body    || '') + '</div>' +
      '<div class="tour-tooltip-actions">' +
        '<button class="tour-btn tour-btn-back"' + (canBack ? '' : ' disabled') + ' data-tour-back>← Back</button>' +
        '<button class="tour-btn tour-btn-next" data-tour-next>' + (idx === steps.length - 1 ? 'Finish' : 'Next →') + '</button>' +
      '</div>';
    els.tooltip.innerHTML = html;
    els.tooltip.querySelector('[data-tour-back]').onclick = function(){ if (canBack) showStep(idx - 1); };
    els.tooltip.querySelector('[data-tour-next]').onclick = function(){ showStep(idx + 1); };
    positionTooltip(rect, position);
  }

  function renderFinal(step){
    els.finalBackdrop = document.createElement('div');
    els.finalBackdrop.className = 'tour-final-backdrop';
    document.body.appendChild(els.finalBackdrop);

    els.finalCard = document.createElement('div');
    els.finalCard.className = 'tour-final-card';

    var btnHtml = '';
    (step.buttons || []).forEach(function(b){
      var cls = b.primary ? 'primary' : (b.secondary ? 'secondary' : 'secondary');
      btnHtml += '<a href="' + b.href + '" class="' + cls + '"' +
        (b.href.indexOf('stripe.com') !== -1 ? ' data-tour-stripe="1"' : '') +
        '>' + escapeHtml(b.label) + '</a>';
    });
    btnHtml += '<button class="tour-end-link" data-tour-end>End tour</button>';

    els.finalCard.innerHTML =
      '<div class="tour-final-eyebrow">' + escapeHtml(step.eyebrow || 'Finish') + '</div>' +
      '<div class="tour-final-title">'   + (step.title || '') + '</div>' +
      '<div class="tour-final-body">'    + escapeHtml(step.body || '') + '</div>' +
      '<div class="tour-final-buttons">' + btnHtml + '</div>';
    document.body.appendChild(els.finalCard);

    els.finalCard.querySelector('[data-tour-end]').onclick = endTour;
    // Stripe links should clear the tour flag so the post-payment experience is real.
    els.finalCard.querySelectorAll('[data-tour-stripe]').forEach(function(a){
      a.addEventListener('click', function(){ sessionStorage.removeItem(TOUR_KEY); });
    });
  }

  function endTour(){
    sessionStorage.removeItem(TOUR_KEY);
    // Strip ?tour and ?demo from the URL on the landing page; on launch/dashboard,
    // just go home so prospects don't land on a half-state.
    if (page === 'index') {
      var p = new URLSearchParams(location.search);
      p.delete('tour'); p.delete('demo');
      var q = p.toString();
      location.replace(location.pathname + (q ? '?' + q : ''));
    } else {
      location.replace('/');
    }
  }

  // Re-position on resize
  var repositionTimer;
  window.addEventListener('resize', function(){
    clearTimeout(repositionTimer);
    repositionTimer = setTimeout(function(){ showStep(idx); }, 150);
  });

  function start(){ showStep(0); }
  // Dashboard demo init finishes ~600ms in; wait it out so screens are ready.
  var startDelay = page === 'dashboard' ? 800 : 350;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(start, startDelay); });
  } else {
    setTimeout(start, startDelay);
  }
})();

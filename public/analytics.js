/* eslint-disable no-empty, no-unused-vars -- best-effort catches are intentional */
/*
 * P.R.O. website analytics — our own small script, no third-party browser SDK.
 * Events go to POST https://api.proapp.uk/analytics/public; the P.R.O. server forwards them
 * to the private OpenPanel (project "pro", website client). The browser never sees a key.
 * The server adds the real IP from its own proxy; the page only sends a random visitor id.
 *
 * Collected: page_view (also SPA navigation), page_leave (seconds on page), scroll_depth
 * (25/50/75/100), app_store_clicked, open_in_app_clicked, guide_link_clicked,
 * outbound_clicked, any element with data-analytics="event_name", utm_* and referrer.
 * Best effort: network/storage errors are swallowed, clicks are never delayed.
 */
(function (w) {
  'use strict';
  if (w.PRO_ANALYTICS) return;
  var d = w.document;
  var API = 'https://api.proapp.uk/analytics/public';
  var HOSTS = ['proapp.uk', 'www.proapp.uk'];
  var VID_KEY = 'pro_vid';
  var UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  var NAME = /^[a-z][a-z0-9_]{1,63}$/;
  var queue = [];
  var seq = 0;
  var failures = 0;
  var timer = null;

  function get(k) { try { return w.localStorage.getItem(k); } catch (e) { return null; } }
  function put(k, v) { try { w.localStorage.setItem(k, v); } catch (e) {} }

  function uuid() {
    var c = w.crypto;
    try { if (c && c.randomUUID) return c.randomUUID(); } catch (e) {}
    var b = new Uint8Array(16), i, s = '';
    if (c && c.getRandomValues) c.getRandomValues(b); else for (i = 0; i < 16; i++) b[i] = (Math.random() * 256) | 0;
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    for (i = 0; i < 16; i++) s += (b[i] + 256).toString(16).slice(1) + (i === 3 || i === 5 || i === 7 || i === 9 ? '-' : '');
    return s;
  }

  var memVid = null;
  function visitorId() {
    var v = get(VID_KEY);
    if (v && UUID.test(v)) return v;
    v = memVid || uuid();
    memVid = v;
    put(VID_KEY, v);
    return v;
  }

  function cleanPath(p) {
    p = (p || '/').split('?')[0].split('#')[0].replace(/[^A-Za-z0-9/_.~%-]/g, '');
    return (p.charAt(0) === '/' ? p : '/' + p).slice(0, 200);
  }

  function context() {
    var out = {}, q;
    try { q = new URLSearchParams(w.location.search); } catch (e) { q = null; }
    if (q) {
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'code'].forEach(function (k) {
        var v = q.get(k);
        if (v) out[k] = v.slice(0, 120);
      });
    }
    out.language = (w.navigator.language || '').slice(0, 35);
    out.screen = (w.screen ? w.screen.width + 'x' + w.screen.height : '');
    out.viewport = w.innerWidth + 'x' + w.innerHeight;
    try { out.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    out.title = (d.title || '').slice(0, 200);
    return out;
  }

  function track(name, props) {
    if (!NAME.test(name)) return;
    var p = context(), k;
    for (k in props || {}) if (Object.prototype.hasOwnProperty.call(props, k)) p[k] = props[k];
    queue.push({ event_id: uuid(), name: name, path: cleanPath(w.location.pathname), properties: p,
                 occurred_at_ms: Date.now(), sequence: ++seq });
    if (queue.length > 200) queue.splice(0, queue.length - 200);
    schedule();
  }

  function schedule() {
    if (timer) return;
    timer = setTimeout(function () { timer = null; flush(false); }, 1500);
  }

  function flush(leaving) {
    if (!queue.length || failures >= 5 || HOSTS.indexOf(w.location.hostname) < 0) return;
    var batch = queue.splice(0, 50);
    var body = JSON.stringify({ visitor_id: visitorId(), referrer: (d.referrer || '').slice(0, 300) || null, events: batch });
    if (leaving && w.navigator.sendBeacon) {
      try { if (w.navigator.sendBeacon(API, new Blob([body], { type: 'text/plain' }))) return; } catch (e) {}
    }
    try {
      w.fetch(API, { method: 'POST', body: body, keepalive: true, mode: 'cors', credentials: 'omit',
                     headers: { 'Content-Type': 'text/plain' } })
        .then(function (r) {
          if (r.status >= 500 || r.status === 429) { failures++; queue = batch.concat(queue); }
          else failures = 0;
        })
        .catch(function () { failures++; queue = batch.concat(queue); });
    } catch (e) {}
    if (queue.length) schedule();
  }

  // page_view on load and on every SPA navigation; page_leave with the time spent.
  var pageStart = Date.now();
  var lastPath = null;
  var depthSent = {};
  function pageView() {
    var path = cleanPath(w.location.pathname);
    if (path === lastPath) return;
    if (lastPath !== null) track('page_leave', { seconds: Math.round((Date.now() - pageStart) / 1000), from: lastPath });
    lastPath = path;
    pageStart = Date.now();
    depthSent = {};
    track('page_view', {});
  }
  ['pushState', 'replaceState'].forEach(function (m) {
    var orig = w.history[m];
    if (!orig) return;
    w.history[m] = function () { var r = orig.apply(this, arguments); setTimeout(pageView, 0); return r; };
  });
  w.addEventListener('popstate', function () { setTimeout(pageView, 0); });

  w.addEventListener('scroll', function () {
    var h = d.documentElement.scrollHeight - w.innerHeight;
    if (h <= 0) return;
    var pct = Math.round((w.scrollY / h) * 100);
    [25, 50, 75, 100].forEach(function (mark) {
      if (pct >= mark && !depthSent[mark]) { depthSent[mark] = true; track('scroll_depth', { percent: mark }); }
    });
  }, { passive: true });

  d.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-analytics], a[href], button') : null;
    if (!el) return;
    var label = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
    var named = el.getAttribute('data-analytics');
    if (named) { track(named, { label: label }); return; }
    var href = el.getAttribute('href') || '';
    if (/apps\.apple\.com/.test(href)) track('app_store_clicked', { label: label, href: href.slice(0, 200) });
    else if (/^proapp:/.test(href) || /\/open\//.test(href)) track('open_in_app_clicked', { label: label, href: href.slice(0, 200) });
    else if (/\/apple-health-|\/mcp-connect/.test(href)) track('guide_link_clicked', { label: label, href: href.slice(0, 200) });
    else if (/^https?:\/\//.test(href) && href.indexOf(w.location.host) < 0) {
      var host = ''; try { host = new URL(href).host; } catch (x) {}
      track('outbound_clicked', { label: label, host: host });
    } else if (el.tagName === 'BUTTON') track('button_clicked', { label: label });
  }, true);

  d.addEventListener('visibilitychange', function () {
    if (d.visibilityState === 'hidden') {
      track('page_leave', { seconds: Math.round((Date.now() - pageStart) / 1000), from: lastPath });
      lastPath = null;
      flush(true);
    } else if (lastPath === null) {
      pageView();
    }
  });

  w.PRO_ANALYTICS = { track: track, flush: flush };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', pageView); else pageView();
})(window);

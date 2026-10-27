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

  // Only campaign slugs are retained. A visit expires after 30 minutes of inactivity;
  // a newly tagged landing replaces the complete campaign, never mixes two campaigns.
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  var CAMPAIGN_TTL = 30 * 60 * 1000;
  var campaign = {}, campaignAt = 0, campaignSearch = null;
  function campaignSlug(value) {
    return typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$/.test(value) ? value.toLowerCase() : null;
  }
  function cleanCampaign(value) {
    var out = {};
    UTM_KEYS.forEach(function (key) {
      var v = campaignSlug(value && value[key]);
      if (v) out[key] = v;
    });
    return out;
  }
  try {
    var savedCampaign = JSON.parse(w.sessionStorage.getItem('pro_acquisition_v1') || 'null');
    if (savedCampaign && Date.now() >= savedCampaign.at && Date.now() - savedCampaign.at < CAMPAIGN_TTL) {
      campaign = cleanCampaign(savedCampaign.values);
      campaignAt = savedCampaign.at;
    }
  } catch (e) {}
  function campaignContext() {
    var now = Date.now(), search = w.location.search || '';
    if (now < campaignAt || now - campaignAt >= CAMPAIGN_TTL) campaign = {};
    if (search !== campaignSearch) {
      var values = {}, tagged = false;
      try {
        var query = new w.URLSearchParams(search);
        UTM_KEYS.forEach(function (key) {
          if (query.has(key)) tagged = true;
          values[key] = query.get(key);
        });
      } catch (e) {}
      // A referral link (/invite/?code=…) without its own tags is the referral channel.
      var invite = w.location.pathname.match(/^\/invite(?:\/([A-Za-z0-9]{4,12}))?\/?$/);
      if (!tagged && invite && campaignSlug((query && query.get('code')) || invite[1])) {
        values = { utm_source: 'referral', utm_medium: 'invite', utm_campaign: 'invite' };
        tagged = true;
      }
      if (tagged) campaign = cleanCampaign(values);
      campaignSearch = search;
    }
    campaignAt = now;
    try { w.sessionStorage.setItem('pro_acquisition_v1', JSON.stringify({ at: now, values: campaign })); } catch (e) {}
    return cleanCampaign(campaign);
  }

  // Everything else a visit can tell about where it came from, kept raw so channels can be
  // decided later: ad click ids (the visit came from an ad even when its UTM got lost), the
  // in-app browser (those apps usually strip the referrer), the very first touch of this
  // browser, the visit number and the names (not values) of the landing link's parameters.
  var CLICK_IDS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'ttclid', 'msclkid', 'twclid', 'rdt_cid', 'li_fat_id',
                   'igsh', 'yclid', 'epik', 'sccid', 'dclid', 'oppref', 'olref'];  // oppref/olref: ChatGPT ads
  var CLICK_VALUE = /^[A-Za-z0-9_.\-]{1,300}$/;
  var IN_APP = [[/Instagram/, 'instagram'], [/FBAN|FBAV|FB_IAB/, 'facebook'], [/Barcelona/, 'threads'],
                [/musical_ly|BytedanceWebview|TikTok/i, 'tiktok'], [/Twitter/, 'x'], [/Reddit/i, 'reddit'],
                [/LinkedInApp/, 'linkedin'], [/Snapchat/, 'snapchat'], [/Pinterest/, 'pinterest'],
                [/\bLine\//, 'line'], [/Telegram/, 'telegram'], [/GSA\//, 'google_app']];
  var VISIT_TTL = 30 * 60 * 1000;
  function inAppBrowser() {
    var ua = (w.navigator && w.navigator.userAgent) || '';
    for (var i = 0; i < IN_APP.length; i++) if (IN_APP[i][0].test(ua)) return IN_APP[i][1];
    return '';
  }
  function referrerHost() {
    try {
      var host = d.referrer ? new w.URL(d.referrer).hostname.toLowerCase() : '';
      return host && HOSTS.indexOf(host) < 0 ? host.slice(0, 120) : '';
    } catch (e) { return ''; }
  }
  function storedJSON(store, key) { try { return JSON.parse(store.getItem(key) || 'null'); } catch (e) { return null; } }
  function saveJSON(store, key, value) { try { store.setItem(key, JSON.stringify(value)); } catch (e) {} }
  // A visit starts after 30 minutes without events; its landing facts are fixed for the visit.
  function visitContext(campaign) {
    var now = Date.now(), visit = storedJSON(w.sessionStorage, 'pro_visit_v1');
    if (!visit || now < visit.at || now - visit.at >= VISIT_TTL) {
      var count = 0;
      try { count = parseInt(w.localStorage.getItem('pro_visits') || '0', 10) || 0; } catch (e) {}
      count += 1;
      try { w.localStorage.setItem('pro_visits', String(count)); } catch (e) {}
      var click = {}, keys = [];
      try {
        var q = new w.URLSearchParams(w.location.search);
        q.forEach(function (value, key) { if (keys.length < 12 && /^[A-Za-z0-9_.-]{1,40}$/.test(key) && keys.indexOf(key) < 0) keys.push(key.toLowerCase()); });
        for (var i = 0; i < CLICK_IDS.length && !click.type; i++) {
          var v = q.get(CLICK_IDS[i]);
          if (v && CLICK_VALUE.test(v)) click = { type: CLICK_IDS[i], value: v.slice(0, 300) };
        }
      } catch (e) {}
      visit = { number: count, click: click, params: keys.join(','), landing: cleanPath(w.location.pathname), referrer: referrerHost() };
    }
    visit.at = now;
    saveJSON(w.sessionStorage, 'pro_visit_v1', visit);
    var first = storedJSON(w.localStorage, 'pro_first_touch_v1');
    if (!first || typeof first.at !== 'number') {
      first = { at: now, source: campaign.utm_source || (visit.click.type ? 'click:' + visit.click.type : '') || visit.referrer || 'direct',
                medium: campaign.utm_medium || '', campaign: campaign.utm_campaign || '', referrer: visit.referrer, landing: visit.landing };
      saveJSON(w.localStorage, 'pro_first_touch_v1', first);
    }
    var out = { visit_number: visit.number, landing_path: visit.landing, days_since_first_visit: Math.max(0, Math.floor((now - first.at) / 86400000)) };
    if (visit.params) out.landing_params = visit.params;
    if (visit.referrer) out.referrer_host = visit.referrer;
    if (visit.click.type) { out.click_id_type = visit.click.type; out.click_id = visit.click.value; }
    var app = inAppBrowser();
    if (app) out.in_app_browser = app;
    ['source', 'medium', 'campaign', 'referrer', 'landing'].forEach(function (key) {
      if (first[key]) out['first_' + key] = String(first[key]).slice(0, 120);
    });
    return out;
  }

  function context() {
    var out = campaignContext();
    var extra = visitContext(out), key;
    for (key in extra) if (Object.prototype.hasOwnProperty.call(extra, key)) out[key] = extra[key];
    try {
      var linkParams = new w.URLSearchParams(w.location.search);
      ['ref', 'code'].forEach(function (key) {
        var value = campaignSlug(linkParams.get(key));
        if (value) out[key] = value;
      });
    } catch (e) {}
    out.language = (w.navigator.language || '').slice(0, 35);
    out.screen = (w.screen ? w.screen.width + 'x' + w.screen.height : '');
    out.viewport = w.innerWidth + 'x' + w.innerHeight;
    try { out.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    out.title = (d.title || '').slice(0, 200);
    return out;
  }

  function track(name, props, atPath) {
    if (!NAME.test(name)) return;
    var p = context(), k;
    if (name === 'page_leave' && atPath) {
      UTM_KEYS.forEach(function (key) { delete p[key]; });
    }
    for (k in props || {}) if (Object.prototype.hasOwnProperty.call(props, k)) p[k] = props[k];
    queue.push({ event_id: uuid(), name: name, path: cleanPath(atPath || w.location.pathname), properties: p,
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
  var lastSearch = null;
  var lastPageCampaign = {};
  var depthSent = {};
  function pageView() {
    var path = cleanPath(w.location.pathname);
    var search = w.location.search || '';
    if (path === lastPath && search === lastSearch) return;
    if (lastPath !== null) track('page_leave', { seconds: Math.round((Date.now() - pageStart) / 1000), to: path, ...lastPageCampaign }, lastPath);
    lastPath = path;
    lastSearch = search;
    lastPageCampaign = campaignContext();
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
    // Only P.R.O.'s own listing counts as a store click: comparison pages link to other apps too.
    if (/apps\.apple\.com\/.*id6749865568/.test(href)) track('app_store_clicked', { label: label, href: href.slice(0, 200) });
    else if (/^proapp:/.test(href) || /\/open\//.test(href)) track('open_in_app_clicked', { label: label, href: href.slice(0, 200) });
    else if (/\/apple-health-|\/mcp-connect/.test(href)) track('guide_link_clicked', { label: label, href: href.slice(0, 200) });
    else if (/^https?:\/\//.test(href) && href.indexOf(w.location.host) < 0) {
      var host = ''; try { host = new URL(href).host; } catch (x) {}
      track('outbound_clicked', { label: label, host: host });
    } else if (el.tagName === 'BUTTON') track('button_clicked', { label: label });
  }, true);

  d.addEventListener('visibilitychange', function () {
    if (d.visibilityState === 'hidden') {
      track('page_leave', { seconds: Math.round((Date.now() - pageStart) / 1000), ...lastPageCampaign }, lastPath);
      lastPath = null;
      flush(true);
    } else if (lastPath === null) {
      pageView();
    }
  });

  w.PRO_ANALYTICS = { track: track, flush: flush };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', pageView); else pageView();
})(window);

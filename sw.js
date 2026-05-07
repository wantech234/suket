// Suket Bersih Service Worker v1.0
const CACHE_NAME = 'suketbersih-v1';
const OFFLINE_URL = '/';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap',
];

// Install: precache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for same-origin, network-first for others
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // YouTube thumbnails: cache 7 days
  if (url.hostname === 'img.youtube.com') {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(resp => {
            cache.put(event.request, resp.clone());
            return resp;
          }).catch(() => new Response('', { status: 404 }));
        })
      )
    );
    return;
  }

  // Google Fonts: stale-while-revalidate
  if (url.hostname.includes('fonts.')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          const networkFetch = fetch(event.request).then(resp => {
            cache.put(event.request, resp.clone());
            return resp;
          });
          return cached || networkFetch;
        })
      )
    );
    return;
  }

  // Same-origin: cache-first, fallback to offline page
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached =>
        cached || fetch(event.request).then(resp => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return resp;
        }).catch(() => caches.match(OFFLINE_URL))
      )
    );
  }
});

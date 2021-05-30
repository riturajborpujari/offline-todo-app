// Files to cache
const CACHE_NAME = 'todoManagerApp-v1';

const contentToCache = [
  '/',
];

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installing');
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
    console.log('[Service Worker Caching done: Done caching');
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  /** Do NOT cache Post requests */
  if (e.request.method === 'POST') {
    e.respondWith(fetch(e.request));
  }
  else {
    e.respondWith((async () => {
      const r = await caches.match(e.request);

      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) return r;

      const response = await fetch(e.request);

      /** Cache if this is a HTTP request */
      const httpUrl = /^http[s]{0,1}:\/\//;
      if (httpUrl.test(e.request.url)) {
        const cache = await caches.open(CACHE_NAME);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
      }

      return response;
    })());
  }
});
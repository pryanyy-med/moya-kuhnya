/* Моя кухня 1.0.2 — app-shell cache. IndexedDB is never modified by this worker. */
const CACHE = 'moya-kuhnya-v1.0.2-20261122';
const CORE = ['./', './index.html', './styles.css', './app.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Use the network for this release's files, rather than accidentally copying v1.0.1.
    await Promise.all(CORE.map(async path => {
      const request = new Request(new URL(path, self.registration.scope), {cache: 'reload'});
      const response = await fetch(request);
      if (!response.ok) throw new Error(`Cannot precache ${path}: ${response.status}`);
      await cache.put(request, response);
    }));
    // One-time bridge from 1.0.1: the old app has no update button/listener.
    // Activate 1.0.2 automatically so it can install the future opt-in update UI.
    // In v1.0.3+ REMOVE this call; later releases should wait for user confirmation.
    await self.skipWaiting();
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'GET_VERSION') event.source?.postMessage({type: 'APP_VERSION', version: '1.0.2'});
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('moya-kuhnya-') && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  const url = new URL(request.url);
  if (!url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE);
          await cache.put(new URL('./index.html', self.registration.scope).href, response.clone());
        }
        return response;
      } catch {
        return (await caches.match(new URL('./index.html', self.registration.scope).href)) || Response.error();
      }
    })());
    return;
  }
  // Static files are precached at installation; update comes with a new worker.
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE);
        await cache.put(request, response.clone());
      }
      return response;
    } catch { return Response.error(); }
  })());
});

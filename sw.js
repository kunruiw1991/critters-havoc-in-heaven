const CACHE_NAME = 'critters-lianhuanhua-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './panels/panel_01.jpg',
  './panels/panel_02.jpg',
  './panels/panel_03.jpg',
  './panels/panel_04.jpg',
  './panels/panel_05.jpg',
  './panels/panel_06.jpg',
  './panels/panel_07.jpg',
  './panels/panel_08.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});

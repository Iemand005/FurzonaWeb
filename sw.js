const CACHE_NAME = 'app-cache-v1.0';
const ASSETS = [
  '/',
  '/index.html',
  '/login.html',
  '/profile.html',
  '/search.html',
  '/style.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

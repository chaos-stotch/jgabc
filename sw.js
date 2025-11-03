const CACHE_NAME = 'jgabc-v1';
const urlsToCache = [
  './',
  './transcriber.html',
  './index.html',
  './css/bootstrap.min.css',
  './css/smoothness/jquery-ui-1.10.3.custom.min.css',
  './style.css',
  './jquery.min.js',
  './jquery-ui-1.10.3.custom.min.js',
  './util.js',
  './transcriber.html.js',
  './exsurge.min.js',
  './icon/clear-main.png'
];

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


// service-worker.js

const cacheName = 'my-cache';
const offlinePage = '/offline.html';

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return cache.addAll([
          '/', // Cache the root page
          '/index.html', // Cache the index page
          '*.html', // Cache all HTML pages
          offlinePage, // Cache the offline page
        ]);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((networkResponse) => {
            const cache = caches.open(cacheName);
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
          .catch(() => {
            return caches.match(offlinePage); // Return the cached offline page
          });
      })
  );
});

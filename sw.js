console.log(`hi there... nom`);

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('Crabbo').then(function(cache) {
      return cache.addAll([
        'index.html',
        'manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('Crabbo').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
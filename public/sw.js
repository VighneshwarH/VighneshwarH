const CACHE_NAME = 'vighneshwarh-offline-v1'
const scope = self.registration.scope
const offlineAssets = [
  new URL('offline.html', scope).href,
  new URL('fonts/agency.otf', scope).href,
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(offlineAssets))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return

  event.respondWith(
    fetch(event.request).catch(async () => {
      const cachedResponse = await caches.match(offlineAssets[0])
      return cachedResponse || Response.error()
    }),
  )
})

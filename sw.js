const CACHE_NAME = 'app-cache-v1.0';
const ASSETS = [
	'./',
	'./index.html',
	'./login.html',
	'./profile.html',
	'./search.html',
	'./style.css',
	'./index.js',
	'./profile.js',
	'./login.js',
	'./search.js',
	'./nav.js',
	'./Furzona.js'
];

self.addEventListener('install', event => {
	event.waitUntil((async () => {
		const cache = await caches.open(CACHE_NAME);
		for (const asset of ASSETS) {
			try {
				await cache.add(asset);
			} catch (error) {
				console.warn('Skipping cached asset:', asset, error);
			}
		}
	}));
});

self.addEventListener('activate', event => {
	event.waitUntil((async () => {
		const keys = await caches.keys();
		await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
		await self.clients.claim();
	}));
});

self.addEventListener('fetch', event => {
	const request = event.request;
	if (request.method !== 'GET') return;

	event.respondWith(
		fetch(request)
			.then(response => {
				if (response.ok && new URL(request.url).origin === self.location.origin) {
					const copy = response.clone();
					caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
				}
				return response;
			})
			.catch(() => caches.match(request))
	);
});

const CACHE_NAME = 'app-cache-v1.0';
const ASSETS = [
	'./',
	'./index.html',
	'./login.html',
	'./profile.html',
	'./search.html',
	'./style.css'
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

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) return response;
			return fetch(event.request).catch(() => caches.match('./index.html'));
		})
	);
});

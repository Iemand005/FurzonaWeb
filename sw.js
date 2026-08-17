const CACHE_NAME = 'app-cache-v2.1';
const ASSETS = [
	'./',
	'./index.html',
	'./post.html',
	'./login.html',
	'./profile.html',
	'./search.html',
	'./style.css',
	'./index.js',
	'./post.js',
	'./post-preload.js',
	'./profile.js',
	'./login.js',
	'./search.js',
	'./nav.js',
	'./like.js',
	'./Furzona.js',
	'./profile-preload.js',
	'./vt-types.js',
	'./Assets/arrow-left.svg',
	'./Assets/arrow-right.svg',
	'./Assets/menu.svg',
	'./Assets/search.svg',
	'./Assets/heart.svg',
	'./Assets/heart-liked.svg'
];

const LONG_TTL = 'public, max-age=31536000, immutable';

const isCacheable = (response) => response.ok || response.type === 'opaque';

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
		await self.skipWaiting();
	}));
});

self.addEventListener('activate', event => {
	event.waitUntil((async () => {
		const keys = await caches.keys();
		await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
		await self.clients.claim();
	}));
});

const withLongTTL = (response) => {
	const headers = new Headers(response.headers);
	if (!headers.has('Cache-Control')) headers.set('Cache-Control', LONG_TTL);
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
};

self.addEventListener('fetch', event => {
	const request = event.request;
	if (request.method !== 'GET') return;

	const url = new URL(request.url);

	if (request.mode === 'navigate' || url.origin === self.location.origin && request.mode === 'same-origin') {
		event.respondWith((async () => {
			try {
				const response = await fetch(request);
				if (isCacheable(response)) {
					const copy = response.clone();
					caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
				}
				return response;
			} catch {
				const cached = await caches.match(request);
				if (cached) return cached;
				return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
			}
		})());
		return;
	}

	event.respondWith((async () => {
		const cached = await caches.match(request);
		if (cached) {
			try {
				const fresh = await fetch(request);
				if (isCacheable(fresh)) {
					const copy = fresh.clone();
					caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
				}
			} catch {}
			if (cached.type === 'basic' || cached.type === 'cors') return withLongTTL(cached);
			return cached;
		}
		try {
			const response = await fetch(request);
			if (isCacheable(response)) {
				const copy = response.clone();
				caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
			}
			return response;
		} catch {
			return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
		}
	})());
});
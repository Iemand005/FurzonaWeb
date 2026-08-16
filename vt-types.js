(() => {
	const pageName = (url) => {
		const path = new URL(url).pathname;
		if (path.endsWith("index.html") || path.endsWith("/")) return "index";
		if (path.endsWith("login.html")) return "login";
		return null;
	};

	const isFlip = (a, b) => {
		const x = pageName(a);
		const y = pageName(b);
		return (x === "login" && y === "index") || (x === "index" && y === "login");
	};

	window.addEventListener("pageswap", (e) => {
		if (e.viewTransition && isFlip(location.href, e.activation.entry.url)) {
			e.viewTransition.types.add("flip");
		}
	});

	window.addEventListener("pagereveal", (e) => {
		const from = window.navigation?.activation?.from?.url;
		if (e.viewTransition && from && isFlip(location.href, from)) {
			e.viewTransition.types.add("flip");
		}
	});
})();
document.addEventListener("DOMContentLoaded", () => {
	const searchButtons = document.querySelectorAll("[data-nav-search]");
	searchButtons.forEach(button => {
		button.addEventListener("click", () => {
			window.location.href = "search.html";
		});
	});

	const forwardButtons = document.querySelectorAll("[data-nav-forward]");
	const syncForwardState = () => {
		const canGoForward = window.navigation ? window.navigation.canGoForward : true;
		forwardButtons.forEach(button => {
			button.disabled = !canGoForward;
		});
	};
	forwardButtons.forEach(button => {
		button.addEventListener("click", () => {
			history.forward();
		});
	});
	syncForwardState();
	window.addEventListener("pageshow", syncForwardState);
	window.addEventListener("popstate", syncForwardState);
	window.navigation?.addEventListener("navigate", syncForwardState);
	
	if ('serviceWorker' in navigator) {
	  navigator.serviceWorker.register('./sw.js').catch(() => {});
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const searchButtons = document.querySelectorAll("[data-nav-search]");
	searchButtons.forEach(button => {
		button.addEventListener("click", () => {
			window.location.href = "search.html";
		});
	});

	const backButtons = document.querySelectorAll("[data-nav-back]");
	backButtons.forEach(button => {
		button.addEventListener("click", () => {
			if (history.length > 1 || window.navigation?.canGoBack) {
				history.back();
			} else {
				location.replace("index.html");
			}
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

document.addEventListener("DOMContentLoaded", () => {
	const addLoginLink = () => {
		if (window.location.pathname.endsWith("login.html")) return;
		if (furzona.isLoggedIn) return;
		const headerSections = document.querySelectorAll("header > section");
		const navSection = headerSections[headerSections.length - 1];
		if (!navSection) return;
		const link = document.createElement("a");
		link.className = "login-link";
		link.href = "login.html";
		link.textContent = "Log in";
		navSection.appendChild(link);
	};
	addLoginLink();

	const searchButtons = document.querySelectorAll("[data-nav-search]");
	searchButtons.forEach(button => {
		button.addEventListener("click", () => {
			window.location.href = "search.html";
		});
	});

	const homeButtons = document.querySelectorAll("[data-nav-home]");
	homeButtons.forEach(img => {
		img.addEventListener("click", () => {
			window.location.href = "index.html";
		});
		img.style.cursor = "pointer";
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

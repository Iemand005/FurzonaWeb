document.addEventListener("DOMContentLoaded", () => {
	const navSection = (() => {
		const sections = document.querySelectorAll("header > section");
		return sections[sections.length - 1] || null;
	})();

	const isLoginPage = endsWith(window.location.pathname, "login.html");
	if (isLoginPage) return;

	const addLoginLink = () => {
		if (furzona.isLoggedIn) return;
		if (!navSection) return;
		const link = document.createElement("a");
		link.className = "login-link";
		link.href = "login.html";
		link.textContent = "Log in";
		navSection.appendChild(link);
	};

	const addProfileButton = () => {
		const me = furzona.user;
		if (!me || !furzona.isLoggedIn) return;
		if (!navSection) return;
		const button = document.createElement("button");
		button.type = "button";
		button.className = "profile-btn";
		button.title = me.username || "My profile";
		const img = document.createElement("img");
		img.alt = me.username || "My profile";
		img.src = furzona.getProfilePictureUrl(me);
		button.appendChild(img);
		button.addEventListener("click", () => {
			const params = new URLSearchParams({ id: me.id });
			if (me.i) params.set("avatar", furzona.getMediaUrl(me.i));
			if (me.b) params.set("banner", furzona.getMediaUrl(me.b));
			if (me.username) params.set("username", me.username);
			window.location.href = "profile.html?" + params.toString();
		});
		navSection.appendChild(button);
	};

	const searchButton = document.getElementById("nav-search");
	if (searchButton) {
		searchButton.addEventListener("click", () => {
			window.location.href = "search.html";
		});
	}

	const homeImg = document.getElementById("nav-home");
	if (homeImg) {
		homeImg.addEventListener("click", () => {
			window.location.href = "index.html";
		});
		homeImg.style.cursor = "pointer";
	}

	const addNavHomeButton = () => {
		if (!navSection || document.getElementById("nav-home-button")) return;
		const button = document.createElement("button");
		button.type = "button";
		button.id = "nav-home-button";
		button.title = "Home";
		const img = document.createElement("img");
		img.src = "Assets/home.svg";
		img.alt = "Home";
		button.appendChild(img);
		button.addEventListener("click", () => window.location.href = "index.html");
		navSection.appendChild(button);
	};

	const addNewPostButton = () => {
		if (window.location.pathname.endsWith("create-post.html")) return;
		if (!furzona.isLoggedIn) return;
		if (!navSection || document.getElementById("nav-new-post")) return;
		const button = document.createElement("button");
		button.type = "button";
		button.id = "nav-new-post";
		button.title = "New post";
		const plus = document.createElement("span");
		plus.textContent = "\uFF0B";
		plus.style.fontSize = "18px";
		plus.style.lineHeight = "1";
		button.appendChild(plus);
		button.addEventListener("click", () => {
			window.location.href = "create-post.html";
		});
		navSection.appendChild(button);
	};

	const backButton = document.getElementById("nav-back");
	if (backButton) {
		backButton.addEventListener("click", () => {
			if (history.length > 1 || window.navigation?.canGoBack) {
				history.back();
			} else {
				location.replace("index.html");
			}
		});
	}

	const forwardButton = document.getElementById("nav-forward");
	const syncForwardState = () => {
		if (!(forwardButton instanceof HTMLButtonElement)) return;
		const canGoForward = window.navigation ? window.navigation.canGoForward : true;
		forwardButton.disabled = !canGoForward;
	};
	if (forwardButton) {
		forwardButton.addEventListener("click", () => {
			history.forward();
		});
	}
	window.addEventListener("pageshow", syncForwardState);
	window.addEventListener("popstate", syncForwardState);
	window.navigation?.addEventListener("navigate", syncForwardState);

	addNavHomeButton();
	addNewPostButton();
	addProfileButton();
	addLoginLink();
	syncForwardState();

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./sw.js').catch(() => {});
	}
});
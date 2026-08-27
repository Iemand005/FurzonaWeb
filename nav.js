/**
 * Navigate to the profile page, deriving the URL params from a user object.
 * Accepts either a user with raw `i`/`b` media ids, or pre-resolved
 * `avatar`/`banner` values when those ids aren't available.
 * @param {{ id?: string, i?: string, b?: string, username?: string, avatar?: string, banner?: string|number } | null | undefined} user
 */
window.openProfile = (user) => {
	if (!user || !user.id) return;
	const params = new URLSearchParams({ id: user.id });
	if (user.i) params.set("avatar", furzona.getProfilePictureUrl(user));
	else if (user.avatar) params.set("avatar", user.avatar);
	params.set("banner", user.b ? furzona.getMediaUrl(user.b) : user.banner || 0);
	if (user.username) params.set("username", user.username);
	window.location.href = "profile.html?" + params.toString();
};

/**
 * Navigate to the post page, deriving the URL params from a post object.
 * An optional pre-resolved `imageUrl` overrides the media derived from `post.m`.
 * @param {{ id?: string, u?: { id?: string, i?: string, username?: string }, t?: string, m?: string[] } | null | undefined} post
 * @param {string} [imageUrl]
 */
window.openPost = (post, imageUrl) => {
	if (!post || !post.id) return;
	const u = post.u || {};
	const params = new URLSearchParams({ id: post.id });
	if (u.id) params.set("author", u.id);
	if (u.i) params.set("avatar", furzona.getProfilePictureUrl(u));
	if (u.username) params.set("username", u.username);
	if (post.t) params.set("title", post.t);
	if (imageUrl) params.set("img", imageUrl);
	else if (post.m && post.m.length) params.set("img", furzona.getMediaUrl(post.m[0]));
	window.location.href = "post.html?" + params.toString();
};

/**
 * Shared View-Transitions manager.
 *
 * Pages hand the element(s) that were just clicked to `registerVT()` as
 * `{ role: [element, id] }` pairs (role: avatar | name | title | image). The
 * shared `pageswap` handler snapshots them under `{role}-{id}` names and
 * cleans them up once the outgoing transition is ready. The shared
 * `pagereveal` handler matches the equivalent feed card when arriving back
 * from a post or profile page.
 */
let vtOut = null;
const vtRoles = ["avatar", "name", "title", "image"];

/**
 * @param {{ avatar?: [Element | null, string], name?: [Element | null, string], title?: [Element | null, string], image?: [Element | null, string] } | null | undefined} parts
 */
window.registerVT = (parts) => { vtOut = parts || null; };

/**
 * Apply `{role}-{id}` transition names for the given parts and clear them
 * once the page transition is ready.
 * @param {{ avatar?: [Element | null, string], name?: [Element | null, string], title?: [Element | null, string], image?: [Element | null, string] }} parts
 * @param {Event} event
 */
function applyVTParts(parts, event) {
	for (const role of vtRoles) {
		const [el, id] = parts[role] || [];
		if (el && id) el.style.viewTransitionName = `${role}-${id}`;
	}
	const cleanup = () => {
		for (const role of vtRoles) {
			const [el] = parts[role] || [];
			if (el) el.style.viewTransitionName = "";
		}
	};
	event.viewTransition.ready.then(cleanup, cleanup);
}

window.addEventListener("pageswap", (event) => {
	if (!event.viewTransition) return;
	document.querySelectorAll(".pfp, .profile p").forEach(el => el.style.viewTransitionName = "");
	if (vtOut) {
		const parts = {
			avatar: vtOut.avatar,
			name: vtOut.name,
			title: vtOut.title,
			image: vtOut.image
		};
		applyVTParts(parts, event);
	}
	vtOut = null;
});

window.addEventListener("pagereveal", (event) => {
	if (!event.viewTransition) return;
	const fromURL = window.navigation?.activation?.from?.url;
	if (!fromURL) return;
	const url = new URL(fromURL);
	const fromPath = url.pathname;

	if (fromPath.endsWith("post.html")) {
		const postId = url.searchParams.get("id");
		const card = postId && document.querySelector(`[data-post-id="${postId}"]`);
		if (!card) return;
		const pfp = card.querySelector(".pfp");
		const authorId = pfp?.dataset.transitionId;
		applyVTParts({
			avatar: [pfp, authorId],
			name: [card.querySelector(".profile p"), authorId],
			title: [card.querySelector("h2"), postId],
			image: [card.querySelector(":scope > img"), postId]
		}, event);
		return;
	}

	if (fromPath.endsWith("profile.html")) {
		const id = url.searchParams.get("id");
		const pfp = id && document.querySelector(`[data-transition-id="${id}"]`);
		if (!pfp) return;
		const nameEl = pfp.closest(".profile")?.querySelector("p");
		applyVTParts({
			avatar: [pfp, id],
			name: [nameEl, id]
		}, event);
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const navSection = (() => {
		const navEl = document.querySelector("header nav");
		if (navEl) return navEl;
		const searchBtn = document.getElementById("nav-search");
		if (searchBtn?.parentElement) return searchBtn.parentElement;
		return document.querySelector("header section:nth-child(2)") || null;
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
			window.registerVT({ avatar: [img, me.id] });
			window.openProfile(me);
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
		button.onclick = goHome;
		button.addEventListener("click", goHome);
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
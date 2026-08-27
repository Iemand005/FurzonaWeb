const searchForm = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsEl = document.getElementById("search-results");
const emptyEl = document.getElementById("search-empty");

let clickedPfp = null;
let clickedName = null;
let clickedTitle = null;
let clickedImage = null;

window.addEventListener("pageswap", (event) => {
	if (!event.viewTransition) return;
	document.querySelectorAll(".pfp").forEach(img => img.style.viewTransitionName = "");
	document.querySelectorAll("#search-results p").forEach(p => p.style.viewTransitionName = "");
	document.querySelectorAll("#search-results h2").forEach(h => h.style.viewTransitionName = "");
	document.querySelectorAll("#search-results > li > img").forEach(img => img.style.viewTransitionName = "");
	if (!clickedPfp) return;
	clickedPfp.style.viewTransitionName = `avatar-${clickedPfp.dataset.transitionId}`;
	if (clickedName) clickedName.style.viewTransitionName = `name-${clickedPfp.dataset.transitionId}`;
	if (clickedTitle) clickedTitle.style.viewTransitionName = `title-${clickedTitle.dataset.postId}`;
	if (clickedImage) clickedImage.style.viewTransitionName = `image-${clickedImage.dataset.postId}`;
	const cleanup = () => {
		clickedPfp.style.viewTransitionName = "";
		if (clickedName) clickedName.style.viewTransitionName = "";
		if (clickedTitle) clickedTitle.style.viewTransitionName = "";
		if (clickedImage) clickedImage.style.viewTransitionName = "";
	};
	event.viewTransition.ready.then(cleanup, cleanup);
});

window.addEventListener("pagereveal", (e) => {
	if (!e.viewTransition) return;
	const fromURL = window.navigation?.activation?.from?.url;
	if (!fromURL) return;
	const url = new URL(fromURL);
	if (url.pathname.endsWith("post.html")) {
		const postId = url.searchParams.get("id");
		const card = postId && document.querySelector(`[data-post-id="${postId}"]`);
		if (!card) return;
		const pfp = card.querySelector(".pfp");
		const authorId = pfp?.dataset.transitionId;
		const nameEl = pfp?.parentElement.querySelector("p");
		const title = card.querySelector("h2");
		const image = card.querySelector(":scope > img");
		if (pfp && authorId) pfp.style.viewTransitionName = `avatar-${authorId}`;
		if (nameEl && authorId) nameEl.style.viewTransitionName = `name-${authorId}`;
		if (title) title.style.viewTransitionName = `title-${postId}`;
		if (image) image.style.viewTransitionName = `image-${postId}`;
		const cleanup = () => {
			if (pfp) pfp.style.viewTransitionName = "";
			if (nameEl) nameEl.style.viewTransitionName = "";
			if (title) title.style.viewTransitionName = "";
			if (image) image.style.viewTransitionName = "";
		};
		e.viewTransition.ready.then(cleanup, cleanup);
		return;
	}
	if (url.pathname.endsWith("profile.html")) {
		const id = url.searchParams.get("id");
		const pfp = id && document.querySelector(`[data-transition-id="${id}"]`);
		if (!pfp) return;
		const nameEl = pfp.parentElement.querySelector("p");
		pfp.style.viewTransitionName = `avatar-${id}`;
		if (nameEl) nameEl.style.viewTransitionName = `name-${id}`;
		const cleanup = () => {
			pfp.style.viewTransitionName = "";
			if (nameEl) nameEl.style.viewTransitionName = "";
		};
		e.viewTransition.ready.then(cleanup, cleanup);
	}
});

const createdPost = (item) => {
	const card = document.createElement("li");
	card.className = "post card";
	card.dataset.postId = item.id;
	const profile = document.createElement("section");
	profile.className = "profile";
	const pfp = document.createElement("img");
	pfp.className = "pfp";
	pfp.src = furzona.getProfilePictureUrl(item.u);
	pfp.alt = item.u.username;
	pfp.dataset.transitionId = item.u.id;
	const name = document.createElement("p");
	name.textContent = item.u.username;
	profile.appendChild(pfp);
	profile.appendChild(name);
	card.appendChild(profile);

	const title = document.createElement("h2");
	title.textContent = item.t || "";
	title.dataset.postId = item.id;
	card.appendChild(title);

	let image = null;
	if (item.m && item.m.length > 0) {
		image = document.createElement("img");
		image.src = furzona.getMediaUrl(item.m[0]);
		image.alt = item.t || item.u.username || "Post image";
		image.dataset.postId = item.id;
		card.appendChild(image);
	}

	card.appendChild(createLikeButton(item, { liked: !!item.z }));

	card.style.cursor = "pointer";
	card.onclick = () => {
		clickedPfp = pfp;
		clickedName = name;
		clickedTitle = title;
		clickedImage = image;
		const params = new URLSearchParams({ id: item.id, username: item.u.username });
		if (item.u.id) params.set("author", item.u.id);
		if (item.u.i) params.set("avatar", furzona.getProfilePictureUrl(item.u));
		if (item.t) params.set("title", item.t);
		if (item.m && item.m.length > 0) params.set("img", furzona.getMediaUrl(item.m[0]));
		window.location.href = "post.html?" + params.toString();
	};
	return card;
};

const createdUser = (item) => {
	const card = document.createElement("li");
	card.className = "profile-row card";
	card.dataset.transitionId = item.id;
	const pfp = document.createElement("img");
	pfp.className = "pfp";
	pfp.src = furzona.getProfilePictureUrl(item);
	pfp.alt = item.username;
	pfp.dataset.transitionId = item.id;
	const name = document.createElement("p");
	name.textContent = item.username;
	card.appendChild(pfp);
	card.appendChild(name);

	card.style.cursor = "pointer";
	card.onclick = () => {
		clickedPfp = pfp;
		clickedName = name;
		clickedTitle = null;
		clickedImage = null;
		const params = new URLSearchParams({ id: item.id, username: item.username });
		if (item.i) params.set("avatar", furzona.getProfilePictureUrl(item));
		params.set("banner", item.b ? furzona.getMediaUrl(item.b) : 0);
		window.location.href = "profile.html?" + params.toString();
	};
	return card;
};

if (searchForm) {
	searchForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const q = input.value.trim();
		if (!q) return;

		resultsEl.innerHTML = "";
		emptyEl.hidden = true;

		furzona.newSearch(q)
			.then(({ p, u }) => {
				const posts = p || [];
				const users = u || [];
				if (posts.length === 0 && users.length === 0) {
					emptyEl.textContent = "No results.";
					emptyEl.hidden = false;
					return;
				}
				posts.forEach(item => resultsEl.appendChild(createdPost(item)));
				users.forEach(item => resultsEl.appendChild(createdUser(item)));
			})
			.catch(error => {
				console.error("Search failed:", error);
				emptyEl.textContent = "Search failed.";
				emptyEl.hidden = false;
			});
	});
}
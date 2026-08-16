(() => {
	const params = new URLSearchParams(window.location.search);
	const id = params.get("id");
	const avatarParam = params.get("avatar");
	const usernameParam = params.get("username");
	const titleParam = params.get("title");
	const imgParam = params.get("img");

	for (const url of [avatarParam, imgParam]) {
		if (!url) continue;
		const link = document.createElement("link");
		link.rel = "preload";
		link.as = "image";
		link.href = url;
		document.head.appendChild(link);
	}

	window.addEventListener("pagereveal", () => {
		const pfpEl = document.getElementById("post-author-pfp");
		const nameEl = document.getElementById("post-author-name");
		const titleEl = document.getElementById("post-title");
		const imgEl = document.getElementById("post-first-image");

		if (pfpEl && avatarParam) pfpEl.src = avatarParam;
		if (nameEl && usernameParam) nameEl.textContent = usernameParam;
		if (titleEl && titleParam) titleEl.textContent = titleParam;
		if (imgEl && imgParam) {
			imgEl.src = imgParam;
			imgEl.hidden = false;
		}

		if (pfpEl) pfpEl.style.viewTransitionName = id ? `post-avatar-${id}` : "post-avatar";
		if (nameEl) nameEl.style.viewTransitionName = id ? `post-name-${id}` : "post-name";
		if (titleEl) titleEl.style.viewTransitionName = id ? `post-title-${id}` : "post-title";
		if (imgEl && imgParam) imgEl.style.viewTransitionName = id ? `post-image-${id}` : "post-image";
	});
})();
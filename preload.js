(() => {
	const params = new URLSearchParams(window.location.search);
	const userId = params.get("author") || params.get("id");
	const postId = params.get("id");

	const roles = {
		avatar: { param: "avatar", key: "userId", set: (el, v) => { el.src = v; } },
		name: { param: "username", key: "userId", set: (el, v) => { el.textContent = v; } },
		banner: { param: "banner", key: "userId", set: (el, v) => { el.src = v; } },
		title: { param: "title", key: "postId", set: (el, v) => { el.textContent = v; } },
		image: { param: "img", key: "postId", set: (el, v) => { el.src = v; el.hidden = false; } }
	};

	for (const role of ["avatar", "banner", "image"]) {
		const url = params.get(roles[role].param);
		if (!url) continue;
		const link = document.createElement("link");
		link.rel = "preload";
		link.as = "image";
		link.href = url;
		document.head.appendChild(link);
	}

	window.addEventListener("pagereveal", () => {
		document.querySelectorAll("[data-transition]").forEach(el => {
			const role = roles[el.dataset.transition];
			if (!role) return;
			const value = params.get(role.param);
			if (value !== null) role.set(el, value);
			const key = role.key === "userId" ? userId : postId;
			if (key) el.style.viewTransitionName = `${el.dataset.transition}-${key}`;
		});
	});
})();
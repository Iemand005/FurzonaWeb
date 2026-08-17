const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const authorEl = document.getElementById("post-author");
const pfpEl = document.getElementById("post-author-pfp");
const nameEl = document.getElementById("post-author-name");
const titleEl = document.getElementById("post-title");
const metaEl = document.getElementById("post-meta");
const mediaEl = document.getElementById("post-media");
const firstImageEl = document.getElementById("post-first-image");
const textEl = document.getElementById("post-text");
const actionsEl = document.getElementById("post-actions");

let authorId = null;

window.addEventListener("pageswap", (event) => {
	if (!event.viewTransition || !id) return;
	const destination = new URL(event.activation.entry.url);
	if (destination.pathname.endsWith("profile.html")) {
		if (!authorId) return;
		if (pfpEl) pfpEl.style.viewTransitionName = `profile-avatar-${authorId}`;
		if (nameEl) nameEl.style.viewTransitionName = `profile-name-${authorId}`;
		return;
	}
	if (destination.pathname.endsWith("index.html")) {
		if (pfpEl) pfpEl.style.viewTransitionName = `post-avatar-${id}`;
		if (nameEl) nameEl.style.viewTransitionName = `post-name-${id}`;
		if (titleEl) titleEl.style.viewTransitionName = `post-title-${id}`;
		const firstImg = firstImageEl && !firstImageEl.hidden ? firstImageEl : null;
		if (firstImg) firstImg.style.viewTransitionName = `post-image-${id}`;
	}
});

/**
 * @param {FurzonaPost} post
 */
function renderPost(post) {
	const user = post.u;
	authorId = user.id;
	const date = new Date(post.createdAt || post.updatedAt);

	titleEl.textContent = post.t || "Untitled";
	metaEl.textContent = `ID: ${post.id} • ${date.toLocaleString()}`;

	textEl.textContent = [post.c, post.d].filter(Boolean).join("\n\n");

	pfpEl.src = furzona.getProfilePictureUrl(user);
	pfpEl.alt = user.username;
	nameEl.textContent = user.username;

	authorEl.style.cursor = "pointer";
	authorEl.onclick = () => {
		const profileParams = new URLSearchParams({ id: user.id });
		if (user.i) profileParams.set("avatar", furzona.getProfilePictureUrl(user));
		if (user.b) profileParams.set("banner", furzona.getMediaUrl(user.b));
		if (user.username) profileParams.set("username", user.username);
		window.location.href = "profile.html?" + profileParams.toString();
	};

	if (actionsEl) {
		actionsEl.appendChild(createLikeButton(post, { liked: !!post.z }));
	}

	if (post.m && post.m.length > 0) {
		post.m.forEach((path, index) => {
			if (index === 0) {
				firstImageEl.src = furzona.getMediaUrl(path);
				firstImageEl.alt = post.t || user.username || "Post media";
				firstImageEl.hidden = false;
			} else {
				const img = document.createElement("img");
				img.src = furzona.getMediaUrl(path);
				img.alt = post.t || user.username || "Post media";
				img.loading = "lazy";
				mediaEl.appendChild(img);
			}
		});
	}
}

if (id) {
	furzona.getPost(id)
		.then(renderPost)
		.catch(error => {
			console.error("Failed to load post:", error);
			textEl.textContent = "Could not load post.";
		});
} else {
	console.error("No post id provided in the URL.");
	textEl.textContent = "No post id provided.";
}
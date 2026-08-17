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
const commentsEl = document.getElementById("post-comment-list");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");

let authorId = null;

window.addEventListener("pageswap", (event) => {
	if (!event.viewTransition || !id) return;
	if (pfpEl && authorId) pfpEl.style.viewTransitionName = `avatar-${authorId}`;
	if (nameEl && authorId) nameEl.style.viewTransitionName = `name-${authorId}`;
	if (titleEl) titleEl.style.viewTransitionName = `title-${id}`;
	const firstImg = firstImageEl && !firstImageEl.hidden ? firstImageEl : null;
	if (firstImg) firstImg.style.viewTransitionName = `image-${id}`;
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

/**
 * @param {FurzonaComment} comment
 */
function createCommentElement(comment) {
	const card = document.createElement("div");
	card.className = "comment";

	const author = document.createElement("section");
	author.className = "profile";
	const pfp = document.createElement("img");
	pfp.className = "pfp";
	pfp.src = furzona.getProfilePictureUrl(comment.u);
	pfp.alt = comment.u.username;
	const name = document.createElement("p");
	name.textContent = comment.u.username;
	author.appendChild(pfp);
	author.appendChild(name);
	author.style.cursor = "pointer";
	author.onclick = () => {
		const profileParams = new URLSearchParams({ id: comment.u.id });
		if (comment.u.i) profileParams.set("avatar", furzona.getProfilePictureUrl(comment.u));
		if (comment.u.b) profileParams.set("banner", furzona.getMediaUrl(comment.u.b));
		if (comment.u.username) profileParams.set("username", comment.u.username);
		window.location.href = "profile.html?" + profileParams.toString();
	};
	card.appendChild(author);

	const content = document.createElement("p");
	content.className = "comment-text";
	content.textContent = comment.c || "";
	card.appendChild(content);

	const meta = document.createElement("p");
	meta.className = "meta";
	const date = new Date(comment.createdAt || comment.updatedAt);
	const metaParts = [];
	if (comment.l) metaParts.push(`${comment.l} likes`);
	if (comment.s) metaParts.push(`${comment.s} replies`);
	metaParts.push(date.toLocaleString());
	meta.textContent = metaParts.join(" • ");
	card.appendChild(meta);
	card.appendChild(createLikeButton(comment, {
		liked: !!comment.d,
		onLike: () => furzona.likeComment(comment.id),
		onUnlike: () => furzona.unlikeComment(comment.id)
	}));

	return card;
}

let emptyCommentsEl = null;

/**
 * @param {FurzonaComment[]} comments
 */
function renderComments(comments) {
	if (!commentsEl) return;
	if (!comments || comments.length === 0) {
		emptyCommentsEl = document.createElement("p");
		emptyCommentsEl.className = "meta";
		emptyCommentsEl.textContent = "No comments yet.";
		commentsEl.appendChild(emptyCommentsEl);
		return;
	}
	comments.forEach(comment => {
		commentsEl.appendChild(createCommentElement(comment));
	});
}

/** @param {FurzonaComment} comment */
function insertComment(comment) {
	if (!commentsEl) return;
	if (emptyCommentsEl) {
		emptyCommentsEl.remove();
		emptyCommentsEl = null;
	}
	commentsEl.prepend(createCommentElement(comment));
}

if (id) {
	furzona.getPost(id)
		.then(renderPost)
		.catch(error => {
			console.error("Failed to load post:", error);
			textEl.textContent = "Could not load post.";
		});

	furzona.getComments(id)
		.then(renderComments)
		.catch(error => {
			console.error("Failed to load comments:", error);
		});
} else {
	console.error("No post id provided in the URL.");
	textEl.textContent = "No post id provided.";
}

if (commentForm && commentInput && id) {
	if (!furzona.isLoggedIn) {
		commentInput.disabled = true;
		commentInput.placeholder = "Log in to comment";
	} else {
		commentForm.addEventListener("submit", async (event) => {
			event.preventDefault();
			const content = commentInput.value.trim();
			if (!content) return;
			const button = commentForm.querySelector('button[type="submit"]');
			button.disabled = true;
			try {
				const comment = await furzona.createComment(id, content);
				commentInput.value = "";
				if (comment) insertComment(comment);
			} catch (error) {
				console.error("Failed to post comment:", error);
			} finally {
				button.disabled = false;
			}
		});
	}
}
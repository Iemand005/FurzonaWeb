const params = new URLSearchParams(window.location.search);
const userId = params.get("id");
const postList = document.getElementById("posts-list");
const postsHeader = document.getElementById("posts-header");
const postsOwnerAvatar = document.getElementById("posts-owner-avatar");
const postsOwnerName = document.getElementById("posts-owner-name");
const pageTitle = document.getElementById("page-title");

let clickedOwner = null;
let clickedPost = null;

if (userId && postsHeader && postsOwnerAvatar && postsOwnerName) {
	const avatar = params.get("avatar");
	const username = params.get("username");
	if (avatar) postsOwnerAvatar.src = avatar;
	postsOwnerAvatar.alt = username || "Owner avatar";
	postsOwnerName.textContent = username ? `${username}'s posts` : "Posts";
	postsHeader.hidden = false;
	postsHeader.style.cursor = "pointer";
	postsHeader.onclick = () => {
		clickedOwner = postsOwnerAvatar;
		const profileParams = new URLSearchParams({ id: userId });
		if (avatar) profileParams.set("avatar", avatar);
		if (params.get("banner")) profileParams.set("banner", params.get("banner"));
		if (username) profileParams.set("username", username);
		window.location.href = "profile.html?" + profileParams.toString();
	};
	if (pageTitle) pageTitle.textContent = username ? `${username}'s posts` : "Posts";
}

window.addEventListener("pageswap", (event) => {
	if (!event.viewTransition) return;
	if (clickedOwner && userId) {
		clickedOwner.style.viewTransitionName = `avatar-${userId}`;
		if (postsOwnerName) postsOwnerName.style.viewTransitionName = `name-${userId}`;
		const cleanup = () => {
			clickedOwner.style.viewTransitionName = "";
			if (postsOwnerName) postsOwnerName.style.viewTransitionName = "";
		};
		event.viewTransition.ready.then(cleanup, cleanup);
		clickedOwner = null;
		return;
	}
	if (!clickedPost) return;
	const { id, authorId, pfp, username, title, image } = clickedPost;
	document.querySelectorAll(".pfp").forEach(img => { img.style.viewTransitionName = ""; });
	document.querySelectorAll(".profile p").forEach(p => { p.style.viewTransitionName = ""; });
	pfp.style.viewTransitionName = `avatar-${authorId}`;
	username.style.viewTransitionName = `name-${authorId}`;
	if (title) title.style.viewTransitionName = `title-${id}`;
	if (image) image.style.viewTransitionName = `image-${id}`;
	const cleanup = () => {
		pfp.style.viewTransitionName = "";
		username.style.viewTransitionName = "";
		if (title) title.style.viewTransitionName = "";
		if (image) image.style.viewTransitionName = "";
	};
	event.viewTransition.ready.then(cleanup, cleanup);
	clickedPost = null;
});

window.addEventListener("pagereveal", (e) => {
	if (!e.viewTransition) return;
	const fromURL = window.navigation?.activation?.from?.url;
	if (!fromURL) return;
	const url = new URL(fromURL);
	if (!url.pathname.endsWith("post.html")) return;
	const postId = url.searchParams.get("id");
	if (!postId) return;
	const item = document.querySelector(`[data-post-id="${postId}"]`);
	if (!item) return;
	const pfp = item.querySelector(".pfp");
	const username = item.querySelector(".profile p");
	const title = item.querySelector("h2");
	const image = item.querySelector(":scope > img");
	const authorId = pfp?.dataset.transitionId;
	if (pfp && authorId) pfp.style.viewTransitionName = `avatar-${authorId}`;
	if (username && authorId) username.style.viewTransitionName = `name-${authorId}`;
	if (title) title.style.viewTransitionName = `title-${postId}`;
	if (image) image.style.viewTransitionName = `image-${postId}`;
	const cleanup = () => {
		if (pfp) pfp.style.viewTransitionName = "";
		if (username) username.style.viewTransitionName = "";
		if (title) title.style.viewTransitionName = "";
		if (image) image.style.viewTransitionName = "";
	};
	e.viewTransition.ready.then(cleanup, cleanup);
});

if (postList instanceof HTMLUListElement) {
	let isLoading = false;
	let hasMorePosts = true;

	const createPostElement = (/** @type {FurzonaPost} */ post) => {
		const listItem = document.createElement("li");
		listItem.className = "post card";
		listItem.dataset.postId = post.id;
		const timestamp = Date.parse(post.createdAt || post.updatedAt || "0");
		listItem.dataset.date = String(timestamp);

		const profileCard = document.createElement("section");
		profileCard.className = "profile";
		profileCard.style.cursor = "pointer";
		const pfp = document.createElement("img");
		pfp.classList.add("pfp");
		pfp.src = furzona.getProfilePictureUrl(post.u);
		pfp.alt = post.u.username;
		pfp.dataset.transitionId = post.u.id;
		profileCard.appendChild(pfp);

		const username = document.createElement("p");
		username.textContent = post.u.username;
		profileCard.appendChild(username);

		profileCard.onclick = (event) => {
			event.stopPropagation();
			clickedOwner = null;
			clickedPost = null;
			const profileParams = new URLSearchParams({ id: post.u.id });
			if (post.u.i) profileParams.set("avatar", furzona.getProfilePictureUrl(post.u));
			if (post.u.b) profileParams.set("banner", furzona.getMediaUrl(post.u.b));
			if (post.u.username) profileParams.set("username", post.u.username);
			window.location.href = "profile.html?" + profileParams.toString();
		};
		listItem.appendChild(profileCard);

		const title = document.createElement("h2");
		title.textContent = post.t || "";
		listItem.appendChild(title);

		let image = null;
		if (post.m && post.m.length > 0) {
			image = document.createElement("img");
			image.src = furzona.getMediaUrl(post.m[0]);
			image.alt = post.t || post.u.username || "Post image";
			listItem.appendChild(image);
		}

		listItem.appendChild(createLikeButton(post, { liked: !!post.z }));

		listItem.style.cursor = "pointer";
		listItem.onclick = () => {
			clickedOwner = null;
			clickedPost = { id: post.id, authorId: post.u.id, pfp, username, title, image };
			const postParams = new URLSearchParams({ id: post.id });
			if (post.u.id) postParams.set("author", post.u.id);
			if (post.u.i) postParams.set("avatar", furzona.getProfilePictureUrl(post.u));
			if (post.u.username) postParams.set("username", post.u.username);
			if (post.t) postParams.set("title", post.t);
			if (image) postParams.set("img", image.src);
			window.location.href = "post.html?" + postParams.toString();
		};

		return listItem;
	};

	const loadPosts = (date) => {
		if (isLoading || !hasMorePosts) return;
		isLoading = true;

		const request = userId
			? furzona.getUserPosts(userId, date)
			: furzona.getPosts(date);

		request.then(posts => {
			if (!posts || posts.length === 0) {
				hasMorePosts = false;
				isLoading = false;
				if (postList.childElementCount === 0) {
					const empty = document.createElement("li");
					empty.className = "meta";
					empty.textContent = userId ? "No posts from this user yet." : "No posts yet.";
					postList.appendChild(empty);
				}
				return;
			}

			posts.forEach(post => {
				postList.appendChild(createPostElement(post));
			});

			const lastPost = posts[posts.length - 1];
			const lastDate = lastPost?.createdAt || lastPost?.updatedAt || null;
			if (!lastDate) hasMorePosts = false;
			isLoading = false;
		}).catch(error => {
			console.error("Failed to load posts:", error);
			hasMorePosts = false;
			isLoading = false;
		});
	};

	window.addEventListener("scroll", () => {
		const reachedBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;
		if (!reachedBottom) return;

		const lastPost = postList.lastElementChild;
		const lastDate = lastPost instanceof HTMLElement ? Number(lastPost.dataset.date) : null;
		if (lastDate) {
			loadPosts(lastDate);
		} else {
			loadPosts();
		}
	});

	loadPosts();
}
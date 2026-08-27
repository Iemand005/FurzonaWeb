const postList = document.getElementById("posts-list");

if (postList instanceof HTMLUListElement) {
	let isLoading = false;
	let hasMorePosts = true;
	const renderedIds = new Set();
	const feedPosts = [];
	const FEED_KEY = "furzona-feed-v1";
	const FEED_LIMIT = 60;

	const persistFeed = () => {
		try {
			sessionStorage.setItem(FEED_KEY, JSON.stringify(feedPosts));
		} catch (error) {
			console.warn("Could not persist feed:", error);
		}
	};

	const createPostElement = (/** @type {FurzonaPost} */post) => {
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

		profileCard.onclick = (event) => {
			event.stopPropagation();
			window.registerVT({ avatar: [pfp, post.u.id], name: [username, post.u.id] });
			window.openProfile(post.u);
		};

		const username = document.createElement("p");
		username.textContent = post.u.username;
		profileCard.appendChild(username);
		listItem.appendChild(profileCard);

		const title = document.createElement("h2");
		title.textContent = post.t || "";
		listItem.appendChild(title);

		const description = [post.c, post.d].filter(Boolean).join("\n\n");
		if (description) {
			const descEl = document.createElement("p");
			descEl.className = "post-desc";
			descEl.textContent = description;
			listItem.appendChild(descEl);
		}

		let image = null;
		if (post.m && post.m.length > 0) {
			image = document.createElement("img");
			image.src = furzona.getMediaUrl(post.m[0]);
			image.alt = post.t || post.u.username || "Post image";
			listItem.appendChild(image);
		}

const likeButton = createLikeButton(post, { liked: !!post.z });
		listItem.appendChild(likeButton);

		listItem.onclick = () => {
			window.registerVT({
				avatar: [pfp, post.u.id],
				name: [username, post.u.id],
				title: [title, post.id],
				image: [image, post.id]
			});
			window.openPost(post, image?.src);
		};

		return listItem;
	};

	const appendPosts = (posts) => {
		let last = null;
		for (const post of posts) {
			if (!post || !post.id || renderedIds.has(post.id)) continue;
			renderedIds.add(post.id);
			feedPosts.push(post);
			postList.appendChild(createPostElement(post));
			last = post;
		}
		if (feedPosts.length > FEED_LIMIT) feedPosts.splice(0, feedPosts.length - FEED_LIMIT);
		return last;
	};

	const restoreFeed = () => {
		try {
			const raw = sessionStorage.getItem(FEED_KEY);
			if (!raw) return;
			const posts = JSON.parse(raw);
			if (Array.isArray(posts) && posts.length) appendPosts(posts);
		} catch (error) {
			console.warn("Could not restore feed:", error);
		}
	};

	const loadPosts = (date) => {
		if (isLoading || !hasMorePosts) return;
		isLoading = true;

		furzona.getPosts(date).then(posts => {
			if (!posts || posts.length === 0) {
				hasMorePosts = false;
				isLoading = false;
				return;
			}

			const lastPost = appendPosts(posts);
			persistFeed();

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
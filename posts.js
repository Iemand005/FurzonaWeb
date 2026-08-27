const params = new URLSearchParams(window.location.search);
const userId = params.get("id");
const postList = document.getElementById("posts-list");
const postsHeader = document.getElementById("posts-header");
const postsOwnerAvatar = document.getElementById("posts-owner-avatar");
const postsOwnerName = document.getElementById("posts-owner-name");
const pageTitle = document.getElementById("page-title");

if (userId && postsHeader && postsOwnerAvatar && postsOwnerName) {
	const avatar = params.get("avatar");
	const username = params.get("username");
	if (avatar) postsOwnerAvatar.src = avatar;
	postsOwnerAvatar.alt = username || "Owner avatar";
	postsOwnerName.textContent = username ? `${username}'s posts` : "Posts";
	postsHeader.hidden = false;
	postsHeader.style.cursor = "pointer";
	postsHeader.onclick = () => {
		window.registerVT({ avatar: [postsOwnerAvatar, userId], name: [postsOwnerName, userId] });
		window.openProfile({
			id: userId,
			username,
			avatar,
			banner: params.get("banner")
		});
	};
	if (pageTitle) pageTitle.textContent = username ? `${username}'s posts` : "Posts";
}

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
			window.registerVT({ avatar: [pfp, post.u.id], name: [username, post.u.id] });
			window.openProfile(post.u);
		};
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

		listItem.appendChild(createLikeButton(post, { liked: !!post.z }));

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
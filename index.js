const postList = document.getElementById("posts-list");

if (postList instanceof HTMLUListElement) {
	let isLoading = false;
	let hasMorePosts = true;

	const createPostElement = (post) => {
		const listItem = document.createElement("li");
		listItem.className = "post";
		const timestamp = Date.parse(post.createdAt || post.updatedAt || "0");
		listItem.dataset.date = String(timestamp);

		const profileCard = document.createElement("section");
		profileCard.className = "profile";
		profileCard.style.cursor = "pointer";
		profileCard.onclick = () => {
			const target = "profile.html?id=" + encodeURIComponent(post.u.id);
			if (document.startViewTransition) {
				document.startViewTransition(() => {
					window.location.href = target;
				});
				return;
			}
			window.location.href = target;
		};

		const pfp = document.createElement("img");
		pfp.classList.add("pfp");
		pfp.src = furzona.getMediaUrl(post.u.i);
		profileCard.appendChild(pfp);

		const username = document.createElement("p");
		username.textContent = post.u.username;
		profileCard.appendChild(username);
		listItem.appendChild(profileCard);

		const title = document.createElement("h2");
		title.textContent = post.t || "";
		listItem.appendChild(title);

		if (post.m && post.m.length > 0) {
			const image = document.createElement("img");
			image.src = furzona.getMediaUrl(post.m[0]);
			listItem.appendChild(image);
		}

		return listItem;
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
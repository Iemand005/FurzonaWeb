const postList = document.getElementById("posts-list");

let clickedPfp = null;
let clickedName = null;
let clickedPost = null;

window.addEventListener("pageswap", (event) => {
	if (!event.viewTransition || !clickedPfp) return;
	document.querySelectorAll(".pfp").forEach(img => {
		img.style.viewTransitionName = "";
	});
	document.querySelectorAll(".profile p").forEach(p => {
		p.style.viewTransitionName = "";
	});
	clickedPfp.style.viewTransitionName = `avatar-${clickedPfp.dataset.transitionId}`;
	if (clickedName) clickedName.style.viewTransitionName = `name-${clickedPfp.dataset.transitionId}`;
	const cleanup = () => {
		clickedPfp.style.viewTransitionName = "";
		if (clickedName) clickedName.style.viewTransitionName = "";
	};
	event.viewTransition.ready.then(cleanup, cleanup);
});

window.addEventListener('pageswap', (e) => {
  if (e.viewTransition) {
    console.log('pageswap OK:', e.activation.entry.url);
    e.viewTransition.finished.catch(err => console.warn('pageswap aborted:', err.name));
  } else {
    console.log('pageswap: NO transition. from:', location.href, '->', e.activation.entry.url);
  }
});
window.addEventListener('pagereveal', (e) => {
  console.log('pagereveal', e.viewTransition ? 'OK' : 'NONE');
});

window.addEventListener("pagereveal", (e) => {
  if (!e.viewTransition) return;
  const fromURL = window.navigation?.activation?.from?.url;
  if (!fromURL) return;
  const id = new URL(fromURL).searchParams.get("id");
  if (!id) return;
  const pfp = document.querySelector(`[data-transition-id="${id}"]`);
  if (!pfp) return;
  const nameEl = pfp.closest(".profile")?.querySelector("p");
  pfp.style.viewTransitionName = `avatar-${id}`;
  if (nameEl) nameEl.style.viewTransitionName = `name-${id}`;
  const cleanup = () => {
    pfp.style.viewTransitionName = "";
    if (nameEl) nameEl.style.viewTransitionName = "";
  };
  e.viewTransition.ready.then(cleanup, cleanup);
});

window.addEventListener("pageswap", (event) => {
  if (!event.viewTransition || !clickedPost) return;
  const { id, authorId, pfp, username, title, image } = clickedPost;
  document.querySelectorAll(".pfp").forEach(img => {
    img.style.viewTransitionName = "";
  });
  document.querySelectorAll(".profile p").forEach(p => {
    p.style.viewTransitionName = "";
  });
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
});

window.addEventListener("pagereveal", (e) => {
  if (!e.viewTransition) return;
  const fromURL = window.navigation?.activation?.from?.url;
  if (!fromURL) return;
  const url = new URL(fromURL);
  if (!endsWith(url.pathname, "post.html")) return;
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
			clickedPfp = pfp;
			clickedName = username;
			clickedPost = null;
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
			clickedPfp = null;
			clickedName = null;
			clickedPost = { id: post.id, authorId: post.u.id, pfp, username, title, image };
			window.openPost(post, image?.src);
		};

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
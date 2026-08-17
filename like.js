(() => {
	const HEART_UNLIKED = "Assets/heart.svg";
	const HEART_LIKED = "Assets/heart-liked.svg";

	/** @param {unknown} result @returns {{ liked: boolean|null, likes: number|null }} */
	const normalize = (result) => {
		if (result === null || result === undefined) return { liked: null, likes: null };
		if (typeof result === "boolean") return { liked: result, likes: null };
		if (typeof result === "number") return { liked: null, likes: result };
		if (typeof result !== "object") return { liked: null, likes: null };
		const liked = typeof result.liked === "boolean" ? result.liked
			: typeof result.d === "boolean" ? result.d
			: null;
		const likes = typeof result.likes === "number" ? result.likes
			: typeof result.l === "number" ? result.l
			: typeof result.count === "number" ? result.count
			: null;
		return { liked, likes };
	};

	window.createLikeButton = (post, { liked = false, onLike, onUnlike } = {}) => {
		const handleLike = onLike || (() => furzona.likePost(post.id));
		const handleUnlike = onUnlike || (() => furzona.unlikePost(post.id));

		const button = document.createElement("button");
		button.type = "button";
		button.className = "like-btn";

		const heart = document.createElement("img");
		heart.src = liked ? HEART_LIKED : HEART_UNLIKED;
		heart.alt = "";

		const count = document.createElement("span");
		count.className = "like-count";
		count.textContent = String(post.l ?? 0);

		button.append(heart, count);
		if (liked) button.classList.add("liked");

		let liking = false;
		button.addEventListener("click", async (event) => {
			event.stopPropagation();
			if (liking) return;
			liking = true;
			try {
				const result = liked ? await handleUnlike() : await handleLike();
				const { liked: newLiked, likes: newLikes } = normalize(result);
				if (newLiked !== null) {
					liked = newLiked;
					button.classList.toggle("liked", liked);
					heart.src = liked ? HEART_LIKED : HEART_UNLIKED;
				}
				if (newLikes !== null) count.textContent = String(newLikes);
			} catch (error) {
				console.error("Failed to like:", error);
			} finally {
				liking = false;
			}
		});

		return button;
	};
})();
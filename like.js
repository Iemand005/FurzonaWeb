(() => {
	const HEART_UNLIKED = "Assets/heart.svg";
	const HEART_LIKED = "Assets/heart-liked.svg";

	window.createLikeButton = (post, { liked = false } = {}) => {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "like-btn btn";

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
				const result = await furzona.likePost(post.id);
				const isLiked = !!result.liked;
				button.classList.toggle("liked", isLiked);
				heart.src = isLiked ? HEART_LIKED : HEART_UNLIKED;
				count.textContent = String(result.likes);
			} catch (error) {
				console.error("Failed to like post:", error);
			} finally {
				liking = false;
			}
		});

		return button;
	};
})();
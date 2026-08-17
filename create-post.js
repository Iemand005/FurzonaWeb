const postForm = document.getElementById("new-post-form");
const typeSelect = document.getElementById("post-type");
const titleInput = document.getElementById("post-title");
const descriptionInput = document.getElementById("post-description");
const mediaInput = document.getElementById("post-media");
const statusEl = document.getElementById("post-status");

if (!furzona.isLoggedIn) {
	statusEl.textContent = "Log in to create a post.";
}

/** @param {File} file @returns {Promise<unknown>} */
const uploadFile = async (file) => {
	const formData = new FormData();
	formData.append("file", file);
	return furzona.upload(formData);
};

/**
 * Convert an upload result into a media path. Best-effort: the upload
 * response shape is unconfirmed — try common shapes.
 * @param {unknown} result
 * @returns {string|null}
 */
const toMediaPath = (result) => {
	if (typeof result === "string") return result;
	if (result && typeof result === "object") {
		if (typeof result.path === "string" && result.path) return result.path;
		if (typeof result.url === "string" && result.url) return result.url;
		if (Array.isArray(result.files) && typeof result.files[0] === "string") return result.files[0];
		for (const key of ["file", "media", "image", "src", "result"]) {
			const v = result[key];
			if (typeof v === "string" && v) return v;
		}
	}
	return null;
};

if (searchForm instanceof HTMLFormElement) {
	searchForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		if (!furzona.isLoggedIn) {
			statusEl.textContent = "Log in to create a post.";
			return;
		}
		const submitButton = searchForm.querySelector('button[type="submit"]');
		submitButton.disabled = true;
		statusEl.textContent = "Posting…";
		try {
			const type = Number(typeSelect.value);
			const t = titleInput.value.trim();
			const d = descriptionInput.value.trim();
			const files = mediaInput.files ? Array.from(mediaInput.files) : [];

			const isText = type === 0;
			if (isText && !t && !d) {
				statusEl.textContent = "Text posts need a title or a description.";
				return;
			}
			if (!isText && !files.length && !t && !d) {
				statusEl.textContent = "Add media, a title, or a description.";
				return;
			}

			const media = [];
			for (const file of files) {
				const uploaded = await uploadFile(file);
				const path = toMediaPath(uploaded);
				if (path) media.push(path);
				else console.warn("Upload returned an unrecognised shape:", uploaded);
			}

			const fields = {};
			if (t) fields.title = t;
			if (d) fields.content = d;
			if (media.length) fields.media = media;

			const post = await furzona.createPost(type, fields);
			statusEl.textContent = "Posted!";
			window.location.href = "post.html?id=" + encodeURIComponent(post.id);
		} catch (error) {
			console.error("Failed to create post:", error);
			statusEl.textContent = error.message || "Could not create post.";
		} finally {
			submitButton.disabled = false;
		}
	});
}
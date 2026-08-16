const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const titleEl = document.getElementById("post-title");
const metaEl = document.getElementById("post-meta");
const textEl = document.getElementById("post-text");
const mediaEl = document.getElementById("post-media");
const authorEl = document.getElementById("post-author");

const backButton = document.getElementById("back-to-home");
if (backButton) {
	backButton.addEventListener("click", () => {
		if (history.length > 1 || window.navigation?.canGoBack) {
			history.back();
		} else {
			location.replace("index.html");
		}
	});
}

/**
 * @param {FurzonaPost} post
 */
function renderPost(post) {
	const user = post.u;
	const date = new Date(post.createdAt || post.updatedAt);

	titleEl.textContent = post.t || "Untitled";
	metaEl.textContent = `ID: ${post.id} • ${date.toLocaleString()}`;

	textEl.textContent = [post.c, post.d].filter(Boolean).join("\n\n");

	const pfp = document.createElement("img");
	pfp.classList.add("pfp");
	pfp.src = furzona.getProfilePictureUrl(user);
	pfp.alt = user.username;
	authorEl.appendChild(pfp);

	const name = document.createElement("p");
	name.textContent = user.username;
	authorEl.appendChild(name);

	authorEl.style.cursor = "pointer";
	authorEl.onclick = () => {
		const profileParams = new URLSearchParams({ id: user.id });
		if (user.i) profileParams.set("avatar", furzona.getProfilePictureUrl(user));
		if (user.b) profileParams.set("banner", furzona.getMediaUrl(user.b));
		if (user.username) profileParams.set("username", user.username);
		window.location.href = "profile.html?" + profileParams.toString();
	};

	if (post.m && post.m.length > 0) {
		post.m.forEach(path => {
			const img = document.createElement("img");
			img.src = furzona.getMediaUrl(path);
			img.alt = post.t || user.username || "Post media";
			img.loading = "lazy";
			mediaEl.appendChild(img);
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
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsEl = document.getElementById("search-results");
const emptyEl = document.getElementById("search-empty");

const createdPost = (item) => {
	const card = document.createElement("li");
	card.className = "post card";
	const profile = document.createElement("section");
	profile.className = "profile";
	const pfp = document.createElement("img");
	pfp.className = "pfp";
	pfp.src = furzona.getProfilePictureUrl(item.u);
	pfp.alt = item.u.username;
	const name = document.createElement("p");
	name.textContent = item.u.username;
	profile.append(pfp, name);
	card.appendChild(profile);

	const title = document.createElement("h2");
	title.textContent = item.t || "";
	card.appendChild(title);

	if (item.m && item.m.length > 0) {
		const img = document.createElement("img");
		img.src = furzona.getMediaUrl(item.m[0]);
		img.alt = item.t || item.u.username || "Post image";
		card.appendChild(img);
	}

	card.appendChild(createLikeButton(item, { liked: !!item.z }));

	card.style.cursor = "pointer";
	card.onclick = () => {
		const params = new URLSearchParams({ id: item.id, username: item.u.username });
		if (item.u.id) params.set("author", item.u.id);
		if (item.u.i) params.set("avatar", furzona.getProfilePictureUrl(item.u));
		if (item.t) params.set("title", item.t);
		if (item.m && item.m.length > 0) params.set("img", furzona.getMediaUrl(item.m[0]));
		window.location.href = "post.html?" + params.toString();
	};
	return card;
};

const createdUser = (item) => {
	const card = document.createElement("li");
	card.className = "profile-row card";
	const pfp = document.createElement("img");
	pfp.className = "pfp";
	pfp.src = furzona.getProfilePictureUrl(item);
	pfp.alt = item.username;
	const name = document.createElement("p");
	name.textContent = item.username;
	card.append(pfp, name);

	card.style.cursor = "pointer";
	card.onclick = () => {
		const params = new URLSearchParams({ id: item.id, username: item.username });
		if (item.i) params.set("avatar", furzona.getProfilePictureUrl(item));
		if (item.b) params.set("banner", furzona.getMediaUrl(item.b));
		window.location.href = "profile.html?" + params.toString();
	};
	return card;
};

const createResultCard = (item) => item.u ? createdPost(item) : createdUser(item);

if (form) {
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const q = input.value.trim();
		if (!q) return;

		resultsEl.innerHTML = "";
		emptyEl.hidden = true;

		furzona.search(q)
			.then(results => {
				if (!results || results.length === 0) {
					emptyEl.textContent = "No results.";
					emptyEl.hidden = false;
					return;
				}
				results.forEach(item => resultsEl.appendChild(createResultCard(item)));
			})
			.catch(error => {
				console.error("Search failed:", error);
				emptyEl.textContent = "Search failed.";
				emptyEl.hidden = false;
			});
	});
}
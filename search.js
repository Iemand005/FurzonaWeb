const searchForm = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsEl = document.getElementById("search-results");
const emptyEl = document.getElementById("search-empty");

const createdPost = (item) => {
	const card = document.createElement("li");
	card.className = "post card";
	card.dataset.postId = item.id;
	const profile = document.createElement("section");
	profile.className = "profile";
	const pfp = document.createElement("img");
	pfp.className = "pfp";
	pfp.src = furzona.getProfilePictureUrl(item.u);
	pfp.alt = item.u.username;
	pfp.dataset.transitionId = item.u.id;
	const name = document.createElement("p");
	name.textContent = item.u.username;
	profile.appendChild(pfp);
	profile.appendChild(name);
	card.appendChild(profile);

	const title = document.createElement("h2");
	title.textContent = item.t || "";
	title.dataset.postId = item.id;
	card.appendChild(title);

	let image = null;
	if (item.m && item.m.length > 0) {
		image = document.createElement("img");
		image.src = furzona.getMediaUrl(item.m[0]);
		image.alt = item.t || item.u.username || "Post image";
		image.dataset.postId = item.id;
		card.appendChild(image);
	}

	card.appendChild(createLikeButton(item, { liked: !!item.z }));

	card.style.cursor = "pointer";
	card.onclick = () => {
		window.registerVT({
			avatar: [pfp, item.u.id],
			name: [name, item.u.id],
			title: [title, item.id],
			image: [image, item.id]
		});
		window.openPost(item, image?.src);
	};
	return card;
};

const createdUser = (item) => {
	const card = document.createElement("li");
	card.className = "profile-row card";
	card.dataset.transitionId = item.id;
	const pfp = document.createElement("img");
	pfp.className = "pfp";
	pfp.src = furzona.getProfilePictureUrl(item);
	pfp.alt = item.username;
	pfp.dataset.transitionId = item.id;
	const name = document.createElement("p");
	name.textContent = item.username;
	card.appendChild(pfp);
	card.appendChild(name);

	card.style.cursor = "pointer";
	card.onclick = () => {
		window.registerVT({ avatar: [pfp, item.id], name: [name, item.id] });
		window.openProfile(item);
	};
	return card;
};

if (searchForm) {
	searchForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const q = input.value.trim();
		if (!q) return;

		resultsEl.innerHTML = "";
		emptyEl.hidden = true;

		furzona.newSearch(q)
			.then(({ p, u }) => {
				const posts = p || [];
				const users = u || [];
				if (posts.length === 0 && users.length === 0) {
					emptyEl.textContent = "No results.";
					emptyEl.hidden = false;
					return;
				}
				posts.forEach(item => resultsEl.appendChild(createdPost(item)));
				users.forEach(item => resultsEl.appendChild(createdUser(item)));
			})
			.catch(error => {
				console.error("Search failed:", error);
				emptyEl.textContent = "Search failed.";
				emptyEl.hidden = false;
			});
	});
}
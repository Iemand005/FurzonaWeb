const profileParams = new URLSearchParams(window.location.search);
const profileId = profileParams.get("id");
const bannerEl = document.getElementById("profile-banner");
const profileTopEl = document.querySelector(".profile-top");
const avatarEl = document.getElementById("profile-avatar");
const nameEl = document.getElementById("profile-name");
const metaEl = document.getElementById("profile-meta");
const bioEl = document.getElementById("profile-bio");
const statsEl = document.getElementById("profile-stats");
const followEl = document.getElementById("profile-follow");
const badgeEl = document.getElementById("profile-badge");
const tabForm = document.getElementById("tab-form");

if (profileId) window.registerVT({ avatar: [avatarEl, profileId], name: [nameEl, profileId] });

const setBannerVisible = (visible) => {
	if (bannerEl) bannerEl.style.display = visible ? "" : "none";
	if (profileTopEl && profileTopEl.classList) profileTopEl.classList.toggle("banner", visible);
};

if (profileParams.get("banner") === "0") {
	setBannerVisible(false);
} else {
	setBannerVisible(true);
}

if (tabForm instanceof HTMLFormElement) tabForm.addEventListener("submit", ev => ev.preventDefault());

/**
 * @param {string} name
 * @param {string | number} value
 * @param {()=>void} [onCtick]
 */
function createStatDisplay(name, value, onCtick) {
	if (!statsEl) return;
	const statDisplay = document.createElement("div");
	statDisplay.className = "stat";
	if (onCtick) {
		statDisplay.classList.add("clickable");

		statDisplay.onclick = onCtick;
	}
	const valueEl = document.createElement("strong");
	const labelEl = document.createElement("span");
	valueEl.textContent = value.toString();
	labelEl.textContent = name;
	statDisplay.appendChild(valueEl);
	statDisplay.appendChild(labelEl);
	statsEl.appendChild(statDisplay);
};

/** @param {FurzonaProfile} profile */
function renderProfile(profile) {
	if (!((bannerEl instanceof HTMLImageElement) && (avatarEl instanceof HTMLImageElement) && (nameEl instanceof HTMLElement))) return;

	const user = profile.user;
	const stats = profile.stats || {};

	const bannerUrl = user.b ? furzona.getMediaUrl(user.b) : null;
	const avatarUrl = furzona.getProfilePictureUrl(user);

	if (bannerUrl) {
		bannerEl.src = bannerUrl;
		bannerEl.alt = `${user.username} banner`;
		setBannerVisible(true);
	} else {
		bannerEl.style.display = "none";
		if (profileTopEl && profileTopEl.classList) profileTopEl.classList.remove("banner");
	}

	avatarEl.src = avatarUrl;
	avatarEl.alt = user.username;

	nameEl.textContent = user.username;

	if (badgeEl) {
		switch (user.p) {
			case 1:
				badgeEl.className = "moderator-badge";
				badgeEl.textContent = "Moderator";
				break;
			case 2:
				badgeEl.className = "admin-badge";
				badgeEl.textContent = "Admin";
				break;
		}
		badgeEl.hidden = !!user.p;
	
		if (user.t) {
			const badge = furzona.parseBadge(user.t);
			badgeEl.textContent = badge.name;
			badgeEl.style.color = badge.foregroundColor;
			badgeEl.style.backgroundColor = badge.backgroundColor;
			badgeEl.hidden = false;
	
		}
	}


	
	const renderMeta = () => {
		if (!metaEl) return;
		metaEl.textContent = `ID: ${user.id} • ${profile.following ? "Following" : "Not following"} • ${profile.online ? "Online" : "Offline"}`;
	}
	renderMeta();

	if (bioEl) bioEl.textContent = user.d || "No bio yet.";

	createStatDisplay("Posts", stats.posts, () => {
		const profileParams = new URLSearchParams({ id: user.id });
		if (user.i) profileParams.set("avatar", furzona.getProfilePictureUrl(user));
		if (user.b) profileParams.set("banner", furzona.getMediaUrl(user.b));
		if (user.username) profileParams.set("username", user.username);
		window.location.href = "posts.html?" + profileParams.toString();
	});
	createStatDisplay("Liked", stats.liked);
	createStatDisplay("Likes", stats.likes);
	createStatDisplay("Comments", stats.comments);
	createStatDisplay("Followers", stats.followers);
	createStatDisplay("Following", stats.followed);

	if (followEl) {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.textContent = profile.following ? "Unfollow" : "Follow";
		if (!furzona.isLoggedIn) {
			btn.disabled = true;
			btn.textContent = "Log in to follow";
		} else {
			btn.onclick = async () => {
				try {
					if (profile.following) {
						await furzona.unfollow(user.id);
						profile.following = false;
					} else {
						await furzona.follow(user.id);
						profile.following = true;
					}
					btn.textContent = profile.following ? "Unfollow" : "Follow";
					renderMeta();
				} catch (error) {
					console.error("Failed to update follow:", error);
				}
			};
		}
		followEl.appendChild(btn);
	}
};

if (profileId) {
	furzona.getProfile(profileId)
		.then(profile => {
			console.log("Profile data:", profile);
			renderProfile(profile);
		})
		.catch(error => {
			console.error("Failed to load profile:", error);
			if (bioEl) bioEl.textContent = "Could not load profile.";
		});
} else {
	console.error("No profile id provided in the URL.");
	if (bioEl) bioEl.textContent = "No profile id provided.";
}



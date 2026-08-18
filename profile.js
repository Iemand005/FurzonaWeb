const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const bannerEl = document.getElementById("profile-banner");
const avatarEl = document.getElementById("profile-avatar");
const nameEl = document.getElementById("profile-name");
const metaEl = document.getElementById("profile-meta");
const bioEl = document.getElementById("profile-bio");
const statsEl = document.getElementById("profile-stats");
const followEl = document.getElementById("profile-follow");
const badgeEl = document.getElementById("profile-badge");
const tabForm = document.getElementById("tab-form");

window.addEventListener("pageswap", (event) => {
	if (!event.viewTransition || !id) return;
	if (avatarEl) avatarEl.style.viewTransitionName = `avatar-${id}`;
	if (nameEl) nameEl.style.viewTransitionName = `name-${id}`;
});

if (tabForm instanceof HTMLFormElement) tabForm.addEventListener("submit", ev => ev.preventDefault());

/**
 * 
 * @param {FurzonaProfile} profile 
 */
function renderProfile(profile) {
	if (!((bannerEl instanceof HTMLImageElement) && (avatarEl instanceof HTMLImageElement) && (nameEl instanceof HTMLElement))) return;

	const user = profile.user;
	const stats = profile.stats || {};

	const bannerUrl = user.b ? furzona.getMediaUrl(user.b) : "https://placehold.co/1200x260/20212B/ffffff?text=" + encodeURIComponent(user.username);
	const avatarUrl = furzona.getProfilePictureUrl(user);

	bannerEl.src = bannerUrl;
	bannerEl.alt = `${user.username} banner`;

	avatarEl.src = avatarUrl;
	avatarEl.alt = user.username;

	nameEl.textContent = user.username;

	if (badgeEl) {
		const roles = {
			1: { cls: "moderator-badge", text: "Moderator" },
			2: { cls: "admin-badge", text: "Admin" }
		};
		const role = roles[user.p];
		if (role) {
			badgeEl.className = role.cls;
			badgeEl.textContent = role.text;
			badgeEl.hidden = false;
		} else {
			badgeEl.hidden = true;
		}
	}

	const renderMeta = () => {
		metaEl.textContent = `ID: ${user.id} • ${profile.following ? "Following" : "Not following"} • ${profile.online ? "Online" : "Offline"}`;
	};
	renderMeta();
	bioEl.textContent = user.d || "No bio yet.";

	statsEl.innerHTML = [
		["Posts", stats.posts],
		["Liked", stats.liked],
		["Likes", stats.likes],
		["Comments", stats.comments],
		["Followers", stats.followers],
		["Following", stats.followed]
	].map(([label, value]) => `
		<div class="stat${label === "Posts" ? " clickable" : ""}"${label === "Posts" ? ` data-user-posts="${user.id}"` : ""}>
			<strong>${value ?? 0}</strong>
			<span>${label}</span>
		</div>
	`).join("");

	const postsStat = statsEl.querySelector(".stat.clickable");
	if (postsStat) {
		postsStat.onclick = () => {
			const profileParams = new URLSearchParams({ id: user.id });
			if (user.i) profileParams.set("avatar", furzona.getProfilePictureUrl(user));
			if (user.b) profileParams.set("banner", furzona.getMediaUrl(user.b));
			if (user.username) profileParams.set("username", user.username);
			window.location.href = "posts.html?" + profileParams.toString();
		};
	}

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

if (id) {
	furzona.getProfile(id)
		.then(profile => {
			console.log("Profile data:", profile);
			renderProfile(profile);
		})
		.catch(error => {
			console.error("Failed to load profile:", error);
			bioEl.textContent = "Could not load profile.";
		});
} else {
	console.error("No profile id provided in the URL.");
	bioEl.textContent = "No profile id provided.";
}



const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const bannerEl = document.getElementById("profile-banner");
const avatarEl = document.getElementById("profile-avatar");
const nameEl = document.getElementById("profile-name");
const metaEl = document.getElementById("profile-meta");
const bioEl = document.getElementById("profile-bio");
const statsEl = document.getElementById("profile-stats");

window.addEventListener("pageswap", (event) => {
	if (!event.viewTransition || !id) return;
	if (avatarEl) avatarEl.style.viewTransitionName = `avatar-${id}`;
	if (nameEl) nameEl.style.viewTransitionName = `name-${id}`;
});

/**
 * 
 * @param {FurzonaProfile} profile 
 */
function renderProfile(profile) {
	const user = profile.user;
	const stats = profile.stats || {};

	const bannerUrl = user.b ? furzona.getMediaUrl(user.b) : "https://placehold.co/1200x260/20212B/ffffff?text=" + encodeURIComponent(user.username);
	const avatarUrl = furzona.getProfilePictureUrl(user);

	bannerEl.src = bannerUrl;
	bannerEl.alt = `${user.username} banner`;

	avatarEl.src = avatarUrl;
	avatarEl.alt = user.username;

	nameEl.textContent = user.username;
	metaEl.textContent = `ID: ${user.id} • ${profile.following ? "Following" : "Not following"} • ${profile.online ? "Online" : "Offline"}`;
	bioEl.textContent = user.d || "No bio yet.";

	statsEl.innerHTML = [
		["Posts", stats.posts],
		["Liked", stats.liked],
		["Likes", stats.likes],
		["Comments", stats.comments],
		["Followers", stats.followers],
		["Following", stats.followed]
	].map(([label, value]) => `
		<div class="stat">
			<strong>${value ?? 0}</strong>
			<span>${label}</span>
		</div>
	`).join("");
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



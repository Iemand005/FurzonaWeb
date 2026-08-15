const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const renderProfile = (profile) => {
	const user = profile.user;
	const stats = profile.stats || {};

	const bannerUrl = user.b ? furzona.getMediaUrl(user.b) : "https://placehold.co/1200x260/20212B/ffffff?text=" + encodeURIComponent(user.username);
	const avatarUrl = user.i ? furzona.getMediaUrl(user.i) : "https://placehold.co/160x160/2d3240/ffffff?text=" + encodeURIComponent(user.username.slice(0, 1).toUpperCase());

	const statsHtml = [
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

	document.body.innerHTML = `
		<style>
			body {
				margin: 0;
				font-family: Arial, sans-serif;
				background: #16181d;
				color: white;
			}
			.profile-page {
				max-width: 900px;
				margin: 24px auto;
				padding: 0 16px 30px;
			}
			.profile-card {
				background: #1d212a;
				border-radius: 18px;
				overflow: hidden;
				border: 1px solid #2a2f3a;
			}
			.banner {
				display: block;
				width: 100%;
				height: 220px;
				object-fit: cover;
			}
			.profile-top {
				display: flex;
				align-items: center;
				gap: 16px;
				padding: 20px;
				margin-top: -40px;
			}
			.avatar {
				width: 88px;
				height: 88px;
				object-fit: cover;
				border-radius: 18px;
				border: 4px solid #1d212a;
				background: #2d3240;
			}
			.name {
				margin: 0;
				font-size: 2rem;
			}
			.meta {
				margin: 6px 0 0;
				color: #b9c3d4;
			}
			.bio {
				padding: 0 20px 20px;
				line-height: 1.6;
				white-space: pre-wrap;
				color: #edf3ff;
			}
			.stats {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
				gap: 12px;
				padding: 0 20px 20px;
			}
			.stat {
				display: flex;
				flex-direction: column;
				background: #161b22;
				padding: 14px 12px;
				border-radius: 12px;
				border: 1px solid #2a2f3a;
			}
			.stat strong {
				font-size: 1.3rem;
			}
			.stat span {
				color: #b9c3d4;
				font-size: 0.9rem;
			}
		</style>

		<main class="profile-page">
			<section class="profile-card">
				<img class="banner" src="${bannerUrl}" alt="${user.username} banner">
				<div class="profile-top">
					<img class="avatar" src="${avatarUrl}" alt="${user.username}">
					<div>
						<h1 class="name">${user.username}</h1>
						<p class="meta">ID: ${user.id}</p>
						<p class="meta">${profile.following ? "Following" : "Not following"} • ${profile.online ? "Online" : "Offline"}</p>
					</div>
				</div>
				<p class="bio">${user.d || "No bio yet."}</p>
				<div class="stats">
					${statsHtml}
				</div>
			</section>
		</main>
	`;
};

if (id) {
	furzona.getProfile(id)
		.then(profile => {
			console.log("Profile data:", profile);
			renderProfile(profile);
		})
		.catch(error => {
			console.error("Failed to load profile:", error);
			document.body.innerHTML = "<p>Could not load profile.</p>";
		});
} else {
	console.error("No profile id provided in the URL.");
	document.body.innerHTML = "<p>No profile id provided.</p>";
}



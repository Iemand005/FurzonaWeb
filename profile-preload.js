const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const avatarParam = params.get("avatar");
const bannerParam = params.get("banner");
const nameParam = params.get("username");

for (const url of [avatarParam, bannerParam]) {
	if (!url) continue;
	const link = document.createElement("link");
	link.rel = "preload";
	link.as = "image";
	link.href = url;
	document.head.appendChild(link);
}

window.addEventListener("pagereveal", () => {
	const avatarEl = document.getElementById("profile-avatar");
	const bannerEl = document.getElementById("profile-banner");
	const nameEl = document.getElementById("profile-name");

	if (avatarEl && avatarParam) avatarEl.src = avatarParam;
	if (bannerEl && bannerParam) bannerEl.src = bannerParam;
	if (nameEl && nameParam) nameEl.textContent = nameParam;

	if (avatarEl) avatarEl.style.viewTransitionName = id ? `profile-avatar-${id}` : "profile-avatar";
	if (nameEl) nameEl.style.viewTransitionName = id ? `profile-name-${id}` : "profile-name";
});
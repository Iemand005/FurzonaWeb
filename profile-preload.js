document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	for (const key of ["avatar", "banner"]) {
		const url = params.get(key);
		if (!url) continue;

		const link = document.createElement("link");
		link.rel = "preload";
		link.as = "image";
		link.href = url;
		document.head.appendChild(link);
	}
});

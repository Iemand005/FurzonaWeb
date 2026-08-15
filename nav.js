document.addEventListener("DOMContentLoaded", () => {
	const searchButtons = document.querySelectorAll("[data-nav-search]");
	searchButtons.forEach(button => {
		button.addEventListener("click", () => {
			window.location.href = "search.html";
		});
	});
	
	if ('serviceWorker' in navigator) {
	  navigator.serviceWorker.register('./sw.js');
	}
});

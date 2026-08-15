
const postList = document.getElementById("posts-list");

if (postList instanceof HTMLUListElement) {
	const listItem = document.createElement("li");



	postList.appendChild(listItem);
}
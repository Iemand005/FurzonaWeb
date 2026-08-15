
const postList = document.getElementById("posts-list");

if (postList instanceof HTMLUListElement) {

	furzona.getPosts().then(posts => {

		const listItem = document.createElement("li");
	
	
	
		postList.appendChild(listItem);
	});
}
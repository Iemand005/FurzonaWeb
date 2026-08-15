
const postList = document.getElementById("posts-list");

if (postList instanceof HTMLUListElement) {

	furzona.getPosts().then(posts => {

		console.log(posts);

		posts.forEach(post => {

			const listItem = document.createElement("li");

			const title = document.createElement("h2");

			title.textContent = post.t;

			listItem.appendChild(title);
		
			postList.appendChild(listItem);
		});

	});
}
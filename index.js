
const postList = document.getElementById("posts-list");

if (postList instanceof HTMLUListElement) {

	furzona.getPosts().then(posts => {

		console.log(posts);

		posts.forEach(post => {

			const listItem = document.createElement("li");

			const title = document.createElement("h2");

			title.textContent = post.t;

			if (post.m.length > 0) {
				const image = document.createElement("img");
				image.src = furzona.getMediaUrl(post.m[0]);

				listItem.appendChild(image);
			}

			listItem.appendChild(title);
		
			postList.appendChild(listItem);
		});

	});
}
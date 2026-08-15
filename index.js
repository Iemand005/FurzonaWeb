
const postList = document.getElementById("posts-list");

if (postList instanceof HTMLUListElement) {

	furzona.getPosts().then(posts => {

		console.log(posts);

		posts.forEach(post => {

			const listItem = document.createElement("li");
			listItem.className = "post";

			// Uh the user

			const pfp = document.createElement("img");
			pfp.classList.add("pfp");
			pfp.src = furzona.getMediaUrl(post.u.i);

			listItem.appendChild(pfp);

			const title = document.createElement("h2");

			title.textContent = post.t;
			listItem.appendChild(title);

			if (post.m.length > 0) {
				const image = document.createElement("img");
				image.src = furzona.getMediaUrl(post.m[0]);

				listItem.appendChild(image);
			}

		
			postList.appendChild(listItem);
		});

	});
}
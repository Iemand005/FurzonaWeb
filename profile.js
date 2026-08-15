const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
	furzona.getProfile(id)
		.then(profile => {
			console.log("Profile data:", profile);
		})
		.catch(error => {
			console.error("Failed to load profile:", error);
		});
} else {
	console.error("No profile id provided in the URL.");
}





function redirectIfLoggedIn() {
	if (furzona.isLoggedIn()) location.href = "index.html";
};

redirectIfLoggedIn();

const loginForm = document.getElementById("login-form");

if (loginForm instanceof HTMLFormElement) {
	loginForm.onsubmit = e => {
		e.preventDefault();

		const formData = new FormData(loginForm);
		const email = formData.get('email');
		const password = formData.get('password');
		
		console.log(email, password);

		if (typeof email !== "string" || typeof password !== "string") return;
		
		furzona.login(email, password).then(_ => redirectIfLoggedIn());
	};
}

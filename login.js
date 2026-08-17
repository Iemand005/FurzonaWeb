
const loginForm = document.getElementById("login-form");

function redirectIfLoggedIn() {
	if (furzona.isLoggedIn) location.href = "index.html";
}

if (loginForm instanceof HTMLFormElement) {
	loginForm.onsubmit = ev => {
		ev.preventDefault();

		if (!(ev.target instanceof HTMLFormElement)) return;

		const formData = new FormData(ev.target);
		const email = formData.get('email');
		const password = formData.get('password');
		
		console.log(email, password);

		if (typeof email === "string" && typeof password === "string") furzona.login(email, password).then(_ => redirectIfLoggedIn());

		
	};
}

redirectIfLoggedIn()
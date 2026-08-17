
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

		furzona.login(email?.toString(), password).then(() => {
			redirectIfLoggedIn();
		});

		
	};
}

redirectIfLoggedIn()
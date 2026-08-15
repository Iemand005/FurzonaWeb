
const loginForm = document.getElementById("login-form");

if (loginForm instanceof HTMLFormElement) {
	loginForm.onsubmit = ev => {
		ev.preventDefault();

		const formData = new FormData(ev.target);
		const email = formData.get('email');
		const password = formData.get('password');
		
		console.log(email, password);

		furzona.login(email, password);
	};
}
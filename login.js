
const loginForm = document.getElementById("login-form");

if (loginForm instanceof HTMLFormElement) {
	loginForm.onsubmit = (ev) => {
		ev.preventDefault();
	};
}
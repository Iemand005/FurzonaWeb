

function redirectIfLoggedIn() {
	if (furzona.isLoggedIn) location.href = "index.html";
};

redirectIfLoggedIn();

const loginForm = document.getElementById("login-form");
const pass = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

if (loginForm instanceof HTMLFormElement && pass instanceof HTMLInputElement && passwordInput instanceof HTMLInputElement) {
	loginForm.onsubmit = e => {
		e.preventDefault();

		const email = pass.value;
		const password = passwordInput.value;
		
		console.log(email, password);

		if (typeof email !== "string" || typeof password !== "string") return;
		
		furzona.login(email, password).then(_ => redirectIfLoggedIn());
	};

	const forgotButton = document.getElementById("forgot-password-btn");
	if (forgotButton instanceof HTMLButtonElement) {
		forgotButton.onclick = async () => {
			const formData = new FormData(loginForm);
			const email = formData.get('email');

			if (typeof email !== "string" || !email.trim()) {
				alert("Enter your email first.");
				return;
			}

			try {
				await furzona.forgotPassword(email.trim());
				alert("Password reset link sent, if that email is registered.");
			} catch (error) {
				alert(error instanceof Error ? error.message : "Could not send password reset.");
			}
		};
	}
}

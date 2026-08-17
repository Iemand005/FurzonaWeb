

function redirectIfLoggedIn() {
	if (furzona.isLoggedIn) location.href = "index.html";
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
				alert(error?.message || "Could not send password reset.");
			}
		};
	}
}

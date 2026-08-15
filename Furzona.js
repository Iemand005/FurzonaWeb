
class Furzona {
	/**
	 * 
	 * @returns {FurzonaConfigResponse}
	 */
	async getSettings() {
		return await fetch("https://api.furzona.app/settings").then(r => r.json());
	}

	async login(email, password) {
		/** @type {LoginRequest} */
		const requestBody = {
			email,
			password
		};

		const response = await fetch("https://api.furzona.app/login", {
			method: "POST",
			body: JSON.stringify(requestBody)
		});

		if (response.ok) return response.catch(console.error).then(r => r.json());

		const respTxt = await response.text();
		document.getElementById('error-container').innerHTML = respTxt;
		return respTxt;
	}
}
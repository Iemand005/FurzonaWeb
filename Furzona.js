
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
		return await fetch("https://api.furzona.app/login", {
			method: "POST",
			body: requestBody
		}).catch(console.error).then(r => r.json());

	}
}
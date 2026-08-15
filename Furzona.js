
const apiUrl = "https://api.furzona.app/";

class RequestService {

	constructor() {

	}

	async get(endpoint) {

	}

	async post(endpoint, body) {
		/** @type {LoginRequest} */
		const requestBody = {
			email,
			password
		};

		const response = await fetch("https://api.furzona.app/login", {
			method: "POST",
			body: JSON.stringify(body)
		});

		if (response.ok) {
			/** @type {LoginResponse} */
			const jsonBody = await response.json();

			this.token = jsonBody.result.s;

			return jsonBody;
		}

		const respTxt = await response.text();
		document.getElementById('error-container').innerHTML = respTxt;
		return respTxt;
	}
}

class Furzona extends RequestService {

	constructor() {
		/** @type {string?} */
		this.token = null;
	}

	/**
	 * 
	 * @returns {FurzonaConfigResponse}
	 */
	async getSettings() {
		return await fetch("https://api.furzona.app/settings").then(r => r.json());
	}

	/**
	 * 
	 * @param {string} email 
	 * @param {string} password 
	 * @returns {LoginResponse}
	 */
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

		if (response.ok) {
			/** @type {LoginResponse} */
			const jsonBody = await response.json();

			this.token = jsonBody.result.s;

			return jsonBody;
		}

		const respTxt = await response.text();
		document.getElementById('error-container').innerHTML = respTxt;
		return respTxt;
	}
}
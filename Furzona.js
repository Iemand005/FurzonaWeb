
const apiUrl = "https://api.furzona.app/";

class RequestService {

	constructor() {
		/** @type {string?} */
		this.token = null;
	}

	async get(endpoint) {
		return await fetch(apiUrl + endpoint).then(r => r.json());
	}

	/**
	 * @template T
	 * @param {*} endpoint 
	 * @param {*} body 
	 * @returns {T}
	 */
	async post(endpoint, body) {

		const response = await fetch(apiUrl + endpoint, {
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
		throw respTxt;
	}
}

class Furzona extends RequestService {

	constructor() {
		
	}

	/**
	 * 
	 * @returns {FurzonaConfigResponse}
	 */
	async getSettings() {
		return this.get("settings");
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

		/** @type {LoginResponse} */
		const response = await this.post("login", requestBody);

		this.token = jsonBody.result.s;

		return response;
	}
}
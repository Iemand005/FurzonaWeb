
const apiUrl = "https://api.furzona.app/";

class RequestService {

	constructor() {
		/** @type {string?} */
		this._token = null;
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
	async post(endpoint, body = {}) {
		
		const headers = {};

		if (this._token) headers["Authorization"] = this._token;

		const response = await fetch(apiUrl + endpoint, {
			method: "POST",
			body: JSON.stringify(body),
			headers
		});

		if (response.ok) {
			return response.json();
		}

		const respTxt = await response.text();
		document.getElementById('error-container').innerHTML = respTxt;
		throw respTxt;
	}
}

class Furzona extends RequestService {

	constructor() {
		super();

		this.contentUrl = "https://content.furzona.app/";
	}

	async loadSettings() {
		const settings = await this.getSettings();

		this.contentUrl = settings.contentUrl;
	}

	/**
	 * 
	 */
	async getSettings() {
		/** @type { FurzonaConfigResponse} */
		const response = await this.get("settings")
		return response.result;
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

		this.token = response.result.s;

		return response;
	}

	/**
	 * 
	 */
	async getPosts() {
		/** @type {FurzonaPostsResponse} */
		const response = await this.post("posts");

		return response.result;
	}

	set token(token) {
		this._token = token;

		localStorage.setItem("token", token);
	}

	get token() {
		if (!this._token) this._token = localStorage.getItem("token");
		return this._token;
	}

	isLoggedIn() {
		return !!this.token;
	}
}

const furzona = new Furzona;

const apiUrl = "https://api.furzona.app/";

class RequestService {

	constructor() {
		/** @type {string?} */
		this._token = null;
	}

	/**
	 * @template {keyof ApiEndpoints} K
	 * @param {K | [K, ...string[]]} endpoint 
	 * @param {Method} [method] 
	 * @param {ApiEndpoints[K]["body"]} [body] 
	 * @returns {Promise<ApiEndpoints[K]["response"]>}
	 */
	async request(endpoint, method = "GET", body) {

		let end = endpoint;
		if (endpoint instanceof Array) endpoint = endpoint.join("/"); 

		/** @type {RequestInit} */
		const init = { method };

		init.headers = {};
		if (this._token) init.headers["Authorization"] = this._token;

		if (body) init.body = JSON.stringify(body);

		const response = await fetch(apiUrl + endpoint, init);

		if (response.ok) return response.json().then(r => r.result);

		const respTxt = await response.text();

		/** @type {FurzonaError?} */
		let respObj = null;
		try {
			const err = JSON.parse(respTxt);
			console.error(`Error: ${err.error} (Code: ${err.errorCode})`);
			respObj = err;
		} catch(ex) {
			console.error(ex);
			
			let errorContainer = document.getElementById('error-container');
			
			if (!errorContainer) {
				errorContainer = document.createElement("div");
				errorContainer.id = "error-container";
				document.body.appendChild(errorContainer);
			}
			
			
			errorContainer.innerHTML = respTxt;
		}

		alert(respObj?.error);
		
		if (respObj) throw new Error(respObj.error);
	}

	/**
	 * @template {keyof ApiEndpoints} K
	 * @param {K | [K, ...string[]]} endpoint
	 * @returns {Promise<ApiEndpoints[K]["response"]>}
	 */
	async get(endpoint) {
		return this.request(endpoint);
	}

	/**
	 * @template {keyof ApiEndpoints} K
	 * @param {K | [K, ...string[]]} endpoint 
	 * @param {ApiEndpoints[K]["body"]} [body] 
	 * @returns {Promise<ApiEndpoints[K]["response"]>}
	 */
	async post(endpoint, body) {
		return this.request(endpoint, "POST", body);
	}
}

class Furzona extends RequestService {

	constructor() {
		super();

		this._contentUrl = "https://content.furzona.app/";

		console.log("Is Logged In ", this.isLoggedIn);
	}

	async loadSettings() {
		const settings = await this.getSettings();

		this._contentUrl = settings.contentUrl;
		return settings;
	}

	async getSettings() {
		return this.get("settings");
	}

	/**
	 * @param {string} email 
	 * @param {string} password 
	 */
	async login(email, password) {

		const response = await this.post("login", { email, password });

		this.token = response.s;

		return response;
	}

	async getPosts(date = 0) {
		return this.post("posts", date ? { date } : {});
	}
	/**
	 * @param {string} email
	 * @param {string} password
	 */
	async createUser(email, password) {
		const response = await this.post("user", { email, password, gte16: true });
		return response;
	}
	/** @param {string} id  */
	async getProfile(id) { return this.get(["profile", id]); }
	/** @param {string} id  */
	async getPost(id) { return this.get(["post", id]); }
	/** @param {string} post  */
	async likePost(post) { return this.post("favorite", { post }); }
	/** @param {string} post  */
	async unlikePost(post) { return this.post("unfavorite", { post }); }
	/** @param {string} post  */
	async getComments(post) {
		return this.post(["commentLevels", post]);
	}

	set token(token) {
		if (!token) throw new Error("Tried to assign an empty token.");
		this._token = token;

		localStorage.setItem("token", token);
	}

	get token() {
		if (!this._token) this._token = localStorage.getItem("token");
		return this._token;
	}
	/** @param {string} path */
	getMediaUrl(path) {
		return this._contentUrl + path;
	}
	/** @param {FurzonaUserBase} user */
	getProfilePictureUrl(user) {
		return user.i ? furzona.getMediaUrl(user.i) : "Assets/profile_default.png";
	}

	get isLoggedIn() {
		return !!this.token;
	}
}

const furzona = new Furzona;
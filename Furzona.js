
const apiUrl = "https://api.furzona.app/";

class RequestService {

	constructor() {
		/** @type {string?} */
		this._token = null;
	}

	/**
	 * @template {keyof ApiEndpoints} K
	 * @param {K} endpoint 
	 * @param {Method} method 
	 * @param {ApiEndpoints[K]["body"]} body 
	 * @returns {Promise<ApiEndpoints[K]["response"]>}
	 */
	async request(endpoint, method = "GET", body) {
		/** @type {RequestInit} */
		const init = { method };

		init.headers = {};
		if (this._token) init.headers["Authorization"] = this._token;

		if (body) init.body = JSON.stringify(body);

		const response = await fetch(apiUrl + endpoint, init);

		if (response.ok) {
			/** @type {FurzonaResponse<ApiEndpoints[K]["response"]>} */
			const result = await response.json();
			return result.result;
		}

		const respTxt = await response.text();

		let errorContainer = document.getElementById('error-container');

		if (!errorContainer) {
			errorContainer = document.createElement("div");
			errorContainer.id = "error-container";
			document.body.appendChild(errorContainer);
		}


		errorContainer.innerHTML = respTxt;

		throw respTxt;
	}

	/**
	 * @template T
	 * @param {string} endpoint
	 * @returns {Promise<T>}
	 */
	async get(endpoint) {
		return /** @type {typeof this.request<T>} */ (this.request)(endpoint);
	}

	/**
	 * @template {keyof ApiEndpoints} K
	 * @param {K} endpoint 
	 * @param {ApiEndpoints[K]["body"]} body 
	 * @returns {Promise<ApiEndpoints[K]["response"]>}
	 */
	async post(endpoint, body) {
		return /** @type {typeof this.request<T>} */ (this.request)(endpoint, "POST", body);
	}
}

class Furzona extends RequestService {

	constructor() {
		super();

		this._contentUrl = "https://content.furzona.app/";
	}

	async loadSettings() {
		const settings = await this.getSettings();

		this._contentUrl = settings.contentUrl;
		return settings;
	}

	async getSettings() {
		/** @type { FurzonaConfigResponse} */
		const response = await this.get("settings");
		return response.result;
	}

	/**
	 * 
	 * @param {string} email 
	 * @param {string} password 
	 */
	async login(email, password) {
		/** @type {LoginRequest} */
		const requestBody = {
			email,
			password
		};

		const response = await /** @type {typeof this.post<FurzonaUser>} */ (this.post)("login", requestBody);

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
	async getProfile(id) { return /** @type {typeof this.post<FurzonaProfile>} */ (this.get)("profile/" + id); }
	/** @param {string} id  */
	async getPost(id) { return /** @type {typeof this.post<FurzonaPost>} */ (this.get)("post/" + id); }
	/** @param {string} post  */
	async likePost(post) { return /** @type {typeof this.post<LikeToggleResult>} */ (this.post)("favorite", { post }); }

	set token(token) {
		if (!token) throw new Error("Tried to assing an empty token.");
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

	isLoggedIn() {
		return !!this.token;
	}
}

const furzona = new Furzona;
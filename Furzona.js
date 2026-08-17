
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

		/** @type {RequestInit} */
		const init = { method };

		init.headers = {};
		if (this._token) init.headers["Authorization"] = this._token;

		if (body) init.body = JSON.stringify(body);

		const response = await fetch(apiUrl + (endpoint instanceof Array ? endpoint.join("/") : endpoint), init);

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

	async getPosts(date = 0, category) {
		if (!category) return this.post("posts", date ? { date } : {});
		return this.post("posts", { date: date || undefined, category });
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
	/**
	 * @param {string} post
	 * @param {string} content
	 */
	async createComment(post, content) {
		return this.post("comment", { post, content });
	}
	/** @param {string} userId */
	async follow(userId) {
		return this.post("follow", { userId });
	}
	/** @param {string} userId */
	async unfollow(userId) {
		return this.post("unfollow", { userId });
	}
	/** @param {string} userId */
	async block(userId) {
		return this.post("block", { user: userId });
	}
	/** @param {string} userId */
	async unblock(userId) {
		return this.post("unblock", { user: userId });
	}
	/** @param {string} id  */
	async getUser(id) {
		return this.get(["user", id]);
	}
	/**
	 * @param {string} q
	 * @param {{ nsfw?: number; hidden?: number; catSelector?: number; warnSelector?: number; nsfwSelector?: number }} [opts]
	 */
	async search(q, opts = {}) {
		return this.post("search", {
			q,
			nsfw: 0,
			hidden: 0,
			catSelector: 0,
			warnSelector: 0,
			nsfwSelector: 0,
			...opts
		});
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
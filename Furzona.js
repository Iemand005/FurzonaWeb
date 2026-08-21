
/**
 * @param {string} str 
 * @param {string} suffix 
 */
function endsWith(str, suffix) {
  return str.slice(-suffix.length) === suffix;
}

function goHome() {
	window.location.href = "index.html"
}

/** @param {*} ex @param {string} respTxt  */
function displayError(ex, respTxt) {
	// console.error(ex);
			
	let errorContainer = document.getElementById('error-container');
	
	if (!errorContainer) {
		errorContainer = document.createElement("div");
		errorContainer.id = "error-container";
		document.body.appendChild(errorContainer);
	}
	
	errorContainer.innerHTML = respTxt;

	return;
}

const apiUrl = "https://api.furzona.app/";

class FurzonaError extends Error {
	/**
	 * @param {string} message
	 * @param {number} code
	 * @param {number} status
	 */
	constructor(message, code, status) {
		super(message);
		this.code = code;
		this.status = status;
	}

	log() {
		console.error(`Error: ${this.message} (Code: ${this.code}, status: ${this.status})`);
	}
}

class RequestService {

	constructor() {
		/** @type {string?} */
		this._token = null;
	}

	/** @type {ApiRequestFn} */
	async request(endpoint, method = "GET", body) {

		/** @type {RequestInit} */
		const init = { method };

		init.headers = {};
		if (this._token) init.headers["Authorization"] = this._token;

		if (body instanceof FormData) {
			init.body = body;
		} else if (body) {
			init.body = JSON.stringify(body);
		}

		/** @type {FurzonaError?} */
		let error = null;

		try {
			const response = await fetch(apiUrl + (endpoint instanceof Array ? endpoint.join("/") : endpoint), init);
			
			if (response.ok) return response.json().then(r => r.result);

			if (response.status === 429) {
				const retryAfter = response.headers.get('Retry-After');
				console.warn("Rate limited, pls retri aftr", retryAfter);
			}
			
			const respTxt = await response.text();

			/** @type {FurzonaErrorResponse?} */
			let respObj = null;
			try { respObj = JSON.parse(respTxt); } catch(ex) { displayError(ex, respTxt); }
			if (!respObj) respObj = { error: "Empty JSON response from server, unkown error!", errorCode: -1 };


			if (respObj.errorCode === 5 && this._token) {
				this.logout();
			}
			
			error = new FurzonaError(respObj.error, respObj.errorCode, response.status);
			error.log();

		} catch(ex) {
			console.error("It did throw! see:?? ", ex);
			if (ex instanceof Error)
				error = new FurzonaError(ex.message, -2, 429);
		}
		throw error;
	}

	/** @type {ApiSafeRequestFn} */
	async requestWithCare(endpoint, method = "GET", body, attempt = 0) {
		const maxRetries = 5;
		const baseDelay = 200;

		try {
			return await this.request(endpoint, method, body);
		} catch (error) {
			if (!(error instanceof FurzonaError)) throw new FurzonaError("Uhm I don't even know man", -1, 0);

			if (error.status !== 429 || attempt >= maxRetries) {
				throw error;
			}

			const delayMs = baseDelay * 2 ** attempt;
			await this.delay(delayMs);
			return this.requestWithCare(endpoint, method, body, attempt + 1);
		}
	}
	/** @param {number} ms */
	async delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }


	/** @type {ReadEndpointFn} */
	async get(endpoint) { return this.request(endpoint); }

	/** @type {WriteEndpointFn} */
	async put(endpoint, body) { return this.request(endpoint, "PUT", body); }
	/** @type {WriteEndpointFn} */
	async post(endpoint, body) { return this.request(endpoint, "POST", body); }
	/** @type {ReadEndpointFn} */
	async delete(endpoint) {
		// return this.request(endpoint, "DELETE");
		return {};
	}

	set token(token) {
		if (!token) throw new Error("Tried to assign an empty token.");
		this._token = token;

		if (localStorage) localStorage.setItem("token", token);
	}

	get token() {
		if (!this._token && localStorage) this._token = localStorage.getItem("token");
		return this._token;
	}

	logout() {
		if (localStorage) localStorage.removeItem("token");
		this._token = null;
	}
}

class Furzona extends RequestService {

	constructor() {
		super();

		this._contentUrl = "https://content.furzona.app/";
		/** @type {FurzonaUser?} */
		this._user = null;

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
		this.user = response;

		return response;
	}
	/**
	 * @param {number} date 
	 * @param {string} category 
	 * @returns 
	 */
	async getPosts(date = 0, category) {
		if (!category) return this.post("posts", date ? { date } : {});
		return this.post("posts", { date: date || undefined, category });
	}
	/**
	 * Fetch posts by a single user.
	 * @param {string} userId
	 * @param {number} [date] epoch ms — posts before this timestamp (pagination)
	 * @param {string} [category]
	 * @returns {Promise<FurzonaPost[]>}
	 */
	async getUserPosts(userId, date = 0, category) {
		return this.post(["posts", userId], { date: date || undefined, category });
	}
	/**
	 * @param {PostType} type post type discriminator
	 * @param {object} [fields]
	 */
	async createPost(type, fields = {}) {
		return this.post("post", { type, ...fields });
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
	/** @param {string} comment  */
	async likeComment(comment) { return this.post("likeComment", { comment }); }
	/** @param {string} comment  */
	async unlikeComment(comment) { return this.post("unlikeComment", { comment }); }
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
	/** @param {string} userId @param {string} reason @param {number} period */
	async banUser(userId, reason, period) {
		return this.post("ban", { userId, reason, period });
	}
	/** @param {string} userId */
	async unbanUser(userId) {
		return this.post("unban", { userId });
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
	/**
	 * Request a password reset for an account.
	 * @param {string} email
	 * @returns {Promise<boolean>}
	 */
	async forgotPassword(email) {
		return this.post("forgotPassword", { email });
	}
	/** @param {string} userId */
	async getFollowers(userId) {
		return this.post("followers", { userId });
	}
	/** @param {string} userId */
	async getFollowing(userId) {
		return this.post("following", { userId });
	}
	/** @param {string} id */
	async deletePost(id) {
		return this.delete(["post", id]);
	}
	/**
	 * Edit a post.
	 * @param {string} id
	 * @param {CreatePostRequest} fields
	 * @returns {Promise<FurzonaPost>}
	 */
	async updatePost(id, fields) {
		return this.put(["post", id], fields);
	}
	/** @param {string} id */
	async deleteComment(id) {
		return this.delete(["comment", id]);
	}
	/** @returns {Promise<FurzonaNotification[]>} */
	async getNotifications() {
		return this.post("notifications");
	}
	/**
	 * Fetch a single notification's data by id.
	 * @param {string} id
	 * @returns {Promise<FurzonaNotificationResponse>}
	 */
	async getNotificationData(id) {
		return this.get(["data", id]);
	}
	/** @returns {Promise<FurzonaChat[]>} */
	async getChats() {
		return this.post("chats");
	}
	/** @param {string} userId */
	async startChat(userId) {
		return this.post("chat", { userId });
	}
	/**
	 * @param {string} text
	 * @param {string} [chat]
	 */
	async sendMessage(text, chat) {
		return this.post("message", chat ? { text, chat } : { text });
	}
	/** @param {string} chat */
	async muteChat(chat) {
		return this.post("mute", { chat });
	}
	/** @param {string} chat */
	async unmuteChat(chat) {
		return this.post("unmute", { chat });
	}
	/** @param {string} chat */
	async sendTyping(chat) {
		return this.post("chatTyping", { chat });
	}
	/**
	 * Fetch group/GC details.
	 * @param {string} chat
	 * @returns {Promise<unknown>}
	 */
	async getGroupInfo(chat) {
		return this.post("groupInfo", { chat });
	}
	/**
	 * Edit a group/GC. Allowed fields are unconfirmed.
	 * @param {string} chat
	 * @param {object} [fields]
	 * @returns {Promise<unknown>}
	 */
	async editGroup(chat, fields = {}) {
		return this.post("editGroup", { chat, ...fields });
	}
	/** @param {number} type */
	async subscribe(type) {
		return this.post("subscribe", { type });
	}
	/** @returns {Promise<FurzonaBadge[]>} */
	async getBadges() {
		return this.get("badges");
	}
	/**
	 * Upload media. Multipart field names are unconfirmed.
	 * @param {FormData} formData
	 * @returns {Promise<unknown>}
	 */
	async upload(formData) {
		return this.request("upload", "POST", formData);
	}

	async deleteAccount() {
		return this.delete("user");
	}

	/**
	 * Search posts and users. Accepts a plain query string or an options object
	 * mirroring the official Android client's search body.
	 * @param {string|NewSearchRequest} queryOrOptions
	 * @returns {Promise<FurzonaNewSearchResult>}
	 */
	async newSearch(queryOrOptions) {
		/** @type {NewSearchRequest} */
		const options = typeof queryOrOptions === "string" ? { query: queryOrOptions } : queryOrOptions || {};
		const body = {
			query: options.query || undefined,
			title: options.title || undefined,
			content: options.content || undefined,
			postedBy: options.postedBy || undefined,
			nsfw: options.nsfw || 0,
			hidden: options.hidden || 0,
			catSelector: options.catSelector || 0,
			categories: options.categories || [],
			warnSelector: options.warnSelector || 0,
			warnings: options.warnings || [],
			nsfwSelector: options.nsfwSelector || 0,
			nsfwWarnings: options.nsfwWarnings || []
		};
		return this.post("newSearch", body);
	}
	/** @param {string} query @returns {Promise<FurzonaUserBase[]>} */
	async searchUsers(query) {
		return this.post("users", { query });
	}
	/** @param {string} query @returns {Promise<FurzonaGroup[]>} */
	async searchGroups(query) {
		return this.post("groups", { query });
	}
	/**
	 * Verify a code sent to the account email (password reset/email confirmation).
	 * @param {string} code
	 * @returns {Promise<boolean>}
	 */
	async verifyEmail(code) {
		return this.post("verifyEmail", { code });
	}
	async getLinkCode() {
		return this.post("linkCode", { appName: "FurzonaWeb", perms: "chats.info" });
	}
	/** @param {string} userId */
	async getAlts(userId) { return this.post("getAlts", { userId }); }
	/** @param {string} userId */
	async getAlts2(userId) { return this.post("getAlts2", { userId }); }
	/**
	 * @param {string} endpoint
	 * @returns {Promise<Method[]>}
	 */
	async probeBlast(endpoint) {
		/** @type {Method[]} */
		const methods = ["GET", "POST", "PUT", "DELETE"];
		
		return Promise.all(methods.map(method => 
			this.requestWithCare(endpoint, method).then(() => ({ method, success: true })).catch((/**@type {FurzonaError}*/reason) => ({ method, success: reason.status !== 429 && reason.code !== -1 }))
		)).then(results => results.filter(r => r.success).map(v => v.method));
	}
	/**
	 * @param {string} endpoint
	 * @returns {Promise<Method[]>}
	 */
	async probe(endpoint) {
		/** @type {Method[]} */
		const methods = ["GET", "POST", "PUT", "DELETE"];
		/** @type {Method[]} */
		const successful = [];

		for (const method of methods) {
			try {
				await this.requestWithCare(endpoint, method);
				successful.push(method);
			} catch (reason) {
				if (!(reason instanceof FurzonaError)) throw reason;
				const success = reason.status !== 429 && reason.code !== -1;
				if (success) successful.push(method);
			}
		}

		return successful;
	}
	/**
	 * @param {string[]} endpoints
	 * @returns {Promise<ProbeResult[]>}
	 */
	async probeAllBlast(endpoints) {
		return (await Promise.all(endpoints.map(async endpoint => ({ endpoint, methods: await this.probe(endpoint) })))).filter(result => result.methods.length > 0);
	}
	/**
	 * @param {string[]} endpoints
	 * @param {number} timeout
	 * @returns {Promise<ProbeResult[]>}
	 */
	async probeAll(endpoints, timeout = 300) {

		const results = [];

		for (const endpoint of endpoints) {
			const methods = await this.probe(endpoint);
			if (methods.length > 0) results.push({ endpoint, methods });
			await this.delay(timeout);
		}

		return results;
	}

	set user(user) {
		this._user = user;
		if (user) {
			localStorage.setItem("currentUser", JSON.stringify(user));
		} else {
			localStorage.removeItem("currentUser");
		}
	}

	/** The signed-in Furzona user (from /login), or null when logged out. */
	get user() {
		if (!this._user) {
			try {
				const raw = localStorage.getItem("currentUser");
				if (raw) this._user = JSON.parse(raw);
			} catch (error) {
				this._user = null;
			}
		}
		return this._user;
	}

	get isLoggedIn() { return !!this.token; }

	/** @param {string} path */
	getMediaUrl(path) { return this._contentUrl + path; }
	/** @param {FurzonaUserBase} user */
	getProfilePictureUrl(user) {
		return user.i ? furzona.getMediaUrl(user.i) : "Assets/profile_default.png";
	}
	/** @param {string} badge */
	parseBadge(badge) {
		const [name, back, foreground] = badge.split("#");
		return { name, foregroundColor: "#" + back, backgroundColor: "#" +foreground };
	}
}

const furzona = new Furzona;

class FurzonaProber extends Furzona {

	static STORAGE_KEY = "furzona-prober-endpoints";

	constructor() {
		super();
		/** @type {Map<string, ProbeResult>} */
		this.foundEndpoints = new Map();
		this.load();
	}
	/**
	 * @param {string[]} endpoints
	 */
	async collect(endpoints) {
		const results = await this.probeAll(endpoints);
		let addedCount = 0;
		for (const result of results) {
			const { endpoint, methods } = result;
			if (this.foundEndpoints.has(endpoint)) {
				const existing = this.foundEndpoints.get(endpoint);
				if (existing) {
					const mergedMethods = [...new Set([...existing.methods, ...methods])];
					this.foundEndpoints.set(endpoint, { endpoint, methods: mergedMethods });
				}
			} else {
				this.foundEndpoints.set(endpoint, { endpoint, methods: [...methods] });
				addedCount++;
			}
		}
		this.save();
		return addedCount;
	}

	/**
	 * @param {string[]} endpoints
	 */
	async collectNew(endpoints) {
		return this.collect(endpoints.filter(endpoint => !this.foundEndpoints.has(endpoint)));
	}

	/**
	 * @returns {ProbeResult[]}
	 */
	get endpointsArray() {
		return Array.from(this.foundEndpoints.values());
	}

	save() {
		try {
			localStorage.setItem(FurzonaProber.STORAGE_KEY, JSON.stringify(this.endpointsArray));
		} catch (err) {
			console.error("Failed to save endpoints:", err);
		}
	}

	load() {
		try {
			const raw = localStorage.getItem(FurzonaProber.STORAGE_KEY);
			if (!raw) return;

			/** @type {ProbeResult[]} */
			const parsed = JSON.parse(raw);
			this.foundEndpoints = new Map(parsed.map(result => [result.endpoint, result]));
		} catch (err) {
			console.error("Failed to load endpoints:", err);
			this.foundEndpoints = new Map();
		}
	}
}

const furzonaProber = new FurzonaProber;
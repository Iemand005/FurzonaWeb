
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
	 */
	constructor(message, code) {
		super(message);
		this.code = code;
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

		const response = await fetch(apiUrl + (endpoint instanceof Array ? endpoint.join("/") : endpoint), init);

		if (response.ok) return response.json().then(r => r.result);

		const respTxt = await response.text();

		/** @type {FurzonaErrorResponse?} */
		let respObj = null;
		try { respObj = JSON.parse(respTxt); } catch(ex) { displayError(ex, respTxt); }
		if (!respObj) respObj = { error: "Empty JSON response from server, unkown error!", errorCode: -1 };

		console.error(`Error: ${respObj.error} (Code: ${respObj.errorCode})`);

		// alert(respObj?.error);

		if (respObj.errorCode === 5 && this._token) {
			this.logout();
		}
		
		throw new FurzonaError(respObj.error, respObj.errorCode);
	}

	/** @type {ReadEndpointFn} */
	async get(endpoint) { return this.request(endpoint); }

	/** @type {WriteEndpointFn} */
	async put(endpoint, body) { return this.request(endpoint, "PUT", body); }
	/** @type {WriteEndpointFn} */
	async post(endpoint, body) { return this.request(endpoint, "POST", body); }
	/** @type {ReadEndpointFn} */
	async delete(endpoint) { return this.request(endpoint, "DELETE"); }

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
		return this.request(["post", id], "DELETE");
	}
	/**
	 * Edit a post.
	 * @param {string} id
	 * @param {CreatePostRequest} fields
	 * @returns {Promise<FurzonaPost>}
	 */
	async editPost(id, fields) {
		return this.put(["post", id], fields);
	}
	/** @param {string} id */
	async deleteComment(id) {
		return this.request(["comment", id], "DELETE");
	}
	/** @returns {Promise<FurzonaNotification[]>} */
	async getNotifications() {
		return this.post("notifications", {});
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
		return this.post("chats", {});
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

	/**
	 * @param {string} query
	 * @returns {Promise<FurzonaNewSearchResult>}
	 */
	async newSearch(query) {
		return this.post("newSearch", { query });
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
	/** @param {string} endpoint */
	async probe(endpoint) {
		const requests = [this.get(endpoint), this.post(endpoint)];
		// [this.get(endpoint), this.post(endpoint), this.put(endpoint), this.delete(endpoint)]
		await results = Promise.allSettled(requests).then(console.log)
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

	/** @param {string} path */
	getMediaUrl(path) { return this._contentUrl + path; }
	/** @param {FurzonaUserBase} user */
	getProfilePictureUrl(user) {
		return user.i ? furzona.getMediaUrl(user.i) : "Assets/profile_default.png";
	}

	get isLoggedIn() { return !!this.token; }
}

const furzona = new Furzona;
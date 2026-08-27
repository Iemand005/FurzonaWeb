
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

	async loadSettings() { const settings = await this.getSettings(); this._contentUrl = settings.contentUrl; return settings; }
	async getSettings() { return this.get("settings"); }
	async login(/** @type {string} */email, /** @type {string} */password) { const response = await this.post("login", { email, password }); this.token = response.s; this.user = response; return response; }
	async getPosts(/** @type {number} */date = 0, /** @type {string} */category) { if (!category) return this.post("posts", date ? { date } : {}); return this.post("posts", { date: date || undefined, category }); }
	async getUserPosts(/** @type {string} */userId, /** @type {number} */date = 0, /** @type {string} */category) { return this.post(["posts", userId], { date: date || undefined, category }); }
	async createPost(/** @type {PostType} */type, /** @type {Omit<CreatePostRequest, "type">} */fields = {}) { return this.post("post", { type, ...fields }); }
	async createUser(/** @type {string} */email, /** @type {string} */password) { return this.post("user", { email, password, gte16: true }); }
	async getProfile(/** @type {string} */id) { return this.get(["profile", id]); }
	async getPost(/** @type {string} */id) { return this.get(["post", id]); }
	async likePost(/** @type {string} */post) { return this.post("favorite", { post }); }
	async unlikePost(/** @type {string} */post) { return this.post("unfavorite", { post }); }
	async likeComment(/** @type {string} */comment) { return this.post("likeComment", { comment }); }
	async unlikeComment(/** @type {string} */comment) { return this.post("unlikeComment", { comment }); }
	async getComments(/** @type {string} */post) { return this.post(["commentLevels", post]); }
	async createComment(/** @type {string} */post, /** @type {string} */content) { return this.post("comment", { post, content }); }
	async follow(/** @type {string} */userId) { return this.post("follow", { userId }); }
	async unfollow(/** @type {string} */userId) { return this.post("unfollow", { userId }); }
	async block(/** @type {string} */userId) { return this.post("block", { user: userId }); }
	async unblock(/** @type {string} */userId) { return this.post("unblock", { user: userId }); }
	async banUser(/** @type {string} */userId, /** @type {string} */reason, /** @type {number} */period) { return this.post("ban", { userId, reason, period }); }
	async unbanUser(/** @type {string} */userId) { return this.post("unban", { userId }); }
	async getUser(/** @type {string} */id) { return this.get(["user", id]); }
	async search(/** @type {string} */q, /** @type {{ nsfw?: number; hidden?: number; catSelector?: number; warnSelector?: number; nsfwSelector?: number }} */opts = {}) { return this.post("search", { q, nsfw: 0, hidden: 0, catSelector: 0, warnSelector: 0, nsfwSelector: 0, ...opts }); }
	async forgotPassword(/** @type {string} */email) { return this.post("forgotPassword", { email }); }
	/** @param {string} [userId] */
	async getFollowers(/** @type {string} */userId) {
		if (!userId) userId = this.user?.id;
		if (!userId) throw new Error("User ID invalid!");
		return this.post("followers", { userId });
	}
	async getFollowing(/** @type {string} */userId) { return this.post("following", { userId }); }
	async deletePost(/** @type {string} */id) { return this.delete(["post", id]); }
	async updatePost(/** @type {string} */id, /** @type {CreatePostRequest} */fields) { return this.put(["post", id], fields); }
	async deleteComment(/** @type {string} */id) { return this.delete(["comment", id]); }
	async getNotifications() { return this.post("notifications"); }
	async getNotificationData(/** @type {string} */id) { return this.get(["data", id]); }
	async getChats() { return this.post("chats"); }
	async startChat(/** @type {string} */userId) { return this.post("chat", { userId }); }
	async sendMessage(/** @type {string} */text, /** @type {string} */chat) { return this.post("message", chat ? { text, chat } : { text }); }
	async muteChat(/** @type {string} */chat) { return this.post("mute", { chat }); }
	async unmuteChat(/** @type {string} */chat) { return this.post("unmute", { chat }); }
	async sendTyping(/** @type {string} */chat) { return this.post("chatTyping", { chat }); }
	async getGroupInfo(/** @type {string} */chat) { return this.post("groupInfo", { chat }); }
	async editGroup(/** @type {string} */chat, /** @type {EditGroupRequest?} */fields) { return this.post("editGroup", { chat, ...fields }); }
	async subscribe(/** @type {number} */type) { return this.post("subscribe", { type }); }
	async getBadges() { return this.get("badges"); }
	async upload(/** @type {FormData} */formData) { return this.request("upload", "POST", formData); }
	async deleteAccount() { return this.delete("user"); }
	async searchUsers(/** @type {string} */query) { return this.post("users", { query }); }
	async searchGroups(/** @type {string} */query) { return this.post("groups", { query }); }
	async verifyEmail(/** @type {string} */code) { return this.post("verifyEmail", { code }); }
	async getLinkCode() { return this.post("linkCode", { appName: "FurzonaWeb", perms: "chats.info" }); }
	async getAlts(/** @type {string} */userId, /** @type {number} */date) { return this.post("getAlts", date ? { userId, date } : { userId }); }
	async getAlts2(/** @type {string} */userId) { return this.post("getAlts2", { userId }); }
	async updateUser(/** @type {EditUserRequest} */fields) { return this.put("user", fields); }
	async resetPassword(/** @type {string} */password) { return this.put("password", { password }); }
	async sendParentsConsent(/** @type {string} */email, /** @type {string} */password) { return this.post("sendConsent", { email, password }); }
	async logoutDevices() { return this.post("clearLogin"); }
	async sendVerificationEmail() { return this.post("sendVerificationEmail"); }
	async updateEmailVerified() { return this.post("isEmailVerified"); }
	async setOnline() { return this.get("setOnline"); }
	async setSafeModeView(/** @type {boolean} */enabled) { return this.post("safeModeView", { enabled }); }
	async asUser(/** @type {string} */userId) { return this.get(["asUser", userId]); }
	async ping() { return this.get("ping"); }
	async pong(/** @type {string} */id) { return this.get(["pong", id]); }
	async getServerAdminInfo() { return this.get("adminStatus"); }
	async getAdminLogs(/** @type {string} */query, /** @type {number} */date) { return this.post("adminLogs", { query: query || undefined, date: date || undefined }); }
	async getModLogs(/** @type {string} */query, /** @type {number} */date) { return this.post("modLogs", { query: query || undefined, date: date || undefined }); }
	async sendServerCommand(/** @type {string} */cmd) { return this.post("exec", { cmd }); }
	async wipeSpecialPosts() { return this.post("wipeSpecial"); }
	async cleanServer() { return this.get("cleanServer"); }
	async getModUsers(/** @type {number} */date) { return this.post("modUsers", date ? { date } : {}); }
	async unsubscribe(/** @type {number} */type) { return this.post("unsubscribe", { type }); }
	async voteInPoll(/** @type {string} */poll, /** @type {string[]} */options) { return this.post("submitPolls", { poll, options }); }
	async viewPollResults(/** @type {string} */poll) { return this.post("viewPollResults", { poll }); }
	async addModNote(/** @type {string} */userId, /** @type {string} */note) { return this.post("modNote", { userId, note }); }
	async suspendUser(/** @type {string} */userId, /** @type {string} */reason) { return this.post("suspendUser", { userId, reason }); }
	async getBans(/** @type {string} */userId) { return this.get(["bans", userId]); }
	async purgeUserPosts(/** @type {string} */userId) { return this.post("purge", { user: userId }); }
	async deleteAllComments(/** @type {string} */userId) { return this.post("deleteAllComments", { user: userId }); }
	async getProfileByUsername(/** @type {string} */username) { return this.get(["profileUsername", username.split(".").join("-")]); }
	async removePfp(/** @type {string} */userId) { return this.get(["removePfp", userId]); }
	async removeBanner(/** @type {string} */userId) { return this.get(["removeBanner", userId]); }
	async resetUsername(/** @type {string} */userId) { return this.get(["resetUsername", userId]); }
	async removeDescription(/** @type {string} */userId) { return this.get(["removeDesc", userId]); }
	async toggleUserSafeMode(/** @type {string} */userId) { return this.post("safeMode", { userId }); }
	async changeTag(/** @type {string} */userId, /** @type {string} */tag) { return this.post("changeTag", { user: userId, tag }); }
	async changePermLevel(/** @type {string} */userId, /** @type {PermissionLevel} */permLevel) { return this.post("changePermLevel", { user: userId, permLevel }); }
	async verifyEmailAdmin(/** @type {string} */userId) { return this.post("verifyEmailAdmin", { userId }); }
	async resetIps(/** @type {string} */userId) { return this.post("resetIps", { userId }); }
	async awardPoints(/** @type {string} */userId, /** @type {number} */points) { return this.post("award", { userId, points }); }
	async reportPost(/** @type {string} */post, /** @type {string} */reason, /** @type {ReportAttachmentInput[]} */attachments = []) { return this.post("report", { post, reason, attachments }); }
	async reportComment(/** @type {string} */comment, /** @type {string} */reason, /** @type {ReportAttachmentInput[]} */attachments = []) { return this.post("report", { comment, reason, attachments }); }
	async reportUser(/** @type {string} */user, /** @type {string} */reason, /** @type {ReportAttachmentInput[]} */attachments = []) { return this.post("report", { user, reason, attachments }); }
	async claimReport(/** @type {string} */id) { return this.get(["assignReport", id]); }
	async isReportReviewed(/** @type {string} */id) { return this.get(["reviewed", id]); }
	async getPostReports() { return this.get("postReports"); }
	async getCommentReports() { return this.get("commentReports"); }
	async getUserReports() { return this.get("userReports"); }
	async getAllReports(/** @type {number} */date) { return this.post("allReports", date ? { date } : {}); }


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

	/**
	 * @param {string} endpoint
	 * @returns {Promise<Method[]>}
	 */
	async probeBlast(endpoint) {
		/** @type {Method[]} */
		const methods = ["GET", "POST", "PUT"];
		
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
		const methods = ["GET", "POST", "PUT"];
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
	async probeAllBlast(endpoints) { return (await Promise.all(endpoints.map(async endpoint => ({ endpoint, methods: await this.probe(endpoint) })))).filter(result => result.methods.length > 0); }
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

	get isLoggedIn() { return !!(this.user && this.token); }

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
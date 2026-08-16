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
    if (response.ok) return response.json();
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

    /** @type {LoginResponse} */
    const response = await this.post("login", requestBody);
    this.token = response.result.s;
    return response.result;
  }
  async getPosts(date = 0) {
    const body = {};
    if (date) body.date = date;
    /** @type {FurzonaPostsResponse} */
    const response = await this.post("posts", body);
    return response.result;
  }
  /**
   * @param {string} email
   * @param {string} password
   */
  async createUser(email, password) {
    const response = await this.post("user", {
      email,
      password,
      gte16: true
    });
    return response.result;
  }
  /** @param {string} id  */
  async getProfile(id) {
    /** @type {ProfileResponse} */
    const response = await this.get("profile/" + id);
    return response.result;
  }

  /** @param {string} id  */
  async getPost(id) {
    /** @type {ProfileResponse} */
    const response = await this.get("post/" + id);
    return response.result;
  }
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
const furzona = new Furzona();
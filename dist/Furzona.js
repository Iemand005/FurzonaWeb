function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import "core-js/modules/es.json.stringify.js";
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var apiUrl = "https://api.furzona.app/";
var RequestService = /*#__PURE__*/function () {
  function RequestService() {
    _classCallCheck(this, RequestService);
    /** @type {string?} */
    this._token = null;
  }
  return _createClass(RequestService, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(endpoint) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return fetch(apiUrl + endpoint).then(function (r) {
                return r.json();
              });
            case 1:
              return _context.a(2, _context.v);
          }
        }, _callee);
      }));
      function get(_x) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * @template T
     * @param {*} endpoint 
     * @param {*} body 
     * @returns {T}
     */
  }, {
    key: "post",
    value: (function () {
      var _post = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(endpoint) {
        var body,
          headers,
          response,
          respTxt,
          errorContainer,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              body = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              headers = {};
              if (this._token) headers["Authorization"] = this._token;
              _context2.n = 1;
              return fetch(apiUrl + endpoint, {
                method: "POST",
                body: JSON.stringify(body),
                headers: headers
              });
            case 1:
              response = _context2.v;
              if (!response.ok) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, response.json());
            case 2:
              _context2.n = 3;
              return response.text();
            case 3:
              respTxt = _context2.v;
              errorContainer = document.getElementById('error-container');
              if (!errorContainer) {
                errorContainer = document.createElement("div");
                errorContainer.id = "error-container";
                document.body.appendChild(errorContainer);
              }
              errorContainer.innerHTML = respTxt;
              throw respTxt;
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function post(_x2) {
        return _post.apply(this, arguments);
      }
      return post;
    }())
  }]);
}();
var Furzona = /*#__PURE__*/function (_RequestService) {
  function Furzona() {
    var _this;
    _classCallCheck(this, Furzona);
    _this = _callSuper(this, Furzona);
    _this._contentUrl = "https://content.furzona.app/";
    return _this;
  }
  _inherits(Furzona, _RequestService);
  return _createClass(Furzona, [{
    key: "loadSettings",
    value: function () {
      var _loadSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var settings;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this.getSettings();
            case 1:
              settings = _context3.v;
              this._contentUrl = settings.contentUrl;
              return _context3.a(2, settings);
          }
        }, _callee3, this);
      }));
      function loadSettings() {
        return _loadSettings.apply(this, arguments);
      }
      return loadSettings;
    }()
  }, {
    key: "getSettings",
    value: function () {
      var _getSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var response;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this.get("settings");
            case 1:
              response = _context4.v;
              return _context4.a(2, response.result);
          }
        }, _callee4, this);
      }));
      function getSettings() {
        return _getSettings.apply(this, arguments);
      }
      return getSettings;
    }()
    /**
     * 
     * @param {string} email 
     * @param {string} password 
     */
  }, {
    key: "login",
    value: (function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(email, password) {
        var requestBody, response;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              /** @type {LoginRequest} */
              requestBody = {
                email: email,
                password: password
              };
              /** @type {LoginResponse} */
              _context5.n = 1;
              return this.post("login", requestBody);
            case 1:
              response = _context5.v;
              this.token = response.result.s;
              return _context5.a(2, response.result);
          }
        }, _callee5, this);
      }));
      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }
      return login;
    }())
  }, {
    key: "getPosts",
    value: function () {
      var _getPosts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var date,
          body,
          response,
          _args6 = arguments;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              date = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : 0;
              body = {};
              if (date) body.date = date;
              /** @type {FurzonaPostsResponse} */
              _context6.n = 1;
              return this.post("posts", body);
            case 1:
              response = _context6.v;
              return _context6.a(2, response.result);
          }
        }, _callee6, this);
      }));
      function getPosts() {
        return _getPosts.apply(this, arguments);
      }
      return getPosts;
    }()
    /**
     * @param {string} email
     * @param {string} password
     */
  }, {
    key: "createUser",
    value: (function () {
      var _createUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(email, password) {
        var response;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return this.post("user", {
                email: email,
                password: password,
                gte16: true
              });
            case 1:
              response = _context7.v;
              return _context7.a(2, response.result);
          }
        }, _callee7, this);
      }));
      function createUser(_x5, _x6) {
        return _createUser.apply(this, arguments);
      }
      return createUser;
    }() /** @param {string} id  */)
  }, {
    key: "getProfile",
    value: (function () {
      var _getProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(id) {
        var response;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _context8.n = 1;
              return this.get("profile/" + id);
            case 1:
              response = _context8.v;
              return _context8.a(2, response.result);
          }
        }, _callee8, this);
      }));
      function getProfile(_x7) {
        return _getProfile.apply(this, arguments);
      }
      return getProfile;
    }() /** @param {string} id  */)
  }, {
    key: "getPost",
    value: (function () {
      var _getPost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(id) {
        var response;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              _context9.n = 1;
              return this.get("post/" + id);
            case 1:
              response = _context9.v;
              return _context9.a(2, response.result);
          }
        }, _callee9, this);
      }));
      function getPost(_x8) {
        return _getPost.apply(this, arguments);
      }
      return getPost;
    }())
  }, {
    key: "token",
    get: function get() {
      if (!this._token) this._token = localStorage.getItem("token");
      return this._token;
    }
    /** @param {string} path */,
    set: function set(token) {
      if (!token) throw new Error("Tried to assing an empty token.");
      this._token = token;
      localStorage.setItem("token", token);
    }
  }, {
    key: "getMediaUrl",
    value: function getMediaUrl(path) {
      return this._contentUrl + path;
    }
    /** @param {FurzonaUserBase} user */
  }, {
    key: "getProfilePictureUrl",
    value: function getProfilePictureUrl(user) {
      return user.i ? furzona.getMediaUrl(user.i) : "Assets/profile_default.png";
    }
  }, {
    key: "isLoggedIn",
    value: function isLoggedIn() {
      return !!this.token;
    }
  }]);
}(RequestService);
var furzona = new Furzona();
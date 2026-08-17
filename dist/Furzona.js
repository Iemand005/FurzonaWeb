"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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

  /**
   * @template {keyof ApiEndpoints} K
   * @param {K | [K, ...string[]]} endpoint 
   * @param {Method} [method] 
   * @param {ApiEndpoints[K]["body"]} [body] 
   * @returns {Promise<ApiEndpoints[K]["response"]>}
   */
  return _createClass(RequestService, [{
    key: "request",
    value: (function () {
      var _request = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(endpoint) {
        var _respObj;
        var method,
          body,
          init,
          response,
          respTxt,
          respObj,
          err,
          errorContainer,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              method = _args.length > 1 && _args[1] !== undefined ? _args[1] : "GET";
              body = _args.length > 2 ? _args[2] : undefined;
              /** @type {RequestInit} */
              init = {
                method: method
              };
              init.headers = {};
              if (this._token) init.headers["Authorization"] = this._token;
              if (body instanceof FormData) {
                init.body = body;
              } else if (body) {
                init.body = JSON.stringify(body);
              }
              _context.n = 1;
              return fetch(apiUrl + (endpoint instanceof Array ? endpoint.join("/") : endpoint), init);
            case 1:
              response = _context.v;
              if (!response.ok) {
                _context.n = 2;
                break;
              }
              return _context.a(2, response.json().then(function (r) {
                return r.result;
              }));
            case 2:
              _context.n = 3;
              return response.text();
            case 3:
              respTxt = _context.v;
              /** @type {FurzonaError?} */
              respObj = null;
              try {
                err = JSON.parse(respTxt);
                console.error("Error: ".concat(err.error, " (Code: ").concat(err.errorCode, ")"));
                respObj = err;
              } catch (ex) {
                console.error(ex);
                errorContainer = document.getElementById('error-container');
                if (!errorContainer) {
                  errorContainer = document.createElement("div");
                  errorContainer.id = "error-container";
                  document.body.appendChild(errorContainer);
                }
                errorContainer.innerHTML = respTxt;
              }
              alert((_respObj = respObj) === null || _respObj === void 0 ? void 0 : _respObj.error);
              if (!respObj) {
                _context.n = 4;
                break;
              }
              throw new Error(respObj.error);
            case 4:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function request(_x) {
        return _request.apply(this, arguments);
      }
      return request;
    }()
    /**
     * @template {keyof ApiEndpoints} K
     * @param {K | [K, ...string[]]} endpoint
     * @returns {Promise<ApiEndpoints[K]["response"]>}
     */
    )
  }, {
    key: "get",
    value: (function () {
      var _get = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(endpoint) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              return _context2.a(2, this.request(endpoint));
          }
        }, _callee2, this);
      }));
      function get(_x2) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * @template {keyof ApiEndpoints} K
     * @param {K | [K, ...string[]]} endpoint 
     * @param {ApiEndpoints[K]["body"]} [body] 
     * @returns {Promise<ApiEndpoints[K]["response"]>}
     */
    )
  }, {
    key: "post",
    value: (function () {
      var _post = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(endpoint, body) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              return _context3.a(2, this.request(endpoint, "POST", body));
          }
        }, _callee3, this);
      }));
      function post(_x3, _x4) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
    /**
     * @template {keyof ApiEndpoints} K
     * @param {K | [K, ...string[]]} endpoint
     * @returns {Promise<ApiEndpoints[K]["response"]>}
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(endpoint) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              return _context4.a(2, this.request(endpoint, "DELETE"));
          }
        }, _callee4, this);
      }));
      function _delete(_x5) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }())
  }]);
}();
var Furzona = /*#__PURE__*/function (_RequestService) {
  function Furzona() {
    var _this;
    _classCallCheck(this, Furzona);
    _this = _callSuper(this, Furzona);
    _this._contentUrl = "https://content.furzona.app/";
    console.log("Is Logged In ", _this.isLoggedIn);
    return _this;
  }
  _inherits(Furzona, _RequestService);
  return _createClass(Furzona, [{
    key: "loadSettings",
    value: function () {
      var _loadSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var settings;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this.getSettings();
            case 1:
              settings = _context5.v;
              this._contentUrl = settings.contentUrl;
              return _context5.a(2, settings);
          }
        }, _callee5, this);
      }));
      function loadSettings() {
        return _loadSettings.apply(this, arguments);
      }
      return loadSettings;
    }()
  }, {
    key: "getSettings",
    value: function () {
      var _getSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              return _context6.a(2, this.get("settings"));
          }
        }, _callee6, this);
      }));
      function getSettings() {
        return _getSettings.apply(this, arguments);
      }
      return getSettings;
    }()
    /**
     * @param {string} email 
     * @param {string} password 
     */
  }, {
    key: "login",
    value: (function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(email, password) {
        var response;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return this.post("login", {
                email: email,
                password: password
              });
            case 1:
              response = _context7.v;
              this.token = response.s;
              this.user = response;
              return _context7.a(2, response);
          }
        }, _callee7, this);
      }));
      function login(_x6, _x7) {
        return _login.apply(this, arguments);
      }
      return login;
    }())
  }, {
    key: "getPosts",
    value: function () {
      var _getPosts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var date,
          category,
          _args8 = arguments;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              date = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : 0;
              category = _args8.length > 1 ? _args8[1] : undefined;
              if (category) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2, this.post("posts", date ? {
                date: date
              } : {}));
            case 1:
              return _context8.a(2, this.post("posts", {
                date: date || undefined,
                category: category
              }));
          }
        }, _callee8, this);
      }));
      function getPosts() {
        return _getPosts.apply(this, arguments);
      }
      return getPosts;
    }()
    /**
     * Fetch posts by a single user.
     * @param {string} userId
     * @param {number} [date] epoch ms — posts before this timestamp (pagination)
     * @param {string} [category]
     * @returns {Promise<FurzonaPost[]>}
     */
  }, {
    key: "getUserPosts",
    value: (function () {
      var _getUserPosts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(userId) {
        var date,
          category,
          _args9 = arguments;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              date = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 0;
              category = _args9.length > 2 ? _args9[2] : undefined;
              return _context9.a(2, this.post(["posts", userId], {
                date: date || undefined,
                category: category
              }));
          }
        }, _callee9, this);
      }));
      function getUserPosts(_x8) {
        return _getUserPosts.apply(this, arguments);
      }
      return getUserPosts;
    }()
    /**
     * @param {PostType} type post type discriminator
     * @param {object} [fields]
     */
    )
  }, {
    key: "createPost",
    value: (function () {
      var _createPost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(type) {
        var fields,
          _args0 = arguments;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              fields = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : {};
              return _context0.a(2, this.post("post", _objectSpread({
                type: type
              }, fields)));
          }
        }, _callee0, this);
      }));
      function createPost(_x9) {
        return _createPost.apply(this, arguments);
      }
      return createPost;
    }()
    /**
     * @param {string} email
     * @param {string} password
     */
    )
  }, {
    key: "createUser",
    value: (function () {
      var _createUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(email, password) {
        var response;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              _context1.n = 1;
              return this.post("user", {
                email: email,
                password: password,
                gte16: true
              });
            case 1:
              response = _context1.v;
              return _context1.a(2, response);
          }
        }, _callee1, this);
      }));
      function createUser(_x0, _x1) {
        return _createUser.apply(this, arguments);
      }
      return createUser;
    }() /** @param {string} id  */)
  }, {
    key: "getProfile",
    value: (function () {
      var _getProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(id) {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              return _context10.a(2, this.get(["profile", id]));
          }
        }, _callee10, this);
      }));
      function getProfile(_x10) {
        return _getProfile.apply(this, arguments);
      }
      return getProfile;
    }() /** @param {string} id  */)
  }, {
    key: "getPost",
    value: (function () {
      var _getPost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(id) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              return _context11.a(2, this.get(["post", id]));
          }
        }, _callee11, this);
      }));
      function getPost(_x11) {
        return _getPost.apply(this, arguments);
      }
      return getPost;
    }() /** @param {string} post  */)
  }, {
    key: "likePost",
    value: (function () {
      var _likePost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(post) {
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              return _context12.a(2, this.post("favorite", {
                post: post
              }));
          }
        }, _callee12, this);
      }));
      function likePost(_x12) {
        return _likePost.apply(this, arguments);
      }
      return likePost;
    }() /** @param {string} post  */)
  }, {
    key: "unlikePost",
    value: (function () {
      var _unlikePost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(post) {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              return _context13.a(2, this.post("unfavorite", {
                post: post
              }));
          }
        }, _callee13, this);
      }));
      function unlikePost(_x13) {
        return _unlikePost.apply(this, arguments);
      }
      return unlikePost;
    }() /** @param {string} comment  */)
  }, {
    key: "likeComment",
    value: (function () {
      var _likeComment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(comment) {
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              return _context14.a(2, this.post("likeComment", {
                comment: comment
              }));
          }
        }, _callee14, this);
      }));
      function likeComment(_x14) {
        return _likeComment.apply(this, arguments);
      }
      return likeComment;
    }() /** @param {string} comment  */)
  }, {
    key: "unlikeComment",
    value: (function () {
      var _unlikeComment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(comment) {
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              return _context15.a(2, this.post("unlikeComment", {
                comment: comment
              }));
          }
        }, _callee15, this);
      }));
      function unlikeComment(_x15) {
        return _unlikeComment.apply(this, arguments);
      }
      return unlikeComment;
    }() /** @param {string} post  */)
  }, {
    key: "getComments",
    value: (function () {
      var _getComments = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(post) {
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              return _context16.a(2, this.post(["commentLevels", post]));
          }
        }, _callee16, this);
      }));
      function getComments(_x16) {
        return _getComments.apply(this, arguments);
      }
      return getComments;
    }()
    /**
     * @param {string} post
     * @param {string} content
     */
    )
  }, {
    key: "createComment",
    value: (function () {
      var _createComment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(post, content) {
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              return _context17.a(2, this.post("comment", {
                post: post,
                content: content
              }));
          }
        }, _callee17, this);
      }));
      function createComment(_x17, _x18) {
        return _createComment.apply(this, arguments);
      }
      return createComment;
    }() /** @param {string} userId */)
  }, {
    key: "follow",
    value: (function () {
      var _follow = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(userId) {
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              return _context18.a(2, this.post("follow", {
                userId: userId
              }));
          }
        }, _callee18, this);
      }));
      function follow(_x19) {
        return _follow.apply(this, arguments);
      }
      return follow;
    }() /** @param {string} userId */)
  }, {
    key: "unfollow",
    value: (function () {
      var _unfollow = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(userId) {
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              return _context19.a(2, this.post("unfollow", {
                userId: userId
              }));
          }
        }, _callee19, this);
      }));
      function unfollow(_x20) {
        return _unfollow.apply(this, arguments);
      }
      return unfollow;
    }() /** @param {string} userId */)
  }, {
    key: "block",
    value: (function () {
      var _block = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(userId) {
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              return _context20.a(2, this.post("block", {
                user: userId
              }));
          }
        }, _callee20, this);
      }));
      function block(_x21) {
        return _block.apply(this, arguments);
      }
      return block;
    }() /** @param {string} userId */)
  }, {
    key: "unblock",
    value: (function () {
      var _unblock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(userId) {
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              return _context21.a(2, this.post("unblock", {
                user: userId
              }));
          }
        }, _callee21, this);
      }));
      function unblock(_x22) {
        return _unblock.apply(this, arguments);
      }
      return unblock;
    }() /** @param {string} userId @param {string} reason @param {number} period */)
  }, {
    key: "banUser",
    value: (function () {
      var _banUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(userId, reason, period) {
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              return _context22.a(2, this.post("ban", {
                userId: userId,
                reason: reason,
                period: period
              }));
          }
        }, _callee22, this);
      }));
      function banUser(_x23, _x24, _x25) {
        return _banUser.apply(this, arguments);
      }
      return banUser;
    }() /** @param {string} userId */)
  }, {
    key: "unbanUser",
    value: (function () {
      var _unbanUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(userId) {
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              return _context23.a(2, this.post("unban", {
                userId: userId
              }));
          }
        }, _callee23, this);
      }));
      function unbanUser(_x26) {
        return _unbanUser.apply(this, arguments);
      }
      return unbanUser;
    }() /** @param {string} id  */)
  }, {
    key: "getUser",
    value: (function () {
      var _getUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(id) {
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              return _context24.a(2, this.get(["user", id]));
          }
        }, _callee24, this);
      }));
      function getUser(_x27) {
        return _getUser.apply(this, arguments);
      }
      return getUser;
    }()
    /**
     * @param {string} q
     * @param {{ nsfw?: number; hidden?: number; catSelector?: number; warnSelector?: number; nsfwSelector?: number }} [opts]
     */
    )
  }, {
    key: "search",
    value: (function () {
      var _search = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(q) {
        var opts,
          _args25 = arguments;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              opts = _args25.length > 1 && _args25[1] !== undefined ? _args25[1] : {};
              return _context25.a(2, this.post("search", _objectSpread({
                q: q,
                nsfw: 0,
                hidden: 0,
                catSelector: 0,
                warnSelector: 0,
                nsfwSelector: 0
              }, opts)));
          }
        }, _callee25, this);
      }));
      function search(_x28) {
        return _search.apply(this, arguments);
      }
      return search;
    }()
    /**
     * Request a password reset for an account.
     * @param {string} email
     * @returns {Promise<boolean>}
     */
    )
  }, {
    key: "forgotPassword",
    value: (function () {
      var _forgotPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(email) {
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              return _context26.a(2, this.post("forgotPassword", {
                email: email
              }));
          }
        }, _callee26, this);
      }));
      function forgotPassword(_x29) {
        return _forgotPassword.apply(this, arguments);
      }
      return forgotPassword;
    }() /** @param {string} userId */)
  }, {
    key: "getFollowers",
    value: (function () {
      var _getFollowers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(userId) {
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              return _context27.a(2, this.post("followers", {
                userId: userId
              }));
          }
        }, _callee27, this);
      }));
      function getFollowers(_x30) {
        return _getFollowers.apply(this, arguments);
      }
      return getFollowers;
    }() /** @param {string} userId */)
  }, {
    key: "getFollowing",
    value: (function () {
      var _getFollowing = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(userId) {
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.n) {
            case 0:
              return _context28.a(2, this.post("following", {
                userId: userId
              }));
          }
        }, _callee28, this);
      }));
      function getFollowing(_x31) {
        return _getFollowing.apply(this, arguments);
      }
      return getFollowing;
    }() /** @param {string} id */)
  }, {
    key: "deletePost",
    value: (function () {
      var _deletePost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(id) {
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              return _context29.a(2, this.request(["post", id], "DELETE"));
          }
        }, _callee29, this);
      }));
      function deletePost(_x32) {
        return _deletePost.apply(this, arguments);
      }
      return deletePost;
    }()
    /**
     * Edit a post.
     * @param {string} id
     * @param {object} fields
     * @returns {Promise<FurzonaPost>}
     */
    )
  }, {
    key: "editPost",
    value: (function () {
      var _editPost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(id, fields) {
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.n) {
            case 0:
              return _context30.a(2, this.request(["post", id], "PUT", fields));
          }
        }, _callee30, this);
      }));
      function editPost(_x33, _x34) {
        return _editPost.apply(this, arguments);
      }
      return editPost;
    }() /** @param {string} id */)
  }, {
    key: "deleteComment",
    value: (function () {
      var _deleteComment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(id) {
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.n) {
            case 0:
              return _context31.a(2, this.request(["comment", id], "DELETE"));
          }
        }, _callee31, this);
      }));
      function deleteComment(_x35) {
        return _deleteComment.apply(this, arguments);
      }
      return deleteComment;
    }() /** @returns {Promise<FurzonaNotification[]>} */)
  }, {
    key: "getNotifications",
    value: (function () {
      var _getNotifications = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32() {
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.n) {
            case 0:
              return _context32.a(2, this.post("notifications", {}));
          }
        }, _callee32, this);
      }));
      function getNotifications() {
        return _getNotifications.apply(this, arguments);
      }
      return getNotifications;
    }()
    /**
     * Fetch a single notification's data by id.
     * @param {string} id
     * @returns {Promise<FurzonaNotificationResponse>}
     */
    )
  }, {
    key: "getNotificationData",
    value: (function () {
      var _getNotificationData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(id) {
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.n) {
            case 0:
              return _context33.a(2, this.get(["data", id]));
          }
        }, _callee33, this);
      }));
      function getNotificationData(_x36) {
        return _getNotificationData.apply(this, arguments);
      }
      return getNotificationData;
    }() /** @returns {Promise<FurzonaChat[]>} */)
  }, {
    key: "getChats",
    value: (function () {
      var _getChats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34() {
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.n) {
            case 0:
              return _context34.a(2, this.post("chats", {}));
          }
        }, _callee34, this);
      }));
      function getChats() {
        return _getChats.apply(this, arguments);
      }
      return getChats;
    }() /** @param {string} userId */)
  }, {
    key: "startChat",
    value: (function () {
      var _startChat = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(userId) {
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.n) {
            case 0:
              return _context35.a(2, this.post("chat", {
                userId: userId
              }));
          }
        }, _callee35, this);
      }));
      function startChat(_x37) {
        return _startChat.apply(this, arguments);
      }
      return startChat;
    }()
    /**
     * @param {string} text
     * @param {string} [chat]
     */
    )
  }, {
    key: "sendMessage",
    value: (function () {
      var _sendMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(text, chat) {
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.n) {
            case 0:
              return _context36.a(2, this.post("message", chat ? {
                text: text,
                chat: chat
              } : {
                text: text
              }));
          }
        }, _callee36, this);
      }));
      function sendMessage(_x38, _x39) {
        return _sendMessage.apply(this, arguments);
      }
      return sendMessage;
    }() /** @param {string} chat */)
  }, {
    key: "muteChat",
    value: (function () {
      var _muteChat = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37(chat) {
        return _regenerator().w(function (_context37) {
          while (1) switch (_context37.n) {
            case 0:
              return _context37.a(2, this.post("mute", {
                chat: chat
              }));
          }
        }, _callee37, this);
      }));
      function muteChat(_x40) {
        return _muteChat.apply(this, arguments);
      }
      return muteChat;
    }() /** @param {string} chat */)
  }, {
    key: "unmuteChat",
    value: (function () {
      var _unmuteChat = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38(chat) {
        return _regenerator().w(function (_context38) {
          while (1) switch (_context38.n) {
            case 0:
              return _context38.a(2, this.post("unmute", {
                chat: chat
              }));
          }
        }, _callee38, this);
      }));
      function unmuteChat(_x41) {
        return _unmuteChat.apply(this, arguments);
      }
      return unmuteChat;
    }() /** @param {string} chat */)
  }, {
    key: "sendTyping",
    value: (function () {
      var _sendTyping = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee39(chat) {
        return _regenerator().w(function (_context39) {
          while (1) switch (_context39.n) {
            case 0:
              return _context39.a(2, this.post("chatTyping", {
                chat: chat
              }));
          }
        }, _callee39, this);
      }));
      function sendTyping(_x42) {
        return _sendTyping.apply(this, arguments);
      }
      return sendTyping;
    }()
    /**
     * Fetch group/GC details.
     * @param {string} chat
     * @returns {Promise<unknown>}
     */
    )
  }, {
    key: "getGroupInfo",
    value: (function () {
      var _getGroupInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee40(chat) {
        return _regenerator().w(function (_context40) {
          while (1) switch (_context40.n) {
            case 0:
              return _context40.a(2, this.post("groupInfo", {
                chat: chat
              }));
          }
        }, _callee40, this);
      }));
      function getGroupInfo(_x43) {
        return _getGroupInfo.apply(this, arguments);
      }
      return getGroupInfo;
    }()
    /**
     * Edit a group/GC. Allowed fields are unconfirmed.
     * @param {string} chat
     * @param {object} [fields]
     * @returns {Promise<unknown>}
     */
    )
  }, {
    key: "editGroup",
    value: (function () {
      var _editGroup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee41(chat) {
        var fields,
          _args41 = arguments;
        return _regenerator().w(function (_context41) {
          while (1) switch (_context41.n) {
            case 0:
              fields = _args41.length > 1 && _args41[1] !== undefined ? _args41[1] : {};
              return _context41.a(2, this.post("editGroup", _objectSpread({
                chat: chat
              }, fields)));
          }
        }, _callee41, this);
      }));
      function editGroup(_x44) {
        return _editGroup.apply(this, arguments);
      }
      return editGroup;
    }() /** @param {number} type */)
  }, {
    key: "subscribe",
    value: (function () {
      var _subscribe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee42(type) {
        return _regenerator().w(function (_context42) {
          while (1) switch (_context42.n) {
            case 0:
              return _context42.a(2, this.post("subscribe", {
                type: type
              }));
          }
        }, _callee42, this);
      }));
      function subscribe(_x45) {
        return _subscribe.apply(this, arguments);
      }
      return subscribe;
    }() /** @returns {Promise<FurzonaBadge[]>} */)
  }, {
    key: "getBadges",
    value: (function () {
      var _getBadges = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee43() {
        return _regenerator().w(function (_context43) {
          while (1) switch (_context43.n) {
            case 0:
              return _context43.a(2, this.get("badges"));
          }
        }, _callee43, this);
      }));
      function getBadges() {
        return _getBadges.apply(this, arguments);
      }
      return getBadges;
    }()
    /**
     * Upload media. Multipart field names are unconfirmed.
     * @param {FormData} formData
     * @returns {Promise<unknown>}
     */
    )
  }, {
    key: "upload",
    value: (function () {
      var _upload = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee44(formData) {
        return _regenerator().w(function (_context44) {
          while (1) switch (_context44.n) {
            case 0:
              return _context44.a(2, this.request("upload", "POST", formData));
          }
        }, _callee44, this);
      }));
      function upload(_x46) {
        return _upload.apply(this, arguments);
      }
      return upload;
    }()
    /**
     * @param {string} query
     * @returns {Promise<FurzonaNewSearchResult>}
     */
    )
  }, {
    key: "newSearch",
    value: (function () {
      var _newSearch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee45(query) {
        return _regenerator().w(function (_context45) {
          while (1) switch (_context45.n) {
            case 0:
              return _context45.a(2, this.post("newSearch", {
                query: query
              }));
          }
        }, _callee45, this);
      }));
      function newSearch(_x47) {
        return _newSearch.apply(this, arguments);
      }
      return newSearch;
    }() /** @param {string} query @returns {Promise<FurzonaUserBase[]>} */)
  }, {
    key: "searchUsers",
    value: (function () {
      var _searchUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee46(query) {
        return _regenerator().w(function (_context46) {
          while (1) switch (_context46.n) {
            case 0:
              return _context46.a(2, this.post("users", {
                query: query
              }));
          }
        }, _callee46, this);
      }));
      function searchUsers(_x48) {
        return _searchUsers.apply(this, arguments);
      }
      return searchUsers;
    }() /** @param {string} query @returns {Promise<FurzonaGroup[]>} */)
  }, {
    key: "searchGroups",
    value: (function () {
      var _searchGroups = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee47(query) {
        return _regenerator().w(function (_context47) {
          while (1) switch (_context47.n) {
            case 0:
              return _context47.a(2, this.post("groups", {
                query: query
              }));
          }
        }, _callee47, this);
      }));
      function searchGroups(_x49) {
        return _searchGroups.apply(this, arguments);
      }
      return searchGroups;
    }()
    /**
     * Verify a code sent to the account email (password reset/email confirmation).
     * @param {string} code
     * @returns {Promise<boolean>}
     */
    )
  }, {
    key: "verifyEmail",
    value: (function () {
      var _verifyEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee48(code) {
        return _regenerator().w(function (_context48) {
          while (1) switch (_context48.n) {
            case 0:
              return _context48.a(2, this.post("verifyEmail", {
                code: code
              }));
          }
        }, _callee48, this);
      }));
      function verifyEmail(_x50) {
        return _verifyEmail.apply(this, arguments);
      }
      return verifyEmail;
    }())
  }, {
    key: "token",
    get: function get() {
      if (!this._token && localStorage) this._token = localStorage.getItem("token");
      return this._token;
    },
    set: function set(token) {
      if (!token) throw new Error("Tried to assign an empty token.");
      this._token = token;
      if (localStorage) localStorage.setItem("token", token);
    }
  }, {
    key: "user",
    get: /** The signed-in Furzona user (from /login), or null when logged out. */
    function get() {
      if (!this._user) {
        try {
          /** @type {FurzonaUser|null} */
          var raw = localStorage.getItem("currentUser");
          if (raw) this._user = JSON.parse(raw);
        } catch (error) {
          this._user = null;
        }
      }
      return this._user;
    }

    /** @param {string} path */,
    set: function set(user) {
      this._user = user;
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("currentUser");
      }
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
    get: function get() {
      return !!this.token;
    }
  }]);
}(RequestService);
var furzona = new Furzona();
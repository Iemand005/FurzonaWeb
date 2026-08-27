"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
/**
 * @param {string} str 
 * @param {string} suffix 
 */
function endsWith(str, suffix) {
  return str.slice(-suffix.length) === suffix;
}
function goHome() {
  window.location.href = "index.html";
}

/** @param {*} ex @param {string} respTxt  */
function displayError(ex, respTxt) {
  // console.error(ex);

  var errorContainer = document.getElementById('error-container');
  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.id = "error-container";
    document.body.appendChild(errorContainer);
  }
  errorContainer.innerHTML = respTxt;
  return;
}
var apiUrl = "https://api.furzona.app/";
var FurzonaError = /*#__PURE__*/function (_Error) {
  /**
   * @param {string} message
   * @param {number} code
   * @param {number} status
   */
  function FurzonaError(message, code, status) {
    var _this;
    _classCallCheck(this, FurzonaError);
    _this = _callSuper(this, FurzonaError, [message]);
    _this.code = code;
    _this.status = status;
    return _this;
  }
  _inherits(FurzonaError, _Error);
  return _createClass(FurzonaError, [{
    key: "log",
    value: function log() {
      console.error("Error: ".concat(this.message, " (Code: ").concat(this.code, ", status: ").concat(this.status, ")"));
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(Error));
var RequestService = /*#__PURE__*/function () {
  function RequestService() {
    _classCallCheck(this, RequestService);
    /** @type {string?} */
    this._token = null;
  }

  /** @type {ApiRequestFn} */
  return _createClass(RequestService, [{
    key: "request",
    value: (function () {
      var _request = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(endpoint) {
        var method,
          body,
          init,
          error,
          response,
          retryAfter,
          respTxt,
          respObj,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
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

              /** @type {FurzonaError?} */
              error = null;
              _context.p = 1;
              _context.n = 2;
              return fetch(apiUrl + (endpoint instanceof Array ? endpoint.join("/") : endpoint), init);
            case 2:
              response = _context.v;
              if (!response.ok) {
                _context.n = 3;
                break;
              }
              return _context.a(2, response.json().then(function (r) {
                return r.result;
              }));
            case 3:
              if (response.status === 429) {
                retryAfter = response.headers.get('Retry-After');
                console.warn("Rate limited, pls retri aftr", retryAfter);
              }
              _context.n = 4;
              return response.text();
            case 4:
              respTxt = _context.v;
              /** @type {FurzonaErrorResponse?} */
              respObj = null;
              try {
                respObj = JSON.parse(respTxt);
              } catch (ex) {
                displayError(ex, respTxt);
              }
              if (!respObj) respObj = {
                error: "Empty JSON response from server, unkown error!",
                errorCode: -1
              };
              if (respObj.errorCode === 5 && this._token) {
                this.logout();
              }
              error = new FurzonaError(respObj.error, respObj.errorCode, response.status);
              error.log();
              _context.n = 6;
              break;
            case 5:
              _context.p = 5;
              _t = _context.v;
              console.error("It did throw! see:?? ", _t);
              if (_t instanceof Error) error = new FurzonaError(_t.message, -2, 429);
            case 6:
              throw error;
            case 7:
              return _context.a(2);
          }
        }, _callee, this, [[1, 5]]);
      }));
      function request(_x) {
        return _request.apply(this, arguments);
      }
      return request;
    }() /** @type {ApiSafeRequestFn} */)
  }, {
    key: "requestWithCare",
    value: (function () {
      var _requestWithCare = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(endpoint) {
        var method,
          body,
          attempt,
          maxRetries,
          baseDelay,
          delayMs,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              method = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : "GET";
              body = _args2.length > 2 ? _args2[2] : undefined;
              attempt = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : 0;
              maxRetries = 5;
              baseDelay = 200;
              _context2.p = 1;
              _context2.n = 2;
              return this.request(endpoint, method, body);
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              if (_t2 instanceof FurzonaError) {
                _context2.n = 4;
                break;
              }
              throw new FurzonaError("Uhm I don't even know man", -1, 0);
            case 4:
              if (!(_t2.status !== 429 || attempt >= maxRetries)) {
                _context2.n = 5;
                break;
              }
              throw _t2;
            case 5:
              delayMs = baseDelay * Math.pow(2, attempt);
              _context2.n = 6;
              return this.delay(delayMs);
            case 6:
              return _context2.a(2, this.requestWithCare(endpoint, method, body, attempt + 1));
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function requestWithCare(_x2) {
        return _requestWithCare.apply(this, arguments);
      }
      return requestWithCare;
    }() /** @param {number} ms */)
  }, {
    key: "delay",
    value: (function () {
      var _delay = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(ms) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              return _context3.a(2, new Promise(function (resolve) {
                return setTimeout(resolve, ms);
              }));
          }
        }, _callee3);
      }));
      function delay(_x3) {
        return _delay.apply(this, arguments);
      }
      return delay;
    }() /** @type {ReadEndpointFn} */)
  }, {
    key: "get",
    value: (function () {
      var _get = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(endpoint) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              return _context4.a(2, this.request(endpoint));
          }
        }, _callee4, this);
      }));
      function get(_x4) {
        return _get.apply(this, arguments);
      }
      return get;
    }() /** @type {WriteEndpointFn} */)
  }, {
    key: "put",
    value: (function () {
      var _put = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(endpoint, body) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              return _context5.a(2, this.request(endpoint, "PUT", body));
          }
        }, _callee5, this);
      }));
      function put(_x5, _x6) {
        return _put.apply(this, arguments);
      }
      return put;
    }() /** @type {WriteEndpointFn} */)
  }, {
    key: "post",
    value: (function () {
      var _post = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(endpoint, body) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              return _context6.a(2, this.request(endpoint, "POST", body));
          }
        }, _callee6, this);
      }));
      function post(_x7, _x8) {
        return _post.apply(this, arguments);
      }
      return post;
    }() /** @type {ReadEndpointFn} */)
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(endpoint) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              return _context7.a(2, {});
          }
        }, _callee7);
      }));
      function _delete(_x9) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
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
    key: "logout",
    value: function logout() {
      if (localStorage) localStorage.removeItem("token");
      this._token = null;
    }
  }]);
}();
var Furzona = /*#__PURE__*/function (_RequestService) {
  function Furzona() {
    var _this2;
    _classCallCheck(this, Furzona);
    _this2 = _callSuper(this, Furzona);
    _this2._contentUrl = "https://content.furzona.app/";
    /** @type {FurzonaUser?} */
    _this2._user = null;
    console.log("Is Logged In ", _this2.isLoggedIn);
    return _this2;
  }
  _inherits(Furzona, _RequestService);
  return _createClass(Furzona, [{
    key: "loadSettings",
    value: function () {
      var _loadSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var settings;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _context8.n = 1;
              return this.getSettings();
            case 1:
              settings = _context8.v;
              this._contentUrl = settings.contentUrl;
              return _context8.a(2, settings);
          }
        }, _callee8, this);
      }));
      function loadSettings() {
        return _loadSettings.apply(this, arguments);
      }
      return loadSettings;
    }()
  }, {
    key: "getSettings",
    value: function () {
      var _getSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              return _context9.a(2, this.get("settings"));
          }
        }, _callee9, this);
      }));
      function getSettings() {
        return _getSettings.apply(this, arguments);
      }
      return getSettings;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(/** @type {string} */email, /** @type {string} */password) {
        var response;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              _context0.n = 1;
              return this.post("login", {
                email: email,
                password: password
              });
            case 1:
              response = _context0.v;
              this.token = response.s;
              this.user = response;
              return _context0.a(2, response);
          }
        }, _callee0, this);
      }));
      function login(_x0, _x1) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "getPosts",
    value: function () {
      var _getPosts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var date,
          category,
          _args1 = arguments;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              date = _args1.length > 0 && _args1[0] !== undefined ? _args1[0] : 0;
              /** @type {string} */category = _args1.length > 1 ? _args1[1] : undefined;
              if (category) {
                _context1.n = 1;
                break;
              }
              return _context1.a(2, this.post("posts", date ? {
                date: date
              } : {}));
            case 1:
              return _context1.a(2, this.post("posts", {
                date: date || undefined,
                category: category
              }));
          }
        }, _callee1, this);
      }));
      function getPosts() {
        return _getPosts.apply(this, arguments);
      }
      return getPosts;
    }()
  }, {
    key: "getUserPosts",
    value: function () {
      var _getUserPosts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(/** @type {string} */userId) {
        var date,
          category,
          _args10 = arguments;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              date = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 0;
              /** @type {string} */category = _args10.length > 2 ? _args10[2] : undefined;
              return _context10.a(2, this.post(["posts", userId], {
                date: date || undefined,
                category: category
              }));
          }
        }, _callee10, this);
      }));
      function getUserPosts(_x10) {
        return _getUserPosts.apply(this, arguments);
      }
      return getUserPosts;
    }()
  }, {
    key: "createPost",
    value: function () {
      var _createPost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(/** @type {PostType} */type) {
        var fields,
          _args11 = arguments;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              fields = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
              return _context11.a(2, this.post("post", _objectSpread({
                type: type
              }, fields)));
          }
        }, _callee11, this);
      }));
      function createPost(_x11) {
        return _createPost.apply(this, arguments);
      }
      return createPost;
    }()
  }, {
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(/** @type {string} */email, /** @type {string} */password) {
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              return _context12.a(2, this.post("user", {
                email: email,
                password: password,
                gte16: true
              }));
          }
        }, _callee12, this);
      }));
      function createUser(_x12, _x13) {
        return _createUser.apply(this, arguments);
      }
      return createUser;
    }()
  }, {
    key: "getProfile",
    value: function () {
      var _getProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(/** @type {string} */id) {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              return _context13.a(2, this.get(["profile", id]));
          }
        }, _callee13, this);
      }));
      function getProfile(_x14) {
        return _getProfile.apply(this, arguments);
      }
      return getProfile;
    }()
  }, {
    key: "getPost",
    value: function () {
      var _getPost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(/** @type {string} */id) {
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              return _context14.a(2, this.get(["post", id]));
          }
        }, _callee14, this);
      }));
      function getPost(_x15) {
        return _getPost.apply(this, arguments);
      }
      return getPost;
    }()
  }, {
    key: "likePost",
    value: function () {
      var _likePost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(/** @type {string} */post) {
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              return _context15.a(2, this.post("favorite", {
                post: post
              }));
          }
        }, _callee15, this);
      }));
      function likePost(_x16) {
        return _likePost.apply(this, arguments);
      }
      return likePost;
    }()
  }, {
    key: "unlikePost",
    value: function () {
      var _unlikePost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(/** @type {string} */post) {
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              return _context16.a(2, this.post("unfavorite", {
                post: post
              }));
          }
        }, _callee16, this);
      }));
      function unlikePost(_x17) {
        return _unlikePost.apply(this, arguments);
      }
      return unlikePost;
    }()
  }, {
    key: "likeComment",
    value: function () {
      var _likeComment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(/** @type {string} */comment) {
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              return _context17.a(2, this.post("likeComment", {
                comment: comment
              }));
          }
        }, _callee17, this);
      }));
      function likeComment(_x18) {
        return _likeComment.apply(this, arguments);
      }
      return likeComment;
    }()
  }, {
    key: "unlikeComment",
    value: function () {
      var _unlikeComment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(/** @type {string} */comment) {
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              return _context18.a(2, this.post("unlikeComment", {
                comment: comment
              }));
          }
        }, _callee18, this);
      }));
      function unlikeComment(_x19) {
        return _unlikeComment.apply(this, arguments);
      }
      return unlikeComment;
    }()
  }, {
    key: "getComments",
    value: function () {
      var _getComments = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(/** @type {string} */post) {
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              return _context19.a(2, this.post(["commentLevels", post]));
          }
        }, _callee19, this);
      }));
      function getComments(_x20) {
        return _getComments.apply(this, arguments);
      }
      return getComments;
    }()
  }, {
    key: "createComment",
    value: function () {
      var _createComment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(/** @type {string} */post, /** @type {string} */content) {
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              return _context20.a(2, this.post("comment", {
                post: post,
                content: content
              }));
          }
        }, _callee20, this);
      }));
      function createComment(_x21, _x22) {
        return _createComment.apply(this, arguments);
      }
      return createComment;
    }()
  }, {
    key: "follow",
    value: function () {
      var _follow = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(/** @type {string} */userId) {
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              return _context21.a(2, this.post("follow", {
                userId: userId
              }));
          }
        }, _callee21, this);
      }));
      function follow(_x23) {
        return _follow.apply(this, arguments);
      }
      return follow;
    }()
  }, {
    key: "unfollow",
    value: function () {
      var _unfollow = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(/** @type {string} */userId) {
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              return _context22.a(2, this.post("unfollow", {
                userId: userId
              }));
          }
        }, _callee22, this);
      }));
      function unfollow(_x24) {
        return _unfollow.apply(this, arguments);
      }
      return unfollow;
    }()
  }, {
    key: "block",
    value: function () {
      var _block = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(/** @type {string} */userId) {
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              return _context23.a(2, this.post("block", {
                user: userId
              }));
          }
        }, _callee23, this);
      }));
      function block(_x25) {
        return _block.apply(this, arguments);
      }
      return block;
    }()
  }, {
    key: "unblock",
    value: function () {
      var _unblock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(/** @type {string} */userId) {
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              return _context24.a(2, this.post("unblock", {
                user: userId
              }));
          }
        }, _callee24, this);
      }));
      function unblock(_x26) {
        return _unblock.apply(this, arguments);
      }
      return unblock;
    }()
  }, {
    key: "banUser",
    value: function () {
      var _banUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(/** @type {string} */userId, /** @type {string} */reason, /** @type {number} */period) {
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              return _context25.a(2, this.post("ban", {
                userId: userId,
                reason: reason,
                period: period
              }));
          }
        }, _callee25, this);
      }));
      function banUser(_x27, _x28, _x29) {
        return _banUser.apply(this, arguments);
      }
      return banUser;
    }()
  }, {
    key: "unbanUser",
    value: function () {
      var _unbanUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(/** @type {string} */userId) {
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              return _context26.a(2, this.post("unban", {
                userId: userId
              }));
          }
        }, _callee26, this);
      }));
      function unbanUser(_x30) {
        return _unbanUser.apply(this, arguments);
      }
      return unbanUser;
    }()
  }, {
    key: "getUser",
    value: function () {
      var _getUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(/** @type {string} */id) {
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              return _context27.a(2, this.get(["user", id]));
          }
        }, _callee27, this);
      }));
      function getUser(_x31) {
        return _getUser.apply(this, arguments);
      }
      return getUser;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(/** @type {string} */q) {
        var opts,
          _args28 = arguments;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.n) {
            case 0:
              opts = _args28.length > 1 && _args28[1] !== undefined ? _args28[1] : {};
              return _context28.a(2, this.post("search", _objectSpread({
                q: q,
                nsfw: 0,
                hidden: 0,
                catSelector: 0,
                warnSelector: 0,
                nsfwSelector: 0
              }, opts)));
          }
        }, _callee28, this);
      }));
      function search(_x32) {
        return _search.apply(this, arguments);
      }
      return search;
    }()
  }, {
    key: "forgotPassword",
    value: function () {
      var _forgotPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(/** @type {string} */email) {
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              return _context29.a(2, this.post("forgotPassword", {
                email: email
              }));
          }
        }, _callee29, this);
      }));
      function forgotPassword(_x33) {
        return _forgotPassword.apply(this, arguments);
      }
      return forgotPassword;
    }() /** @param {string} [userId] */
  }, {
    key: "getFollowers",
    value: (function () {
      var _getFollowers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(/** @type {string} */userId) {
        var _this$user;
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.n) {
            case 0:
              if (!userId) userId = (_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.id;
              if (userId) {
                _context30.n = 1;
                break;
              }
              throw new Error("User ID invalid!");
            case 1:
              return _context30.a(2, this.post("followers", {
                userId: userId
              }));
          }
        }, _callee30, this);
      }));
      function getFollowers(_x34) {
        return _getFollowers.apply(this, arguments);
      }
      return getFollowers;
    }())
  }, {
    key: "getFollowing",
    value: function () {
      var _getFollowing = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(/** @type {string} */userId) {
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.n) {
            case 0:
              return _context31.a(2, this.post("following", {
                userId: userId
              }));
          }
        }, _callee31, this);
      }));
      function getFollowing(_x35) {
        return _getFollowing.apply(this, arguments);
      }
      return getFollowing;
    }()
  }, {
    key: "deletePost",
    value: function () {
      var _deletePost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(/** @type {string} */id) {
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.n) {
            case 0:
              return _context32.a(2, this.delete(["post", id]));
          }
        }, _callee32, this);
      }));
      function deletePost(_x36) {
        return _deletePost.apply(this, arguments);
      }
      return deletePost;
    }()
  }, {
    key: "updatePost",
    value: function () {
      var _updatePost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(/** @type {string} */id, /** @type {CreatePostRequest} */fields) {
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.n) {
            case 0:
              return _context33.a(2, this.put(["post", id], fields));
          }
        }, _callee33, this);
      }));
      function updatePost(_x37, _x38) {
        return _updatePost.apply(this, arguments);
      }
      return updatePost;
    }()
  }, {
    key: "deleteComment",
    value: function () {
      var _deleteComment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(/** @type {string} */id) {
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.n) {
            case 0:
              return _context34.a(2, this.delete(["comment", id]));
          }
        }, _callee34, this);
      }));
      function deleteComment(_x39) {
        return _deleteComment.apply(this, arguments);
      }
      return deleteComment;
    }()
  }, {
    key: "getNotifications",
    value: function () {
      var _getNotifications = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35() {
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.n) {
            case 0:
              return _context35.a(2, this.post("notifications"));
          }
        }, _callee35, this);
      }));
      function getNotifications() {
        return _getNotifications.apply(this, arguments);
      }
      return getNotifications;
    }()
  }, {
    key: "getNotificationData",
    value: function () {
      var _getNotificationData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(/** @type {string} */id) {
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.n) {
            case 0:
              return _context36.a(2, this.get(["data", id]));
          }
        }, _callee36, this);
      }));
      function getNotificationData(_x40) {
        return _getNotificationData.apply(this, arguments);
      }
      return getNotificationData;
    }()
  }, {
    key: "getChats",
    value: function () {
      var _getChats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37() {
        return _regenerator().w(function (_context37) {
          while (1) switch (_context37.n) {
            case 0:
              return _context37.a(2, this.post("chats"));
          }
        }, _callee37, this);
      }));
      function getChats() {
        return _getChats.apply(this, arguments);
      }
      return getChats;
    }()
  }, {
    key: "startChat",
    value: function () {
      var _startChat = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38(/** @type {string} */userId) {
        return _regenerator().w(function (_context38) {
          while (1) switch (_context38.n) {
            case 0:
              return _context38.a(2, this.post("chat", {
                userId: userId
              }));
          }
        }, _callee38, this);
      }));
      function startChat(_x41) {
        return _startChat.apply(this, arguments);
      }
      return startChat;
    }()
  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee39(/** @type {string} */text, /** @type {string} */chat) {
        return _regenerator().w(function (_context39) {
          while (1) switch (_context39.n) {
            case 0:
              return _context39.a(2, this.post("message", chat ? {
                text: text,
                chat: chat
              } : {
                text: text
              }));
          }
        }, _callee39, this);
      }));
      function sendMessage(_x42, _x43) {
        return _sendMessage.apply(this, arguments);
      }
      return sendMessage;
    }()
  }, {
    key: "muteChat",
    value: function () {
      var _muteChat = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee40(/** @type {string} */chat) {
        return _regenerator().w(function (_context40) {
          while (1) switch (_context40.n) {
            case 0:
              return _context40.a(2, this.post("mute", {
                chat: chat
              }));
          }
        }, _callee40, this);
      }));
      function muteChat(_x44) {
        return _muteChat.apply(this, arguments);
      }
      return muteChat;
    }()
  }, {
    key: "unmuteChat",
    value: function () {
      var _unmuteChat = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee41(/** @type {string} */chat) {
        return _regenerator().w(function (_context41) {
          while (1) switch (_context41.n) {
            case 0:
              return _context41.a(2, this.post("unmute", {
                chat: chat
              }));
          }
        }, _callee41, this);
      }));
      function unmuteChat(_x45) {
        return _unmuteChat.apply(this, arguments);
      }
      return unmuteChat;
    }()
  }, {
    key: "sendTyping",
    value: function () {
      var _sendTyping = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee42(/** @type {string} */chat) {
        return _regenerator().w(function (_context42) {
          while (1) switch (_context42.n) {
            case 0:
              return _context42.a(2, this.post("chatTyping", {
                chat: chat
              }));
          }
        }, _callee42, this);
      }));
      function sendTyping(_x46) {
        return _sendTyping.apply(this, arguments);
      }
      return sendTyping;
    }()
  }, {
    key: "getGroupInfo",
    value: function () {
      var _getGroupInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee43(/** @type {string} */chat) {
        return _regenerator().w(function (_context43) {
          while (1) switch (_context43.n) {
            case 0:
              return _context43.a(2, this.post("groupInfo", {
                chat: chat
              }));
          }
        }, _callee43, this);
      }));
      function getGroupInfo(_x47) {
        return _getGroupInfo.apply(this, arguments);
      }
      return getGroupInfo;
    }()
  }, {
    key: "editGroup",
    value: function () {
      var _editGroup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee44(/** @type {string} */chat, /** @type {EditGroupRequest?} */fields) {
        return _regenerator().w(function (_context44) {
          while (1) switch (_context44.n) {
            case 0:
              return _context44.a(2, this.post("editGroup", _objectSpread({
                chat: chat
              }, fields)));
          }
        }, _callee44, this);
      }));
      function editGroup(_x48, _x49) {
        return _editGroup.apply(this, arguments);
      }
      return editGroup;
    }()
  }, {
    key: "subscribe",
    value: function () {
      var _subscribe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee45(/** @type {number} */type) {
        return _regenerator().w(function (_context45) {
          while (1) switch (_context45.n) {
            case 0:
              return _context45.a(2, this.post("subscribe", {
                type: type
              }));
          }
        }, _callee45, this);
      }));
      function subscribe(_x50) {
        return _subscribe.apply(this, arguments);
      }
      return subscribe;
    }()
  }, {
    key: "getBadges",
    value: function () {
      var _getBadges = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee46() {
        return _regenerator().w(function (_context46) {
          while (1) switch (_context46.n) {
            case 0:
              return _context46.a(2, this.get("badges"));
          }
        }, _callee46, this);
      }));
      function getBadges() {
        return _getBadges.apply(this, arguments);
      }
      return getBadges;
    }()
  }, {
    key: "upload",
    value: function () {
      var _upload = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee47(/** @type {FormData} */formData) {
        return _regenerator().w(function (_context47) {
          while (1) switch (_context47.n) {
            case 0:
              return _context47.a(2, this.request("upload", "POST", formData));
          }
        }, _callee47, this);
      }));
      function upload(_x51) {
        return _upload.apply(this, arguments);
      }
      return upload;
    }()
  }, {
    key: "deleteAccount",
    value: function () {
      var _deleteAccount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee48() {
        return _regenerator().w(function (_context48) {
          while (1) switch (_context48.n) {
            case 0:
              return _context48.a(2, this.delete("user"));
          }
        }, _callee48, this);
      }));
      function deleteAccount() {
        return _deleteAccount.apply(this, arguments);
      }
      return deleteAccount;
    }()
  }, {
    key: "searchUsers",
    value: function () {
      var _searchUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee49(/** @type {string} */query) {
        return _regenerator().w(function (_context49) {
          while (1) switch (_context49.n) {
            case 0:
              return _context49.a(2, this.post("users", {
                query: query
              }));
          }
        }, _callee49, this);
      }));
      function searchUsers(_x52) {
        return _searchUsers.apply(this, arguments);
      }
      return searchUsers;
    }()
  }, {
    key: "searchGroups",
    value: function () {
      var _searchGroups = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee50(/** @type {string} */query) {
        return _regenerator().w(function (_context50) {
          while (1) switch (_context50.n) {
            case 0:
              return _context50.a(2, this.post("groups", {
                query: query
              }));
          }
        }, _callee50, this);
      }));
      function searchGroups(_x53) {
        return _searchGroups.apply(this, arguments);
      }
      return searchGroups;
    }()
  }, {
    key: "verifyEmail",
    value: function () {
      var _verifyEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee51(/** @type {string} */code) {
        return _regenerator().w(function (_context51) {
          while (1) switch (_context51.n) {
            case 0:
              return _context51.a(2, this.post("verifyEmail", {
                code: code
              }));
          }
        }, _callee51, this);
      }));
      function verifyEmail(_x54) {
        return _verifyEmail.apply(this, arguments);
      }
      return verifyEmail;
    }()
  }, {
    key: "getLinkCode",
    value: function () {
      var _getLinkCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee52() {
        return _regenerator().w(function (_context52) {
          while (1) switch (_context52.n) {
            case 0:
              return _context52.a(2, this.post("linkCode", {
                appName: "FurzonaWeb",
                perms: "chats.info"
              }));
          }
        }, _callee52, this);
      }));
      function getLinkCode() {
        return _getLinkCode.apply(this, arguments);
      }
      return getLinkCode;
    }()
  }, {
    key: "getAlts",
    value: function () {
      var _getAlts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee53(/** @type {string} */userId, /** @type {number} */date) {
        return _regenerator().w(function (_context53) {
          while (1) switch (_context53.n) {
            case 0:
              return _context53.a(2, this.post("getAlts", date ? {
                userId: userId,
                date: date
              } : {
                userId: userId
              }));
          }
        }, _callee53, this);
      }));
      function getAlts(_x55, _x56) {
        return _getAlts.apply(this, arguments);
      }
      return getAlts;
    }()
  }, {
    key: "getAlts2",
    value: function () {
      var _getAlts2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee54(/** @type {string} */userId) {
        return _regenerator().w(function (_context54) {
          while (1) switch (_context54.n) {
            case 0:
              return _context54.a(2, this.post("getAlts2", {
                userId: userId
              }));
          }
        }, _callee54, this);
      }));
      function getAlts2(_x57) {
        return _getAlts2.apply(this, arguments);
      }
      return getAlts2;
    }()
  }, {
    key: "updateUser",
    value: function () {
      var _updateUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee55(/** @type {EditUserRequest} */fields) {
        return _regenerator().w(function (_context55) {
          while (1) switch (_context55.n) {
            case 0:
              return _context55.a(2, this.put("user", fields));
          }
        }, _callee55, this);
      }));
      function updateUser(_x58) {
        return _updateUser.apply(this, arguments);
      }
      return updateUser;
    }()
  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee56(/** @type {string} */password) {
        return _regenerator().w(function (_context56) {
          while (1) switch (_context56.n) {
            case 0:
              return _context56.a(2, this.put("password", {
                password: password
              }));
          }
        }, _callee56, this);
      }));
      function resetPassword(_x59) {
        return _resetPassword.apply(this, arguments);
      }
      return resetPassword;
    }()
  }, {
    key: "sendParentsConsent",
    value: function () {
      var _sendParentsConsent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee57(/** @type {string} */email, /** @type {string} */password) {
        return _regenerator().w(function (_context57) {
          while (1) switch (_context57.n) {
            case 0:
              return _context57.a(2, this.post("sendConsent", {
                email: email,
                password: password
              }));
          }
        }, _callee57, this);
      }));
      function sendParentsConsent(_x60, _x61) {
        return _sendParentsConsent.apply(this, arguments);
      }
      return sendParentsConsent;
    }()
  }, {
    key: "logoutDevices",
    value: function () {
      var _logoutDevices = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee58() {
        return _regenerator().w(function (_context58) {
          while (1) switch (_context58.n) {
            case 0:
              return _context58.a(2, this.post("clearLogin"));
          }
        }, _callee58, this);
      }));
      function logoutDevices() {
        return _logoutDevices.apply(this, arguments);
      }
      return logoutDevices;
    }()
  }, {
    key: "sendVerificationEmail",
    value: function () {
      var _sendVerificationEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee59() {
        return _regenerator().w(function (_context59) {
          while (1) switch (_context59.n) {
            case 0:
              return _context59.a(2, this.post("sendVerificationEmail"));
          }
        }, _callee59, this);
      }));
      function sendVerificationEmail() {
        return _sendVerificationEmail.apply(this, arguments);
      }
      return sendVerificationEmail;
    }()
  }, {
    key: "updateEmailVerified",
    value: function () {
      var _updateEmailVerified = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee60() {
        return _regenerator().w(function (_context60) {
          while (1) switch (_context60.n) {
            case 0:
              return _context60.a(2, this.post("isEmailVerified"));
          }
        }, _callee60, this);
      }));
      function updateEmailVerified() {
        return _updateEmailVerified.apply(this, arguments);
      }
      return updateEmailVerified;
    }()
  }, {
    key: "setOnline",
    value: function () {
      var _setOnline = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee61() {
        return _regenerator().w(function (_context61) {
          while (1) switch (_context61.n) {
            case 0:
              return _context61.a(2, this.get("setOnline"));
          }
        }, _callee61, this);
      }));
      function setOnline() {
        return _setOnline.apply(this, arguments);
      }
      return setOnline;
    }()
  }, {
    key: "setSafeModeView",
    value: function () {
      var _setSafeModeView = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee62(/** @type {boolean} */enabled) {
        return _regenerator().w(function (_context62) {
          while (1) switch (_context62.n) {
            case 0:
              return _context62.a(2, this.post("safeModeView", {
                enabled: enabled
              }));
          }
        }, _callee62, this);
      }));
      function setSafeModeView(_x62) {
        return _setSafeModeView.apply(this, arguments);
      }
      return setSafeModeView;
    }()
  }, {
    key: "asUser",
    value: function () {
      var _asUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee63(/** @type {string} */userId) {
        return _regenerator().w(function (_context63) {
          while (1) switch (_context63.n) {
            case 0:
              return _context63.a(2, this.get(["asUser", userId]));
          }
        }, _callee63, this);
      }));
      function asUser(_x63) {
        return _asUser.apply(this, arguments);
      }
      return asUser;
    }()
  }, {
    key: "ping",
    value: function () {
      var _ping = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee64() {
        return _regenerator().w(function (_context64) {
          while (1) switch (_context64.n) {
            case 0:
              return _context64.a(2, this.get("ping"));
          }
        }, _callee64, this);
      }));
      function ping() {
        return _ping.apply(this, arguments);
      }
      return ping;
    }()
  }, {
    key: "pong",
    value: function () {
      var _pong = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee65(/** @type {string} */id) {
        return _regenerator().w(function (_context65) {
          while (1) switch (_context65.n) {
            case 0:
              return _context65.a(2, this.get(["pong", id]));
          }
        }, _callee65, this);
      }));
      function pong(_x64) {
        return _pong.apply(this, arguments);
      }
      return pong;
    }()
  }, {
    key: "getServerAdminInfo",
    value: function () {
      var _getServerAdminInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee66() {
        return _regenerator().w(function (_context66) {
          while (1) switch (_context66.n) {
            case 0:
              return _context66.a(2, this.get("adminStatus"));
          }
        }, _callee66, this);
      }));
      function getServerAdminInfo() {
        return _getServerAdminInfo.apply(this, arguments);
      }
      return getServerAdminInfo;
    }()
  }, {
    key: "getAdminLogs",
    value: function () {
      var _getAdminLogs = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee67(/** @type {string} */query, /** @type {number} */date) {
        return _regenerator().w(function (_context67) {
          while (1) switch (_context67.n) {
            case 0:
              return _context67.a(2, this.post("adminLogs", {
                query: query || undefined,
                date: date || undefined
              }));
          }
        }, _callee67, this);
      }));
      function getAdminLogs(_x65, _x66) {
        return _getAdminLogs.apply(this, arguments);
      }
      return getAdminLogs;
    }()
  }, {
    key: "getModLogs",
    value: function () {
      var _getModLogs = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee68(/** @type {string} */query, /** @type {number} */date) {
        return _regenerator().w(function (_context68) {
          while (1) switch (_context68.n) {
            case 0:
              return _context68.a(2, this.post("modLogs", {
                query: query || undefined,
                date: date || undefined
              }));
          }
        }, _callee68, this);
      }));
      function getModLogs(_x67, _x68) {
        return _getModLogs.apply(this, arguments);
      }
      return getModLogs;
    }()
  }, {
    key: "sendServerCommand",
    value: function () {
      var _sendServerCommand = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee69(/** @type {string} */cmd) {
        return _regenerator().w(function (_context69) {
          while (1) switch (_context69.n) {
            case 0:
              return _context69.a(2, this.post("exec", {
                cmd: cmd
              }));
          }
        }, _callee69, this);
      }));
      function sendServerCommand(_x69) {
        return _sendServerCommand.apply(this, arguments);
      }
      return sendServerCommand;
    }()
  }, {
    key: "wipeSpecialPosts",
    value: function () {
      var _wipeSpecialPosts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee70() {
        return _regenerator().w(function (_context70) {
          while (1) switch (_context70.n) {
            case 0:
              return _context70.a(2, this.post("wipeSpecial"));
          }
        }, _callee70, this);
      }));
      function wipeSpecialPosts() {
        return _wipeSpecialPosts.apply(this, arguments);
      }
      return wipeSpecialPosts;
    }()
  }, {
    key: "cleanServer",
    value: function () {
      var _cleanServer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee71() {
        return _regenerator().w(function (_context71) {
          while (1) switch (_context71.n) {
            case 0:
              return _context71.a(2, this.get("cleanServer"));
          }
        }, _callee71, this);
      }));
      function cleanServer() {
        return _cleanServer.apply(this, arguments);
      }
      return cleanServer;
    }()
  }, {
    key: "getModUsers",
    value: function () {
      var _getModUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee72(/** @type {number} */date) {
        return _regenerator().w(function (_context72) {
          while (1) switch (_context72.n) {
            case 0:
              return _context72.a(2, this.post("modUsers", date ? {
                date: date
              } : {}));
          }
        }, _callee72, this);
      }));
      function getModUsers(_x70) {
        return _getModUsers.apply(this, arguments);
      }
      return getModUsers;
    }()
  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee73(/** @type {number} */type) {
        return _regenerator().w(function (_context73) {
          while (1) switch (_context73.n) {
            case 0:
              return _context73.a(2, this.post("unsubscribe", {
                type: type
              }));
          }
        }, _callee73, this);
      }));
      function unsubscribe(_x71) {
        return _unsubscribe.apply(this, arguments);
      }
      return unsubscribe;
    }()
  }, {
    key: "voteInPoll",
    value: function () {
      var _voteInPoll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee74(/** @type {string} */poll, /** @type {string[]} */options) {
        return _regenerator().w(function (_context74) {
          while (1) switch (_context74.n) {
            case 0:
              return _context74.a(2, this.post("submitPolls", {
                poll: poll,
                options: options
              }));
          }
        }, _callee74, this);
      }));
      function voteInPoll(_x72, _x73) {
        return _voteInPoll.apply(this, arguments);
      }
      return voteInPoll;
    }()
  }, {
    key: "viewPollResults",
    value: function () {
      var _viewPollResults = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee75(/** @type {string} */poll) {
        return _regenerator().w(function (_context75) {
          while (1) switch (_context75.n) {
            case 0:
              return _context75.a(2, this.post("viewPollResults", {
                poll: poll
              }));
          }
        }, _callee75, this);
      }));
      function viewPollResults(_x74) {
        return _viewPollResults.apply(this, arguments);
      }
      return viewPollResults;
    }()
  }, {
    key: "addModNote",
    value: function () {
      var _addModNote = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee76(/** @type {string} */userId, /** @type {string} */note) {
        return _regenerator().w(function (_context76) {
          while (1) switch (_context76.n) {
            case 0:
              return _context76.a(2, this.post("modNote", {
                userId: userId,
                note: note
              }));
          }
        }, _callee76, this);
      }));
      function addModNote(_x75, _x76) {
        return _addModNote.apply(this, arguments);
      }
      return addModNote;
    }()
  }, {
    key: "suspendUser",
    value: function () {
      var _suspendUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee77(/** @type {string} */userId, /** @type {string} */reason) {
        return _regenerator().w(function (_context77) {
          while (1) switch (_context77.n) {
            case 0:
              return _context77.a(2, this.post("suspendUser", {
                userId: userId,
                reason: reason
              }));
          }
        }, _callee77, this);
      }));
      function suspendUser(_x77, _x78) {
        return _suspendUser.apply(this, arguments);
      }
      return suspendUser;
    }()
  }, {
    key: "getBans",
    value: function () {
      var _getBans = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee78(/** @type {string} */userId) {
        return _regenerator().w(function (_context78) {
          while (1) switch (_context78.n) {
            case 0:
              return _context78.a(2, this.get(["bans", userId]));
          }
        }, _callee78, this);
      }));
      function getBans(_x79) {
        return _getBans.apply(this, arguments);
      }
      return getBans;
    }()
  }, {
    key: "purgeUserPosts",
    value: function () {
      var _purgeUserPosts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee79(/** @type {string} */userId) {
        return _regenerator().w(function (_context79) {
          while (1) switch (_context79.n) {
            case 0:
              return _context79.a(2, this.post("purge", {
                user: userId
              }));
          }
        }, _callee79, this);
      }));
      function purgeUserPosts(_x80) {
        return _purgeUserPosts.apply(this, arguments);
      }
      return purgeUserPosts;
    }()
  }, {
    key: "deleteAllComments",
    value: function () {
      var _deleteAllComments = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee80(/** @type {string} */userId) {
        return _regenerator().w(function (_context80) {
          while (1) switch (_context80.n) {
            case 0:
              return _context80.a(2, this.post("deleteAllComments", {
                user: userId
              }));
          }
        }, _callee80, this);
      }));
      function deleteAllComments(_x81) {
        return _deleteAllComments.apply(this, arguments);
      }
      return deleteAllComments;
    }()
  }, {
    key: "getProfileByUsername",
    value: function () {
      var _getProfileByUsername = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee81(/** @type {string} */username) {
        return _regenerator().w(function (_context81) {
          while (1) switch (_context81.n) {
            case 0:
              return _context81.a(2, this.get(["profileUsername", username.split(".").join("-")]));
          }
        }, _callee81, this);
      }));
      function getProfileByUsername(_x82) {
        return _getProfileByUsername.apply(this, arguments);
      }
      return getProfileByUsername;
    }()
  }, {
    key: "removePfp",
    value: function () {
      var _removePfp = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee82(/** @type {string} */userId) {
        return _regenerator().w(function (_context82) {
          while (1) switch (_context82.n) {
            case 0:
              return _context82.a(2, this.get(["removePfp", userId]));
          }
        }, _callee82, this);
      }));
      function removePfp(_x83) {
        return _removePfp.apply(this, arguments);
      }
      return removePfp;
    }()
  }, {
    key: "removeBanner",
    value: function () {
      var _removeBanner = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee83(/** @type {string} */userId) {
        return _regenerator().w(function (_context83) {
          while (1) switch (_context83.n) {
            case 0:
              return _context83.a(2, this.get(["removeBanner", userId]));
          }
        }, _callee83, this);
      }));
      function removeBanner(_x84) {
        return _removeBanner.apply(this, arguments);
      }
      return removeBanner;
    }()
  }, {
    key: "resetUsername",
    value: function () {
      var _resetUsername = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee84(/** @type {string} */userId) {
        return _regenerator().w(function (_context84) {
          while (1) switch (_context84.n) {
            case 0:
              return _context84.a(2, this.get(["resetUsername", userId]));
          }
        }, _callee84, this);
      }));
      function resetUsername(_x85) {
        return _resetUsername.apply(this, arguments);
      }
      return resetUsername;
    }()
  }, {
    key: "removeDescription",
    value: function () {
      var _removeDescription = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee85(/** @type {string} */userId) {
        return _regenerator().w(function (_context85) {
          while (1) switch (_context85.n) {
            case 0:
              return _context85.a(2, this.get(["removeDesc", userId]));
          }
        }, _callee85, this);
      }));
      function removeDescription(_x86) {
        return _removeDescription.apply(this, arguments);
      }
      return removeDescription;
    }()
  }, {
    key: "toggleUserSafeMode",
    value: function () {
      var _toggleUserSafeMode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee86(/** @type {string} */userId) {
        return _regenerator().w(function (_context86) {
          while (1) switch (_context86.n) {
            case 0:
              return _context86.a(2, this.post("safeMode", {
                userId: userId
              }));
          }
        }, _callee86, this);
      }));
      function toggleUserSafeMode(_x87) {
        return _toggleUserSafeMode.apply(this, arguments);
      }
      return toggleUserSafeMode;
    }()
  }, {
    key: "changeTag",
    value: function () {
      var _changeTag = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee87(/** @type {string} */userId, /** @type {string} */tag) {
        return _regenerator().w(function (_context87) {
          while (1) switch (_context87.n) {
            case 0:
              return _context87.a(2, this.post("changeTag", {
                user: userId,
                tag: tag
              }));
          }
        }, _callee87, this);
      }));
      function changeTag(_x88, _x89) {
        return _changeTag.apply(this, arguments);
      }
      return changeTag;
    }()
  }, {
    key: "changePermLevel",
    value: function () {
      var _changePermLevel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee88(/** @type {string} */userId, /** @type {PermissionLevel} */permLevel) {
        return _regenerator().w(function (_context88) {
          while (1) switch (_context88.n) {
            case 0:
              return _context88.a(2, this.post("changePermLevel", {
                user: userId,
                permLevel: permLevel
              }));
          }
        }, _callee88, this);
      }));
      function changePermLevel(_x90, _x91) {
        return _changePermLevel.apply(this, arguments);
      }
      return changePermLevel;
    }()
  }, {
    key: "verifyEmailAdmin",
    value: function () {
      var _verifyEmailAdmin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee89(/** @type {string} */userId) {
        return _regenerator().w(function (_context89) {
          while (1) switch (_context89.n) {
            case 0:
              return _context89.a(2, this.post("verifyEmailAdmin", {
                userId: userId
              }));
          }
        }, _callee89, this);
      }));
      function verifyEmailAdmin(_x92) {
        return _verifyEmailAdmin.apply(this, arguments);
      }
      return verifyEmailAdmin;
    }()
  }, {
    key: "resetIps",
    value: function () {
      var _resetIps = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee90(/** @type {string} */userId) {
        return _regenerator().w(function (_context90) {
          while (1) switch (_context90.n) {
            case 0:
              return _context90.a(2, this.post("resetIps", {
                userId: userId
              }));
          }
        }, _callee90, this);
      }));
      function resetIps(_x93) {
        return _resetIps.apply(this, arguments);
      }
      return resetIps;
    }()
  }, {
    key: "awardPoints",
    value: function () {
      var _awardPoints = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee91(/** @type {string} */userId, /** @type {number} */points) {
        return _regenerator().w(function (_context91) {
          while (1) switch (_context91.n) {
            case 0:
              return _context91.a(2, this.post("award", {
                userId: userId,
                points: points
              }));
          }
        }, _callee91, this);
      }));
      function awardPoints(_x94, _x95) {
        return _awardPoints.apply(this, arguments);
      }
      return awardPoints;
    }()
  }, {
    key: "reportPost",
    value: function () {
      var _reportPost = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee92(/** @type {string} */post, /** @type {string} */reason) {
        var attachments,
          _args92 = arguments;
        return _regenerator().w(function (_context92) {
          while (1) switch (_context92.n) {
            case 0:
              attachments = _args92.length > 2 && _args92[2] !== undefined ? _args92[2] : [];
              return _context92.a(2, this.post("report", {
                post: post,
                reason: reason,
                attachments: attachments
              }));
          }
        }, _callee92, this);
      }));
      function reportPost(_x96, _x97) {
        return _reportPost.apply(this, arguments);
      }
      return reportPost;
    }()
  }, {
    key: "reportComment",
    value: function () {
      var _reportComment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee93(/** @type {string} */comment, /** @type {string} */reason) {
        var attachments,
          _args93 = arguments;
        return _regenerator().w(function (_context93) {
          while (1) switch (_context93.n) {
            case 0:
              attachments = _args93.length > 2 && _args93[2] !== undefined ? _args93[2] : [];
              return _context93.a(2, this.post("report", {
                comment: comment,
                reason: reason,
                attachments: attachments
              }));
          }
        }, _callee93, this);
      }));
      function reportComment(_x98, _x99) {
        return _reportComment.apply(this, arguments);
      }
      return reportComment;
    }()
  }, {
    key: "reportUser",
    value: function () {
      var _reportUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee94(/** @type {string} */user, /** @type {string} */reason) {
        var attachments,
          _args94 = arguments;
        return _regenerator().w(function (_context94) {
          while (1) switch (_context94.n) {
            case 0:
              attachments = _args94.length > 2 && _args94[2] !== undefined ? _args94[2] : [];
              return _context94.a(2, this.post("report", {
                user: user,
                reason: reason,
                attachments: attachments
              }));
          }
        }, _callee94, this);
      }));
      function reportUser(_x100, _x101) {
        return _reportUser.apply(this, arguments);
      }
      return reportUser;
    }()
  }, {
    key: "claimReport",
    value: function () {
      var _claimReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee95(/** @type {string} */id) {
        return _regenerator().w(function (_context95) {
          while (1) switch (_context95.n) {
            case 0:
              return _context95.a(2, this.get(["assignReport", id]));
          }
        }, _callee95, this);
      }));
      function claimReport(_x102) {
        return _claimReport.apply(this, arguments);
      }
      return claimReport;
    }()
  }, {
    key: "isReportReviewed",
    value: function () {
      var _isReportReviewed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee96(/** @type {string} */id) {
        return _regenerator().w(function (_context96) {
          while (1) switch (_context96.n) {
            case 0:
              return _context96.a(2, this.get(["reviewed", id]));
          }
        }, _callee96, this);
      }));
      function isReportReviewed(_x103) {
        return _isReportReviewed.apply(this, arguments);
      }
      return isReportReviewed;
    }()
  }, {
    key: "getPostReports",
    value: function () {
      var _getPostReports = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee97() {
        return _regenerator().w(function (_context97) {
          while (1) switch (_context97.n) {
            case 0:
              return _context97.a(2, this.get("postReports"));
          }
        }, _callee97, this);
      }));
      function getPostReports() {
        return _getPostReports.apply(this, arguments);
      }
      return getPostReports;
    }()
  }, {
    key: "getCommentReports",
    value: function () {
      var _getCommentReports = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee98() {
        return _regenerator().w(function (_context98) {
          while (1) switch (_context98.n) {
            case 0:
              return _context98.a(2, this.get("commentReports"));
          }
        }, _callee98, this);
      }));
      function getCommentReports() {
        return _getCommentReports.apply(this, arguments);
      }
      return getCommentReports;
    }()
  }, {
    key: "getUserReports",
    value: function () {
      var _getUserReports = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee99() {
        return _regenerator().w(function (_context99) {
          while (1) switch (_context99.n) {
            case 0:
              return _context99.a(2, this.get("userReports"));
          }
        }, _callee99, this);
      }));
      function getUserReports() {
        return _getUserReports.apply(this, arguments);
      }
      return getUserReports;
    }()
  }, {
    key: "getAllReports",
    value: function () {
      var _getAllReports = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee100(/** @type {number} */date) {
        return _regenerator().w(function (_context100) {
          while (1) switch (_context100.n) {
            case 0:
              return _context100.a(2, this.post("allReports", date ? {
                date: date
              } : {}));
          }
        }, _callee100, this);
      }));
      function getAllReports(_x104) {
        return _getAllReports.apply(this, arguments);
      }
      return getAllReports;
    }()
    /**
     * Search posts and users. Accepts a plain query string or an options object
     * mirroring the official Android client's search body.
     * @param {string|NewSearchRequest} queryOrOptions
     * @returns {Promise<FurzonaNewSearchResult>}
     */
  }, {
    key: "newSearch",
    value: (function () {
      var _newSearch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee101(queryOrOptions) {
        var options, body;
        return _regenerator().w(function (_context101) {
          while (1) switch (_context101.n) {
            case 0:
              /** @type {NewSearchRequest} */
              options = typeof queryOrOptions === "string" ? {
                query: queryOrOptions
              } : queryOrOptions || {};
              body = {
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
              return _context101.a(2, this.post("newSearch", body));
          }
        }, _callee101, this);
      }));
      function newSearch(_x105) {
        return _newSearch.apply(this, arguments);
      }
      return newSearch;
    }()
    /**
     * @param {string} endpoint
     * @returns {Promise<Method[]>}
     */
    )
  }, {
    key: "probeBlast",
    value: (function () {
      var _probeBlast = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee102(endpoint) {
        var _this3 = this;
        var methods;
        return _regenerator().w(function (_context102) {
          while (1) switch (_context102.n) {
            case 0:
              /** @type {Method[]} */
              methods = ["GET", "POST", "PUT"];
              return _context102.a(2, Promise.all(methods.map(function (method) {
                return _this3.requestWithCare(endpoint, method).then(function () {
                  return {
                    method: method,
                    success: true
                  };
                }).catch(function (/**@type {FurzonaError}*/reason) {
                  return {
                    method: method,
                    success: reason.status !== 429 && reason.code !== -1
                  };
                });
              })).then(function (results) {
                return results.filter(function (r) {
                  return r.success;
                }).map(function (v) {
                  return v.method;
                });
              }));
          }
        }, _callee102);
      }));
      function probeBlast(_x106) {
        return _probeBlast.apply(this, arguments);
      }
      return probeBlast;
    }()
    /**
     * @param {string} endpoint
     * @returns {Promise<Method[]>}
     */
    )
  }, {
    key: "probe",
    value: (function () {
      var _probe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee103(endpoint) {
        var methods, successful, _i, _methods, method, success, _t3;
        return _regenerator().w(function (_context103) {
          while (1) switch (_context103.p = _context103.n) {
            case 0:
              /** @type {Method[]} */
              methods = ["GET", "POST", "PUT"];
              /** @type {Method[]} */
              successful = [];
              _i = 0, _methods = methods;
            case 1:
              if (!(_i < _methods.length)) {
                _context103.n = 7;
                break;
              }
              method = _methods[_i];
              _context103.p = 2;
              _context103.n = 3;
              return this.requestWithCare(endpoint, method);
            case 3:
              successful.push(method);
              _context103.n = 6;
              break;
            case 4:
              _context103.p = 4;
              _t3 = _context103.v;
              if (_t3 instanceof FurzonaError) {
                _context103.n = 5;
                break;
              }
              throw _t3;
            case 5:
              success = _t3.status !== 429 && _t3.code !== -1;
              if (success) successful.push(method);
            case 6:
              _i++;
              _context103.n = 1;
              break;
            case 7:
              return _context103.a(2, successful);
          }
        }, _callee103, this, [[2, 4]]);
      }));
      function probe(_x107) {
        return _probe.apply(this, arguments);
      }
      return probe;
    }()
    /**
     * @param {string[]} endpoints
     * @returns {Promise<ProbeResult[]>}
     */
    )
  }, {
    key: "probeAllBlast",
    value: (function () {
      var _probeAllBlast = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee105(endpoints) {
        var _this4 = this;
        return _regenerator().w(function (_context105) {
          while (1) switch (_context105.n) {
            case 0:
              _context105.n = 1;
              return Promise.all(endpoints.map(/*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee104(endpoint) {
                  var _t4, _t5;
                  return _regenerator().w(function (_context104) {
                    while (1) switch (_context104.n) {
                      case 0:
                        _t4 = endpoint;
                        _context104.n = 1;
                        return _this4.probe(endpoint);
                      case 1:
                        _t5 = _context104.v;
                        return _context104.a(2, {
                          endpoint: _t4,
                          methods: _t5
                        });
                    }
                  }, _callee104);
                }));
                return function (_x109) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
              return _context105.a(2, _context105.v.filter(function (result) {
                return result.methods.length > 0;
              }));
          }
        }, _callee105);
      }));
      function probeAllBlast(_x108) {
        return _probeAllBlast.apply(this, arguments);
      }
      return probeAllBlast;
    }()
    /**
     * @param {string[]} endpoints
     * @param {number} timeout
     * @returns {Promise<ProbeResult[]>}
     */
    )
  }, {
    key: "probeAll",
    value: (function () {
      var _probeAll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee106(endpoints) {
        var timeout,
          results,
          _iterator,
          _step,
          endpoint,
          methods,
          _args106 = arguments,
          _t6;
        return _regenerator().w(function (_context106) {
          while (1) switch (_context106.p = _context106.n) {
            case 0:
              timeout = _args106.length > 1 && _args106[1] !== undefined ? _args106[1] : 300;
              results = [];
              _iterator = _createForOfIteratorHelper(endpoints);
              _context106.p = 1;
              _iterator.s();
            case 2:
              if ((_step = _iterator.n()).done) {
                _context106.n = 5;
                break;
              }
              endpoint = _step.value;
              _context106.n = 3;
              return this.probe(endpoint);
            case 3:
              methods = _context106.v;
              if (methods.length > 0) results.push({
                endpoint: endpoint,
                methods: methods
              });
              _context106.n = 4;
              return this.delay(timeout);
            case 4:
              _context106.n = 2;
              break;
            case 5:
              _context106.n = 7;
              break;
            case 6:
              _context106.p = 6;
              _t6 = _context106.v;
              _iterator.e(_t6);
            case 7:
              _context106.p = 7;
              _iterator.f();
              return _context106.f(7);
            case 8:
              return _context106.a(2, results);
          }
        }, _callee106, this, [[1, 6, 7, 8]]);
      }));
      function probeAll(_x110) {
        return _probeAll.apply(this, arguments);
      }
      return probeAll;
    }())
  }, {
    key: "user",
    get: /** The signed-in Furzona user (from /login), or null when logged out. */
    function get() {
      if (!this._user) {
        try {
          var raw = localStorage.getItem("currentUser");
          if (raw) this._user = JSON.parse(raw);
        } catch (error) {
          this._user = null;
        }
      }
      return this._user;
    },
    set: function set(user) {
      this._user = user;
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("currentUser");
      }
    }
  }, {
    key: "isLoggedIn",
    get: function get() {
      return !!this.token;
    }

    /** @param {string} path */
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
    /** @param {string} badge */
  }, {
    key: "parseBadge",
    value: function parseBadge(badge) {
      var _badge$split = badge.split("#"),
        _badge$split2 = _slicedToArray(_badge$split, 3),
        name = _badge$split2[0],
        back = _badge$split2[1],
        foreground = _badge$split2[2];
      return {
        name: name,
        foregroundColor: "#" + back,
        backgroundColor: "#" + foreground
      };
    }
  }]);
}(RequestService);
var furzona = new Furzona();
var FurzonaProber = /*#__PURE__*/function (_Furzona) {
  function FurzonaProber() {
    var _this5;
    _classCallCheck(this, FurzonaProber);
    _this5 = _callSuper(this, FurzonaProber);
    /** @type {Map<string, ProbeResult>} */
    _this5.foundEndpoints = new Map();
    _this5.load();
    return _this5;
  }
  /**
   * @param {string[]} endpoints
   */
  _inherits(FurzonaProber, _Furzona);
  return _createClass(FurzonaProber, [{
    key: "collect",
    value: (function () {
      var _collect = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee107(endpoints) {
        var results, addedCount, _iterator2, _step2, result, endpoint, methods, existing, mergedMethods;
        return _regenerator().w(function (_context107) {
          while (1) switch (_context107.n) {
            case 0:
              _context107.n = 1;
              return this.probeAll(endpoints);
            case 1:
              results = _context107.v;
              addedCount = 0;
              _iterator2 = _createForOfIteratorHelper(results);
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  result = _step2.value;
                  endpoint = result.endpoint, methods = result.methods;
                  if (this.foundEndpoints.has(endpoint)) {
                    existing = this.foundEndpoints.get(endpoint);
                    if (existing) {
                      mergedMethods = _toConsumableArray(new Set([].concat(_toConsumableArray(existing.methods), _toConsumableArray(methods))));
                      this.foundEndpoints.set(endpoint, {
                        endpoint: endpoint,
                        methods: mergedMethods
                      });
                    }
                  } else {
                    this.foundEndpoints.set(endpoint, {
                      endpoint: endpoint,
                      methods: _toConsumableArray(methods)
                    });
                    addedCount++;
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              this.save();
              return _context107.a(2, addedCount);
          }
        }, _callee107, this);
      }));
      function collect(_x111) {
        return _collect.apply(this, arguments);
      }
      return collect;
    }()
    /**
     * @param {string[]} endpoints
     */
    )
  }, {
    key: "collectNew",
    value: (function () {
      var _collectNew = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee108(endpoints) {
        var _this6 = this;
        return _regenerator().w(function (_context108) {
          while (1) switch (_context108.n) {
            case 0:
              return _context108.a(2, this.collect(endpoints.filter(function (endpoint) {
                return !_this6.foundEndpoints.has(endpoint);
              })));
          }
        }, _callee108, this);
      }));
      function collectNew(_x112) {
        return _collectNew.apply(this, arguments);
      }
      return collectNew;
    }()
    /**
     * @returns {ProbeResult[]}
     */
    )
  }, {
    key: "endpointsArray",
    get: function get() {
      return Array.from(this.foundEndpoints.values());
    }
  }, {
    key: "save",
    value: function save() {
      try {
        localStorage.setItem(FurzonaProber.STORAGE_KEY, JSON.stringify(this.endpointsArray));
      } catch (err) {
        console.error("Failed to save endpoints:", err);
      }
    }
  }, {
    key: "load",
    value: function load() {
      try {
        var raw = localStorage.getItem(FurzonaProber.STORAGE_KEY);
        if (!raw) return;

        /** @type {ProbeResult[]} */
        var parsed = JSON.parse(raw);
        this.foundEndpoints = new Map(parsed.map(function (result) {
          return [result.endpoint, result];
        }));
      } catch (err) {
        console.error("Failed to load endpoints:", err);
        this.foundEndpoints = new Map();
      }
    }
  }]);
}(Furzona);
_defineProperty(FurzonaProber, "STORAGE_KEY", "furzona-prober-endpoints");
var furzonaProber = new FurzonaProber();
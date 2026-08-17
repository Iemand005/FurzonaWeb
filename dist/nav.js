"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
document.addEventListener("DOMContentLoaded", function () {
  var _window$navigation2;
  var addLoginLink = function addLoginLink() {
    if (window.location.pathname.endsWith("login.html")) return;
    if (furzona.isLoggedIn) return;
    var headerSections = document.querySelectorAll("header > section");
    var navSection = headerSections[headerSections.length - 1];
    if (!navSection) return;
    var link = document.createElement("a");
    link.className = "login-link";
    link.href = "login.html";
    link.textContent = "Log in";
    navSection.appendChild(link);
  };
  addLoginLink();
  var addProfileButton = /*#__PURE__*/function () {
    var _addProfileButton = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _furzona$fetchSelf, _furzona;
      var me, headerSections, navSection, button, img, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (!window.location.pathname.endsWith("login.html")) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            _t = furzona.user;
            if (_t) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return (_furzona$fetchSelf = (_furzona = furzona).fetchSelf) === null || _furzona$fetchSelf === void 0 ? void 0 : _furzona$fetchSelf.call(_furzona);
          case 2:
            _t = _context.v;
          case 3:
            me = _t;
            if (!(!me || !furzona.isLoggedIn)) {
              _context.n = 4;
              break;
            }
            return _context.a(2);
          case 4:
            headerSections = document.querySelectorAll("header > section");
            navSection = headerSections[headerSections.length - 1];
            if (navSection) {
              _context.n = 5;
              break;
            }
            return _context.a(2);
          case 5:
            button = document.createElement("button");
            button.type = "button";
            button.className = "profile-btn";
            button.title = me.username || "My profile";
            img = document.createElement("img");
            img.alt = me.username || "My profile";
            img.src = furzona.getProfilePictureUrl(me);
            button.appendChild(img);
            button.addEventListener("click", function () {
              var params = new URLSearchParams({
                id: me.id
              });
              if (me.i) params.set("avatar", furzona.getMediaUrl(me.i));
              if (me.b) params.set("banner", furzona.getMediaUrl(me.b));
              if (me.username) params.set("username", me.username);
              window.location.href = "profile.html?" + params.toString();
            });
            navSection.appendChild(button);
          case 6:
            return _context.a(2);
        }
      }, _callee);
    }));
    function addProfileButton() {
      return _addProfileButton.apply(this, arguments);
    }
    return addProfileButton;
  }();
  addProfileButton();
  var searchButtons = document.querySelectorAll("[data-nav-search]");
  searchButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      window.location.href = "search.html";
    });
  });
  var homeButtons = document.querySelectorAll("[data-nav-home]");
  homeButtons.forEach(function (img) {
    img.addEventListener("click", function () {
      window.location.href = "index.html";
    });
    img.style.cursor = "pointer";
  });
  var backButtons = document.querySelectorAll("[data-nav-back]");
  backButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var _window$navigation;
      if (history.length > 1 || (_window$navigation = window.navigation) !== null && _window$navigation !== void 0 && _window$navigation.canGoBack) {
        history.back();
      } else {
        location.replace("index.html");
      }
    });
  });
  var forwardButtons = document.querySelectorAll("[data-nav-forward]");
  var syncForwardState = function syncForwardState() {
    var canGoForward = window.navigation ? window.navigation.canGoForward : true;
    forwardButtons.forEach(function (button) {
      button.disabled = !canGoForward;
    });
  };
  forwardButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      history.forward();
    });
  });
  syncForwardState();
  window.addEventListener("pageshow", syncForwardState);
  window.addEventListener("popstate", syncForwardState);
  (_window$navigation2 = window.navigation) === null || _window$navigation2 === void 0 || _window$navigation2.addEventListener("navigate", syncForwardState);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(function () {});
  }
});
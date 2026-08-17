"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var form = document.getElementById("new-post-form");
var typeSelect = document.getElementById("post-type");
var titleInput = document.getElementById("post-title");
var descriptionInput = document.getElementById("post-description");
var mediaInput = document.getElementById("post-media");
var statusEl = document.getElementById("post-status");
if (!furzona.isLoggedIn) {
  statusEl.textContent = "Log in to create a post.";
}

/** @param {File} file @returns {Promise<unknown>} */
var uploadFile = /*#__PURE__*/function () {
  var _uploadFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(file) {
    var formData;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          formData = new FormData();
          formData.append("file", file);
          return _context.a(2, furzona.upload(formData));
      }
    }, _callee);
  }));
  function uploadFile(_x) {
    return _uploadFile.apply(this, arguments);
  }
  return uploadFile;
}();

/**
 * Convert an upload result into a media path. Best-effort: the upload
 * response shape is unconfirmed — try common shapes.
 * @param {unknown} result
 * @returns {string|null}
 */
var toMediaPath = function toMediaPath(result) {
  if (typeof result === "string") return result;
  if (result && _typeof(result) === "object") {
    if (typeof result.path === "string" && result.path) return result.path;
    if (typeof result.url === "string" && result.url) return result.url;
    if (Array.isArray(result.files) && typeof result.files[0] === "string") return result.files[0];
    for (var _i = 0, _arr = ["file", "media", "image", "src", "result"]; _i < _arr.length; _i++) {
      var key = _arr[_i];
      var v = result[key];
      if (typeof v === "string" && v) return v;
    }
  }
  return null;
};
if (form instanceof HTMLFormElement) {
  form.addEventListener("submit", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(event) {
      var submitButton, type, t, d, files, isText, media, _iterator, _step, file, uploaded, path, fields, post, _t, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            event.preventDefault();
            if (furzona.isLoggedIn) {
              _context2.n = 1;
              break;
            }
            statusEl.textContent = "Log in to create a post.";
            return _context2.a(2);
          case 1:
            submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            statusEl.textContent = "Posting…";
            _context2.p = 2;
            type = Number(typeSelect.value);
            t = titleInput.value.trim();
            d = descriptionInput.value.trim();
            files = mediaInput.files ? Array.from(mediaInput.files) : [];
            isText = type === 0;
            if (!(isText && !t && !d)) {
              _context2.n = 3;
              break;
            }
            statusEl.textContent = "Text posts need a title or a description.";
            return _context2.a(2);
          case 3:
            if (!(!isText && !files.length && !t && !d)) {
              _context2.n = 4;
              break;
            }
            statusEl.textContent = "Add media, a title, or a description.";
            return _context2.a(2);
          case 4:
            media = [];
            _iterator = _createForOfIteratorHelper(files);
            _context2.p = 5;
            _iterator.s();
          case 6:
            if ((_step = _iterator.n()).done) {
              _context2.n = 9;
              break;
            }
            file = _step.value;
            _context2.n = 7;
            return uploadFile(file);
          case 7:
            uploaded = _context2.v;
            path = toMediaPath(uploaded);
            if (path) media.push(path);else console.warn("Upload returned an unrecognised shape:", uploaded);
          case 8:
            _context2.n = 6;
            break;
          case 9:
            _context2.n = 11;
            break;
          case 10:
            _context2.p = 10;
            _t = _context2.v;
            _iterator.e(_t);
          case 11:
            _context2.p = 11;
            _iterator.f();
            return _context2.f(11);
          case 12:
            fields = {};
            if (t) fields.title = t;
            if (d) fields.content = d;
            if (media.length) fields.media = media;
            _context2.n = 13;
            return furzona.createPost(type, fields);
          case 13:
            post = _context2.v;
            statusEl.textContent = "Posted!";
            window.location.href = "post.html?id=" + encodeURIComponent(post.id);
            _context2.n = 15;
            break;
          case 14:
            _context2.p = 14;
            _t2 = _context2.v;
            console.error("Failed to create post:", _t2);
            statusEl.textContent = _t2.message || "Could not create post.";
          case 15:
            _context2.p = 15;
            submitButton.disabled = false;
            return _context2.f(15);
          case 16:
            return _context2.a(2);
        }
      }, _callee2, null, [[5, 10, 11, 12], [2, 14, 15, 16]]);
    }));
    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }());
}
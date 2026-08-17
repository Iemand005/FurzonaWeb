"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var HEART_UNLIKED = "Assets/heart.svg";
  var HEART_LIKED = "Assets/heart-liked.svg";

  /** @param {unknown} result @returns {{ liked: boolean|null, likes: number|null }} */
  var normalize = function normalize(result) {
    if (result === null || result === undefined) return {
      liked: null,
      likes: null
    };
    if (typeof result === "boolean") return {
      liked: result,
      likes: null
    };
    if (typeof result === "number") return {
      liked: null,
      likes: result
    };
    if (_typeof(result) !== "object") return {
      liked: null,
      likes: null
    };
    var liked = typeof result.liked === "boolean" ? result.liked : typeof result.d === "boolean" ? result.d : null;
    var likes = typeof result.likes === "number" ? result.likes : typeof result.l === "number" ? result.l : typeof result.count === "number" ? result.count : null;
    return {
      liked: liked,
      likes: likes
    };
  };
  window.createLikeButton = function (post) {
    var _post$l;
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$liked = _ref.liked,
      liked = _ref$liked === void 0 ? false : _ref$liked,
      onLike = _ref.onLike,
      onUnlike = _ref.onUnlike;
    var handleLike = onLike || function () {
      return furzona.likePost(post.id);
    };
    var handleUnlike = onUnlike || function () {
      return furzona.unlikePost(post.id);
    };
    var button = document.createElement("button");
    button.type = "button";
    button.className = "like-btn";
    var heart = document.createElement("img");
    heart.src = liked ? HEART_LIKED : HEART_UNLIKED;
    heart.alt = "";
    var count = document.createElement("span");
    count.className = "like-count";
    count.textContent = String((_post$l = post.l) !== null && _post$l !== void 0 ? _post$l : 0);
    button.appendChild(heart);
    button.appendChild(count);
    if (liked) button.classList.add("liked");
    var liking = false;
    button.addEventListener("click", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
        var result, _normalize, newLiked, newLikes, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              event.stopPropagation();
              if (!liking) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              liking = true;
              _context.p = 2;
              if (!liked) {
                _context.n = 4;
                break;
              }
              _context.n = 3;
              return handleUnlike();
            case 3:
              _t = _context.v;
              _context.n = 6;
              break;
            case 4:
              _context.n = 5;
              return handleLike();
            case 5:
              _t = _context.v;
            case 6:
              result = _t;
              _normalize = normalize(result), newLiked = _normalize.liked, newLikes = _normalize.likes;
              if (newLiked !== null) {
                liked = newLiked;
                button.classList.toggle("liked", liked);
                heart.src = liked ? HEART_LIKED : HEART_UNLIKED;
              }
              if (newLikes !== null) count.textContent = String(newLikes);
              _context.n = 8;
              break;
            case 7:
              _context.p = 7;
              _t2 = _context.v;
              console.error("Failed to like:", _t2);
            case 8:
              _context.p = 8;
              liking = false;
              return _context.f(8);
            case 9:
              return _context.a(2);
          }
        }, _callee, null, [[2, 7, 8, 9]]);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    return button;
  };
})();
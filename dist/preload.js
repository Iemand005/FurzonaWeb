"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var params = new URLSearchParams(window.location.search);
  var userId = params.get("author") || params.get("id");
  var postId = params.get("id");
  var appendTextPreservingBadges = function appendTextPreservingBadges(el, v) {
    var badges = _toConsumableArray(el.querySelectorAll("[data-role-badge]"));
    el.textContent = v;
    var _iterator = _createForOfIteratorHelper(badges),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var badge = _step.value;
        el.appendChild(badge);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
  var roles = {
    avatar: {
      param: "avatar",
      key: "userId",
      set: function set(el, v) {
        el.src = v;
      }
    },
    name: {
      param: "username",
      key: "userId",
      set: function set(el, v) {
        appendTextPreservingBadges(el, v);
      }
    },
    banner: {
      param: "banner",
      key: "userId",
      set: function set(el, v) {
        el.src = v;
      }
    },
    title: {
      param: "title",
      key: "postId",
      set: function set(el, v) {
        el.textContent = v;
      }
    },
    image: {
      param: "img",
      key: "postId",
      set: function set(el, v) {
        el.src = v;
        el.hidden = false;
      }
    }
  };
  for (var _i = 0, _arr = ["avatar", "banner", "image"]; _i < _arr.length; _i++) {
    var role = _arr[_i];
    var url = params.get(roles[role].param);
    if (!url) continue;
    var link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  }
  window.addEventListener("pagereveal", function () {
    document.querySelectorAll("[data-transition]").forEach(function (el) {
      var role = roles[el.dataset.transition];
      if (!role) return;
      var value = params.get(role.param);
      if (value !== null) role.set(el, value);
      var key = role.key === "userId" ? userId : postId;
      if (key) el.style.viewTransitionName = "".concat(el.dataset.transition, "-").concat(key);
    });
  });
})();
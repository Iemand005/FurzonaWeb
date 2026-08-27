"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var profileParams = new URLSearchParams(window.location.search);
var profileId = profileParams.get("id");
var bannerEl = document.getElementById("profile-banner");
var profileTopEl = document.querySelector(".profile-top");
var avatarEl = document.getElementById("profile-avatar");
var nameEl = document.getElementById("profile-name");
var metaEl = document.getElementById("profile-meta");
var bioEl = document.getElementById("profile-bio");
var statsEl = document.getElementById("profile-stats");
var followEl = document.getElementById("profile-follow");
var badgeEl = document.getElementById("profile-badge");
var tabForm = document.getElementById("tab-form");
window.addEventListener("pageswap", function (event) {
  if (!event.viewTransition || !profileId) return;
  if (avatarEl) avatarEl.style.viewTransitionName = "avatar-".concat(profileId);
  if (nameEl) nameEl.style.viewTransitionName = "name-".concat(profileId);
});
var setBannerVisible = function setBannerVisible(visible) {
  if (bannerEl) bannerEl.style.display = visible ? "" : "none";
  if (profileTopEl && profileTopEl.classList) profileTopEl.classList.toggle("banner", visible);
};
if (profileParams.get("banner") === "0") {
  setBannerVisible(false);
} else {
  setBannerVisible(true);
}
if (tabForm instanceof HTMLFormElement) tabForm.addEventListener("submit", function (ev) {
  return ev.preventDefault();
});

/**
 * @param {string} name
 * @param {string | number} value
 * @param {()=>void} [onCtick]
 */
function createStatDisplay(name, value, onCtick) {
  if (!statsEl) return;
  var statDisplay = document.createElement("div");
  statDisplay.className = "stat";
  if (onCtick) {
    statDisplay.classList.add("clickable");
    statDisplay.onclick = onCtick;
  }
  var valueEl = document.createElement("strong");
  var labelEl = document.createElement("span");
  valueEl.textContent = value.toString();
  labelEl.textContent = name;
  statDisplay.appendChild(valueEl);
  statDisplay.appendChild(labelEl);
  statsEl.appendChild(statDisplay);
}
;

/** @param {FurzonaProfile} profile */
function renderProfile(profile) {
  if (!(bannerEl instanceof HTMLImageElement && avatarEl instanceof HTMLImageElement && nameEl instanceof HTMLElement)) return;
  var user = profile.user;
  var stats = profile.stats || {};
  var bannerUrl = user.b ? furzona.getMediaUrl(user.b) : null;
  var avatarUrl = furzona.getProfilePictureUrl(user);
  if (bannerUrl) {
    bannerEl.src = bannerUrl;
    bannerEl.alt = "".concat(user.username, " banner");
    setBannerVisible(true);
  } else {
    bannerEl.style.display = "none";
    if (profileTopEl && profileTopEl.classList) profileTopEl.classList.remove("banner");
  }
  avatarEl.src = avatarUrl;
  avatarEl.alt = user.username;
  nameEl.textContent = user.username;
  if (badgeEl) {
    switch (user.p) {
      case 1:
        badgeEl.className = "moderator-badge";
        badgeEl.textContent = "Moderator";
        break;
      case 2:
        badgeEl.className = "admin-badge";
        badgeEl.textContent = "Admin";
        break;
    }
    badgeEl.hidden = !!user.p;
    if (user.t) {
      var badge = furzona.parseBadge(user.t);
      badgeEl.textContent = badge.name;
      badgeEl.style.color = badge.foregroundColor;
      badgeEl.style.backgroundColor = badge.backgroundColor;
      badgeEl.hidden = false;
    }
  }
  var renderMeta = function renderMeta() {
    if (!metaEl) return;
    metaEl.textContent = "ID: ".concat(user.id, " \u2022 ").concat(profile.following ? "Following" : "Not following", " \u2022 ").concat(profile.online ? "Online" : "Offline");
  };
  renderMeta();
  if (bioEl) bioEl.textContent = user.d || "No bio yet.";
  createStatDisplay("Posts", stats.posts, function () {
    var profileParams = new URLSearchParams({
      id: user.id
    });
    if (user.i) profileParams.set("avatar", furzona.getProfilePictureUrl(user));
    if (user.b) profileParams.set("banner", furzona.getMediaUrl(user.b));
    if (user.username) profileParams.set("username", user.username);
    window.location.href = "posts.html?" + profileParams.toString();
  });
  createStatDisplay("Liked", stats.liked);
  createStatDisplay("Likes", stats.likes);
  createStatDisplay("Comments", stats.comments);
  createStatDisplay("Followers", stats.followers);
  createStatDisplay("Following", stats.followed);
  if (followEl) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = profile.following ? "Unfollow" : "Follow";
    if (!furzona.isLoggedIn) {
      btn.disabled = true;
      btn.textContent = "Log in to follow";
    } else {
      btn.onclick = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              if (!profile.following) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return furzona.unfollow(user.id);
            case 1:
              profile.following = false;
              _context.n = 4;
              break;
            case 2:
              _context.n = 3;
              return furzona.follow(user.id);
            case 3:
              profile.following = true;
            case 4:
              btn.textContent = profile.following ? "Unfollow" : "Follow";
              renderMeta();
              _context.n = 6;
              break;
            case 5:
              _context.p = 5;
              _t = _context.v;
              console.error("Failed to update follow:", _t);
            case 6:
              return _context.a(2);
          }
        }, _callee, null, [[0, 5]]);
      }));
    }
    followEl.appendChild(btn);
  }
}
;
if (profileId) {
  furzona.getProfile(profileId).then(function (profile) {
    console.log("Profile data:", profile);
    renderProfile(profile);
  }).catch(function (error) {
    console.error("Failed to load profile:", error);
    if (bioEl) bioEl.textContent = "Could not load profile.";
  });
} else {
  console.error("No profile id provided in the URL.");
  if (bioEl) bioEl.textContent = "No profile id provided.";
}
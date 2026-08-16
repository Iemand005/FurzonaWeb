function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import "core-js/modules/es.array.push.js";
import "core-js/modules/web.url-search-params.delete.js";
import "core-js/modules/web.url-search-params.has.js";
import "core-js/modules/web.url-search-params.size.js";
var params = new URLSearchParams(window.location.search);
var id = params.get("id");
var bannerEl = document.getElementById("profile-banner");
var avatarEl = document.getElementById("profile-avatar");
var nameEl = document.getElementById("profile-name");
var metaEl = document.getElementById("profile-meta");
var bioEl = document.getElementById("profile-bio");
var statsEl = document.getElementById("profile-stats");
window.addEventListener("pageswap", function (event) {
  if (!event.viewTransition || !id) return;
  var destination = new URL(event.activation.entry.url);
  if (!destination.pathname.endsWith("post.html")) return;
  if (avatarEl) avatarEl.style.viewTransitionName = "profile-avatar-".concat(id);
  if (nameEl) nameEl.style.viewTransitionName = "profile-name-".concat(id);
});

/**
 * 
 * @param {FurzonaProfile} profile 
 */
function renderProfile(profile) {
  var user = profile.user;
  var stats = profile.stats || {};
  var bannerUrl = user.b ? furzona.getMediaUrl(user.b) : "https://placehold.co/1200x260/20212B/ffffff?text=" + encodeURIComponent(user.username);
  var avatarUrl = furzona.getProfilePictureUrl(user);
  bannerEl.src = bannerUrl;
  bannerEl.alt = "".concat(user.username, " banner");
  avatarEl.src = avatarUrl;
  avatarEl.alt = user.username;
  nameEl.textContent = user.username;
  metaEl.textContent = "ID: ".concat(user.id, " \u2022 ").concat(profile.following ? "Following" : "Not following", " \u2022 ").concat(profile.online ? "Online" : "Offline");
  bioEl.textContent = user.d || "No bio yet.";
  statsEl.innerHTML = [["Posts", stats.posts], ["Liked", stats.liked], ["Likes", stats.likes], ["Comments", stats.comments], ["Followers", stats.followers], ["Following", stats.followed]].map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      label = _ref2[0],
      value = _ref2[1];
    return "\n\t\t<div class=\"stat\">\n\t\t\t<strong>".concat(value !== null && value !== void 0 ? value : 0, "</strong>\n\t\t\t<span>").concat(label, "</span>\n\t\t</div>\n\t");
  }).join("");
}
;
if (id) {
  furzona.getProfile(id).then(function (profile) {
    console.log("Profile data:", profile);
    renderProfile(profile);
  }).catch(function (error) {
    console.error("Failed to load profile:", error);
    bioEl.textContent = "Could not load profile.";
  });
} else {
  console.error("No profile id provided in the URL.");
  bioEl.textContent = "No profile id provided.";
}
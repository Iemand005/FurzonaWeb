"use strict";

var searchForm = document.getElementById("search-form");
var input = document.getElementById("search-input");
var resultsEl = document.getElementById("search-results");
var emptyEl = document.getElementById("search-empty");
var clickedPfp = null;
var clickedName = null;
var clickedTitle = null;
var clickedImage = null;
window.addEventListener("pageswap", function (event) {
  if (!event.viewTransition) return;
  document.querySelectorAll(".pfp").forEach(function (img) {
    return img.style.viewTransitionName = "";
  });
  document.querySelectorAll("#search-results p").forEach(function (p) {
    return p.style.viewTransitionName = "";
  });
  document.querySelectorAll("#search-results h2").forEach(function (h) {
    return h.style.viewTransitionName = "";
  });
  document.querySelectorAll("#search-results > li > img").forEach(function (img) {
    return img.style.viewTransitionName = "";
  });
  if (!clickedPfp) return;
  clickedPfp.style.viewTransitionName = "avatar-".concat(clickedPfp.dataset.transitionId);
  if (clickedName) clickedName.style.viewTransitionName = "name-".concat(clickedPfp.dataset.transitionId);
  if (clickedTitle) clickedTitle.style.viewTransitionName = "title-".concat(clickedTitle.dataset.postId);
  if (clickedImage) clickedImage.style.viewTransitionName = "image-".concat(clickedImage.dataset.postId);
  var cleanup = function cleanup() {
    clickedPfp.style.viewTransitionName = "";
    if (clickedName) clickedName.style.viewTransitionName = "";
    if (clickedTitle) clickedTitle.style.viewTransitionName = "";
    if (clickedImage) clickedImage.style.viewTransitionName = "";
  };
  event.viewTransition.ready.then(cleanup, cleanup);
});
window.addEventListener("pagereveal", function (e) {
  var _window$navigation;
  if (!e.viewTransition) return;
  var fromURL = (_window$navigation = window.navigation) === null || _window$navigation === void 0 || (_window$navigation = _window$navigation.activation) === null || _window$navigation === void 0 || (_window$navigation = _window$navigation.from) === null || _window$navigation === void 0 ? void 0 : _window$navigation.url;
  if (!fromURL) return;
  var url = new URL(fromURL);
  if (url.pathname.endsWith("post.html")) {
    var postId = url.searchParams.get("id");
    var card = postId && document.querySelector("[data-post-id=\"".concat(postId, "\"]"));
    if (!card) return;
    var pfp = card.querySelector(".pfp");
    var authorId = pfp === null || pfp === void 0 ? void 0 : pfp.dataset.transitionId;
    var nameEl = pfp === null || pfp === void 0 ? void 0 : pfp.parentElement.querySelector("p");
    var title = card.querySelector("h2");
    var image = card.querySelector(":scope > img");
    if (pfp && authorId) pfp.style.viewTransitionName = "avatar-".concat(authorId);
    if (nameEl && authorId) nameEl.style.viewTransitionName = "name-".concat(authorId);
    if (title) title.style.viewTransitionName = "title-".concat(postId);
    if (image) image.style.viewTransitionName = "image-".concat(postId);
    var cleanup = function cleanup() {
      if (pfp) pfp.style.viewTransitionName = "";
      if (nameEl) nameEl.style.viewTransitionName = "";
      if (title) title.style.viewTransitionName = "";
      if (image) image.style.viewTransitionName = "";
    };
    e.viewTransition.ready.then(cleanup, cleanup);
    return;
  }
  if (url.pathname.endsWith("profile.html")) {
    var id = url.searchParams.get("id");
    var _pfp = id && document.querySelector("[data-transition-id=\"".concat(id, "\"]"));
    if (!_pfp) return;
    var _nameEl = _pfp.parentElement.querySelector("p");
    _pfp.style.viewTransitionName = "avatar-".concat(id);
    if (_nameEl) _nameEl.style.viewTransitionName = "name-".concat(id);
    var _cleanup = function _cleanup() {
      _pfp.style.viewTransitionName = "";
      if (_nameEl) _nameEl.style.viewTransitionName = "";
    };
    e.viewTransition.ready.then(_cleanup, _cleanup);
  }
});
var createdPost = function createdPost(item) {
  var card = document.createElement("li");
  card.className = "post card";
  card.dataset.postId = item.id;
  var profile = document.createElement("section");
  profile.className = "profile";
  var pfp = document.createElement("img");
  pfp.className = "pfp";
  pfp.src = furzona.getProfilePictureUrl(item.u);
  pfp.alt = item.u.username;
  pfp.dataset.transitionId = item.u.id;
  var name = document.createElement("p");
  name.textContent = item.u.username;
  profile.appendChild(pfp);
  profile.appendChild(name);
  card.appendChild(profile);
  var title = document.createElement("h2");
  title.textContent = item.t || "";
  title.dataset.postId = item.id;
  card.appendChild(title);
  var image = null;
  if (item.m && item.m.length > 0) {
    image = document.createElement("img");
    image.src = furzona.getMediaUrl(item.m[0]);
    image.alt = item.t || item.u.username || "Post image";
    image.dataset.postId = item.id;
    card.appendChild(image);
  }
  card.appendChild(createLikeButton(item, {
    liked: !!item.z
  }));
  card.style.cursor = "pointer";
  card.onclick = function () {
    clickedPfp = pfp;
    clickedName = name;
    clickedTitle = title;
    clickedImage = image;
    var params = new URLSearchParams({
      id: item.id,
      username: item.u.username
    });
    if (item.u.id) params.set("author", item.u.id);
    if (item.u.i) params.set("avatar", furzona.getProfilePictureUrl(item.u));
    if (item.t) params.set("title", item.t);
    if (item.m && item.m.length > 0) params.set("img", furzona.getMediaUrl(item.m[0]));
    window.location.href = "post.html?" + params.toString();
  };
  return card;
};
var createdUser = function createdUser(item) {
  var card = document.createElement("li");
  card.className = "profile-row card";
  card.dataset.transitionId = item.id;
  var pfp = document.createElement("img");
  pfp.className = "pfp";
  pfp.src = furzona.getProfilePictureUrl(item);
  pfp.alt = item.username;
  pfp.dataset.transitionId = item.id;
  var name = document.createElement("p");
  name.textContent = item.username;
  card.appendChild(pfp);
  card.appendChild(name);
  card.style.cursor = "pointer";
  card.onclick = function () {
    clickedPfp = pfp;
    clickedName = name;
    clickedTitle = null;
    clickedImage = null;
    var params = new URLSearchParams({
      id: item.id,
      username: item.username
    });
    if (item.i) params.set("avatar", furzona.getProfilePictureUrl(item));
    if (item.b) params.set("banner", furzona.getMediaUrl(item.b));
    window.location.href = "profile.html?" + params.toString();
  };
  return card;
};
if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var q = input.value.trim();
    if (!q) return;
    resultsEl.innerHTML = "";
    emptyEl.hidden = true;
    furzona.newSearch(q).then(function (_ref) {
      var p = _ref.p,
        u = _ref.u;
      var posts = p || [];
      var users = u || [];
      if (posts.length === 0 && users.length === 0) {
        emptyEl.textContent = "No results.";
        emptyEl.hidden = false;
        return;
      }
      posts.forEach(function (item) {
        return resultsEl.appendChild(createdPost(item));
      });
      users.forEach(function (item) {
        return resultsEl.appendChild(createdUser(item));
      });
    }).catch(function (error) {
      console.error("Search failed:", error);
      emptyEl.textContent = "Search failed.";
      emptyEl.hidden = false;
    });
  });
}
"use strict";

var postList = document.getElementById("posts-list");
var clickedPfp = null;
var clickedName = null;
var clickedPost = null;
window.addEventListener("pageswap", function (event) {
  if (!event.viewTransition || !clickedPfp) return;
  document.querySelectorAll(".pfp").forEach(function (img) {
    img.style.viewTransitionName = "";
  });
  document.querySelectorAll(".profile p").forEach(function (p) {
    p.style.viewTransitionName = "";
  });
  clickedPfp.style.viewTransitionName = "avatar-".concat(clickedPfp.dataset.transitionId);
  if (clickedName) clickedName.style.viewTransitionName = "name-".concat(clickedPfp.dataset.transitionId);
  var cleanup = function cleanup() {
    clickedPfp.style.viewTransitionName = "";
    if (clickedName) clickedName.style.viewTransitionName = "";
  };
  event.viewTransition.ready.then(cleanup, cleanup);
});
window.addEventListener('pageswap', function (e) {
  if (e.viewTransition) {
    console.log('pageswap OK:', e.activation.entry.url);
    e.viewTransition.finished.catch(function (err) {
      return console.warn('pageswap aborted:', err.name);
    });
  } else {
    console.log('pageswap: NO transition. from:', location.href, '->', e.activation.entry.url);
  }
});
window.addEventListener('pagereveal', function (e) {
  console.log('pagereveal', e.viewTransition ? 'OK' : 'NONE');
});
window.addEventListener("pagereveal", function (e) {
  var _window$navigation, _pfp$closest;
  if (!e.viewTransition) return;
  var fromURL = (_window$navigation = window.navigation) === null || _window$navigation === void 0 || (_window$navigation = _window$navigation.activation) === null || _window$navigation === void 0 || (_window$navigation = _window$navigation.from) === null || _window$navigation === void 0 ? void 0 : _window$navigation.url;
  if (!fromURL) return;
  var id = new URL(fromURL).searchParams.get("id");
  if (!id) return;
  var pfp = document.querySelector("[data-transition-id=\"".concat(id, "\"]"));
  if (!pfp) return;
  var nameEl = (_pfp$closest = pfp.closest(".profile")) === null || _pfp$closest === void 0 ? void 0 : _pfp$closest.querySelector("p");
  pfp.style.viewTransitionName = "avatar-".concat(id);
  if (nameEl) nameEl.style.viewTransitionName = "name-".concat(id);
  var cleanup = function cleanup() {
    pfp.style.viewTransitionName = "";
    if (nameEl) nameEl.style.viewTransitionName = "";
  };
  e.viewTransition.ready.then(cleanup, cleanup);
});
window.addEventListener("pageswap", function (event) {
  if (!event.viewTransition || !clickedPost) return;
  var _clickedPost = clickedPost,
    id = _clickedPost.id,
    authorId = _clickedPost.authorId,
    pfp = _clickedPost.pfp,
    username = _clickedPost.username,
    title = _clickedPost.title,
    image = _clickedPost.image;
  document.querySelectorAll(".pfp").forEach(function (img) {
    img.style.viewTransitionName = "";
  });
  document.querySelectorAll(".profile p").forEach(function (p) {
    p.style.viewTransitionName = "";
  });
  pfp.style.viewTransitionName = "avatar-".concat(authorId);
  username.style.viewTransitionName = "name-".concat(authorId);
  if (title) title.style.viewTransitionName = "title-".concat(id);
  if (image) image.style.viewTransitionName = "image-".concat(id);
  var cleanup = function cleanup() {
    pfp.style.viewTransitionName = "";
    username.style.viewTransitionName = "";
    if (title) title.style.viewTransitionName = "";
    if (image) image.style.viewTransitionName = "";
  };
  event.viewTransition.ready.then(cleanup, cleanup);
});
window.addEventListener("pagereveal", function (e) {
  var _window$navigation2;
  if (!e.viewTransition) return;
  var fromURL = (_window$navigation2 = window.navigation) === null || _window$navigation2 === void 0 || (_window$navigation2 = _window$navigation2.activation) === null || _window$navigation2 === void 0 || (_window$navigation2 = _window$navigation2.from) === null || _window$navigation2 === void 0 ? void 0 : _window$navigation2.url;
  if (!fromURL) return;
  var url = new URL(fromURL);
  if (!endsWith(url.pathname, "post.html")) return;
  var postId = url.searchParams.get("id");
  if (!postId) return;
  var item = document.querySelector("[data-post-id=\"".concat(postId, "\"]"));
  if (!item) return;
  var pfp = item.querySelector(".pfp");
  var username = item.querySelector(".profile p");
  var title = item.querySelector("h2");
  var image = item.querySelector(":scope > img");
  var authorId = pfp === null || pfp === void 0 ? void 0 : pfp.dataset.transitionId;
  if (pfp && authorId) pfp.style.viewTransitionName = "avatar-".concat(authorId);
  if (username && authorId) username.style.viewTransitionName = "name-".concat(authorId);
  if (title) title.style.viewTransitionName = "title-".concat(postId);
  if (image) image.style.viewTransitionName = "image-".concat(postId);
  var cleanup = function cleanup() {
    if (pfp) pfp.style.viewTransitionName = "";
    if (username) username.style.viewTransitionName = "";
    if (title) title.style.viewTransitionName = "";
    if (image) image.style.viewTransitionName = "";
  };
  e.viewTransition.ready.then(cleanup, cleanup);
});
if (postList instanceof HTMLUListElement) {
  var isLoading = false;
  var hasMorePosts = true;
  var createPostElement = function createPostElement(/** @type {FurzonaPost} */post) {
    var listItem = document.createElement("li");
    listItem.className = "post card";
    listItem.dataset.postId = post.id;
    var timestamp = Date.parse(post.createdAt || post.updatedAt || "0");
    listItem.dataset.date = String(timestamp);
    var profileCard = document.createElement("section");
    profileCard.className = "profile";
    profileCard.style.cursor = "pointer";
    var pfp = document.createElement("img");
    pfp.classList.add("pfp");
    pfp.src = furzona.getProfilePictureUrl(post.u);
    pfp.alt = post.u.username;
    pfp.dataset.transitionId = post.u.id;
    profileCard.appendChild(pfp);
    profileCard.onclick = function (event) {
      event.stopPropagation();
      clickedPfp = pfp;
      clickedName = username;
      clickedPost = null;
      var params = new URLSearchParams({
        id: post.u.id
      });
      if (post.u.i) params.set("avatar", furzona.getProfilePictureUrl(post.u));
      if (post.u.b) params.set("banner", furzona.getMediaUrl(post.u.b));
      if (post.u.username) params.set("username", post.u.username);
      window.location.href = "profile.html?" + params.toString();
    };
    var username = document.createElement("p");
    username.textContent = post.u.username;
    profileCard.appendChild(username);
    listItem.appendChild(profileCard);
    var title = document.createElement("h2");
    title.textContent = post.t || "";
    listItem.appendChild(title);
    var description = [post.c, post.d].filter(Boolean).join("\n\n");
    if (description) {
      var descEl = document.createElement("p");
      descEl.className = "post-desc";
      descEl.textContent = description;
      listItem.appendChild(descEl);
    }
    var image = null;
    if (post.m && post.m.length > 0) {
      image = document.createElement("img");
      image.src = furzona.getMediaUrl(post.m[0]);
      image.alt = post.t || post.u.username || "Post image";
      listItem.appendChild(image);
    }
    var likeButton = createLikeButton(post, {
      liked: !!post.z
    });
    listItem.appendChild(likeButton);
    listItem.onclick = function () {
      clickedPfp = null;
      clickedName = null;
      clickedPost = {
        id: post.id,
        authorId: post.u.id,
        pfp: pfp,
        username: username,
        title: title,
        image: image
      };
      var postParams = new URLSearchParams({
        id: post.id
      });
      if (post.u.id) postParams.set("author", post.u.id);
      if (post.u.i) postParams.set("avatar", furzona.getProfilePictureUrl(post.u));
      if (post.u.username) postParams.set("username", post.u.username);
      if (post.t) postParams.set("title", post.t);
      if (image) postParams.set("img", image.src);
      window.location.href = "post.html?" + postParams.toString();
    };
    return listItem;
  };
  var loadPosts = function loadPosts(date) {
    if (isLoading || !hasMorePosts) return;
    isLoading = true;
    furzona.getPosts(date).then(function (posts) {
      if (!posts || posts.length === 0) {
        hasMorePosts = false;
        isLoading = false;
        return;
      }
      posts.forEach(function (post) {
        postList.appendChild(createPostElement(post));
      });
      var lastPost = posts[posts.length - 1];
      var lastDate = (lastPost === null || lastPost === void 0 ? void 0 : lastPost.createdAt) || (lastPost === null || lastPost === void 0 ? void 0 : lastPost.updatedAt) || null;
      if (!lastDate) hasMorePosts = false;
      isLoading = false;
    }).catch(function (error) {
      console.error("Failed to load posts:", error);
      hasMorePosts = false;
      isLoading = false;
    });
  };
  window.addEventListener("scroll", function () {
    var reachedBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;
    if (!reachedBottom) return;
    var lastPost = postList.lastElementChild;
    var lastDate = lastPost instanceof HTMLElement ? Number(lastPost.dataset.date) : null;
    if (lastDate) {
      loadPosts(lastDate);
    } else {
      loadPosts();
    }
  });
  loadPosts();
}
"use strict";

var params = new URLSearchParams(window.location.search);
var userId = params.get("id");
var postList = document.getElementById("posts-list");
var postsHeader = document.getElementById("posts-header");
var postsOwnerAvatar = document.getElementById("posts-owner-avatar");
var postsOwnerName = document.getElementById("posts-owner-name");
var pageTitle = document.getElementById("page-title");
var clickedOwner = null;
var clickedPost = null;
if (userId && postsHeader && postsOwnerAvatar && postsOwnerName) {
  var avatar = params.get("avatar");
  var username = params.get("username");
  if (avatar) postsOwnerAvatar.src = avatar;
  postsOwnerAvatar.alt = username || "Owner avatar";
  postsOwnerName.textContent = username ? "".concat(username, "'s posts") : "Posts";
  postsHeader.hidden = false;
  postsHeader.style.cursor = "pointer";
  postsHeader.onclick = function () {
    clickedOwner = postsOwnerAvatar;
    var profileParams = new URLSearchParams({
      id: userId
    });
    if (avatar) profileParams.set("avatar", avatar);
    profileParams.set("banner", params.get("banner") || 0);
    if (username) profileParams.set("username", username);
    window.location.href = "profile.html?" + profileParams.toString();
  };
  if (pageTitle) pageTitle.textContent = username ? "".concat(username, "'s posts") : "Posts";
}
window.addEventListener("pageswap", function (event) {
  if (!event.viewTransition) return;
  if (clickedOwner && userId) {
    clickedOwner.style.viewTransitionName = "avatar-".concat(userId);
    if (postsOwnerName) postsOwnerName.style.viewTransitionName = "name-".concat(userId);
    var _cleanup = function _cleanup() {
      clickedOwner.style.viewTransitionName = "";
      if (postsOwnerName) postsOwnerName.style.viewTransitionName = "";
    };
    event.viewTransition.ready.then(_cleanup, _cleanup);
    clickedOwner = null;
    return;
  }
  if (!clickedPost) return;
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
  clickedPost = null;
});
window.addEventListener("pagereveal", function (e) {
  var _window$navigation;
  if (!e.viewTransition) return;
  var fromURL = (_window$navigation = window.navigation) === null || _window$navigation === void 0 || (_window$navigation = _window$navigation.activation) === null || _window$navigation === void 0 || (_window$navigation = _window$navigation.from) === null || _window$navigation === void 0 ? void 0 : _window$navigation.url;
  if (!fromURL) return;
  var url = new URL(fromURL);
  if (!url.pathname.endsWith("post.html")) return;
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
    var username = document.createElement("p");
    username.textContent = post.u.username;
    profileCard.appendChild(username);
    profileCard.onclick = function (event) {
      event.stopPropagation();
      clickedOwner = null;
      clickedPost = null;
      var profileParams = new URLSearchParams({
        id: post.u.id
      });
      if (post.u.i) profileParams.set("avatar", furzona.getProfilePictureUrl(post.u));
      profileParams.set("banner", post.u.b ? furzona.getMediaUrl(post.u.b) : 0);
      if (post.u.username) profileParams.set("username", post.u.username);
      window.location.href = "profile.html?" + profileParams.toString();
    };
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
    listItem.appendChild(createLikeButton(post, {
      liked: !!post.z
    }));
    listItem.onclick = function () {
      clickedOwner = null;
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
    var request = userId ? furzona.getUserPosts(userId, date) : furzona.getPosts(date);
    request.then(function (posts) {
      if (!posts || posts.length === 0) {
        hasMorePosts = false;
        isLoading = false;
        if (postList.childElementCount === 0) {
          var empty = document.createElement("li");
          empty.className = "meta";
          empty.textContent = userId ? "No posts from this user yet." : "No posts yet.";
          postList.appendChild(empty);
        }
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
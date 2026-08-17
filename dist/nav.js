"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var _window$navigation2;
  var navSection = function () {
    var sections = document.querySelectorAll("header > section");
    return sections[sections.length - 1] || null;
  }();
  var addLoginLink = function addLoginLink() {
    if (window.location.pathname.endsWith("login.html")) return;
    if (furzona.isLoggedIn) return;
    if (!navSection) return;
    var link = document.createElement("a");
    link.className = "login-link";
    link.href = "login.html";
    link.textContent = "Log in";
    navSection.appendChild(link);
  };
  var addProfileButton = function addProfileButton() {
    if (window.location.pathname.endsWith("login.html")) return;
    var me = furzona.user;
    if (!me || !furzona.isLoggedIn) return;
    if (!navSection) return;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "profile-btn";
    button.title = me.username || "My profile";
    var img = document.createElement("img");
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
  };
  var searchButton = document.getElementById("nav-search");
  if (searchButton) {
    searchButton.addEventListener("click", function () {
      window.location.href = "search.html";
    });
  }
  var homeImg = document.getElementById("nav-home");
  if (homeImg) {
    homeImg.addEventListener("click", function () {
      window.location.href = "index.html";
    });
    homeImg.style.cursor = "pointer";
  }
  var addNavHomeButton = function addNavHomeButton() {
    if (!navSection || document.getElementById("nav-home-button")) return;
    var button = document.createElement("button");
    button.type = "button";
    button.id = "nav-home-button";
    button.title = "Home";
    var img = document.createElement("img");
    img.src = "Assets/home.svg";
    img.alt = "Home";
    button.appendChild(img);
    button.addEventListener("click", function () {
      window.location.href = "index.html";
    });
    navSection.appendChild(button);
  };
  var addNewPostButton = function addNewPostButton() {
    if (window.location.pathname.endsWith("login.html")) return;
    if (window.location.pathname.endsWith("create-post.html")) return;
    if (!furzona.isLoggedIn) return;
    if (!navSection || document.getElementById("nav-new-post")) return;
    var button = document.createElement("button");
    button.type = "button";
    button.id = "nav-new-post";
    button.title = "New post";
    var plus = document.createElement("span");
    plus.textContent = "\uFF0B";
    plus.style.fontSize = "18px";
    plus.style.lineHeight = "1";
    button.appendChild(plus);
    button.addEventListener("click", function () {
      window.location.href = "create-post.html";
    });
    navSection.appendChild(button);
  };
  var backButton = document.getElementById("nav-back");
  if (backButton) {
    backButton.addEventListener("click", function () {
      var _window$navigation;
      if (history.length > 1 || (_window$navigation = window.navigation) !== null && _window$navigation !== void 0 && _window$navigation.canGoBack) {
        history.back();
      } else {
        location.replace("index.html");
      }
    });
  }
  var forwardButton = document.getElementById("nav-forward");
  var syncForwardState = function syncForwardState() {
    if (!forwardButton) return;
    var canGoForward = window.navigation ? window.navigation.canGoForward : true;
    forwardButton.disabled = !canGoForward;
  };
  if (forwardButton) {
    forwardButton.addEventListener("click", function () {
      history.forward();
    });
  }
  window.addEventListener("pageshow", syncForwardState);
  window.addEventListener("popstate", syncForwardState);
  (_window$navigation2 = window.navigation) === null || _window$navigation2 === void 0 || _window$navigation2.addEventListener("navigate", syncForwardState);
  addNavHomeButton();
  addNewPostButton();
  addProfileButton();
  addLoginLink();
  syncForwardState();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(function () {});
  }
});
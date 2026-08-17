"use strict";

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
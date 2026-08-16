import "core-js/modules/web.url-search-params.delete.js";
import "core-js/modules/web.url-search-params.has.js";
import "core-js/modules/web.url-search-params.size.js";
(function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  var avatarParam = params.get("avatar");
  var usernameParam = params.get("username");
  var titleParam = params.get("title");
  var imgParam = params.get("img");
  window.addEventListener("pagereveal", function () {
    var _window$navigation;
    var pfpEl = document.getElementById("post-author-pfp");
    var nameEl = document.getElementById("post-author-name");
    var titleEl = document.getElementById("post-title");
    var imgEl = document.getElementById("post-first-image");
    if (pfpEl && avatarParam) pfpEl.src = avatarParam;
    if (nameEl && usernameParam) nameEl.textContent = usernameParam;
    if (titleEl && titleParam) titleEl.textContent = titleParam;
    if (imgEl && imgParam) {
      imgEl.src = imgParam;
      imgEl.hidden = false;
    }
    var fromURL = (_window$navigation = window.navigation) === null || _window$navigation === void 0 || (_window$navigation = _window$navigation.activation) === null || _window$navigation === void 0 || (_window$navigation = _window$navigation.from) === null || _window$navigation === void 0 ? void 0 : _window$navigation.url;
    var from = fromURL ? new URL(fromURL) : null;
    var fromProfileId = from && from.pathname.endsWith("profile.html") ? from.searchParams.get("id") : null;
    if (fromProfileId) {
      if (pfpEl) pfpEl.style.viewTransitionName = "profile-avatar-".concat(fromProfileId);
      if (nameEl) nameEl.style.viewTransitionName = "profile-name-".concat(fromProfileId);
    } else {
      if (pfpEl) pfpEl.style.viewTransitionName = id ? "post-avatar-".concat(id) : "post-avatar";
      if (nameEl) nameEl.style.viewTransitionName = id ? "post-name-".concat(id) : "post-name";
      if (titleEl) titleEl.style.viewTransitionName = id ? "post-title-".concat(id) : "post-title";
      if (imgEl && imgParam) imgEl.style.viewTransitionName = id ? "post-image-".concat(id) : "post-image";
    }
  });
})();
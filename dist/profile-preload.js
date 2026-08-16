import "core-js/modules/web.url-search-params.delete.js";
import "core-js/modules/web.url-search-params.has.js";
import "core-js/modules/web.url-search-params.size.js";
(function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  var avatarParam = params.get("avatar");
  var bannerParam = params.get("banner");
  var nameParam = params.get("username");
  for (var _i = 0, _arr = [avatarParam, bannerParam]; _i < _arr.length; _i++) {
    var url = _arr[_i];
    if (!url) continue;
    var link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  }
  window.addEventListener("pagereveal", function () {
    var avatarEl = document.getElementById("profile-avatar");
    var bannerEl = document.getElementById("profile-banner");
    var nameEl = document.getElementById("profile-name");
    if (avatarEl && avatarParam) avatarEl.src = avatarParam;
    if (bannerEl && bannerParam) bannerEl.src = bannerParam;
    if (nameEl && nameParam) nameEl.textContent = nameParam;
    if (avatarEl) avatarEl.style.viewTransitionName = id ? "profile-avatar-".concat(id) : "profile-avatar";
    if (nameEl) nameEl.style.viewTransitionName = id ? "profile-name-".concat(id) : "profile-name";
  });
})();
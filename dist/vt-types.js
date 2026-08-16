import "core-js/modules/web.url-search-params.delete.js";
import "core-js/modules/web.url-search-params.has.js";
import "core-js/modules/web.url-search-params.size.js";
(function () {
  var pageName = function pageName(url) {
    var path = new URL(url).pathname;
    if (path.endsWith("index.html") || path.endsWith("/")) return "index";
    if (path.endsWith("login.html")) return "login";
    return null;
  };
  var isFlip = function isFlip(a, b) {
    var x = pageName(a);
    var y = pageName(b);
    return x === "login" && y === "index" || x === "index" && y === "login";
  };
  window.addEventListener("pageswap", function (e) {
    if (e.viewTransition && isFlip(location.href, e.activation.entry.url)) {
      e.viewTransition.types.add("flip");
    }
  });
  window.addEventListener("pagereveal", function (e) {
    var _window$navigation;
    var from = (_window$navigation = window.navigation) === null || _window$navigation === void 0 || (_window$navigation = _window$navigation.activation) === null || _window$navigation === void 0 || (_window$navigation = _window$navigation.from) === null || _window$navigation === void 0 ? void 0 : _window$navigation.url;
    if (e.viewTransition && from && isFlip(location.href, from)) {
      e.viewTransition.types.add("flip");
    }
  });
})();
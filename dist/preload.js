"use strict";

(function () {
  var params = new URLSearchParams(window.location.search);
  var userId = params.get("author") || params.get("id");
  var postId = params.get("id");
  var roles = {
    avatar: {
      param: "avatar",
      key: "userId",
      set: function set(el, v) {
        el.src = v;
      }
    },
    name: {
      param: "username",
      key: "userId",
      set: function set(el, v) {
        el.textContent = v;
      }
    },
    banner: {
      param: "banner",
      key: "userId",
      set: function set(el, v) {
        el.src = v;
      }
    },
    title: {
      param: "title",
      key: "postId",
      set: function set(el, v) {
        el.textContent = v;
      }
    },
    image: {
      param: "img",
      key: "postId",
      set: function set(el, v) {
        el.src = v;
        el.hidden = false;
      }
    }
  };
  for (var _i = 0, _arr = ["avatar", "banner", "image"]; _i < _arr.length; _i++) {
    var role = _arr[_i];
    var url = params.get(roles[role].param);
    if (!url) continue;
    var link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  }
  window.addEventListener("pagereveal", function () {
    document.querySelectorAll("[data-transition]").forEach(function (el) {
      var role = roles[el.dataset.transition];
      if (!role) return;
      var value = params.get(role.param);
      if (value !== null) role.set(el, value);
      var key = role.key === "userId" ? userId : postId;
      if (key) el.style.viewTransitionName = "".concat(el.dataset.transition, "-").concat(key);
    });
  });
})();
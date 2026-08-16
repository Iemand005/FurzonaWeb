import "core-js/modules/esnext.iterator.constructor.js";
import "core-js/modules/esnext.iterator.for-each.js";
import "core-js/modules/web.url-search-params.delete.js";
import "core-js/modules/web.url-search-params.has.js";
import "core-js/modules/web.url-search-params.size.js";
var params = new URLSearchParams(window.location.search);
var id = params.get("id");
var authorEl = document.getElementById("post-author");
var pfpEl = document.getElementById("post-author-pfp");
var nameEl = document.getElementById("post-author-name");
var titleEl = document.getElementById("post-title");
var metaEl = document.getElementById("post-meta");
var mediaEl = document.getElementById("post-media");
var firstImageEl = document.getElementById("post-first-image");
var textEl = document.getElementById("post-text");
var authorId = null;
window.addEventListener("pageswap", function (event) {
  if (!event.viewTransition || !id) return;
  var destination = new URL(event.activation.entry.url);
  if (destination.pathname.endsWith("profile.html")) {
    if (!authorId) return;
    if (pfpEl) pfpEl.style.viewTransitionName = "profile-avatar-".concat(authorId);
    if (nameEl) nameEl.style.viewTransitionName = "profile-name-".concat(authorId);
    return;
  }
  if (destination.pathname.endsWith("index.html")) {
    if (pfpEl) pfpEl.style.viewTransitionName = "post-avatar-".concat(id);
    if (nameEl) nameEl.style.viewTransitionName = "post-name-".concat(id);
    if (titleEl) titleEl.style.viewTransitionName = "post-title-".concat(id);
    var firstImg = firstImageEl && !firstImageEl.hidden ? firstImageEl : null;
    if (firstImg) firstImg.style.viewTransitionName = "post-image-".concat(id);
  }
});

/**
 * @param {FurzonaPost} post
 */
function renderPost(post) {
  var user = post.u;
  authorId = user.id;
  var date = new Date(post.createdAt || post.updatedAt);
  titleEl.textContent = post.t || "Untitled";
  metaEl.textContent = "ID: ".concat(post.id, " \u2022 ").concat(date.toLocaleString());
  textEl.textContent = [post.c, post.d].filter(Boolean).join("\n\n");
  pfpEl.src = furzona.getProfilePictureUrl(user);
  pfpEl.alt = user.username;
  nameEl.textContent = user.username;
  authorEl.style.cursor = "pointer";
  authorEl.onclick = function () {
    var profileParams = new URLSearchParams({
      id: user.id
    });
    if (user.i) profileParams.set("avatar", furzona.getProfilePictureUrl(user));
    if (user.b) profileParams.set("banner", furzona.getMediaUrl(user.b));
    if (user.username) profileParams.set("username", user.username);
    window.location.href = "profile.html?" + profileParams.toString();
  };
  if (post.m && post.m.length > 0) {
    post.m.forEach(function (path, index) {
      if (index === 0) {
        firstImageEl.src = furzona.getMediaUrl(path);
        firstImageEl.alt = post.t || user.username || "Post media";
        firstImageEl.hidden = false;
      } else {
        var img = document.createElement("img");
        img.src = furzona.getMediaUrl(path);
        img.alt = post.t || user.username || "Post media";
        img.loading = "lazy";
        mediaEl.appendChild(img);
      }
    });
  }
}
if (id) {
  furzona.getPost(id).then(renderPost).catch(function (error) {
    console.error("Failed to load post:", error);
    textEl.textContent = "Could not load post.";
  });
} else {
  console.error("No post id provided in the URL.");
  textEl.textContent = "No post id provided.";
}
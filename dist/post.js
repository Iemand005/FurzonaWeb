"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var actionsEl = document.getElementById("post-actions");
var commentsEl = document.getElementById("post-comment-list");
var commentForm = document.getElementById("comment-form");
var commentInput = document.getElementById("comment-input");
var authorId = null;
window.addEventListener("pageswap", function (event) {
  if (!event.viewTransition || !id) return;
  if (pfpEl && authorId) pfpEl.style.viewTransitionName = "avatar-".concat(authorId);
  if (nameEl && authorId) nameEl.style.viewTransitionName = "name-".concat(authorId);
  if (titleEl) titleEl.style.viewTransitionName = "title-".concat(id);
  var firstImg = firstImageEl && !firstImageEl.hidden ? firstImageEl : null;
  if (firstImg) firstImg.style.viewTransitionName = "image-".concat(id);
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
  if (actionsEl) {
    actionsEl.appendChild(createLikeButton(post, {
      liked: !!post.z
    }));
  }
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

/**
 * @param {FurzonaComment} comment
 */
function createCommentElement(comment) {
  var card = document.createElement("div");
  card.className = "comment";
  var author = document.createElement("section");
  author.className = "profile";
  var pfp = document.createElement("img");
  pfp.className = "pfp";
  pfp.src = furzona.getProfilePictureUrl(comment.u);
  pfp.alt = comment.u.username;
  var name = document.createElement("p");
  name.textContent = comment.u.username;
  author.append(pfp, name);
  author.style.cursor = "pointer";
  author.onclick = function () {
    var profileParams = new URLSearchParams({
      id: comment.u.id
    });
    if (comment.u.i) profileParams.set("avatar", furzona.getProfilePictureUrl(comment.u));
    if (comment.u.b) profileParams.set("banner", furzona.getMediaUrl(comment.u.b));
    if (comment.u.username) profileParams.set("username", comment.u.username);
    window.location.href = "profile.html?" + profileParams.toString();
  };
  card.appendChild(author);
  var content = document.createElement("p");
  content.className = "comment-text";
  content.textContent = comment.c || "";
  card.appendChild(content);
  var meta = document.createElement("p");
  meta.className = "meta";
  var date = new Date(comment.createdAt || comment.updatedAt);
  var metaParts = [];
  if (comment.l) metaParts.push("".concat(comment.l, " likes"));
  if (comment.s) metaParts.push("".concat(comment.s, " replies"));
  metaParts.push(date.toLocaleString());
  meta.textContent = metaParts.join(" • ");
  card.appendChild(meta);
  card.appendChild(createLikeButton(comment, {
    liked: !!comment.d,
    onLike: function onLike() {
      return furzona.likeComment(comment.id);
    },
    onUnlike: function onUnlike() {
      return furzona.unlikeComment(comment.id);
    }
  }));
  return card;
}
var emptyCommentsEl = null;

/**
 * @param {FurzonaComment[]} comments
 */
function renderComments(comments) {
  if (!commentsEl) return;
  if (!comments || comments.length === 0) {
    emptyCommentsEl = document.createElement("p");
    emptyCommentsEl.className = "meta";
    emptyCommentsEl.textContent = "No comments yet.";
    commentsEl.appendChild(emptyCommentsEl);
    return;
  }
  comments.forEach(function (comment) {
    commentsEl.appendChild(createCommentElement(comment));
  });
}

/** @param {FurzonaComment} comment */
function insertComment(comment) {
  if (!commentsEl) return;
  if (emptyCommentsEl) {
    emptyCommentsEl.remove();
    emptyCommentsEl = null;
  }
  commentsEl.prepend(createCommentElement(comment));
}
if (id) {
  furzona.getPost(id).then(renderPost).catch(function (error) {
    console.error("Failed to load post:", error);
    textEl.textContent = "Could not load post.";
  });
  furzona.getComments(id).then(renderComments).catch(function (error) {
    console.error("Failed to load comments:", error);
  });
} else {
  console.error("No post id provided in the URL.");
  textEl.textContent = "No post id provided.";
}
if (commentForm && commentInput && id) {
  if (!furzona.isLoggedIn) {
    commentInput.disabled = true;
    commentInput.placeholder = "Log in to comment";
  } else {
    commentForm.addEventListener("submit", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
        var content, button, comment, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              event.preventDefault();
              content = commentInput.value.trim();
              if (content) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              button = commentForm.querySelector('button[type="submit"]');
              button.disabled = true;
              _context.p = 2;
              _context.n = 3;
              return furzona.createComment(id, content);
            case 3:
              comment = _context.v;
              commentInput.value = "";
              if (comment) insertComment(comment);
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.error("Failed to post comment:", _t);
            case 5:
              _context.p = 5;
              button.disabled = false;
              return _context.f(5);
            case 6:
              return _context.a(2);
          }
        }, _callee, null, [[2, 4, 5, 6]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }
}
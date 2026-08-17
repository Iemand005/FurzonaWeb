"use strict";

function redirectIfLoggedIn() {
  if (furzona.isLoggedIn) location.href = "index.html";
}
;
redirectIfLoggedIn();
var loginForm = document.getElementById("login-form");
if (loginForm instanceof HTMLFormElement) {
  loginForm.onsubmit = function (e) {
    e.preventDefault();
    var formData = new FormData(loginForm);
    var email = formData.get('email');
    var password = formData.get('password');
    console.log(email, password);
    if (typeof email !== "string" || typeof password !== "string") return;
    furzona.login(email, password).then(function (_) {
      return redirectIfLoggedIn();
    });
  };
}
var loginForm = document.getElementById("login-form");
function redirectIfLoggedIn() {
  if (furzona.isLoggedIn()) location.href = "index.html";
}
if (loginForm instanceof HTMLFormElement) {
  loginForm.onsubmit = function (ev) {
    ev.preventDefault();
    var formData = new FormData(ev.target);
    var email = formData.get('email');
    var password = formData.get('password');
    console.log(email, password);
    furzona.login(email, password).then(function () {
      redirectIfLoggedIn();
    });
  };
}
redirectIfLoggedIn();
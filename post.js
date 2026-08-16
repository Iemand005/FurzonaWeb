const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) furzona.getPost(id).then(post => {

});
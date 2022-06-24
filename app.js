const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

// argument명은 event로 해주는 것이 관습
function onLoginSubmit(event) {
  event.preventDefault();
  console.log(loginInput.value);
}

loginForm.addEventListener("submit", onLoginSubmit);

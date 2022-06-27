# Input Values

getElementById와 querySelector를 적절히 활용하여 각 요소를 쉽게 찾을 수 있다.

### html 코드

```html
<div id="login-form">
  <input type="text" placeholder="What is your name?" />
  <button>Log In</button>
</div>
```

### javascript 코드

```javascript
const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");
```

input에 사용자가 입력한 내용은 `value` 프로퍼티를 가져오면 된다.

### 예시

```javascript
// loginForm이 html element이기 때문에 다음과 같이 element를 찾을 수 있다
const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");

function onLoginBtnClick() {
  console.dir(`hello! ${loginInput.value}`);
  console.log("clicked!");
}

loginButton.addEventListener("click", onLoginBtnClick);
```

이렇게 하면 사용자가 입력한 값을 확인하여 log를 남길 수는 있지만,
아무것도 입력하지 않을 시에 hello! 만 log에 찍힌다는 문제가 있다.

<hr>

# Form Submission

위에서 언급한 문제 때문에 username에 대한 유효성 검사가 필요하다.

string의 길이를 알려주는 함수는 length이다.
`string.length`
이렇게 작성하면 된다.

```javascript
// loginForm이 html element이기 때문에 다음과 같이 element를 찾을 수 있다
const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");

function onLoginBtnClick() {
  const username = loginInput.value;
  if (username === "") {
    alert("please write your name!");
  } else if (username.length > 50) {
    alert("Your name is too Long!!");
  }
}

loginButton.addEventListener("click", onLoginBtnClick);
```

이렇게 유효성 검사를 하는 방법이 있다.
유저를 너무 믿으면 한다.

그러나 이미 브라우저에는 너무 좋은 유효성 검사 방법이 있다.

## Input 요소에 직접 유효성 검사 항목을 설정하는 방법

Input의 유효성 검사를 위해서는 input이 form 안에 있어야만 한다.

```html
<form id="login-form">
  <input required maxlength="15" type="text" placeholder="What is your name?" />
  <button>Log In</button>
</form>
```

html의 form과 input을 이용하면 위의 코드처럼 복잡하게 유효성 검사를 하지 않고, 유효성 검사를 효과적으로 할 수 ㅣㅇㅆ다.

이렇게 설정을 하면 엔터를 눌러도 form은 submit된다.
form에서 엔터를 누르고 input이 더 존재하지 않는다면 자동으로 submit된다는 규칙이다.

form을 사용하면 클릭 이벤트를 신경쓰지 않아도 된다는 것이다.

form이 submit될때마다 웹사이트 전체가 새로고침 된다는 문제가 있기 때문에 이를 해결해야 한다.

# Events

form의 submit을 해결행 ㅑ한다.

submit이라는 event가 발생하는 것을 막거나, 중간에 개입해서 submit event가 발생했음을 알아야 한다.

> **_submit 이벤트는 form의 input에 정보를 입력후 enter를 치거나, button을 클릭했을 때 발생하는 이벤트이다._**

### 따라서 submit 이벤트 리스너를 두어 이에 대한 함수를 정의함으로써, form을 submit할때 입력값을 받아낼 수 있다!

```javascript
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

function onLoginSubmit() {
  const username = loginInput.value;
  console.log(username);
}

// submit은 enter를 치거나, 버튼을 클릭할때 발생하는 이벤트이다.
loginForm.addEventListener("submit", onLoginSubmit);
```

그러나 아직 새로고침을 막지는 못했다.

**새로고침이 일어나는 것은 브라우저는 엔터를 누를 대 새로고침을 하고, form을 submit하도록 되어 있다!**

우리는 이러한 동작이 발생하지 않도록 해야 한다.
이는 JS 로 해결 가능하다.

## 중요 개념

우리가 함수를 호출할때 뒤에 () 를 붙이면 브라우저가 보자마자 자동으로 해당 function을 실행시킨다.

우리는 addEventListener를 활용할때는 바로 실행시키려고 하는 것이 아니다.

브라우저는 우선 function을 호출하고, 브라우저가 function을 호출하기 하지만, 브라우저는 브라우저 내에서 event로부터 정보를 잡아내서 함수 실행 버튼을 누르고 있다.

evnet가 발생할때 브라우저가 function을 호출하는데, 비어있는 채로 호출하는 것이 아니라, 첫번재 arguemnt로써 추가적인 정보를 가진채로 호출한다.

function에 대한 argument로 다른 정보를 얻는 다는 것이다.

function이 하나의 argumen를 받도록 하고, 그걸 js로 넘겨주낟.

누군가 form을 submit하면 js가 function을 호출하는데, function을 그냥 호출하는 것이 아니라 function의 첫번째 argument로 발생한 일에 대해 필요로 할만한 정보들을 준다.

방금 실행된 event에 대한 정보를 js가 알아서 argument에 채워넣는다는 것이다.

이 argument를 통해 제출 시간, 제출자 등 다양한 값을 얻을 수 있다.

누군가 form을 submit하면 브라우저는 기본적으로 페이지를 새로고침하도록 되어 있다.

다음의 코드를 통해 실제로 js가 채워주는 정보를 확인할 수 있다.

```javascript
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

// argument명은 event로 해주는 것이 관습
function onLoginSubmit(event) {
  event.preventDefault();
  console.log(loginInput.value);
}

loginForm.addEventListener("submit", onLoginSubmit);
```

- preventDefault() 함수를 통해 브라우저의 기본 동작을 실행하지 않도록 정의했다.
- 이로 인하여, form 제출 시 새로고침 되는 문제를 해결하여, 원하던 결과인 정보를 제대로 입력 받을 수 있게 되었다.

## Event.preventDefault()??

> Event 인터페이스의 preventDefault() 메서드는 어떤 이벤트를 명시적으로 처리하지 않은 경우, 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 지정합니다.

**_브라우저의 기본 동작을 막아주는 것이다._**
이렇게 하면, 우리가 버튼을 클릭하거나 enter를 입력하면 새로고침되는 문제를 해결할 수 있다.

# Events part Two

Form의 기본 동작은 submit 이다.

링크의 기본 동작은 클릭시 해당 사이트로 이동하는 것이다.
그래서 클릭하면 Href로 입력한 링크로 이동하게 된다.

그런데 event.preventDefault()를 함수에 포함시키면 기본 동작이 실행되지 않기 때문에 다른 사이트로 이도하지 않는다.

```javascript
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

const link = document.querySelector("a");

// argument명은 event로 해주는 것이 관습
function onLoginSubmit(event) {
  event.preventDefault();
  console.log(loginInput.value);
}

function handleLinkClick() {
  alert("clicked!");
  event.preventDefault();
}

loginForm.addEventListener("submit", onLoginSubmit);
link.addEventListener("click", handleLinkClick);
```

- 브라우저는 링크를 클릭할때 해당 사이트로 이동하게 되어 있는데, 해당 이벤트를 막는 것이다.

그래서 event object를 보면 preventDefault : true로 되어있는 것을 확인할 수 있다.

# Getting Username

유저가 username을 입력하고 submit했을때 입력폼을 사라지게 하고 싶은 경우이다.

이때 hidden을 css에 미리 정의해두고, javascript 파일에서 submit 이벤트 함수에서 classList.add를 이용하여 form에 hidden 클래스를 추가해주면 된다.

```css
.hidden {
  display: none;
}
```

```javascript
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

// argument명은 event로 해주는 것이 관습
function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  loginForm.classList.add("hidden");
  console.log(username);
}

loginForm.addEventListener("submit", onLoginSubmit);
```

이렇게 설정 가능하다.

## hidden class를 여러 번 설정하는 경우

hidden 클래스명을 여러 번 사용하는 경우 "hidden" 이라는 string을 미리 상수로 선언해주는 것이 좋다.

이때 string으로 이루어져 있는 상수명은 모두 대문자로 선언하는 것이 좋다.

```javascript
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";

// argument명은 event로 해주는 것이 관습
function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  greeting.innerText = `Hello! ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

loginForm.addEventListener("submit", onLoginSubmit);
```

- 위의 코드와 같이 제출을 하면 hidden 클래스를 없애줌으로써 Hello username을 할 수 있다.

# Saving Username

지금까지 사용자에게 이름을 입력받아 이를 상수로 저장하고, Hidden Class를 이용해 숨기고 보여주는 형식으로 Login form을 구현했다.

이 때 정보를 기억할 필요가 있다.
새로고침을 하더라도 user가 누군지 기억하도록 하는 것이다.

이는 LocalStorage라는 API를 이용하여 할 수 있따.
localStorage는 우리가 브라우저에 뭔가를 저장하게 해준다.
미리 선언이 되어있는 api이기 때문에 문법만 알면 바로 사용 가능하다.

```javascript
localStorage.setItem(nameOfItem, itemValue);
localStorage.getItem(nameOfItem);
localStorage.removeItem(nameOfItem);
```

이런식으로 값을 저장하고 가져온다. 삭제할수도 있다.
이렇게 하면 새로고침을 하더라도 이미 입력했던 값을 가지고 시작할 수 있는 것이다.

# Loading Username

Local storage에 유저정보가 잇으면 form 요소를 보여주지 않고, h1을 보여줘야 한다.

그러므로 유저정보가 localStorage에 있는지 체크해야 한다.

```javascript
localStorage.getItem("username");
```

이런식으로 받고 null이라면 값이 없으므로 form을 표시하고, null이 아니라면 h1을 표시하면 된다.

항상 string을 여러 번 입력하는 경우 상수로 먼저 선언하여 사용하는 것을 잊으면 안된다.

유저정보가 localStorage에 없다면 null을 반환할 것인데, null을 반환한다면 form을 보여주면 된다.
form을 보여주려면 Form에 있는 Hidden Class를 remove하고, form의 eventListner를 설정하면 된다.
코드는 다음과 같다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Momentum</title>
  </head>
  <body>
    <form id="login-form" class="hidden">
      <input
        required
        maxlength="15"
        type="text"
        placeholder="What is your name?"
      />
      <button>Log In</button>
    </form>
    <h1 id="greeting" class="hidden"></h1>

    <script src="app.js"></script>
  </body>
</html>
```

```javascript
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

// h1 태그의 내용을 채워 넣는다.
function paintGreetings(username) {
  greeting.innerText = `Hello! ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}
```

# Recap

Hidden class를 통해 요소를 숨겨줬다.
자바스크립트를 불러오기 전부터 두 요소를 숨겨놓고 싲가한다.

자바스크립트가 들어와서 제일 먼저 local storage를 확인한다.

local storage는 정보를 저장하고 불러오고 삭제하는 브라우저가 가지고 있는 작은 DB같은 API이다.

local storage를 살펴보면 key-value쌍으로 되어 있다.

savedUsername이 Null 또는 값이 있을 것이다.
null일 경우에는 localStorage에 이전의 username이 없는 경우이다.

이 경우 LoginForm의 Hidden class를 삭제한다.
그러면 Login form이 표시된다.

submit Event가 발생하면 onLoginSubmit함수가 작동한다.
onLoginSubnmit함수에서는 브라우저의 submit 기본 동작인 새로고침을 막아준다.
그 후, 사용자가 입력한 값을 username이라는 변수에 저장한다.
해당 변수를 key, value 쌍으로 localStorage에 저장한다.
마지막으로 username을 인자로 해서 PaintGreeting 함수를 호출한다.

paintGreeting함수는 username이라는 인자를 받아서 hello username이라는 요소를 H1 텍스트에 추가해주는 함수이다.

이렇게 해서 local storage에서 Username key를 찾아서 하는 것이다.

새로고침을 하더라도 local storage에 값이 있기 때문에 paintGreetings 함수를 호출한다.
PaintGreetingsdms localStorage의 Key-value값을 이용해 H1 값을 넣어주기 때문에 이전에 사용자가 입력한 값이 들어갈 것이다.

## 수정 사항

paintGreetings 함수는 인자를 필요로 하지 않는 함수이다.
따라서 함수의 인자를 넣지 않고 호출해도 된다.

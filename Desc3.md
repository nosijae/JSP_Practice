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

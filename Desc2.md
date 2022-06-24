# The Document Object

Javascript 가 브라우저를 어떻게 움직이지는지 배우낟.
Javascript는 html의 요소들을 변경하고 읽을 수 있다.

## Object

documnet는 많은 것이 들어 있는 object이다.
Javascript에서 HTML documnt를 가져올 수 있다.

```javascript
document.title;
```

HTML 코드를 javascript로 본다.
HTML에 있는 title을 자바스크립트로 가져다 쓸 수 있다는 것

Object에서 property를 가져오기도 하지만, 변경도 가능하다!

```javascript
document.title = "new title";
// 이와 같이 프로퍼티를 자바스크립트로 변경 가능하다.
```

브라우저가 document object를 주기 때문에 가능하다.

javascript가 이미 html에 연결되어 있다 .

### 결론 : Javascript는 이미 html 에 연결되어 있고, 모든것의 시작은 Document이다.

브라우저에서 javascript는ㄴ 매우 강력하다는 것을 알 수 있다.

<hr>

# HTML in Javascript

document는 우리가 javascript에서 html에서 접근할 수 있는 방안이다.

```javascript
// h1 이라는 ID를 가진 요소를 가져온다.
const title = document.getElementById("title");

console.dir(title);

// 이런 식으로 요소를 변경 가능
title.innerText = "Got you! ";
```

javascript는 html을 표현하는 object를 보여준다.

document 함수 중 getElementById를 이용해 element를 가져오는 방법을 배웠다.

element를 찾고나면 그 HTML에서 뭐든 바꿀 수 있다.

HTML에서 요소를 가져와 변경하는 것이다.
document에서 요소를 가져오고, 변경하는 방법을 배웠다.

<hr>

# Searching For Elements

getElementById()함수를 사용해 id를 통해 요소를 찾아 변경했다.
만약 html내에 해당 id가 없는데 요소를 얻으려 하면 null을 가져오려 했다는 오류가 발생한다.
에러 메시지를 잘 보고 판단할 필요가 있다는 것이다.

### element 검색 방법에 대해서 더 알아본다.

```javascript
const hellos = document.getElementsByClassName("hello");

console.log(hellos);

const title = document.getElementsByTagName("h1");
console.log(title);

// CSS selector를 이용해 가져오는 방법이다.
// 권장 방법이다.
// querySelector를 가져올때 여러 개의 class가 존재할때 첫번째거 하나만 가져온다.
const select = document.querySelector(".hello h1");
console.log(select);

// 여러가지 요소를 한번에 가져오는 방법도 있다.
const selects = document.querySelectorAll(".hello h1");
```

getElementsByClassName 은 array를 가져온다.

querySelector는 css selector를 사용해 검색할 수 있다.
조건에 맞는 모든 element를 찾고 싶다며나 querySelectorAll을 사용

Javascript에서 Html Element를 가져오는 법을 배웠다.

getElementById, querySelector에 대한 개념을 알아야 한다.

<hr>

# Events

app.js를 html에서 import 해줬기 때문에, app.js에서 html document에 접근 가능한 것이다.

```javascript
const title = document.querySelector("div.hello:first-child h1");
console.log(title);
title.innerText = "Hello";

// Javascript object를 보여준다.
console.dir(title);
```

style은 h1 object 안에 있다.
style 안을 보면 javascript형식으로 작성돼있는 것을 확인 가느아핟.
h1을 찾고 안의 style을 찾고, color를 변경해주면 ㅗ딘다.

```javascript
const title = document.querySelector("div.hello:first-child h1");
console.dir(title);

// 이렇게 요소의 style도 javascript로 변경 가능하다.
title.style.color = "blue";
```

브라우저에서 javascript는 매우 강력하다는 것이다.

## event?

클릭, 마우스 오버, 입력을 끝내거나, 이름을 적거나, wifi에서 접속 해제되거나 등
javascript는 event를 들을 수 있다.

### click event listen

```javascript
const title = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  console.log("title was clicked!");
  title.style.color = "blue";
}

// 유저가 title을 click하는 것을 listen한다.
// 유저가 title을 클릭하면 javascript가 함수를 실행
title.addEventListener("click", handTitleClick);
```

웹사이트에서 click event를 감지하고, 함수를 실행시키는 방법에 대해서 배웟다.
addEventListener에 이벤트와, 이벤트 발생시 호출할 함수를 인자로 넘겨주면 된다.

유저가 click할 경우 javascript가 함수를 호출해줬다.

### 유저의 action을 listen하여 함수를 호출했다.

어떤 event를 listen할지 명확히 정하고, 어떤 함수를 실행시킬지도 정하고 설정해주면 된다.

event를 listen하고 반응해주는 것이다!

<hr>

# Events part Two

listen을 할 event를 찾기 위한 방법은 구글링이다.
h1 html element mdn 이런 식으로 검색하면 된다.

javascript element를 확인하면 된다.
Web APIs 라는 문서를 보면 된다.

HTMLElment를 보면 property와 event들을 볼 수 잇다.

혹은 console.dir(element)하여 사용가능한 event를 확인할 수 있다 .
on~~ 이름을 가진 것들은 event들이다.

### mouse events

```javascript
const h1 = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  console.log("title was clicked!");
  h1.style.color = "blue";
}

function handleMouseEnter() {
  h1.innerText = "Mouse is here!";
  console.log("mouse is here!");
}

function handleMouseLeave() {
  h1.innerText = "Mouse is gone!";
  console.log("mouse is out!");
  h1.style.color = "black";
}

function handleWindowResize() {
  document.body.style.backgroundColor = "tomato";
}

function handleWindowCopy() {
  alert("Not Allowed!");
}

function handleWindowOffline() {
  alert("SOS no WIFI");
}

function handleWindowOnline() {
  alert("ALL GOOD!");
}

h1.addEventListener("click", handleTitleClick);
h1.addEventListener("mouseenter", handleMouseEnter);
h1.addEventListener("mouseleave", handleMouseLeave);

// 리사이즈시 발생 이벤트
window.addEventListener("resize", handleWindowResize);
// copy시 발생 이벤트
window.addEventListener("copy", handleWindowCopy);
// wifi연결이 끊겼을 때 이벤트
window.addEventListener("offline", handleWindowOffline);
// wifi연결이 되었을때 이벤트
window.addEventListener("online", handleWindowOnline);
```

결국 event를 listen해서 function을 호출하는 패턴은 동일하다는 것을 확인 가능하다.

<hr>

# CSS in Javascript

if-else를 활용하여 event에 디테일을 줄 수 있다.

const와 let, if-else를 활용하여 조건에 따라 다른 style을 변경해줄 수 있다.

```javascript
const h1 = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  const currentColor = h1.style.color;
  let newColor;

  if (currentColor === "blue") {
    newColor = "tomato";
  } else {
    newColor = "blue";
  }

  h1.style.color = newColor;

  console.log(h1.style.color);
}

h1.addEventListener("click", handleTitleClick);
```

그러나 style은 css 파일에서 설정해주는 것이 좋다.

## 정리

1. element를 찾아라
2. event를 listen 해라
3. 그 event에 반응해라

반응이라는 것은 무언가를 보여주거나, 감추거나, 색을 바꾸는 것을 의미 한다.

# CSS in Javascript part Two

style에 적합한 도구는 css이다.

animation에 적합한 도구는 javascript이다.

css에 .active를 정의해주고, 이를 javascript에서 원하는 element에 .active 클래스를 부여해주는 형식으로 style을 지정해주면 된다.

### javascript는 html을 변경할 것이고, css는 html을 바라보고 있다.

h1.className은 getter이면서 setter이다.

### CSS 파일

```css
body {
  background-color: beige;
}

h1 {
  color: cornflowerblue;
}

.clicked {
  color: tomato;
  transition: color 0.5s ease-in-out;
}

.sexy-font {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
```

### 자바스크립트 파일

```javascript
const h1 = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  //   해당 if문은 클래스 네임을 지웠다 설정했다 해주는 부분이다
  if (h1.className === "clicked") {
    h1.className = "";
  } else {
    h1.className = "clicked";
  }
}

h1.addEventListener("click", handleTitleClick);
```

이렇게 설정할 시 최초 클래스 네임은 신경 쓰지 않고 클래스명을 바꿀 수 있다.

그래서 javascript로 클래스명을 변경하지 않고, 이전 클래스명을 가지고 있는 채로 가는 방법이 좋다.

sexy-font를 삭제하지 않고 clicked class를 수정하는 방안이다.

<hr>

# CSS in Javascript part Three

class name을 그냥 바꾸니깐 생기는 문제였다.

이런 경우 className이 아닌 classList를 사용해야 한다.

classList에는 contains이라는 함수가 있다.

element의 class 내용물을 조작하는 것을 허용하는 함수이다.

```javascript
const h1 = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  const clickedClass = "clicked";
  //  h1이라는 요소에 있는 class 명들 중에 clickedClass라는 class가 있는지 확인
  if (h1.classList.contains(clickedClass)) {
    // clickedClass가 있다면 해당 클래스를 제거
    h1.classList.remove(clickedClass);
  } else {
    // clickedClass가 없었다면 해당 클래스를 추가
    h1.classList.add(clickedClass);
  }
}

h1.addEventListener("click", handleTitleClick);
```

### 이렇게 하면 이전 클래스명을 지우지 않고, 클래스를 추가 해서 css를 적용시켰다가 적용을 풀었다가 할 수 있게 된다!!!

element가 class name을 포함하고 있는 지 확인하는 것은 매우 흔한 문법이다.

## toggle function

class name이 존재하는지 확인
class name이 존재한다면, toggle은 class name을 제거하고, 존재하지 않는다면, class name을 추가한다.

```javascript
const h1 = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  h1.classList.toggle("clicked");
}

h1.addEventListener("click", handleTitleClick);
```

> **_toggle은 h1의 classList에 clickedClass가 있는지 확인하고, 존재한다면 해당 className을 지워주고, 존재하지 않았다면 해당 className을 추가해주는 것이다!!_**

위에 긴 코드 대신 1줄만으로 똑같은 효과를 구현 가능한 것이다!!

## toggle 정리

> 토큰을 toggle한다. 토큰이 존재한다면, 토큰을 제거하고, 존재하지 않는다면 토큰을 추가한다

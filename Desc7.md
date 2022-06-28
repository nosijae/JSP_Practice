# Setup

todo-form 을 만들 것이다 .

ul 과 Form을 추가해준다.

```html
<form id="todo-form">
  <input type="text" placeholder="Write a To Do and Press Enter" />
</form>

<ul id="todo-list"></ul>
```

이후 해당 Element를 자바스크립트를 가져온다.

form은 submit의 기본동작을 막아줘야 한다.
이는 addEventListner에서 submit을 할때 함수를 호출하여 preventDefault()를 해줌으로써 가능하다.

```javascript
const toDoForm = document.querySelector("#todo-form");
const toDoList = document.querySelector("#todo-list");

function handleToDoForm(event) {
  event.preventDefault();
}

toDoForm.addEventListener("submit", handleToDoForm);
```

이렇게 한 후 Input 요소를 받아오는 것을 한다.
이는 Input 의 요소를 가져와 value를 받아오면 된다.

여기서 우리가 Enter를 하는 순간 입력창을 비우는 것을 구현하고 싶다.
이를 위해 이전 입력값을 다른 변수에 저장하고, input창의 value를 비워주면 된다.

```javascript
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

function handleToDoForm(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
}

toDoForm.addEventListener("submit", handleToDoForm);
```

이렇게 해서 toDo의 기본뼈대를 만든 것이다.

# Adding ToDos

실제로 toDo를 만들기 위한 paintToDo 함수를 구현한다.
여기서 해야 하는 것이 ul에 li 를 추가하는 것이다.

li를 추가하고, 안에 span도 추가하고 싶다.
먼저 두 요소를 만들고, 그 다음에 li 의 자식에 span을 넣어주면 된다.
이후 span의 innerText를 사용자 입력값으로 바꿔주면 된다.
마지막으로 html의 ul 태그에 javascript에서 생성한 li 를 append 해주면 된다.

### 예제 코드

```javascript
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  li.appendChild(span);
  span.innerText = newTodo;
  // html ul 태그에 넣어주기
  toDoList.appendChild(li);
}

function handleToDoForm(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";

  paintToDo(newTodo);
}

toDoForm.addEventListener("submit", handleToDoForm);
```

새로운 요소들을 생성하고 삽입하는 것을 통해 toDo를 구현한 것이다.

# Deleting To Dos

button을 통해 to do 를 삭제하는 것을 구현할 것이다.

button을 가질텐데 button은 click event를 기다리고 있어야 하낟.
그래야 누군가 클릭을 했을 때 알 수 있다.

li 에 span을 먼저 append한 후 button 을 append 를 해주면 된다.

문제는 이렇게 했을 때 어떤 list를 삭제해야 할지 모른다는 것이다.
많은 버튼들이 잇을텐데, 같은 Event를 기다리고 있을 것이다.
그런데 같은 이벤트를 기다리고, 어떤 Button이 클릭된지 모른다.

여기서도 event를 사용해야 한다.
이를 통해 어떤 Button이 클릭되었는지 알 수 있다.
path를 보면 몇번째 버튼인지 나온다.
event가 click된 위치를 알려주는 것이다.

button 안을 보면 많은 것들이 있는 것을 확인할 수 있다.

button.target.parentNode가 있다.
이는 Button의 부모가 누군지에 대한 것이다.
button의 parent가 누군지를 알아야 한다.
parentNode 혹은 parentElement를 알아야 한다.
클릭된 Li 를 알 수 있게 되는 것이다..

parentElement는 클릭된 Element의 부모이다.
우리가 클릭한 button이 event.targe이고 이것의 parentElement가 우리가 삭제하고 싶은 li 가 되는 것이다.

이렇게 우리가 삭제하고 싶은 Li를 알게 되었으니, 이를 삭제만 해주면 된다.

### 예제 코드

```javascript
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

function deleteToDo(event) {
  li = event.target.parentElement;
  li.remove();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  span.innerText = newTodo;
  button.innerText = "❌";

  li.appendChild(span);
  li.appendChild(button);

  button.addEventListener("click", deleteToDo);

  toDoList.appendChild(li);
}

function handleToDoForm(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";

  paintToDo(newTodo);
}

toDoForm.addEventListener("submit", handleToDoForm);
```

# Saving To Dos

To Do를 저장해야 한다.

브라우저에 위해서는 localStorage를 사용해야 한다.
여러가지 to DO를 저장해놓고 localStorage를 불러와 screen에 보여주려 한다.

이렇게 하려면 newTodo를 toDos라는 array에 Push 해주면 된다.

localStorage에는 array를 저장하지 못하고 text만 저장가능하다는 문제가 있다.

## 정리

사용자가 Form을 submit하면, 우리는 input을 비우고, 그 텍스트(newTodo)를 toDos array에 push하고, 화면에 toDo를 그려주고, toDo를 저장하면 된다.

saveToDos function이 호출되는 타이밍은 이미 toDos 배열에 새로운 todo가 삽입된 이후여야 한다.

### 예제 코드

```javascript
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const toDos = [];

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(event) {
  li = event.target.parentElement;
  li.remove();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  span.innerText = newTodo;
  button.innerText = "❌";

  li.appendChild(span);
  li.appendChild(button);

  button.addEventListener("click", deleteToDo);

  toDoList.appendChild(li);
}

function handleToDoForm(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";

  toDos.push(newTodo);
  paintToDo(newTodo);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoForm);
```

우리는 local storage에 array의 형태로 입력한 to Do 값들이 입력되기를 원한다.
그러나 해당 코드를 실행하면 local storage에 우리가 원하는 데로 저장되지 않고, 단순히 a, b, c, d, e 이런 형태의 object 로 저장된다.

## 목표

위의 코드를 돌리면 Local Storage에는 단순히 Text로 저장된다.
toDo를 단순히 text로 저장하면 안된다.
array 로 저장해야 한다.

### JSON.stringify() 를 이용해야 한다.

toDos를 stringify하면 된다.
값들을 String의 형태로 저장하고 싶기 때문에 JSON.stringify() 라는 객체를 이용하는 것이다.
이를 통해 우리가 대입한 값을 String의 형태로 바꿔주게 되는 것이다.

## 정리

localStorage에서는 문자열 저장만 가능하다.
따라서 array를 저장하려고 array 를 setItem 하더라도, 쉼표로 구분된 Object로 저장되는 것을 확인할 수 있다.
object로 저장이 되면, 중복된 값을 Array 에 push 하여 저장할 경우, localStorage에 저장된 값이 초기화된다는 문제점이 발생한다.

따라서 JSON.stringify 를 이용해 array 자체를 문자열로 바꿔서 localStorage에 저장해주는 것이다.

이렇게 하면 원하는 데로 string 배열의 형태로 값을 toDo를 저장할 수 있게 된다.

# Loading To Dos Part One

## JSON.stringify()

```javascript
JSON.stringify([1, 2, 3, 4]);
// "[1,2,3,4]"
```

array가 단순한 string으로 바뀐다.
값을 string으로 저장하고 싶을 때 사용하면 된다.

## JSON.pare("[1,2,3,4]")

단순한 string을 가지고 javascript가 이해 가능한 array로 만들 수 있다.

```javascript
JSON.parse(localStorage.getItem("todos"));
```

이렇게 하면 실제로 무언가를 할 수 잇는 array를 얻는 것이다.

## Array

자바스크립트는 array에 있는 각각의 item에 대해 fucntion을 실행할 수 있게 해준다.

## forEach()

array의 각각의 item에 대해 함수를 실행시키기 위한 것이다.
array의 item 각각 한개의 함수를 실행시켜 준다.

그런데 우리가 어떤 item을 사용하고 있는지 알아야만 한다.
처리되고 있는 item을 알아야 한다.

javascript는 지금 처리되고 잇는 item에 대한 정보도 제공해준다.

forEach는 각 item에 대해 함수를 실행시켜 준다는 것이다.

그러면 parsedToDo의 각 item(to do 항목들)에 대해서 함수를 실행시킬 수 있는 것이다.

## arrow function

함수를 더 쉽게 표현하는 방법이다.

```javascript
parsedToDos.forEach((item) => console.log("this is the turn of", item));

function sayHello(item) {
  conosle.log("this is the turn of ", item);
}
```

위의 두 함수는 생김새만 다를 뿐 쓰임이 동일하다.

# Loading To Dos part Two

arrow function을 만드는 방법과 그냥 함수를 쓰는 방법이 있다.

우리는 각 item을 화면에 그려주려 한다.
이때 paintToDo 함수를 사용하는데 필요한 인자는 newToDo뿐이다.

그러면 item 하나하나씩을 newToDo로 해서 보내면 된다.

forEach를 활용하여 작성하면 다음과 같다.

```javascript
parsedToDos.forEach(paintToDo);
```

forEach를 이용하면 JSON.parse를 이용하여 생성한 array의 item 하나하나를 함수인자로 보낼 수 있기 때문에 위에 같이 작성할 수 있다.

위의 코드는 parse 한 to Do의 item 하나하나를 화면에 그려주는 코드이다.

```javascript
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

const toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  li = event.target.parentElement;
  li.remove();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  span.innerText = newTodo;
  button.innerText = "❌";

  li.appendChild(span);
  li.appendChild(button);

  button.addEventListener("click", deleteToDo);

  toDoList.appendChild(li);
}

function handleToDoForm(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";

  toDos.push(newTodo);
  paintToDo(newTodo);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoForm);

const savedToDos = localStorage.getItem(TODOS_KEY);

// local Storage에 savedToDo가 존재한다면?
if (savedToDos != null) {
  const parsedToDos = JSON.parse(savedToDos);
  parsedToDos.forEach(paintToDo);
} else {
}
```

## 문제

위의 코드같이 하면 위의 코드를 덮어씌운다는 것을 알수 있다.

이 이유는 toDos 배열이 항상 빈 상태로 시작하게 때문이다.

우리는 단지 newToDo들만 localStorage에 저장하고 있다.

이는 application을 처음 시작할때 localSTorage에 toDO가 이미 있으면 toDos 배열에 이를 넣어주면 된다.

빈 배열로 toDos array가 시작하기 때문에, 시작 전에, localStorage에 있는 이전의 toDo들을 넣어주는 것이다.

```javascript
let toDos = [];

// local Storage에 savedToDo가 존재한다면?
if (savedToDos != null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
} else {
}
```

## 문제2

delete하더라도 local Storage에서 삭제가 안되는 현상이 발생

# Deleting To Dos Part One

to Do를 지울때마다 localStorage를 업데이트 해줄 것이다.

그러나 어떤 todo text를 local storage에서 지워야할지 알지 못한다.

따라서 toDos를 더 잘 만들어야 한다.

toDo들에게 ID를 부여하는 방법을 사용할 것이다.
즉 object를 만드는 것이다.

[{id}:1212, text:"drink"]
이러한 형식으로 표현하는 것이다.

id는 랜덤하게 부여할 것이다.
이는 date.now()함수를 이용하여 랜덤 넘버를 만들 것이다.

```javascript
// 데이터베이스로 사용자가 적은 text를 push
toDos.push(newTodo);
```

위의 부분을 object를 넣는 것으로 바꾸는 것이다.

```javascript
const newTodoObj = {
  text: newTodo,
  id: Date.now(),
};
toDos.push(newTodoObj);
```

이렇게 하는 것이다.
toDos에 이제 object를 저장하는 것이다.

toDos에서 이제 id를 사용하는 것이다.

또한 paintToDo 함수에 object를 넘겨준다.
paintToDo는 이제 object를 받는다.

따라서 span.innerText 는 newTodo.text가 되어야 한다.
또한 id로 toDO를 구분짓기 위해 각 toDo li의 id를 우리가 설정한 랜덤 id로 설정한다.

이는 li.id = newTodo.id로 설정해줄 수 있다.

추가적으로 수정해야하는 부분이 있다.

데이터베이스에게 id를 저장하는 옵션을 줬다.
이렇게 되면 원하는 li를 삭제 가능하다.

x를 누른 버튼의 id를 얻어야한다.

deleteToDo에서 화면에서 li를 삭제하기 전에 li의 id를 얻을 수 있다.

```javascript
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  li = event.target.parentElement;

  li.remove();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  li.id = newTodo.id;
  span.innerText = newTodo.text;
  button.innerText = "❌";

  li.appendChild(span);
  li.appendChild(button);

  button.addEventListener("click", deleteToDo);

  toDoList.appendChild(li);
}

function handleToDoForm(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";

  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);

  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoForm);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos != null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
```

# Deleting To Dos Part Two

```javascript
if (savedToDos != null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
```

이해해야 하는 부분은 위 코드의 forEach함수는 paintToDO를 parsedToDos 배열의 요소마다 실행한다.
forEach는 paintToDo를 기본적으로 실행한다.

또한 item을 주는데 이 item이 object가 된다.

우리가 array에서 item을 만들때 실제 그 item을 지우는 것이 아니라, 새 array에 지우고 싶은 item을 제외하고 만드는 것이다.
즉 지우고 싶은 item만 제외하는 것이다 .

이때 filter함수를 사용한다.

## filter

```javascript
function sexyFilter(item) {
  return item !== 3;
}

[1, 2, 3, 4].filter(sexyFilter);

// sexyFilter(1);
// sexiFilter(2);
// sexyFilter(3);
// sexyFilter(4);
```

위에 같이 작성햇을때 자바스크립트가 sexyFilter를 4번 호출하게 된다.
각 요소 하나하나가 함수를 호출할때의 인자가 되어 4번 호출하는 것이다.

이때 sexyFilter에서 true를 리턴하면 해당 item이 유지되고, false를 리턴하면 해당 item은 삭제된다.

위의 코드같이 sexyFilter 함수가 정의되었다, 1,2,3,4 가 인자로 sexyFilter함수에 들어가게 된다.
이 때 1, 2, 4는 3이 아니기 때문에 true 값이 반환되고, 3은 false가 반환된다.

따라서
[1, 2, 3, 4].filter(sexyFilter);
실행시킨 결과는 [1, 2, 4] 가 되게 된다.

즉, filter로 호출하는 함수에는 filter할 조건들을 설정해주면 되는 것이다.

### 예제

```javascript
const arr = [1234, 22, 1444, 2222, 34, 123, 344];

function sexyFunciton(potato) {
  return potato <= 1000;
}

arr.filter(sexyFunction);
```

위의 코드를 실행시키면 1000이하인 요소들만 filter 하도록 했기 때문에
[22, 34, 123, 344]
라는 값을 얻을 수 있다.

## 적용

우리의 데이터 베이스(local storage)는 요소들이 object로 이루어진 배열이다.

여기서 원하는 것을 삭제하고 싶을때 filter함수를 이용하면 된다.

# Deleting To Dos Part Three

filter function은 새 array를 준다!
실제 요소를 원래 array에서 삭제를 하는 것이 아닌, 삭제하고 싶은 요소가 삭제된 새 array를 주는 것이다.

즉 filter는 원래 array를 변경하지 않고 새 array를 준다는 것이다.

### localStorage를 실제로 업데이트하는 코드

먼저 deleteToDo를 하는 부분을 작성해야 한다.

```javascript
toDos = toDos.filter((toDo) => toDo.id !== li.id);
```

우리가 클릭한 li.id와 다른 toDo만 남겨두고 새로운 array를 toDo로 저장한 것이다.

근데 이렇게하면 문제가 있다.
타입이 맞지 않는다.
toDo.id는 number인데, li.id는 string 타입이다.

따라서 parseInt를 사용하여 문자열을 숫자로 바꿔줘야 한다.

또한 변경 사항을 localStorage에 저장하기 위해 saveToDo 함수를 마지막으로 호출하면 된다!

```javascript
function deleteToDo(event) {
  li = event.target.parentElement;
  // html에서 요소 지우기 (local storage 반영 전)
  li.remove();

  // local storage에 요소 삭제 반영을 위한 코드
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}
```

이렇게 하면 매우 잘 작동한다.

## 전체 코드

```javascript
const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  li = event.target.parentElement;
  // html에서 요소 지우기 (local storage 반영 전)
  li.remove();

  // local storage에 요소 삭제 반영을 위한 코드
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");

  li.id = newTodo.id;
  span.innerText = newTodo.text;
  button.innerText = "❌";

  li.appendChild(span);
  li.appendChild(button);

  button.addEventListener("click", deleteToDo);

  toDoList.appendChild(li);
}

function handleToDoForm(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";

  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);

  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoForm);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos != null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
```

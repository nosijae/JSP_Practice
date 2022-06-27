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

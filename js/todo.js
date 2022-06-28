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

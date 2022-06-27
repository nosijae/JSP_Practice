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

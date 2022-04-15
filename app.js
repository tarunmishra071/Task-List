const form = document.getElementById("task-form");
const taskList = document.querySelector(".collection");
const clearButton = document.getElementsByClassName("clear-tasks")[0];
const filter = document.getElementById("filter");
const task = document.getElementById("task");

loadEventListeners();
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", deleteTask);
  clearButton.addEventListener("click", emptyList);
  filter.addEventListener("keyup", filterTasks);
}
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasklist") === null) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("tasklist"));
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.innerHTML = task;
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}
function addTask(e) {
  if (task.value === "") {
    alert("Add a task");
  } else {
    const li = document.createElement("li");
    li.className = "collection-item";
    //   li.appendChild(document.createTextNode(task.value));
    li.innerHTML = task.value;
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    //   console.log(link);
    taskList.appendChild(li);
    //   console.log(taskList);
    storeTaskinLocalStorage(task.value);
  }
  task.value = "";
  e.preventDefault();
}
function storeTaskinLocalStorage(newTask) {
  let tasks;
  if (localStorage.getItem("tasklist") === null) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("tasklist"));
  tasks.push(newTask);
  localStorage.setItem("tasklist", JSON.stringify(tasks));
}
function deleteTask(e) {
  if (e.target.className == "fa fa-remove") {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
function removeFromLocalStorage(task) {
  const to_delete = task.firstChild.textContent;
  let tasks;
  if (localStorage.getItem("tasklist") === null) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("tasklist"));
  tasks.forEach(function (task, index) {
    if (task == to_delete) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasklist", JSON.stringify(tasks));
}
function emptyList(e) {
  if (confirm("Are you sure?")) {
    taskList.innerHTML = "";
    // $("ul").empty();
    clearFromLocalStorage();
  }
  //   console.log(e.target);
}
function clearFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  //   console.log(text);
  document.querySelectorAll(".collection-item").forEach(function (val) {
    const item = val.firstChild.textContent;
    // console.log(item.toLowerCase().startsWith(text));
    if (item.toLowerCase().startsWith(text) === true)
      val.style.display = "block";
    else val.style.display = "none";
  });
}

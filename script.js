//HERE DOM IS USED ONLY WHEN INPOUT GETS LOADED

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  //HERE WE SIMPLY PARSONG THE STRIG INTO ORIGANAL DATA STRUCTURE
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;
    li.addEventListener("click", (e) => {
      if ((e.target.tagName = "BUTTON")) return;
      task.completed = !task.completed; // it turns true to false and false to true
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent Toggle from firing
      tasks = tasks.filter((t) => t.id != task.id);
      li.remove();
      saveTask();
    });

    todoList.appendChild(li);
  });

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value = ""; //clear Input
    console.log(tasks);
  });

  function renderTask(task) {
    console.log(task);
  }

  //Function to push all data into LocalStorage , and localstorage is not direclty saved as array it should be string so we conver it using stringify

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
